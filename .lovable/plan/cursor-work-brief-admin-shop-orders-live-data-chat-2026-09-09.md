# Cursor Work Brief: Admin, Shop Orders, Live Data, Chat

Goal: turn the existing handoff into a set of instructions precise enough that Cursor can finish the remaining work without guessing. This plan produces one new document, `docs/cursor-tasks-remaining.md`, written as five numbered tasks in build order, each with the files to touch, the data shape, and a check that proves it works.

## Task order for Cursor

1. **Load the real content into the live database.**
   Sign in to Cloudflare, run the existing one-command loader, confirm the printed row counts match the expected table (966 blog posts, 97 newsroom stories, 52 products, 8 collections, plus images, variants and collection links). Nothing else should be built until this passes, because every later screen reads from these tables.

2. **Sign-in gate for the admin area.**
   The site already has sign-in built (Better Auth). Add an owner-only check in front of every `/admin` page and every write request, so only approved accounts get in and everyone else is sent to the sign-in screen. Approved accounts come from a small `admin_users` table, not from a list in the code.

3. **Admin editing screens.**
   The blog editor already exists and is the pattern to copy. Add:
   - Newsroom article list plus editor (same fields as blog).
   - Shop product list plus editor: title, address slug, description, images, prices and options, stock, collection membership, publish state.
   - Collection list plus editor.
   Image uploads go to the Cloudflare file bucket; the public link is stored on the product image row.

4. **Cart, checkout and orders.**
   Cart and order tables, cart and checkout endpoints, Stripe-hosted payment page, and a payment confirmation listener that marks the order paid, reduces stock and queues the confirmation email. Orders then appear in an admin orders list with a detail view. A public order-status page looks orders up by order number plus email, no account needed. This step requires the publishing switch already described in the existing handoff.

5. **Kiosk orders.**
   The portrait kiosk animation is currently a recorded visual, not a live ordering screen. Two options for Cursor, and the brief will say to confirm which one is wanted before starting: keep the animation as marketing and build a separate real kiosk ordering screen that writes into the same orders table, or replace the animation with the live screen. Either way the kiosk writes orders through the same checkout path as the shop, with `source: "kiosk"` on the order, so they show up in the same admin list.

6. **Make Maya chat answer live.**
   Maya currently answers from the bundled help articles only. Cursor adds a server route that sends the visitor question plus the matching help articles to the chosen AI provider, streams the reply back, keeps the existing sources and "get me help" handoff, caches repeated questions, and records tokens, latency and cost per answer against the existing budget rules.

## Technical notes

- Every task in the brief lists: files to create or edit, table columns, request and response shapes, and the acceptance check.
- Response shapes stay as `{ data, next_cursor, has_more }`; money stays as `{ amount, currency }` in minor units; dates stay ISO 8601.
- Every new backend action gets a JSON-Schema tool contract so the agent can perform it exactly as the screens do.
- Addresses never change; legacy slugs and redirects stay intact.
- Secrets Cursor will need set: auth secret, Stripe secret plus webhook secret, email provider key, AI provider key.

## Assumptions to confirm

- Stripe for card payments.
- Resend for order and contact emails.
- Admin access limited to your own account at first, with room to add staff later.
