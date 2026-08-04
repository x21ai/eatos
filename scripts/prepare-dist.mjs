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

// A route is a "parent" when another route lives beneath it (e.g. /products and
// /products/loyalty). Its clean path must stay a directory on disk, so it only
// gets "<route>/index.html" + "<route>.html".
const isParent = (route) =>
  found.some((f) => f.route.startsWith(`${route}/`));

const routes = [];
let pages = 0;

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

  if (isParent(route)) {
    // Directory index copy - the clean URL relies on host rewriting here.
    const indexTarget = path.join("dist", route, "index.html");
    mkdirSync(path.dirname(indexTarget), { recursive: true });
    cpSync(source, indexTarget);
  } else {
    // Lovable hosting serves exact file paths only: it does not map the clean
    // URL "/pricing" onto "pricing.html" or "pricing/index.html". Write the
    // page at the extensionless path the browser actually requests.
    const bare = path.join("dist", route);
    mkdirSync(path.dirname(bare), { recursive: true });
    cpSync(source, bare);
  }

  routes.push(`/${route}`);
  pages += 1;
}

if (!existsSync("dist/index.html")) {
  console.error("dist/index.html missing - no prerendered home page found.");
  process.exit(1);
}

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
  `dist/ prepared from apps/web/.next (${pages} pages, ${routes.length} clean URLs)`,
);
