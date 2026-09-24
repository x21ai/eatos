# Cursor handoff

- **Last update:** 2026-09-24
- **Commit:** `f3559087`
- **Branch:** `cursor/harden-worker-site-a376`
- **Base:** `lovable`

## Current focus

Security hardening for the public Next/OpenNext Worker without changing DNS, deploying, or touching Shopify.

## Recent changes

- 2026-09-24 — Pinned OpenNext's Worker build to the repository's declared Yarn 4 package manager instead of ambiguous `bun.lock` auto-detection.
- 2026-09-24 — Added one-year HSTS plus report-only CSP, anti-framing, referrer, permissions, and MIME-sniffing headers; disabled `X-Powered-By`.
- 2026-09-24 — Production-gated stale homepage previews and the social development shim with 404 responses.
- 2026-09-24 — Upgraded Next.js to 16.3.6 in the application lockfile.
- 2026-09-24 — Added `permanent: true` redirects in `apps/web/next.config.js` for `/resellers-1`, `/payments/payment-processing-fees`, `/event-details/...`, and `/restaurant-type/...` → nearest canonical pages. Existing redirects unchanged.

## Next actions

- Complete production build, route/header smoke checks, and OpenNext Cloudflare build.
- At Cloudflare, disable the zone HSTS/header override or set it to the exact application value so `max-age=0` no longer replaces the Worker header.
- Review CSP reports before changing the policy from report-only to enforcement.

## Blockers

- Cloudflare production currently emits `Strict-Transport-Security: max-age=0` on challenge responses; edge coordination is required after merge.
