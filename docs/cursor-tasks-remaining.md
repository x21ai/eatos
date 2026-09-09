# eatOS: Remaining Work Brief for Cursor

Read `docs/d1-and-checkout-handoff.md` first: it covers Cloudflare access, the D1
binding, migrations, seeds, secrets, and the publishing switch. This file is the task
list, in build order, with files, data shapes, and an acceptance check per task.

Conventions that apply to every task:

- Money is always `{ amount: number, currency: string }` in minor units. Never a
  formatted price string.
- List responses are `{ data, next_cursor, has_more }`. Errors are
  `{ error: true, code, message, details? }`. Dates are ISO 8601. Statuses are enums.
- No hardcoded API/database values in components. Fixtures live in mock files with
  `TODO` comments.
- Every backend action gets a JSON-Schema tool contract (name, description, when to
  call, when not to call, params, return type, error states) so an agent can perform it
  exactly as the UI does.
- URLs must not change. Legacy slugs and redirects are load-bearing for SEO.
- No em dashes in any copy. Montserrat is the site typeface.

---

## Task 1: Load content into the live D1 database

Blocking task. Every screen below reads these tables.

```bash
npx wrangler login                      # or CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID
node scripts/load-d1-remote.mjs         # applies migrations, loads all seed chunks
```

Acceptance check: the loader's printed counts equal the expected table in
`docs/d1-and-checkout-handoff.md` section 3.3 (posts 966, news_posts 97,
shop_products 52, shop_collections 8, shop_product_images 59,
shop_product_variants 120, shop_collection_products 38). Then load
`/blog`, `/newsroom` and `/shop` in production and confirm real rows render, not
bundled fallbacks. A count below expected means a partial load: re-run the loader.

---

## Task 2: Admin sign-in gate

Better Auth is already wired (`apps/web/src/lib/auth.ts`,
`apps/web/src/app/api/auth/[...all]/route.ts`,
`apps/web/src/app/account/signin/page.tsx`). Do not rewrite those files: the header
comments explain what is load-bearing for the mobile WebView.

New migration `apps/web/migrations/0005_admin.sql`:

```sql
CREATE TABLE admin_users (
  user_id     TEXT PRIMARY KEY,
  email       TEXT NOT NULL UNIQUE,
  role        TEXT NOT NULL DEFAULT 'owner',   -- owner | editor
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);
```

Add `apps/web/src/lib/admin/guard.ts`:

- `requireAdmin(request)` reads the Better Auth session, looks the user up in
  `admin_users`, and returns `{ userId, email, role }` or throws.
- Server-side guard in `apps/web/src/app/admin/layout.tsx`: no session or no
  `admin_users` row redirects to `/account/signin?callbackUrl=<path>`.
- Every write route under `/api/blog`, `/api/news`, `/api/shop`, `/api/admin` calls
  `requireAdmin` first and returns `401` (no session) or `403` (signed in, not an
  admin). Public reads stay open.
- Seed the first owner row by SQL, not from a list in code.

Acceptance check: signed out, `/admin/blog` redirects to sign-in; a signed-in
non-admin gets redirected too; a `PATCH /api/blog/<slug>` without an admin session
returns 403; the owner account reaches every admin screen and can save.

---

## Task 3: Admin editing screens

Pattern to copy: `apps/web/src/app/admin/blog/[slug]/page.tsx` plus
`apps/web/src/components/admin/RichTextEditor.tsx` and `MediaLibrary.tsx`. Blog
already works; mirror it for the rest.

### 3.1 Newsroom
- `apps/web/src/app/admin/news/page.tsx` (list, search, status filter, pagination)
- `apps/web/src/app/admin/news/[slug]/page.tsx` (editor, same fields as blog:
  title, slug, excerpt, `content_html`, cover image, status, published_at,
  seo_title, seo_description, keywords)
- API: `GET/POST /api/news`, `GET/PATCH/DELETE /api/news/[slug]`. Reuse
  `apps/web/src/lib/blog/html.ts` for HTML to block conversion and excerpts, and the
  slug-conflict handling already in the blog route.

### 3.2 Shop products
- `apps/web/src/app/admin/shop/products/page.tsx` and `[slug]/page.tsx`
- Fields: title, slug, subtitle, description HTML, status, collections, images
  (ordered), variants (name, sku, price as typed money, compare-at, inventory),
  seo fields.
- API: `GET/POST /api/shop/products`, `GET/PATCH/DELETE /api/shop/products/[slug]`;
  variant and image sub-resources under the product.

### 3.3 Collections
- `apps/web/src/app/admin/shop/collections/page.tsx` and `[slug]/page.tsx`
- Title, slug, description, hero image, ordered product membership.
- API: same shape as products.

### 3.4 Image uploads
- `POST /api/admin/uploads` accepts a file, writes to the R2 bucket under
  `shop/<product-slug>/<uuid>.<ext>`, returns `{ data: { url, width, height } }`.
- Add the R2 binding to `apps/web/wrangler.jsonc`. Store the public URL on
  `shop_product_images`. Wire `MediaLibrary.tsx` to list and pick uploaded images.

Acceptance check: create a draft product with two images and two variants, publish it,
confirm it appears at its `/shop/<slug>` address with correct prices, then edit the
title and slug and confirm the old address still resolves via redirect.

---

## Task 4: Cart, checkout, orders

Requires the publishing switch to the served Worker app (handoff section 5). Card
processor: Stripe, hosted Checkout.

New migration `apps/web/migrations/0006_commerce.sql`:

