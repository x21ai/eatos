# Cursor handoff

Everything the next developer needs in order to pick up the eatOS site in Cursor
and build the database and the write side. Read this alongside
[docs/supabase-content-schema.md](./supabase-content-schema.md) and
[docs/backend-wiring.md](./backend-wiring.md).

## Current state

- Yarn 4 monorepo. The site is `apps/web`, Next.js App Router, deployed to
  Cloudflare through OpenNext. Tailwind, Montserrat, black theme, brand pink
  `#d70480`.
- 81 page routes across 59 top level sections. The frontend is finished. No
  redesign work is expected.
- Content today lives in files that ship with the site:
  - `apps/web/src/app/blog/posts.generated.json`, 966 blog articles
  - `apps/web/src/app/news/news.generated.json`, 97 newsroom articles
  - `apps/web/src/app/shop/catalog.generated.json`, 52 products, 8 collections,
    plus 18 shop content pages
  - `apps/web/src/app/support/*.generated.json`, 320 help articles, 18 categories
- Blog, newsroom and shop pages are now async server components that read through
  a Supabase reader and fall back to those files when no credentials are present,
  so the site renders identically before and after the database exists.
- There is no cart, checkout, payment, order record or product admin. Newsletter
  signup, `/report-fraud`, `/login` and account auth are UI only. HubSpot handles
  Book Demo, Contact Sales, Partners and Reseller and is already live.
- Static hosting quirk: the published host resolves `.html` paths, and
  `scripts/prepare-dist.mjs` plus `apps/web/src/components/StaticLinkFix.tsx`
  keep clean URLs working. Anything with a cart or checkout needs a served
  runtime instead of the flat export.

## Verification used here

```bash
node scripts/export-supabase-seed.mjs      # regenerates the seed SQL
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:8080/blog
```

Each touched route was checked for HTTP 200 against the local preview, and layout
was checked at 390px, 768px and 1280px. Repeat both after the database is wired.

## Prompt to paste into Cursor

