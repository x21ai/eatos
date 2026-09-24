# Cursor handoff

- **Last update:** 2026-09-24
- **Commit:** `79e74713`
- **Branch:** `cursor/seo-preserve-wix-redirects-dee2`
- **Base:** `lovable`

## Current focus

Permanent 301s for live Wix SEO paths that 404 on Worker staging (`s.eatos.dev`). Config-only; no DNS or deploy.

## Recent changes

- 2026-09-24 — Added `permanent: true` redirects in `apps/web/next.config.js` for `/resellers-1`, `/payments/payment-processing-fees`, `/event-details/...`, and `/restaurant-type/...` → nearest canonical pages. Existing redirects unchanged.

## Next actions

- After merge, probe the 13 live-sitemap 404 paths on staging; expect 301 then 200 on indexable destinations.
- Follow-up (out of scope): ~229 paths return 200 on staging but are missing from the staging sitemap (`sitemap.ts`).
- Do **not** change DNS, wrangler deploy, or eatos.com cutover in this workstream.

## Blockers

- Domain cutover remains held (go-live audit 2026-09-24). This PR does not unblock DNS.
