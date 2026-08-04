// Next.js builds into apps/web/.next. The platform's dist-check expects a
// top-level ./dist artifact, so mirror the client assets and add an entry html.
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";

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

writeFileSync(
  "dist/index.html",
  `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>eatOS</title>
    <meta http-equiv="refresh" content="0; url=/" />
  </head>
  <body>
    <p>This app is served by the Next.js server. Open <a href="/">/</a>.</p>
  </body>
</html>
`,
);

console.log("dist/ prepared from apps/web/.next");
