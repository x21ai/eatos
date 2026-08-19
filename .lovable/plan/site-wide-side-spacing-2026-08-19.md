# Site-wide side spacing

Goal: every page's content area uses the exact same left/right spacing and max width as the home page, so the header, footer, hero, and all content columns line up perfectly on mobile, tablet, and desktop.

## What changes

1. Add one shared container utility in `apps/web/src/app/global.css` that encodes the home page rule:
   `mx-auto w-full max-w-6xl px-5 md:px-8 lg:px-10` (as `@utility site-container`).
2. Replace the mismatched containers found across the site with that utility, keeping each section's existing vertical padding untouched:
   - `max-w-[1200px] px-5 sm:px-8` (9 places, incl. quick-service, full-service and other solution pages)
   - `max-w-[1220px] px-5 sm:px-8`
   - `max-w-[1120px] px-5 sm:px-8`
   - `max-w-7xl` / `max-w-5xl px-2` page shells
3. Apply the container to the top-level content wrapper of every remaining route that currently has no consistent wrapper: about, careers, contact-sales, customers, enterprise, blog, brochures, partners, pricing, platform, hardware, shop, point-of-sale, products (+ product detail pages), all solutions pages, tap-to-pay, report-fraud, privacy, terms, get-started, book-demo, login, account, comparison.
4. Leave alone: full-bleed backgrounds, hero background images/video, marquees and horizontal-scroll rails (they stay edge-to-edge, only their inner text/content columns get the container), and the comparison table's own fixed width behaviour.

## Verification

Crawl the main routes with Playwright at desktop (1440), tablet (820) and mobile (390) and confirm:
- left edge of page content aligns with the header logo and footer columns on all three widths
- no horizontal overflow / no scrollbar appears

## Technical notes

- Utility lives next to the existing `scrollbar-hidden` utility in `global.css`.
- Text-width limiters (`max-w-2xl`, `max-w-3xl` on paragraphs) stay as they are; only outer layout containers are normalised.
