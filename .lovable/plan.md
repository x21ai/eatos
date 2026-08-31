# Rename Customer Facing Display to Guest Display

Replace every user-facing mention of "Customer Facing Display", "Customer-Facing Display", "Customer Display", and the "CFD" abbreviation with "Guest Display" across the whole site, and move the product page to a new URL with the old link preserved.

## What changes for visitors

- Navigation menus, footer, homepage, platform and products pages, brochures, media kit, support, shop, quick service and all demo/animation sections read "Guest Display".
- The product page moves from `/products/customer-facing-display` to `/products/guest-display`. Anyone visiting the old address, including existing backlinks, is permanently forwarded to the new one, so no traffic or ranking equity is lost.
- Imported archive content (blog posts, newsroom items, support articles, shop product listings) is rewritten to the new name too, as requested.
- Page titles, descriptions and social preview text on the affected pages use the new name.

## Scope of the text replacement

Applied case-consistently so headings, sentence copy and all-caps labels all read naturally:

- "Customer Facing Display" / "Customer-Facing Display" -> "Guest Display"
- "Customer Display" -> "Guest Display"
- Standalone "CFD" label shown to visitors -> "Guest Display"
- Product short names and tab labels -> "Guest Display"

Not changed: unrelated uses of the word "customer" (for example "customer loyalty", "customer support", "our customers").

## Technical notes

- Rename the route folder `src/app/products/customer-facing-display` to `src/app/products/guest-display` and update its `content.ts`, `page.tsx` metadata and the client component name.
- Add a permanent (308) entry to the existing `redirects()` list in `next.config` mapping `/products/customer-facing-display` to `/products/guest-display`.
- Update every internal link and slug reference: `components/Header.tsx`, `components/Footer.tsx`, `app/platform/page.tsx`, `app/products/products.ts`, `app/products/layout.tsx`, `app/products/[slug]/page.tsx`, `app/shop/catalog.ts`, `app/brochures/content.ts`, `app/components/ProductShowcaseSection.tsx`, plus sitemap entries if the slug is listed there.
- Update display strings in the demo and animation modules (`app/components/demoSources.ts`, `DemoTabsSection.tsx`, `DemoRailSection.tsx`, `DemoCarouselSection.tsx`, `LiveDemoSection.tsx`), `app/homepage2/data/platformProducts.ts`, `app/media-kit/content.ts`, `app/support/page.tsx`, `app/support/content.ts`, `app/quick-service/content.ts`, `app/products/point-of-purchase/content.ts`, `app/offline-point-of-sale/MeshDiagram.tsx`.
- Rewrite the visitor-visible name inside the generated data files: `blog/posts.generated.json`, `news/news.generated.json`, `support/articles.generated.json`, `support/categories.generated.json`, `shop/catalog.generated.json`.
- Internal identifiers, asset filenames (`cfd-*.png`, `showcase-CFD.png`) and component/variable names stay as they are; they are not visible to users and renaming them adds risk without benefit. Only the alt text and captions around them change.
- Verify afterwards: `/products/guest-display` renders, the old path redirects, nav and footer links resolve, and no visitor-facing "CFD" or "Customer Display" strings remain.
