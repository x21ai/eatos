import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";

const require = createRequire(import.meta.url);
const nextBin = require.resolve("next/dist/bin/next");

// Production publishing uses the Next.js/OpenNext server output. A top-level
// dist directory makes the publisher treat this server app as a static site.
rmSync("dist", { recursive: true, force: true });

const requestedBundler = process.env.ANYTHING_PUBLISH_BUNDLER;
const bundlerFlag = process.argv.includes("--turbopack") || requestedBundler === "turbopack"
  ? "--turbopack"
  : "--webpack";

const nextBuild = spawnSync(
  process.execPath,
  [nextBin, "build", bundlerFlag],
  { stdio: "inherit", cwd: "apps/web" },
);

if (nextBuild.error) {
  console.error(nextBuild.error);
  process.exit(1);
}

if (nextBuild.signal) {
  console.error(`Next.js build terminated by ${nextBuild.signal}`);
  process.exit(1);
}

if (nextBuild.status !== 0) {
  process.exit(nextBuild.status ?? 1);
}

const requiredBuildFiles = [
  "BUILD_ID",
  "build-manifest.json",
  "prerender-manifest.json",
  "routes-manifest.json",
];

for (const file of requiredBuildFiles) {
  const path = join("apps", "web", ".next", file);
  if (!existsSync(path)) {
    console.error(`Next.js build is incomplete: missing ${path}.`);
    process.exit(1);
  }
}

// Lovable's artifact validator requires a non-empty top-level dist directory.
// Keep it asset-only: Next/OpenNext serves every page, while these files satisfy
// the artifact contract without a root HTML document that could shadow the app.
mkdirSync(join("dist", "_next"), { recursive: true });
cpSync(join("apps", "web", ".next", "static"), join("dist", "_next", "static"), {
  recursive: true,
});

const publicDirectory = join("apps", "web", "public");
if (existsSync(publicDirectory)) {
  cpSync(publicDirectory, "dist", {
    recursive: true,
    filter: (source) => !source.toLowerCase().endsWith(".html"),
  });
}

writeFileSync(join("dist", ".server-rendered-next-app"), readFileSync(join("apps", "web", ".next", "BUILD_ID")));

if (existsSync("dist/index.html")) {
  console.error("Refusing to publish: dist/index.html would shadow the Next.js app.");
  process.exit(1);
}

if (!existsSync(join("dist", "_next", "static"))) {
  console.error("Production artifact is incomplete: missing dist/_next/static.");
  process.exit(1);
}

console.log("Next.js production output and asset-only dist artifact prepared.");