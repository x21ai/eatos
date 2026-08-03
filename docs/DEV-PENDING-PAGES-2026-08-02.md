# eatOS 2.0 — Pending / Broken Pages (Developer Backlog)

**Date:** 2026-08-02  ·  **Live target:** https://s.eatos.dev  ·  **Author:** infra audit (Cursor agent)
**Audience:** development team  ·  **Scope of this doc:** findings + acceptance criteria only. **No code fixes were applied in this pass.**

---

## 1. Executive summary

The prior sweep [`docs/PAGE-AUDIT-2026-08-02.md`](PAGE-AUDIT-2026-08-02.md) marked **55/55 public URLs "OK"**, but it only checked **HTTP status + visible-text length**. Every route returns HTTP `200`, so nothing tripped that classifier.

A follow-up check that actually reads the rendered `<h1>` in a real browser found **soft-404s**: pages return `200` but render a **"… not found"** state instead of their content. These are user-visible dead ends, not real 404s.

**Confirmed broken (live, in-browser):**

| Route family | URLs | Rendered state | Data exists? |
|---|---|---|---|
| `/products/{slug}` | 14 | `Product not found` | Yes — [`products.ts`](../apps/web/src/app/products/products.ts) |
| `/careers/{role}` | 4 | `Role not found` | Yes — [`careers/[role]/page.tsx`](../apps/web/src/app/careers/[role]/page.tsx) |
| `/blog/{slug}` | 1 (+ any future post) | `Article not found` | Yes — live `/api/blog` returns the post |

**Single root cause (all three):** Next.js 15/16 makes route `params` a **Promise**. All three detail pages are `'use client'` and read `params.slug` / `params.role` **synchronously**, so the lookup key is `undefined`, the "not found" branch renders, and it does so even for valid slugs. This is one bug class, ~3 small edits.

**Not a data or DB problem.** `/api/blog` returns the published post correctly and D1 is healthy; the fault is purely how the pages read `params`.

**Recommended fix order:** (1) unblock the three dynamic route families (P0, one shared fix pattern), (2) decide/finish intentionally-incomplete surfaces (P1), (3) resolve `/homepage2` and count bug (P2).

---

## 2. P0 — Broken routes (must fix)

All P0 items are the **same async-`params` defect**. Fixing the pattern in each file fixes every URL in that family. Verification was done in-browser (not curl), because these are client-rendered.

### 2.1 Product detail — `/products/{slug}`
- **File:** [`apps/web/src/app/products/[slug]/page.tsx`](../apps/web/src/app/products/[slug]/page.tsx) (~line 140: `const product = getProductBySlug(params.slug)`)
- **Live H1:** `Product not found` (verified on `/products/kitchen-display-system`)
- **Data source:** [`apps/web/src/app/products/products.ts`](../apps/web/src/app/products/products.ts) — `getProductBySlug()`

| # | URL | comingSoon? |
|---|---|---|
| 1 | `/products/kitchen-display-system` | no |
| 2 | `/products/self-service-kiosk` | no |
| 3 | `/products/point-of-purchase` | no |
| 4 | `/products/customer-facing-display` | no |
| 5 | `/products/reporting-analytics` | no |
| 6 | `/products/workforce-management` | no |
| 7 | `/products/tableside-order-and-pay` | no |
| 8 | `/products/apponlineorderingdelivery` | no |
| 9 | `/products/automated-marketing` | no |
| 10 | `/products/ai-enabled-ordering-automation` | no |
| 11 | `/products/simplified-inventory-management` | no |
| 12 | `/products/giftcards` | no |
| 13 | `/products/loyalty` | no |
| 14 | `/products/autonomous-delivery` | **yes** (`comingSoon: true` → should render the coming-soon state, see P1) |

> Note: `point-of-sale`, `payments`, and `hardware` exist in `products.ts` but link to their own top-level routes (`/point-of-sale`, `/accept-payments`, `/hardware`), so they are **not** part of the `/products/{slug}` family.

**Acceptance criteria (product):**
- `/products/kitchen-display-system` renders the product **title, tagline, description, and feature list** from `products.ts` — never "Product not found".
- All 13 non-coming-soon slugs above render their real content.
- An unknown slug (e.g. `/products/does-not-exist`) still shows the not-found state (real 404 behavior preserved) and ideally returns HTTP `404`.

