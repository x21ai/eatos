# Cursor handoff: what is done here, what Cursor must build

On approval I will save this as `docs/cursor-handoff.md` so it lives in the repo next to `docs/supabase-content-schema.md` and `docs/backend-wiring.md`. Copy the prompt block below into Cursor as-is.

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

## What I will also add to the file

A short "current state" summary above the prompt: route count, where content
lives today, which pages are static versus dynamic, and the verification
commands used here (`node scripts/export-supabase-seed.mjs`, per-route HTTP
checks against the preview) so Cursor can repeat them.
