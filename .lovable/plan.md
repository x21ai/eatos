# Fix "Not Found" on all live pages except the home page

## What I confirmed on the live site just now

- `/` returns 200 with the real page.
- `/pricing` returns **404** (plain text "Not Found", not our styled 404 page).
- `/pricing.html` returns **200**, and `/pricing/index.html` returns **200**.
- `/pricing/` (trailing slash) returns 404.
- `/favicon.png` returns 200.

So the published files are all there — the live host serves only **exact file paths**. It does not
translate `/pricing` into `pricing.html` or `pricing/index.html` the way it does for the root. Every
in-site link points at a clean URL, so every page except the home page 404s. This is a URL-resolution
problem, not a missing-page or build problem.

## The fix

Make the published output resolve at the exact URLs the site links to.

1. **Emit extensionless page files.** For each prerendered page, also write the HTML to a file with no
   extension (`dist/pricing`, `dist/products/loyalty`, `dist/careers/product-engineer`, ...), which is
   the literal path the browser requests. Keep the existing `pricing.html` and `pricing/index.html`
   copies so any host behaviour still works.
2. **Add host redirect/headers hints** (`_redirects`, `_headers` in the published root) mapping clean
   URLs to their `.html` file and pinning `text/html` for extensionless pages, so the correct
   content type is sent if the host honours them.
3. **Publish, then verify live with real requests** — not just locally. I will curl every route
   (all ~50, including `/products/*`, `/solutions/*`, `/careers/*`, `/blog/*`) on
   `https://eatos.lovable.app` and confirm 200 + `content-type: text/html`.
4. **If extensionless files come back with the wrong content type**, fall back to the approach that
   cannot fail on a plain static host: turn on trailing-slash URLs in the Next config so Next itself
   generates and links `/pricing/` style URLs, plus a tiny redirect page at each clean path. I will
   re-verify live the same way before reporting back.

Verification is the important part here: the previous rounds were checked in the editor/build output,
which passes even when the live host resolves URLs differently. Nothing gets called fixed until live
curls of all routes return 200.

## Technical notes

- `scripts/prepare-dist.mjs` gains the extensionless mirror plus `_redirects` / `_headers` emission;
  it already walks `apps/web/.next/server/app` for the 60+ prerendered HTML files.
- No page content, styling, or component changes — desktop, tablet, and mobile rendering are untouched.
- Dynamic routes already prerender (`/products/[slug]`, `/careers/[role]`, `/blog/[slug]`,
  `/solutions/*`), so no new `generateStaticParams` work is needed.
