// Next.js builds into apps/web/.next. Preview validation expects a top-level
// ./dist artifact, so mirror client assets for that check only. Production must
// not run this script: publishing uses the OpenNext server output.
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
  </head>
  <body>
    <p>Preview assets prepared. The application is served by Next.js.</p>
  </body>
</html>
`,
);

console.log("dist/ prepared from apps/web/.next");
