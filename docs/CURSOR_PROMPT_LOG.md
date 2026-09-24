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

### 2026-09-24 — Preserve live Wix SEO URLs via Next.js 301s
- **Summary:** Add permanent redirects in `apps/web/next.config.js` so live eatos.com Wix sitemap paths (`/restaurant-type/...`, `/resellers-1`, `/event-details/...`, `/payments/payment-processing-fees`) stop 404ing on the Worker site. No DNS, deploy, or domain cutover.
- **Ticket:** none (go-live audit follow-up)
- **Phase:** SEO preserve / go-live hold (no cutover)
- **Outcome:** Redirect pairs added in `79e74713`; PR on `cursor/seo-preserve-wix-redirects-dee2`. Sitemap.ts gap (~229 200s missing from staging sitemap) left out of scope.
