import { spawnSync } from "node:child_process";

const requestedBundler = process.env.ANYTHING_PUBLISH_BUNDLER;
const bundlerFlag = process.argv.includes("--turbopack") || requestedBundler === "turbopack"
  ? "--turbopack"
  : "--webpack";

const nextBuild = spawnSync(
  "./apps/web/node_modules/.bin/next",
  ["build", "apps/web", bundlerFlag],
  { stdio: "inherit" },
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