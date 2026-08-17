// Next.js builds into apps/web/.next. Preview validation expects a top-level
// ./dist artifact, so mirror client assets for that check only. Production must
// not run this script: publishing uses the OpenNext server output.
//
// IMPORTANT: never write dist/index.html. A root HTML document here is served
// as the whole website by the static host and shadows the real Next.js app.
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";

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

rmSync("dist/index.html", { force: true });

console.log("dist/ prepared from apps/web/.next");
