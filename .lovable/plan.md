# Homepage1: horizontal product showcase

Duplicate the current homepage to a new route and swap only the "How it Works" block for a horizontal, image-first product carousel like the reference layout.

## What gets built

**New route: `/homepage1`**
- An exact copy of the current homepage (hero, stats, logo bar, ecosystem grid, service styles, newsletter, CTA, all existing copy and motion).
- The live homepage at `/` is untouched, so this is safe to review side by side.

**New "How it Works" section (only change)**
- Keeps the current centered heading "How it Works" and the same sub description text.
- Below it, a single horizontal row of products. Each product shows only:
  - the product mockup image (transparent-style, floating on the black background, no card, no border)
  - the product name centered underneath, in two lines when long
- Left and right arrow controls on each side of the row, matching the dark theme (subtle circular buttons, white icon, dimmed when the rail is at either end).
- The row scrolls horizontally with snap alignment: 5 products visible on desktop, 3 on tablet, 1.5 on mobile so the next item peeks and the swipe is obvious.
- Each product links to its existing product page.
- Images use a soft shadow/glow under the device so they read as products, not flat cutouts, consistent with the rest of the black theme.

**Products in the rail (order)**
Point of Sale, Kitchen Display System, Self Service Kiosk, Customer Facing Display, Table Side Order & Pay, Analytics & Reporting, Autonomous & Automated Delivery.

**Dummy images**
Each product gets a temporary placeholder mockup image, wired through one small list at the top of the section file so swapping in your real images later is a one-line change per product (or a single asset-pointer replacement). Placeholders will be neutral dark device renders, so the section looks finished during review.

## Technical notes

- New folder `apps/web/src/app/homepage1/page.tsx`, copied from `apps/web/src/app/page.tsx`, with the `<DemoRailSection ... />` call replaced by a new `<ProductShowcaseSection />`.
- New component `apps/web/src/app/components/ProductShowcaseSection.tsx`: client component, `overflow-x-auto` flex track with `snap-x`, `scrollBy` arrow handlers, scroll-position state to disable the arrows at the ends, `scrollbar-hide` utility already used elsewhere on the site.
- Product data (name, href, image) lives in a `showcaseProducts` array inside that component file; images referenced via `.asset.json` pointers under `apps/web/src/app/components/assets/` so the real uploads drop in cleanly.
- No changes to `demoSources.ts`, `DemoRailSection.tsx`, or any existing route.
- Page metadata for `/homepage1` set to `noindex` so the duplicate does not compete with `/` in search.
