# eatOS Handoff: Load the Database and Finish Checkout

Everything needed to load content into the live Cloudflare D1 database and to finish
the cart/checkout work lives in this repository. No Lovable access is required.

Two things still need a human:

1. A Cloudflare login (browser sign-in or an API token) to write to the live database.
2. A decision on the card processor (Stripe recommended) plus approval to serve the
   site as an app instead of flat files. Page addresses do not change either way.

---

## 1. Prerequisites

- Node 20+ and network access.
- Cloudflare access, either:
  - `npx wrangler login` (browser sign-in), or
  - environment variables `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`
    (token needs D1 Edit and Workers Scripts Edit).

Database binding (already configured in `apps/web/wrangler.jsonc`):

| Binding | Database name  | Database ID                            |
| ------- | -------------- | -------------------------------------- |
| `DB`    | `eatos-web-db` | `fc72b629-a94c-407b-9528-ea4e8ec72425` |

---

## 2. One-command load (recommended)

From the repository root:

```bash
node scripts/load-d1-remote.mjs            # live database
node scripts/load-d1-remote.mjs --local    # local dev copy
```

The script applies all migrations, loads every seed chunk in filename order, then
prints actual vs expected row counts. It is safe to re-run: seed statements use
`INSERT OR REPLACE` / `INSERT OR IGNORE`, so rows are updated, never duplicated.

Useful flags: `--migrations-only`, `--seeds-only`.

---

## 3. Manual equivalent

Run these from `apps/web`.

### 3.1 Migrations

```bash
npx --yes wrangler@4 d1 migrations apply eatos-web-db --remote
```

Migration files, applied in this order:

| File                     | Contents                                       |
| ------------------------ | ---------------------------------------------- |
| `0001_app_tables.sql`    | Core app tables (newsletter, fraud reports)    |
| `0002_better_auth.sql`   | Better Auth tables (users, sessions, accounts)  |
| `0003_content.sql`       | Blog, news, and shop content tables            |
| `0004_posts_editor.sql`  | `content_html` and `keywords` editor columns   |

### 3.2 Seeds

Seed SQL lives in `seed/d1/`, split into small chunks so each statement stays under
the D1 statement-size limit. Load them in filename order:

```bash
for f in ../../seed/d1/*.sql; do
  npx --yes wrangler@4 d1 execute eatos-web-db --remote --file "$f" --yes
done
```

### 3.3 Verify

```bash
npx --yes wrangler@4 d1 execute eatos-web-db --remote --command "
SELECT 'posts', COUNT(*) FROM posts UNION ALL
SELECT 'news_posts', COUNT(*) FROM news_posts UNION ALL
SELECT 'shop_products', COUNT(*) FROM shop_products UNION ALL
SELECT 'shop_collections', COUNT(*) FROM shop_collections UNION ALL
SELECT 'shop_product_images', COUNT(*) FROM shop_product_images UNION ALL
SELECT 'shop_product_variants', COUNT(*) FROM shop_product_variants UNION ALL
SELECT 'shop_collection_products', COUNT(*) FROM shop_collection_products;"
```

Expected counts:

| Table                      | Rows |
| -------------------------- | ---- |
| `posts`                    | 966  |
| `news_posts`               | 97   |
| `shop_products`            | 52   |
| `shop_collections`         | 8    |
| `shop_product_images`      | 59   |
| `shop_product_variants`    | 120  |
| `shop_collection_products` | 38   |

A number below the expected value means a partial load: re-run the loader.

---

## 4. Secrets and variables

Set with `npx --yes wrangler@4 secret put NAME` from `apps/web` (never commit values).

| Name                   | Needed for                    | Status                      |
| ---------------------- | ----------------------------- | --------------------------- |
| `BETTER_AUTH_SECRET`   | Sign-in sessions              | Required                    |
| `RESEND_API_KEY`       | Order and contact emails      | Required once emails ship   |
| `STRIPE_SECRET_KEY`    | Checkout sessions             | Required once payments ship |
| `STRIPE_WEBHOOK_SECRET`| Payment confirmation webhook  | Required once payments ship |

Non-secret vars (`BETTER_AUTH_URL`, `BETTER_AUTH_TRUSTED_ORIGINS`,
`NEXT_PUBLIC_CREATE_HOST`) are already in `apps/web/wrangler.jsonc`; update them to
the production hostname at cutover.

---

## 5. Publishing change needed for the cart

The site currently publishes as flat files. A cart, checkout, and payment webhook
need server-side execution, so publishing must switch to the served Worker app
(`apps/web` via OpenNext, already configured in `apps/web/open-next.config.ts` and
`wrangler.jsonc`).

All URLs stay byte-identical, so back links, redirects, and search rankings are
unaffected. Deploy with:

```bash
cd apps/web && npx --yes wrangler@4 deploy
```

---

## 6. Remaining work, in build order

Already done and D1-backed: blog and news reads/writes, admin blog editor, shop
catalog reads, newsletter signup, fraud reporting, support assistant retrieval.

### 6.1 Shop administration
- Product and collection editor screens mirroring the blog editor pattern
  (`apps/web/src/app/admin/blog/[slug]/page.tsx`).
- API routes: `GET/POST /api/shop/products`, `PATCH/DELETE /api/shop/products/[slug]`,
  same shape for collections. Responses follow `{ data, next_cursor, has_more }`.
- Image uploads to the R2 bucket; store public URLs on `shop_product_images`.

### 6.2 Cart
- Tables: `carts` (id, token, created_at, updated_at),
  `cart_items` (cart_id, variant_id, quantity, unit_amount, currency).
- API: `POST /api/cart` (create), `GET /api/cart/[token]`,
  `POST /api/cart/[token]/items`, `PATCH`/`DELETE` per item.
- Money is always `{ amount: number, currency: string }` in minor units. No prices
  hardcoded in components.

### 6.3 Checkout and payments
- Tables: `orders` (id, order_number, email, status enum, totals, addresses,
  provider_session_id, created_at) and `order_items`.
- `POST /api/checkout` creates a provider session from a cart and returns the
  redirect URL.
- `POST /api/public/payments/webhook` verifies the provider signature, then marks
  the order paid, decrements inventory, and queues the confirmation email.
  Must be idempotent on the provider event ID.
- Provider slot: Stripe recommended. Only the session-creation and
  signature-verification helpers are provider-specific; keep them in
  `apps/web/src/lib/payments/`.

### 6.4 Order emails and lookup
- Confirmation and shipping emails via Resend, templates in
  `apps/web/src/lib/email/`.
- `/order-status` page: look up by order number plus email, no login required.
- `GET /api/orders/lookup` returns typed JSON with ISO 8601 dates and enum statuses.

### 6.5 Accounts and live status
- Wire Better Auth sign-in to the account pages; link orders to `user_id` when
  present.
- `/status` page reading a `service_status` table so incidents can be posted
  without a deploy.

### 6.6 Maya support assistant
- Currently answers from the bundled help-article index. To move to a live model,
  add a server route that calls the chosen AI provider with retrieved article
  context, log prompt hash, tokens, latency, and cost per call, and cache repeated
  questions.

---

## 7. Conventions to keep

- Typed money objects, never formatted price strings, in API responses.
- No hardcoded API/database values in components; fixtures live in mock files with
  `TODO` comments.
- Every backend action exposes a JSON-Schema tool contract so an agent can perform
  it exactly as the UI does.
- No em dashes in any copy.
- Montserrat is the site typeface.
- URLs must not change: legacy slugs and redirects are load-bearing for SEO.
