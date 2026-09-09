# Lovable + Cloudflare D1

## Decision

The live site database is **Cloudflare D1 only** (`eatos-web-db` on Worker `eatos-web`).
Do **not** use Neon or Supabase for this marketing site. Blog, news, and shop
readers talk to D1 in production (with JSON file fallbacks when D1 is empty or
unavailable, e.g. local `next dev` without bindings).

## What to tell Lovable (paste this)

```text
Database decision for eatOS web (s.eatos.dev):

Use Cloudflare D1 only. Do not add Supabase or Neon clients, env vars, or schemas.

Content tables (D1): posts, news_posts, collections, products, product_images,
product_variants, collection_products. Auth stays on existing better-auth + D1.

You (Lovable) must NOT receive Cloudflare API tokens or D1 credentials.
Wire UI only to HTTP JSON APIs on the same origin, for example:

- GET  /api/blog, /api/blog?slug=
- GET  /api/shop/products, /api/shop/collections
- POST /api/newsletter  { email }
- POST /api/report-fraud  { ... }
- POST /api/cart/*      (when built)

If an API does not exist yet, keep using the bundled JSON fallbacks in
apps/web/src/app/*/content or *.generated.json and leave a TODO. Do not add
Supabase.

Contracts:
- Errors: { error: true, code, message }
- Prices: { amount, currency } never formatted strings; 0/null = quote on request
- Never change existing public URLs or slugs
- No em dashes in copy
- Keep table names only behind server routes or lib/blog/data.ts and lib/shop/data.ts

Cursor owns D1 migrations, seed, and deploy (wrangler + Doppler). Lovable owns
frontend design and API client calls.
```

## How Lovable gets "access" to D1

Lovable runs in Lovable's cloud. It cannot safely hold your Cloudflare account
token or talk to D1 bindings directly. Give it **API access**, not database access:

1. Cursor keeps owning `apps/web/migrations/*.sql`, seed scripts, and
   `yarn cf:deploy` with Doppler `x21/prd_cloudflare`.
2. Lovable designs pages and calls same-origin `/api/...` routes.
3. Those routes use `getCloudflareContext().env.DB` (already how
   `apps/web/src/app/api/utils/sql.ts` works).
4. For local Lovable preview without D1, the bundled JSON fallbacks keep pages
   rendering.

Never paste `CLOUDFLARE_API_TOKEN` or D1 connection strings into Lovable project
settings.

## Operator commands (Cursor / this repo)

```bash
# After schema change
cd apps/web && doppler run --project x21 --config prd_cloudflare -- yarn cf:migrate:remote
cd apps/web && yarn cf:migrate:local

# Regenerate and load content
node scripts/export-d1-seed.mjs
doppler run --project x21 --config prd_cloudflare -- node scripts/seed-d1.mjs --remote
node scripts/seed-d1.mjs --local
```
