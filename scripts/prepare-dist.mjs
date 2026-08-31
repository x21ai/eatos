// Next.js builds into apps/web/.next. Publishing/preview validation expects a
// top-level ./dist artifact, so mirror the prerendered HTML pages plus client
// and public assets into dist/ so the deployed site serves the real app.
import {
  cpSync,
  existsSync,
  mkdirSync,
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

// Copy every prerendered page: .next/server/app/<route>.html -> dist/<route>/index.html
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

const routes = [];
let pages = 0;

// Every page is written twice, both times with an .html extension:
//   dist/<route>.html        - the host's "append .html" lookup / rewrite target
//   dist/<route>/index.html  - directory-index lookup
// Extensionless copies are deliberately NOT written any more: the host serves
// them byte for byte as application/octet-stream with X-Content-Type-Options:
// nosniff, so the browser downloads the page instead of rendering it.
function emit(source, route) {
  const flat = path.join("dist", `${route}.html`);
  mkdirSync(path.dirname(flat), { recursive: true });
  cpSync(source, flat);

  const indexTarget = path.join("dist", route, "index.html");
  mkdirSync(path.dirname(indexTarget), { recursive: true });
  cpSync(source, indexTarget);
}

for (const { source, route } of found) {
  if (route === "index" || route === "_not-found") {
    const target = route === "index" ? "dist/index.html" : "dist/404.html";
    cpSync(source, target);
    pages += 1;
    continue;
  }

  emit(source, route);
  routes.push(`/${route}`);
  pages += 1;
}

// Blog posts are published at the original /blogs/<slug> URLs (the Next config
// rewrites them onto /blog/<slug>). Static hosting resolves exact paths only,
// so mirror each post page to its /blogs/ path as well.
for (const { source, route } of found) {
  const match = /^blog\/(.+)$/.exec(route);
  if (!match) continue;
  const alias = `blogs/${match[1]}`;
  emit(source, alias);
  routes.push(`/${alias}`);
  pages += 1;
}

if (!existsSync("dist/index.html")) {
  console.error("dist/index.html missing - no prerendered home page found.");
  process.exit(1);
}

// Clean URLs resolve through a single wildcard rewrite instead of one rule per
// page: per-page proxy rules are capped at 100 by the host, which silently
// dropped most routes. Asset paths are passed through first so the wildcard
// never rewrites them.
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

const cleanUrlRewrite = ["/* /:splat.html 200"];

writeFileSync(
  "dist/_redirects",
  `${[...passthrough, ...legacyRedirects, ...cleanUrlRewrite].join("\n")}\n`,
);

console.log(
  `dist/ prepared from apps/web/.next (${pages} pages, ${routes.length} clean URLs, ` +
    `each page written as <route>.html and <route>/index.html)`,
);
