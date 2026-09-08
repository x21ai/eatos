# Shop and blog on your own Supabase

Yes, this works. Nothing here depends on Lovable Cloud. The site reads your Supabase project
through its public URL and publishable key, and Cursor keeps full control of the schema,
migrations and any secret keys.

## Split of work

You, in Cursor:

- Create the tables, policies and any server-side payment logic in your Supabase project.
- Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (plus the secret keys
  used by checkout) to the environment.

Me, here:

- Build the front end against the agreed data shape, so the pages work the moment your keys
  and tables exist, and fall back to today's imported content until then.
- No tables created, no migrations run, no secret keys touched from this side.

## Agreed data shape

Written as TypeScript interfaces in a shared file the pages import, so every field on screen
traces back to one contract:

- Shop: `collections`, `products`, `product_variants`, `product_images`, `carts`,
  `cart_items`, `orders`, `order_items`. Prices as amount plus currency code, never strings.
- Blog: `posts`, `categories`, `authors`, with slug, title, excerpt, body, cover image,
  published date and status.

I will hand you the exact interface file and a plain SQL reference of the columns each page
reads. You decide the final table design.

## Shop, full store with checkout

Phase A, catalogue from your database:
`/shop`, `/shop/collections/<slug>` and `/shop/products/<slug>` stop reading
`catalog.generated.json` and read your tables through a typed data layer. Existing addresses
stay exactly as they are.

Phase B, cart and checkout:
cart drawer, quantity edits, shipping and tax display, checkout, order confirmation page and
an order lookup. The payment step calls an endpoint in your backend, so the card keys never
live in this project.

Phase C, migration of the current 52 products:
I produce a seed file from `catalog.generated.json` in your agreed column order. You run it
from Cursor.

## Blog moved into Supabase

- All imported posts and news stories exported to a seed file for you to load, keeping every
  existing slug, title, date, cover image and body so nothing in search changes.
- `/blog`, `/blog/<slug>`, `/news` and `/news/<slug>` read from your tables.
- The existing admin screens are pointed at your tables rather than the half-built starter
  API, so posts can be written and edited in the browser.
- The generated JSON files stay in place, unused, until you confirm the migrated posts render
  correctly. Then they are removed.

## One thing that has to change

The site is currently published as plain files, which cannot run a cart or take a payment.
Checkout needs the pages to be served by the app itself rather than as flat files. That is a
publishing change, not a page change, and every address stays the same. Phase A works either
way, so this only becomes blocking at Phase B.

## Technical notes

- New `apps/web/src/lib/supabase/client.ts` (browser, publishable key) and `server.ts`
  (route handlers). Keys read from environment only, never committed.
- New `apps/web/src/lib/shop/types.ts` and `apps/web/src/lib/blog/types.ts` hold the shared
  contracts; `apps/web/src/app/shop/catalog.ts` becomes a thin adapter so page components are
  untouched by the data source swap.
- Seed exporters under `scripts/` convert the generated JSON into SQL inserts.
- `docs/backend-wiring.md` updated to reflect the new split.
- Verification each phase: the affected routes return 200 and render at 390px, 768px and
  1280px with no console errors, and with the environment keys absent the pages still render
  from the current imported content.

## Order

1. Contracts, client setup, seed exporters, and `/blog` plus `/news` reading from Supabase.
2. Shop catalogue from Supabase.
3. Cart and checkout, once publishing is switched to a served app.
4. Retire the generated JSON files and the starter blog API.
