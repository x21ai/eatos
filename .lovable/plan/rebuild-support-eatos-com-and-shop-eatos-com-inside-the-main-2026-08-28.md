# Rebuild support.eatos.com and shop.eatos.com inside the main site

Both properties get rebuilt in the site's black Montserrat design, with all content
imported so nothing is lost. Confirmed inventory from the live sitemaps:

```text
support.eatos.com   18 categories, 320 articles, 1 home
shop.eatos.com      8 collections, 53 products, 18 content pages
```

New locations: `/support/...` and `/shop/...`, with redirects from every old
subdomain URL so existing links and rankings survive.

## Phase 1: Help center (/support)

- Import all 320 articles and 18 categories: title, category, body blocks
  (headings, paragraphs, lists, images, tables, code, callouts), plus the
  original slug and last-updated date. Stored as generated JSON, same approach
  already used for the 966 blog posts and 97 news items.
- Pages: `/support` home (featured and frequently read articles, category grid,
  search), `/support/category/<slug>`, `/support/article/<slug>`.
- Search across every article title and body, client side, no backend needed.
- Keeps the essence: same category names and descriptions, same article
  hierarchy, breadcrumbs, related articles, "was this helpful" affordance,
  status page link banner.
- SEO: original slugs preserved under the new path, self-referencing canonicals,
  Article/FAQ JSON-LD, sitemap entries, redirects from
  `/en-us/article/...` and `/en-us/category/...`.

## Phase 2: Shop front end (/shop)

- Import all 53 products (name, images, price, compare price, variants, options,
  description, specs, collection membership) and all 8 collections plus the 18
  content pages (Why eatOS, Business Types, Pricing, Bundles, Starter Kit,
  Essentials, Growth Package, Request a Quote, Contact Us, Subscriptions,
  Privacy, CCPA opt out, and the rest). The `pages/test` page is skipped as
  scratch content unless you want it.
- Pages: `/shop` home with the icon category rail, `/shop/collections/<slug>`,
  `/shop/products/<slug>` with gallery, variant picker and quantity, plus the
  content pages at `/shop/<slug>`.
- Design carries the site's black hero, tight Montserrat headings, brand pink
  accents, and full-cover product imagery. Bundle cards keep the
  "Starting at ... with 2.99% +10c Processing Fees" framing.

## Phase 3: Cart and checkout on our site

Since checkout runs here rather than on Shopify, this phase needs a backend:

- Cloud backend tables for products, variants, carts, cart items, orders and
  order items, with row level security so a shopper only sees their own cart
  and orders.
- Cart drawer and `/shop/cart`: add, update quantity, remove, subtotal,
  shipping and tax placeholders, persistent across reloads.
- Stripe checkout via a hosted session, order confirmation page, webhook that
  marks orders paid. Prices are always recalculated server side from the
  database, never trusted from the browser.
- `/shop/account/orders` order history for signed-in shoppers.
- Enabling payments needs your Stripe account connected; I will prompt for that
  when the phase starts.

## Order of work

1. Support import and pages, verified end to end.
2. Shop catalog import and pages (browsable, add to cart disabled).
3. Cart, checkout and orders.

Each phase ships and is verified before the next starts, so nothing sits half
built.

## Technical notes

- Next.js app at `apps/web`. New routes under `apps/web/src/app/support/*` and
  `apps/web/src/app/shop/*`; the current single-file `shop/page.tsx` becomes the
  new shop home.
- Imported data: `support/articles.generated.json`,
  `support/categories.generated.json`, `shop/catalog.generated.json`. Images are
  re-pointed to durable asset URLs, not hotlinked Shopify CDN paths, where the
  build allows.
- Redirects and rewrites added in `apps/web/next.config.js`; `sitemap.ts` gains
  support and shop entries; `scripts/prepare-dist.mjs` mirrors the new static
  paths.
- Product and cart data flow through typed API contracts, with tool style
  definitions for cart and order actions, matching the API-first and AI-first
  rules for this workspace.

## Open item

Old subdomain hosts stay live until you point DNS or add redirects at the
subdomain level; the in-app redirects only cover requests reaching this site.