```sql
CREATE TABLE carts (
  id TEXT PRIMARY KEY, token TEXT NOT NULL UNIQUE, currency TEXT NOT NULL DEFAULT 'USD',
  created_at TEXT NOT NULL, updated_at TEXT NOT NULL
);
CREATE TABLE cart_items (
  id TEXT PRIMARY KEY, cart_id TEXT NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
  variant_id TEXT NOT NULL, quantity INTEGER NOT NULL, unit_amount INTEGER NOT NULL,
  currency TEXT NOT NULL
);
CREATE TABLE orders (
  id TEXT PRIMARY KEY, order_number TEXT NOT NULL UNIQUE, email TEXT NOT NULL,
  user_id TEXT, source TEXT NOT NULL DEFAULT 'web',      -- web | kiosk
  status TEXT NOT NULL,                                   -- pending | paid | fulfilled | cancelled | refunded
  subtotal_amount INTEGER NOT NULL, tax_amount INTEGER NOT NULL,
  shipping_amount INTEGER NOT NULL, total_amount INTEGER NOT NULL,
  currency TEXT NOT NULL, shipping_address TEXT, billing_address TEXT,
  provider TEXT, provider_session_id TEXT, provider_event_id TEXT,
  created_at TEXT NOT NULL, updated_at TEXT NOT NULL
);
CREATE TABLE order_items (
  id TEXT PRIMARY KEY, order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  variant_id TEXT NOT NULL, title TEXT NOT NULL, quantity INTEGER NOT NULL,
  unit_amount INTEGER NOT NULL, currency TEXT NOT NULL
);
```

Endpoints:
- `POST /api/cart` creates a cart, returns `{ data: { token, items: [], totals } }`.
- `GET /api/cart/[token]`, `POST /api/cart/[token]/items`,
  `PATCH`/`DELETE /api/cart/[token]/items/[id]`.
- `POST /api/checkout` takes `{ cart_token, email, shipping_address }`, re-prices
  every line from D1 (never trusts client prices), creates a `pending` order plus a
  Stripe Checkout Session, returns `{ data: { order_number, redirect_url } }`.
- `POST /api/public/payments/webhook` verifies the Stripe signature before reading
  the body, then marks the order paid, decrements variant inventory, and queues the
  confirmation email. Idempotent on `provider_event_id`: a repeat event is a no-op
  returning 200.
- `GET /api/orders/lookup?order_number=&email=` returns the typed order.

Provider-specific code stays in `apps/web/src/lib/payments/stripe.ts`
(session creation, signature verification) so another processor can drop in.

UI: cart drawer plus `/cart`, `/checkout/success`, `/checkout/cancelled`, and
`/order-status` (order number plus email, no login). Admin: `/admin/orders` list with
status filter and `/admin/orders/[order_number]` detail with a mark-fulfilled action.

Emails via Resend, templates in `apps/web/src/lib/email/` (order confirmation,
shipping). Secrets: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`.

Acceptance check: with Stripe test keys, add two variants to a cart, complete
checkout, confirm the webhook flips the order to `paid`, inventory drops, the
confirmation email sends, the order appears in `/admin/orders`, `/order-status` finds
it, and replaying the same webhook event changes nothing.

---

## Task 5: Kiosk orders

The portrait kiosk asset (`tools/kiosk-portrait/`, used via `demoSources.ts`,
`TabletMockup.tsx`, `DemoRailSection.tsx`, `ProductShowcaseSection.tsx`,
`KioskPageClient.tsx`) is a recorded marketing animation, not a live ordering screen.
Confirm with the site owner which is wanted before building:

- Option A (recommended): keep the animation on marketing pages and build a real
  kiosk ordering route at `/kiosk` that reuses the cart and checkout endpoints with
  `source: "kiosk"` on the order.
- Option B: replace the animation with the live screen everywhere it appears.

Either way the kiosk writes through the same checkout path, so kiosk orders show up in
the same `/admin/orders` list, filterable by `source`. Kiosk needs a device pairing
token (`kiosk_devices` table: id, label, token, location, created_at) instead of a
customer email, and email on the order becomes optional for `source = 'kiosk'`.

Acceptance check: an order placed from the kiosk route appears in `/admin/orders` with
`source: "kiosk"`, correct totals, and a printable receipt view.

---

## Task 6: Make Maya answer live

Today `AgentAssistant.tsx` plus `knowledge.ts` answer only from the bundled
help-article index (320 articles). Keep that retrieval; add a model on top.

- New route `apps/web/src/app/api/support/chat/route.ts`. It retrieves the top
  matching help articles, sends question plus article context plus the prior turns of
  the conversation to the AI provider, and streams the reply back.
- Keep the existing sources list, related guides, and the "No, get me help" handoff.
- Ground every answer: the model answers only from the supplied articles and says it
  does not know otherwise. Do not render a factual claim with no supporting article.
- Cost controls: cache repeated questions by normalized question hash with a TTL, cap
  output tokens, and use the cheapest capable model by default.
- Log per call: prompt hash, model, input/output tokens, latency, cost, retrieved
  article ids, cache hit or miss, and a trace id shared with the client message.
- Graceful fallback: on provider error, timeout, or rate limit, fall back to the
  current article-only answer plus the human handoff. Never show a raw error or JSON.
- Secret: the chosen provider key, server-side only, never exposed to the browser.

Acceptance check: ask a printer-setup question and a deliberately off-topic question.
The first streams a grounded answer with sources; the second declines and offers the
handoff. Force a provider failure and confirm the article-only fallback renders.

---

## Build order summary

1. Load live D1 content (blocking).
2. Admin sign-in gate.
3. Newsroom, product and collection editors plus uploads.
4. Cart, checkout, Stripe, orders, emails, order lookup, admin orders.
5. Kiosk ordering into the same orders table.
6. Live Maya answers with grounding, caching and cost logging.

Assumptions to confirm with the site owner: Stripe for cards, Resend for email, admin
access limited to the owner account at first with staff added later, and Option A for
the kiosk.
