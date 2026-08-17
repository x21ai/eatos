import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const nextBin = require.resolve("next/dist/bin/next");

// Production publishing uses the Next.js server output. The static `dist`
// mirror is only for the preview artifact check, so it is created only when
// this script is invoked for the dev/preview build.
const withDist = process.argv.includes("--dist");

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

if (!withDist) {
  process.exit(0);
}

const prepareDist = spawnSync(process.execPath, ["scripts/prepare-dist.mjs"], {
  stdio: "inherit",
});

if (prepareDist.error) {
  console.error(prepareDist.error);
  process.exit(1);
}

if (prepareDist.signal) {
  console.error(`dist preparation terminated by ${prepareDist.signal}`);
  process.exit(1);
}

process.exit(prepareDist.status ?? 1);