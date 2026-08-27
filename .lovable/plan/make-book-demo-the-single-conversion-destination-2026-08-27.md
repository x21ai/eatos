# Make /book-demo the single conversion destination

Tracking hooks, a clean redirect, correct search metadata, and a full link audit. The shop rebuild is a separate follow-up (notes at the end).

## 1. Conversion tracking, ready for your analytics later

You said the analytics tool can be added later, so this step wires the events now and leaves the destination pluggable.

- Add a small tracking helper that pushes named events into `window.dataLayer` (the standard queue Google Tag Manager, GA4, and most tools read). With no tag installed, the pushes are harmless.
- Fire `book_demo_click` from every "Book a Demo" / demo call to action, including a `location` value (header, footer, hero, pricing, solution page) so you can see which placements convert.
- Fire `book_demo_view` when `/book-demo` loads.
- Fire `book_demo_submit` when the HubSpot meeting booking completes, by listening for HubSpot's meetings booking message event.
- When you pick a tool, adding it is one measurement ID in a single place, no rework of the call to action code.

## 2. Redirect check for /get-started

- `/get-started` now renders a redirect to `/book-demo`. Confirm the response is a proper redirect status, that `/book-demo` returns 200, and that there is no loop (nothing on `/book-demo` links back to `/get-started`).
- Make the redirect permanent so search engines transfer authority to `/book-demo` instead of treating it as temporary.

## 3. Sitemap, canonical, and metadata

- Remove `/get-started` from the sitemap and remove the duplicate `/book-demo` entry that is currently listed twice.
- Give `/book-demo` a self-referencing canonical URL plus `og:url`, so it is the primary indexed URL.
- Keep `/get-started` out of the sitemap entirely; the permanent redirect handles any old links.

## 4. Link audit, no leftovers

- Sweep header, mobile menu, footer, hero calls to action, pricing, product, solution, and blog components for any remaining `/get-started` reference or "Get Started" label pointing anywhere other than `/book-demo`.
- Also check button labels: where the destination is now the booking page, the wording should read as booking a demo rather than starting a signup, so the click matches the page.

## Verification

- Routes return expected statuses: `/` 200, `/book-demo` 200, `/get-started` permanent redirect to `/book-demo`.
- Browser check of the homepage and `/book-demo`: click a Book a Demo button and confirm the `book_demo_click` and `book_demo_view` events appear in `window.dataLayer`, with no console errors.
- Sitemap output contains `/book-demo` once and no `/get-started`.
- Source-wide search shows zero `/get-started` links, and the em dash copy guard passes.

## Technical notes

- New `src/lib/analytics.ts` with a typed `trackEvent(name, payload)` that guards `typeof window`.
- `src/app/get-started/page.tsx` uses `permanentRedirect('/book-demo')`.
- `src/app/book-demo/layout.tsx` gains `alternates.canonical` and `openGraph.url`.
- `src/app/sitemap.ts`: drop `/get-started`, dedupe `/book-demo`.
- HubSpot submit detection via a `window` `message` listener filtered to HubSpot's meetings booking payload.

## Follow-up: the shop.eatos.com pages

Separate plan, visual re-theme only for now: rebuild `/shop` and the hardware product pages in the site's black Montserrat theme, real product imagery with full-cover containers, consistent `site-container` spacing, brand pink accents, and Book a Demo / Contact Sales actions. No checkout or commerce backend in that pass; if you later want a real store with cart and payments, that becomes its own build.
