// Next.js builds into apps/web/.next. Publishing/preview validation expects a
// top-level ./dist artifact, so mirror the prerendered HTML pages plus client
// and public assets into dist/ so the deployed site serves the real app.
//
// URL strategy: the host matches exact file keys only. It does not append
// ".html", does not serve a directory index and does not fall back to 404.html.
// So every page is published at the clean path the site links to:
//
//   dist/<route>              extensionless file  -> serves /<route>
//   dist/<route>.html         kept so old shared/indexed .html links still work
//   dist/<route>/index.html   only for routes that also have child routes
//
// A route that has children must be a directory, so it cannot also be a file at
// the same key. Those few routes get an explicit 200 rewrite in dist/_redirects
// instead. Extensionless files are served as application/octet-stream unless a
// content type is pinned, which dist/_headers does.
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";

const next = "apps/web/.next";
if (!existsSync(next)) {
  console.error("apps/web/.next not found - run the Next build first.");
  process.exit(1);
}

rmSync("dist", { recursive: true, force: true });
mkdirSync("dist", { recursive: true });

if (existsSync(`${next}/static`)) {
  cpSync(`${next}/static`, "dist/_next/static", { recursive: true });
}
if (existsSync("apps/web/public")) {
  cpSync("apps/web/public", "dist", { recursive: true });
}

const appDir = `${next}/server/app`;
const found = [];

function walk(dir) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full);
      continue;
    }
    if (!entry.endsWith(".html")) continue;
    found.push({
      source: full,
      route: path.relative(appDir, full).replace(/\.html$/, ""),
    });
  }
}

walk(appDir);

// Build the full route -> source map first, including aliases, so parent/leaf
// detection below sees every route that will be published.
const pageByRoute = new Map();

for (const { source, route } of found) {
  if (route === "index" || route === "_not-found") continue;
  pageByRoute.set(route, source);
}

const sourceByRoute = new Map(found.map(({ source, route }) => [route, source]));

// Blog posts are published at the original /blogs/<slug> URLs as well (the Next
// config rewrites them onto /blog/<slug>).
for (const { source, route } of found) {
  const match = /^blog\/(.+)$/.exec(route);
  if (!match) continue;
  pageByRoute.set(`blogs/${match[1]}`, source);
}

// Legacy paths that only existed as framework-level redirects. Materialised as
// their own pages carrying the destination page's markup.
const legacyAliases = [
  ["newsroom", "news"],
  ["get-started", "bookademo"],
  ["tap-to-pay", "accept-payments"],
  ["cart", "shop"],
  ["collections/all", "shop"],
];

for (const [alias, target] of legacyAliases) {
  const source = sourceByRoute.get(target);
  if (!source) continue;
  pageByRoute.set(alias, source);
}

const homeSource = sourceByRoute.get("index");
if (!homeSource) {
  console.error("no prerendered home page found in apps/web/.next.");
  process.exit(1);
}
cpSync(homeSource, "dist/index.html");

const notFoundSource = sourceByRoute.get("_not-found");
if (notFoundSource) cpSync(notFoundSource, "dist/404.html");

// A route is a "parent" when another published route lives underneath it.
const allRoutes = [...pageByRoute.keys()].sort();
const parents = new Set();
for (const route of allRoutes) {
  const prefix = `${route}/`;
  if (allRoutes.some((other) => other.startsWith(prefix))) parents.add(route);
}

const parentRoutes = [];

for (const route of allRoutes) {
  const source = pageByRoute.get(route);

  // The .html key is the only form this host will serve for a page.
  const flat = path.join("dist", `${route}.html`);
  mkdirSync(path.dirname(flat), { recursive: true });
  cpSync(source, flat);

  if (parents.has(route)) parentRoutes.push(route);
}


// The host resolves exact file keys only: it has no "append .html" lookup, no
// directory index and it ignores dist/_redirects. Verified live: /pricing.html
// serves 200 while /pricing, /pricing/ and the extensionless copy all 404. So
// every internal href is rewritten onto the .html target that really exists,
// otherwise navigation breaks. Canonical tags and the sitemap keep the clean
// URLs for the eventual origin host.
const htmlFiles = [];
function collectHtml(dir) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      collectHtml(full);
      continue;
    }
    if (full.endsWith(".html")) htmlFiles.push(full);
  }
}
collectHtml("dist");

const hasHtml = (route) => existsSync(path.join("dist", `${route}.html`));
let rewritten = 0;

for (const file of htmlFiles) {
  const original = readFileSync(file, "utf8");
  const updated = original.replace(/href="\/([^"#?]*?)"/g, (match, route) => {
    if (!route || route.includes(".") || route.startsWith("_next/")) return match;
    const clean = route.replace(/\/$/, "");
    if (!clean || !hasHtml(clean)) return match;
    return `href="/${clean}.html"`;
  });
  if (updated !== original) {
    writeFileSync(file, updated);
    rewritten += 1;
  }
}

// No dist/_headers is written: every page is served from a .html key, which the
// host already labels text/html.


// Asset paths pass through first so nothing below can rewrite them.
const passthrough = ["/_next/* /_next/:splat 200"];

// Legacy URLs that only existed as framework-level redirects, which static
// hosting never sees. Kept small and explicit.
const legacyRedirects = [
  "/newsroom /news 301",
  "/newsroom/* /news/:splat 301",
  "/get-started /bookademo 301",
  "/tap-to-pay /accept-payments 301",
  "/collections/* /shop/collections/:splat 301",
  "/pages/* /shop/:splat 301",
  "/shop/pages/* /shop/:splat 301",
  "/shop/collections/all /shop 301",
  "/cart /shop 301",
  "/product-page/* /shop 301",
  "/category/* /shop 301",
];

// Section routes that own child routes cannot be a file and a directory at the
// same key, so their clean URL is served through an explicit rewrite. This list
// is small, which keeps it inside the host's per-page rule cap.
const parentRewrites = parentRoutes.map((route) => `/${route} /${route}.html 200`);

// Trailing-slash form of every clean URL, plus a final safety net so any clean
// URL the host cannot resolve as a file still lands on its .html twin.
const cleanUrlRewrite = ["/*/ /:splat.html 200", "/* /:splat.html 200"];

writeFileSync(
  "dist/_redirects",
  `${[...passthrough, ...legacyRedirects, ...parentRewrites, ...cleanUrlRewrite].join("\n")}\n`,
);

console.log(
  `dist/ prepared from apps/web/.next (${allRoutes.length} routes, ` +
    `${rewritten} files link-rewritten, ${parentRoutes.length} section rewrites)`,
);
