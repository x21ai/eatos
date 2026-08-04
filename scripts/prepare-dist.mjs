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
let pages = 0;
const routes = [];

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

    // Some static hosts resolve extensionless URLs to "<route>.html" instead of
    // "<route>/index.html". Emit both so every page resolves either way.
    if (target.endsWith("/index.html") && target !== "dist/index.html") {
      const flat = `${path.dirname(target)}.html`;
      mkdirSync(path.dirname(flat), { recursive: true });
      cpSync(full, flat);

      // Lovable hosting serves exact file paths only: it does not map the clean
      // URL "/pricing" onto "pricing.html" or "pricing/index.html". Emit a
      // third copy at the extensionless path the browser actually requests.
      const bare = path.join("dist", route);
      mkdirSync(path.dirname(bare), { recursive: true });
      cpSync(full, bare);
      routes.push(`/${route}`);
    }
    pages += 1;
  }
}

walk(appDir);

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
