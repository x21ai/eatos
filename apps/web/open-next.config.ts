import {
  defineCloudflareConfig,
  type OpenNextConfig,
} from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

// Cloudflare (Workers) OpenNext config. Distinct from publisher/open-next.config.ts
// which targets AWS (S3 + Lambda). Uses R2 for the incremental/ISR cache.
const config: OpenNextConfig = {
  ...defineCloudflareConfig({
    incrementalCache: r2IncrementalCache,
  }),
  // The monorepo also contains bun.lock, but the root package declares Yarn 4.
  // This top-level AWS/OpenNext option bypasses package-manager auto-detection.
  buildCommand: "corepack yarn build",
};

export default config;
