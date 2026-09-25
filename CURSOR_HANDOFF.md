# Cursor handoff

- **Last update:** 2026-09-25
- **Commit:** `11f0e1e2`
- **Branch:** `cursor/crisp-above-cookie-bar-ac11`
- **Base:** `lovable`

## Current focus

Keep the live Crisp chat launcher out of the way of the cookie consent UI.

## Recent changes

- 2026-09-25 — Hid the Crisp launcher while any consent UI is on screen: `CookieBanner` publishes consent-UI visibility and the Crisp widget toggles Crisp's `chat:hide` / `chat:show` commands, so the bubble returns once the visitor answers. Replaces the earlier launcher-offset approach.
- 2026-09-25 — Added exact-host routing: Maya on `s.eatos.dev`, Crisp on `eatos.com` and `www.eatos.com`, and neither widget elsewhere.
- 2026-09-25 — Configured the confirmed Crisp website ID and added report-only CSP allowances for the Crisp script and frame.
- 2026-09-25 — Removed the Spring, Texas office from the footer and scrubbed matching repository plan notes.
- 2026-09-24 — Preserved same-origin video autoplay, exempted only the explicit development builder from XFO, made the social shim fail closed on production builds, and wired the security test script.
- 2026-09-24 — Pinned OpenNext's top-level Worker build command to the repository's declared Yarn 4 package manager instead of ambiguous `bun.lock` auto-detection.
- 2026-09-24 — Added one-year HSTS plus report-only CSP, anti-framing, referrer, permissions, and MIME-sniffing headers; disabled `X-Powered-By`.
- 2026-09-24 — Production-gated stale homepage previews and the social development shim with 404 responses.
- 2026-09-24 — Upgraded Next.js to 16.3.6 in the application lockfile.
- 2026-09-24 — Added `permanent: true` redirects in `apps/web/next.config.js` for `/resellers-1`, `/payments/payment-processing-fees`, `/event-details/...`, and `/restaurant-type/...` → nearest canonical pages. Existing redirects unchanged.

## Next actions

- Deploy through the normal Worker pipeline with `NEXT_PUBLIC_CRISP_WEBSITE_ID` set to the confirmed website ID.
- Smoke test live (`eatos.com` and `www.eatos.com`) for Crisp without Maya, and staging (`s.eatos.dev`) for Maya without Crisp.
- Before enforcing CSP, confirm all Crisp resources observed in reports are covered by the narrowed allowlists.
- After deploy, confirm on live that the Crisp bubble stays hidden while the consent UI is up on desktop and mobile, and reappears in its default corner once consent is given.

## Blockers

None for the code change. Production and staging smoke checks require deployment.
