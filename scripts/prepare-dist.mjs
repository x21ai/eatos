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
let pages = 0;

function walk(dir) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full);
      continue;
    }
    if (!entry.endsWith(".html")) continue;

    const route = path.relative(appDir, full).replace(/\.html$/, "");
    const target =
      route === "index"
        ? "dist/index.html"
        : route === "_not-found"
          ? "dist/404.html"
          : path.join("dist", route, "index.html");

    mkdirSync(path.dirname(target), { recursive: true });
    cpSync(full, target);
    pages += 1;
  }
}

walk(appDir);

if (!existsSync("dist/index.html")) {
  console.error("dist/index.html missing - no prerendered home page found.");
  process.exit(1);
}

console.log(`dist/ prepared from apps/web/.next (${pages} pages)`);
