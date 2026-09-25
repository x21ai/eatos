# Cursor prompt log

Append-only. Newest entries first. Never paste secrets, tokens, keys, or PII.

## Template

```
### YYYY-MM-DD — Short title
- **Summary:**
- **Ticket:** none
- **Phase:**
- **Outcome:**
```

---

### 2026-09-25 — Float the Crisp chat button above the cookie bar
- **Summary:** On live, push the Crisp launcher clear of the cookie consent bar while the bar is on screen and restore the default margin once the visitor accepts or dismisses it. Measure the real bar height instead of hardcoding one size, leave the hostname gate and staging Maya behavior alone, and open a PR against `lovable`.
- **Ticket:** none
- **Phase:** Public chat split / go-live hold
- **Outcome:** `CookieBanner` publishes its measured height through a shared bottom-inset store and the Crisp widget overrides Crisp's launcher offset custom properties while the bar is visible; verified in Chrome against the live hostname on desktop and mobile viewports.

### 2026-09-25 — Use confirmed Crisp website ID
- **Summary:** Configure Crisp website ID `cf9ee4db-97df-4864-8fa6-194ad4762b95` for the two live domains, preferably through `NEXT_PUBLIC_CRISP_WEBSITE_ID`, with a production-host-only fallback where needed for Worker builds.
- **Ticket:** none
- **Phase:** Public chat split / go-live hold
- **Outcome:** Worker config, documentation, and a hostname-constrained fallback use the confirmed public website ID in `2a2116fd`.

### 2026-09-25 — Remove the Spring, Texas office address
- **Summary:** Remove the retired Spring, Texas office from the footer and scrub repository references to its street, suite, and postal code without inventing a replacement address. Rebase the work after merged security PR #20.
- **Ticket:** none
- **Phase:** Public chat split / go-live hold
- **Outcome:** Removed the footer office record and all matching repository plan-note references in `2a2116fd`; branch rebased onto merged security hardening.

### 2026-09-25 — Split public chat by hostname
- **Summary:** Show Maya only on `s.eatos.dev`; restore Crisp only on `eatos.com` and `www.eatos.com` when configured; leave admin Maya routes unchanged and open a PR against `lovable`.
- **Ticket:** none
- **Phase:** Public chat split / go-live hold
- **Outcome:** Added runtime hostname routing, Crisp loading, and CSP allowances in `2a2116fd`; draft PR opened against `lovable`.

### 2026-09-24 — Security harden the public Worker site
- **Summary:** Add production-safe HSTS and browser security headers, retire stale homepage previews, hide the social development shim outside development, and upgrade Next.js past the audited GHSA-affected release. Open a PR against `lovable`; do not merge.
- **Ticket:** none (live security audit follow-up)
- **Phase:** Security hardening / go-live hold
- **Outcome:** Implemented in `5e29282e` with Worker build/review follow-ups through `f2b65278`; draft PR opened from `cursor/harden-worker-site-a376`. Header tests, Next build, OpenNext Worker build, and production route/header smoke checks pass. Cloudflare edge HSTS alignment remains a deploy action.

### 2026-09-24 — Preserve live Wix SEO URLs via Next.js 301s
- **Summary:** Add permanent redirects in `apps/web/next.config.js` so live eatos.com Wix sitemap paths (`/restaurant-type/...`, `/resellers-1`, `/event-details/...`, `/payments/payment-processing-fees`) stop 404ing on the Worker site. No DNS, deploy, or domain cutover.
- **Ticket:** none (go-live audit follow-up)
- **Phase:** SEO preserve / go-live hold (no cutover)
- **Outcome:** Redirect pairs added in `79e74713`; PR on `cursor/seo-preserve-wix-redirects-dee2`. Sitemap.ts gap (~229 200s missing from staging sitemap) left out of scope.
