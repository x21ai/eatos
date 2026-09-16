# Phase D — AI Commerce PRD Outline

This document is the written spine for **Phase D** of eatOS native commerce. It does not prescribe implementation in the shop admin pack (Phase C); it defines the next horizon so product, engineering, and ops share one roadmap.

---

## Vision

Operators should run a restaurant-tech storefront from eatOS alone: catalog, checkout, fulfillment, and support—augmented by AI that reduces manual merchandising and ticket volume without cloning Shopify Admin or outsourcing core commerce to a third-party dashboard.

Phase D adds **intelligent automation** on top of the D1 + Worker foundation built in Phases A–C (catalog, buy path, admin ops pack).

---

## Pillar 1 — AI catalog fill

**Problem:** New SKUs, bundles, and POS hardware listings require repetitive copy, specs, SEO, and variant setup.

**Goals:**
- Draft product title, description, tags, and compare-at suggestions from a short operator brief or supplier PDF.
- Propose variant matrix (size/color/warranty) and `requires_shipping` defaults from product type.
- Generate SEO title/description and collection placement recommendations.
- Human-in-the-loop: all AI output lands as **draft**; publish requires existing `shop:publish` RBAC.

**Non-goals (Phase D):** Fully autonomous publishing, image generation at scale, or scraping competitor catalogs.

**Data / integration:**
- Reuse `products`, `product_variants`, publish queue (0011 RBAC).
- New optional `catalog_ai_jobs` table for async generation status and audit trail.
- Worker-bound LLM calls with rate limits; no PII in prompts.

**Success metrics:** Time-to-first-publish for new SKU ↓ 50%; draft rejection rate tracked.

---

## Pillar 2 — Smart support (order-aware)

**Problem:** Maya/helpdesk agents lack structured order context; customers repeat order numbers and shipping questions.

**Goals:**
- When a logged-in or verified email matches an order, surface status (`pending` → `paid` → `fulfilled`), line items, and tracking stub in the agent UI.
- Suggested replies for common intents: "Where is my order?", "Cancel before ship", "Wrong address".
- Escalation paths to human agents with `orders:read` context pre-loaded.

**Non-goals:** Autonomous refunds or chargebacks; full carrier tracking integration (Phase E).

**Data / integration:**
- Read-only joins on `orders`, `order_items`, `discount_redemptions`.
- Maya conversation metadata links `order_number` when customer provides it.
- Respect existing Maya RBAC (`maya:*`, `help:*`).

**Success metrics:** First-response resolution rate; average handle time on order tickets.

---

## Pillar 3 — Automated merchandising

**Problem:** Collections, featured products, and promo timing are manual; operators miss revenue from slow-moving inventory or seasonal bundles.

**Goals:**
- Weekly **merchandising brief**: top sellers, slow movers, suggested collection reorder (admin review page).
- Rules engine (lightweight): e.g. "If variant stock &lt; 5, mark unavailable" or "Feature top 3 paid SKUs on shop home".
- Optional tie-in to discount codes: suggest `SAVE*` codes when cart abandonment or inventory thresholds hit (analytics from Phase C admin pack).

**Non-goals:** Real-time dynamic pricing, ML-based demand forecasting, or ad network integration.

**Data / integration:**
- Aggregates from `shop-analytics` (7/30 day revenue, top products).
- `variant_stock`, `collections`, `collection_products`.
- Scheduled Worker cron (or Queues) for brief generation; notifications in admin home.

**Success metrics:** Conversion on shop home; inventory days-on-hand for flagged SKUs.

---

## Cross-cutting requirements

| Area | Requirement |
|------|-------------|
| Auth / RBAC | No changes to Better Auth core; extend capabilities only where needed (`shop:ai` TBD). |
| Audit | Log AI prompts/responses summaries (not full customer PII) for compliance review. |
| Fallback | Every AI feature must degrade gracefully when LLM or quota unavailable. |
| Testing | Contract tests for catalog job output schema; fixture-based support reply templates. |
| Deploy | Feature flags per pillar; D1 migrations `0015+` scoped per pillar. |

---

## Suggested sequencing (Phase D sub-phases)

1. **D1 — Catalog fill MVP:** Single-product draft from operator textarea → admin review.
2. **D2 — Support context:** Order lookup card in Maya agent sidebar.
3. **D3 — Merchandising brief:** Read-only weekly report + manual apply actions.
4. **D4 — Rules + promos:** Threshold rules wired to discount codes and collection order.

---

## Open questions

- Which LLM provider(s) are approved for production Workers (latency vs cost)?
- Do kiosk orders need different support templates (`source = kiosk`)?
- Should AI catalog fill ingest supplier CSV or only free-form briefs in D1?
- Legal review for AI-generated product claims (warranty, compatibility).

---

## References (current codebase)

- Shop admin pack: discount codes, fulfillment statuses, shipping config, analytics (`0014_shop_admin_pack.sql`).
- RBAC: `apps/web/src/lib/admin/permissions.ts`.
- Checkout + Stripe: `apps/web/src/lib/payments/stripe.ts`, `POST /api/checkout`.
- Maya helpdesk: migration `0012_maya_helpdesk.sql`, `/admin/maya/*`.