```text
You are continuing work on the eatOS marketing site. It is a Yarn 4 monorepo,
Next.js App Router in apps/web, deployed to Cloudflare via OpenNext, styled with
Tailwind and Montserrat. Read docs/supabase-content-schema.md and
docs/backend-wiring.md before you start.

CONTEXT: the frontend is finished. Blog, newsroom and shop pages already read
from Supabase when credentials exist and fall back to bundled JSON when they do
not. Your job is the database and the write side. Do not redesign pages.

ALREADY DONE (do not rebuild):
1. Read layer, no SDK, plain fetch on the Supabase Data API so it runs on
   Cloudflare Workers:
   - apps/web/src/lib/supabase/config.ts  reads NEXT_PUBLIC_SUPABASE_URL and
     NEXT_PUBLIC_SUPABASE_ANON_KEY, exposes isSupabaseConfigured()
   - apps/web/src/lib/supabase/rest.ts    supabaseSelect({table, select,
     filters, order, limit, revalidate}), 60s cache, returns {data, error}
2. Typed contracts:
   - apps/web/src/lib/blog/types.ts   Article, PostRow, rowToArticle, column lists
   - apps/web/src/lib/shop/types.ts   ProductRow, ProductImageRow,
     ProductVariantRow, CollectionRow, CollectionProductRow, money()
   - apps/web/src/app/shop/types.ts   existing UI-facing shop shapes
3. Data readers, the ONLY files that name tables:
   - apps/web/src/lib/blog/data.ts  listArticles(kind), getArticle(slug, kind),
     getRelatedArticles(slug, kind, n); kind is 'blog' -> posts,
     'news' -> news_posts. Falls back to the generated JSON.
   - apps/web/src/lib/shop/data.ts  getShopCatalog(), listProducts(),
     listCollections(), getProductBySlug(), getCollectionBySlug(),
     getCollectionProducts(). Falls back to shop/catalog.generated.json.
4. Pages wired to those readers as async server components passing props down:
   blog/page.tsx, blog/[slug]/page.tsx, news/page.tsx, news/[slug]/page.tsx,
   shop/page.tsx, shop/collections/[slug]/page.tsx,
   shop/products/[slug]/page.tsx. Client components accept optional props and
   fall back to the imported content, so nothing breaks without env vars.
5. Seed exporter: `node scripts/export-supabase-seed.mjs` writes
   seed/001_posts.sql (966 blog articles), seed/002_news_posts.sql (97 news
   articles), seed/003_shop.sql (8 collections, 52 products, their images,
   variants, and collection links). All slugs preserved.
6. Schema contract documented in docs/supabase-content-schema.md, including the
   exact columns each reader expects and example RLS policy plus GRANTs.

YOUR TASKS, in order:

A. Create the content schema in the customer's own Supabase project, matching
   docs/supabase-content-schema.md exactly: posts, news_posts, collections,
   products, product_images, product_variants, collection_products. For every
   table in the public schema, follow CREATE TABLE with GRANT statements, then
   ENABLE ROW LEVEL SECURITY, then policies. Public read only for anon; writes
   restricted to service_role or an admin role held in a separate user_roles
   table checked by a security-definer has_role() function. Never store a role
   on a profile or users table.
B. Load the seed SQL from seed/ and verify counts: 966 posts, 97 news_posts,
   52 products, 8 collections.
C. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY, then confirm
   /blog, /blog/<slug>, /news, /news/<slug>, /shop, /shop/collections/<slug> and
   /shop/products/<slug> render from the database. Then retire the generated JSON
   fallbacks only after that verification, not before.
D. Commerce, all new, none of it exists: carts, cart_items, orders, order_items
   with a public checkout token; server-side cart mutations; tax and shipping
   calculation; payment (Stripe or the customer's processor) with webhook
   signature verification; order confirmation email; an order lookup page. The
   shop currently shows quantity controls and a Request a Quote path with no
   cart. Checkout requires a served runtime, not the flat static export.
E. Admin: an /admin/shop editor for collections, products, variants and images,
   and move the existing /admin blog editor off the starter API onto Supabase.
   apps/web/src/app/api/blog/route.ts still queries a D1/SQLite helper at
   apps/web/src/app/api/utils/sql.ts and injects one hardcoded mock post,
   replace both.
F. Other unwired surfaces from docs/backend-wiring.md: newsletter signup and
   /report-fraud submit nowhere; /login and account sign-in and sign-up need real
   auth; system status is static; the support assistant only text-searches the
   320 imported help articles and calls no AI service. HubSpot forms for Book
   Demo, Contact Sales, Partners and Reseller are live, leave them alone.

HARD RULES:
- Never change or move an existing URL. Extensive legacy SEO depends on current
  slugs, aliases and redirects. Retired pages get a redirect to the closest live
  page.
- No em dashes anywhere in code, copy, metadata or alt text.
- Never hardcode product, price or content data in components. Everything
  renders from typed API responses.
- Prices are always {amount, currency}, never formatted strings. A price of 0 or
  null means quote on request, never free.
- Dates are ISO 8601. Errors are {error: true, code, message}. Lists are
  cursor-paginated.
- Only the anon key may appear in client-reachable code. Service role stays
  server-side and is read inside handlers, never at module scope.
- Every backend action needs a tool-style JSON-schema definition so an AI agent
  can perform it, and every UI form needs a conversational equivalent hitting
  the same API.
- Keep the readers in lib/blog/data.ts and lib/shop/data.ts the only place table
  names appear.
```

## File map for the handoff

| Path | Purpose |
| --- | --- |
| `apps/web/src/lib/supabase/config.ts` | Reads the two public environment variables |
| `apps/web/src/lib/supabase/rest.ts` | Fetch wrapper on the Data API, no SDK |
| `apps/web/src/lib/blog/types.ts` | Blog and newsroom contract |
| `apps/web/src/lib/blog/data.ts` | Blog and newsroom reader, with fallback |
| `apps/web/src/lib/shop/types.ts` | Shop row contracts |
| `apps/web/src/lib/shop/data.ts` | Shop catalogue reader, with fallback |
| `scripts/export-supabase-seed.mjs` | Regenerates `seed/*.sql` from shipped content |
| `docs/supabase-content-schema.md` | Tables, columns, grants, policies |
| `docs/backend-wiring.md` | Every screen that still needs a backend |
| `docs/pre-launch-audit.md` | SEO, speed, responsive and browser audit findings |
