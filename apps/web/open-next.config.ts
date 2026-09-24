import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

// Cloudflare (Workers) OpenNext config. Distinct from publisher/open-next.config.ts
// which targets AWS (S3 + Lambda). Uses R2 for the incremental/ISR cache.
export default defineCloudflareConfig({
  // The monorepo also contains bun.lock, but this app declares Yarn 4.
  // Avoid OpenNext auto-detecting Bun in Worker build environments.
  buildCommand: "corepack yarn build",
  incrementalCache: r2IncrementalCache,
});
