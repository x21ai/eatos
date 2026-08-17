// Next.js builds into apps/web/.next. Publishing/preview validation expects a
// top-level ./dist artifact, so mirror the prerendered HTML pages plus client
// and public assets into dist/ so the deployed site serves the real app.
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
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
const cleanRoutes = [];

for (const { source, route } of found) {
  if (route === "index" || route === "_not-found") {
    const target = route === "index" ? "dist/index.html" : "dist/404.html";
    cpSync(source, target);
    pages += 1;
    continue;
  }

  // Flat "<route>.html" copy for hosts that append the extension.
  const flat = path.join("dist", `${route}.html`);
  mkdirSync(path.dirname(flat), { recursive: true });
  cpSync(source, flat);

  // Directory index copy for hosts that resolve "<route>/" to an index file.
  const indexTarget = path.join("dist", route, "index.html");
  mkdirSync(path.dirname(indexTarget), { recursive: true });
  cpSync(source, indexTarget);

  // Never emit an extensionless copy: the static host sends those as
  // "application/octet-stream" with "nosniff", so the browser downloads the
  // file instead of rendering it. Every in-site link is rewritten to the
  // ".html" path below, which is always served as text/html.
  cleanRoutes.push(route);

  routes.push(`/${route}`);
  pages += 1;
}

if (!existsSync("dist/index.html")) {
  console.error("dist/index.html missing - no prerendered home page found.");
  process.exit(1);
}

// Lovable's static host resolves exact file paths only, and extensionless
// files come back as octet-stream downloads. Point every in-site link at the
// "<route>.html" file, which is always served as real HTML.
let rewritten = 0;
// Longest first so "/comparison/toast" is rewritten before "/comparison".
const rewriteTargets = [...cleanRoutes].sort((a, b) => b.length - a.length);
function rewriteLinks(dir) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry === "_next") continue;
      rewriteLinks(full);
      continue;
    }
    const isPage = entry.endsWith(".html") || !path.extname(entry);
    if (!isPage) continue;

    const original = readFileSync(full, "utf8");
    let next = original;
    for (const route of rewriteTargets) {
      next = next
        .split(`"/${route}"`)
        .join(`"/${route}.html"`)
        .split(`'/${route}'`)
        .join(`'/${route}.html'`)
        .split(`\\"/${route}\\"`)
        .join(`\\"/${route}.html\\"`);
    }
    if (next !== original) {
      writeFileSync(full, next);
      rewritten += 1;
    }
  }
}
rewriteLinks("dist");

// Hosts that honour these files get correct clean-URL handling and the right
// content type for the extensionless page copies above. Hosts that ignore them
// still resolve because the exact-path files exist.
writeFileSync(
  "dist/_headers",
  `${routes
    .map((r) => `${r}\n  Content-Type: text/html; charset=utf-8`)
    .join("\n")}\n`,
);
writeFileSync(
  "dist/_redirects",
  `${routes.map((r) => `${r} ${r}.html 200`).join("\n")}\n`,
);

console.log(
  `dist/ prepared from apps/web/.next (${pages} pages, ${routes.length} clean URLs, ` +
    `${cleanRoutes.length} routes served as .html, ${rewritten} files relinked)`,
);
