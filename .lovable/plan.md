# Build the shop (Phase 2 of the support and shop rebuild)

## Where things actually stand

- Support is done: `/support` home, `/support/category/<slug>`, `/support/article/<slug>`, with the imported `articles.generated.json` (320 articles) and `categories.generated.json` (18 categories).
- Shop is NOT done. `apps/web/src/app/shop/page.tsx` is still a single light-theme page with six hardcoded dummy products (eatOS Pro, Mini, Kitchen Display, printer, stand, drawer) and CSS box placeholders. No catalog data, no collection pages, no product pages, no content pages.

So the confirmation covered Phase 1 only. This plan finishes Phase 2.

## What gets built

Catalog import, mirroring the approach already used for support and blog:

- `shop/catalog.generated.json` holding all 53 products (name, slug, images, price, compare price, variants and options, description, specs, collection membership) and all 8 collections (title, slug, description, hero image), imported from the live shop.eatos.com sitemap and product data.
- The 18 shop content pages (Why eatOS, Business Types, Pricing, Bundles, Starter Kit, Essentials, Growth Package, Request a Quote, Contact Us, Subscriptions, Privacy, CCPA opt out, and the rest) imported as structured blocks. `pages/test` skipped as scratch content.

Routes:

- `/shop` home: black hero, category rail for the 8 collections, featured and bundle cards, full-cover product imagery.
- `/shop/collections/<slug>`: collection hero plus product grid with price and compare-at price.
- `/shop/products/<slug>`: image gallery, variant and option picker, quantity, description, specs, related products. Add to cart is present but disabled in this phase, with a "Request a Quote" and "Book a Demo" path instead.
- `/shop/<slug>`: the imported content pages.

Design and copy rules:

- Black theme, Montserrat, `site-container` spacing, brand pink `#d70480` accents, matching the rest of the site.
- No em dashes. "Point of Sale" never "POS". Bundle cards keep the "Starting at ... with 2.99% +10c Processing Fees" framing.
- Responsive at mobile, tablet, desktop.

SEO and URL parity:

- Original shop slugs preserved under the new paths, self-referencing canonicals, Product JSON-LD on product pages, CollectionPage JSON-LD on collections.
- Redirects in `apps/web/next.config.js` from the old subdomain paths (`/collections/...`, `/products/...`, `/pages/...`) to the new `/shop/...` equivalents.
- `sitemap.ts` gains every collection, product, and content page.
- `scripts/prepare-dist.mjs` mirrors the new static paths so the static build emits them.

Cart and checkout stay out of this phase. That is Phase 3 and needs the Cloud backend plus Stripe, exactly as scoped before.

## Data honesty

No hardcoded product data in components. Everything renders from the generated catalog through typed interfaces in a shared types module, per the API-first rule. If any live product field cannot be imported (for example a Shopify-only metafield), it is omitted rather than invented, and I will list what was omitted.

## Technical notes

- New files: `apps/web/src/app/shop/catalog.generated.json`, `apps/web/src/app/shop/types.ts`, `apps/web/src/app/shop/catalog.ts` (typed accessors), `apps/web/src/app/shop/ShopHomeClient.tsx`, `apps/web/src/app/shop/collections/[slug]/page.tsx`, `apps/web/src/app/shop/products/[slug]/page.tsx`, `apps/web/src/app/shop/[slug]/page.tsx`.
- Existing `apps/web/src/app/shop/page.tsx` becomes the new shop home and its dummy product array is deleted.
- Product images are re-pointed to durable asset URLs via the asset pipeline rather than hotlinked Shopify CDN paths.
- Verification: build the web app, then check `/shop`, one collection, one product, and one content page at 390px, 768px, and 1280px with no console errors.

## Open item

Old subdomain hosts stay live until DNS is pointed or subdomain-level redirects are added. The in-app redirects only cover requests that reach this site.
