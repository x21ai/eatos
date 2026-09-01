# Fix Shop "Not Found" on the live site, permanently

## What I confirmed on the live site just now

- `/shop.html`, `/shop/collections/point-of-sale.html` and `/shop/products/star-thermal-143-iv.html` all return 200 with `text/html`. Every shop page is published and correct.
- The clean versions of those same URLs (`/shop`, `/shop/`, `/shop/collections/point-of-sale`, `/shop/products/star-thermal-143-iv`) all return a plain-text 404 from the host.
- The homepage HTML served by the host already links to `/shop.html`, and the shop page links to `/shop/products/*.html`. So the server-rendered links are right.
- `https://eatos.lovable.app/_redirects` returns the file itself as content. The host is not consuming it, so the wildcard clean-URL rule and every legacy redirect in it (`/newsroom`, `/collections/*`, `/cart`, `/shop/collections/all`) are dead. Confirmed: `/newsroom` and `/collections/hardware` both 404 instead of redirecting.

So the failure is not the shop pages and not the published links. After the page hydrates, the framework's client router restores its own clean hrefs and takes over the click. It tries the clean route, that fetch fails on this host, and it falls back to a real browser request to `/shop`, which the host does not serve. The correct link is replaced by a broken one a second after the page loads, which is exactly why it works sometimes and 404s other times.

## The fix

1. Make the `.html` form the single published URL form for navigation, at every layer, not only in the post-build HTML rewrite: the shop entry points (utility bar Shop, header/mobile Shop, in-body Shop CTAs) and all generated shop links resolve to a path the host actually serves.
2. Stop the client router from re-taking clicks on the published build. Internal navigation on the published site becomes a real document request to the existing `.html` file, so a click behaves identically before and after hydration, and refreshes plus shared links behave the same. Preview and development keep normal clean-URL routing, so nothing about the editing experience changes.
3. Guarantee coverage for the whole shop tree, not just `/shop`: shop home, all 8 collections, all 52 products and all 17 shop content pages get verified published targets. Any shop route the build does not produce is reported rather than silently 404ing.
4. Replace the reliance on the ignored `_redirects` file. Legacy and alias URLs that matter (`/shop/collections/all`, `/collections/*`, `/cart`, `/pages/*`, `/newsroom`, `/get-started`, `/tap-to-pay`) get real published pages that redirect in the browser, so they work whether or not the host ever honours redirect rules.
5. Keep canonical tags and the sitemap on clean URLs so search engines and a future origin host still see the intended addresses, while navigation uses the servable form.

## Verification

- Publish, then request every shop URL live (home, 8 collections, 52 products, 17 content pages) plus the main site routes, and require 200 with `content-type: text/html` on each. A 404 or an `application/octet-stream` response counts as a failure.
- Browser test on the published site: load the home page, wait for hydration, click Shop, then click through to a collection and a product, refresh on each, and use the back button. No "Not Found", no download prompt, no console errors.
- Re-check the legacy shop URLs above and confirm each lands on the intended page.

## Notes

- No design, copy or page-content changes. Work is in the publish step (`scripts/prepare-dist.mjs`), the link/navigation layer, and the alias pages.
- This is only observable on the published site, so a publish is part of the work and nothing is reported as fixed before live requests confirm it.