### 2.2 Careers role — `/careers/{role}`
- **File:** [`apps/web/src/app/careers/[role]/page.tsx`](../apps/web/src/app/careers/[role]/page.tsx) (~line 88: `const roleKey = params?.role`)
- **Live H1:** `Role not found` (verified on `/careers/product-engineer`, a **valid** key — confirms it's the params bug, not a bad slug)
- **Data source:** `ROLES` map in the same file

| # | URL | Title |
|---|---|---|
| 1 | `/careers/product-engineer` | Product Engineer |
| 2 | `/careers/backend-platform-engineer` | Backend / Platform Engineer |
| 3 | `/careers/product-designer` | Product Designer |
| 4 | `/careers/implementation-specialist` | Implementation Specialist |

**Acceptance criteria (careers):**
- Each of the 4 role URLs renders its **title, team, location, type, intro, "What you'll do", "What we're looking for"** from `ROLES` — never "Role not found".
- An unknown role key still shows the not-found state.

### 2.3 Blog post — `/blog/{slug}`
- **File:** [`apps/web/src/app/blog/[slug]/page.tsx`](../apps/web/src/app/blog/[slug]/page.tsx) (line 21: `const { slug } = params`)
- **Live H1:** none; page renders `Article not found` (verified on the one published post)
- **Data source:** live API `/api/blog/{slug}` (D1). `/api/blog` list confirms the post exists.
- **Why it breaks:** `slug` is `undefined` → the page fetches `/api/blog/undefined` → API 404 → "Article not found". The **backend/DB is fine**; only the client `params` read is wrong.

| # | URL |
|---|---|
| 1 | `/blog/never-miss-a-beat-how-offline-resilience-keeps-your-sales-rolling` |

**Acceptance criteria (blog):**
- The published post URL renders the article **title, author, date, cover image, and body** — never "Article not found".
- Any future post published via the admin/API is reachable at `/blog/{its-slug}` with no code change.

---

## 3. P1 — Intentional / incomplete (product decision, not a bug)

These are not defects but are incomplete surfaces the team should consciously finish or keep as-is.

- **Autonomous Delivery — coming soon.** `autonomous-delivery` has `comingSoon: true` in [`products.ts`](../apps/web/src/app/products/products.ts). Once the P0 params fix lands, this page should render the **coming-soon** treatment, not real feature content. Decide the intended coming-soon UI and confirm it displays.
- **AI page "COMING SOON" block.** `/ai` markets an AI capability with a `COMING SOON` section. Intentional marketing; listed so it isn't mistaken for the P0 bug.
- **Blog has only one published post.** Live `/api/blog` returns a single `published` post. `/blog` (index) works, but content is thin. Decide whether more posts are needed before launch, or whether the blog is gated for now.
- **Blog list count bug (minor).** `/api/blog?limit=5` returns the post but reports `pagination.total: 0` / `totalPages: 0`. The `COUNT` query underreports; pagination UI will be wrong once more posts exist. Low priority but worth fixing with the blog work. Source: [`apps/web/src/app/api/blog/route.ts`](../apps/web/src/app/api/blog/route.ts).

---

## 4. P2 — Cleanup / product decisions

- **`/homepage2` is publicly reachable.** A full alternate homepage (~7.6k chars) is live at [`/homepage2`](https://s.eatos.dev/homepage2). Decide one of: (a) gate it behind auth/preview, (b) redirect it to `/`, or (c) promote it and remove the old homepage. As-is it's a duplicate public entry point. Source: [`apps/web/src/app/homepage2/page.tsx`](../apps/web/src/app/homepage2/page.tsx).
- **Sitemap / nav hygiene.** After the P0 fix, confirm product/careers/blog detail URLs are the ones linked from nav and any sitemap, and that `/homepage2` is not indexable if it stays.

---

## 5. Suggested engineering fix sketch (not implemented here)

**Async `params` (the P0 fix).** In Next.js 15/16, `params` is a Promise. Two supported patterns:

- **Client components** (`'use client'`, all three P0 files): unwrap with React's `use()`:

```tsx
'use client';
import { use } from 'react';

export default function ProductDetailPage({ params }) {
  const { slug } = use(params);       // was: params.slug
  const product = getProductBySlug(slug);
  // ...
}
```

- **Server components** (if any are converted): make the component `async` and `await params`:

```tsx
export default async function Page({ params }) {
  const { slug } = await params;
  // ...
}
```

Apply the same `use(params)` change in `products/[slug]/page.tsx`, `careers/[role]/page.tsx`, and `blog/[slug]/page.tsx`. Verify each family in a browser (client-rendered — curl/SSR-only checks will not catch a regression).

**Harden the page audit.** The prior audit missed these because it only checked HTTP status + text length. Add a **soft-404 scan** that, in a real browser, flags any page whose `<h1>`/body contains `Product not found`, `Role not found`, `Article not found`, `Post not found`, or similar. Run it against every dynamic route with a **known-valid** slug/role.

**Optional:** consider `generateStaticParams` for products/careers (finite, known sets) so these render as static pages and fail loudly at build if a slug lookup breaks.

---

## 6. Out of scope for this report

- Implementing the fixes above or redeploying (a separate wave after the team reviews this).
- Marketing copy rewrites beyond noting the coming-soon / thin-content gaps.
- Authenticated admin content (`/login`, `/account/*`, `/admin/*`) — these are client shells that load data post-auth and are not part of the public content audit.
- Committing / pushing (repo has no remote; no commit was requested).
