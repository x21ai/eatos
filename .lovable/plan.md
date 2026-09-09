# Move everything to Cloudflare D1 and finish the backend

The site already has a Cloudflare D1 database wired in (binding `DB`, database `eatos-web-db`) with two migrations: app tables (blog posts, media library) and the sign-in tables. Everything else on the content and commerce side still reads bundled JSON files, and there is a Supabase-shaped read layer left over from the earlier plan. That layer gets replaced with D1.

## What is done today

- D1 database bound to the site, plus migration commands for local and live.
- Sign-in system tables and configuration exist.
- All page content (966 blog articles, 97 news stories, 8 collections, 52 products, 320 support articles) ships as generated files and renders fine.
- Seed SQL for posts, news and the shop already generated.
- Book a Demo, Contact Sales, Partners and Reseller forms are live on HubSpot and stay untouched.

## What is left

1. Replace the leftover read layer with D1
   - Blog, news and shop pages read from D1 through the same helper functions, so no page layout changes.
   - Keep the bundled files as a safety net until the live data is verified, then remove them.

2. Content tables and data load
   - Tables for posts, news posts, collections, products, product images, product variants and collection links.
   - Convert the existing seed files to D1 syntax and load them, then confirm the counts.

3. Blog and news editing
   - Rebuild the existing editor so it writes to D1: create, edit, publish, unpublish, delete, image upload into Cloudflare storage.
   - Remove the hardcoded sample article currently injected into the blog list.

4. Shop admin
   - Screens to manage collections, products, variants, images, stock and prices.

5. Cart, checkout and orders
   - Cart and order tables, server-side cart changes, tax and shipping, card payment with signature-verified callbacks, confirmation email, and an order lookup page.
   - Note: the site is currently published as flat files, which cannot take a payment. Checkout needs the site served by the app. Every address stays the same.

6. Small unwired items
   - Newsletter signup and Report Fraud currently show success but send nothing.
   - Sign in and sign up pages need connecting to the real account system.
   - System status page is typed by hand and could read from a status table.
   - Maya, the support agent, answers from the imported help articles only, no AI service yet.

7. Guardrails carried through all of it
   - No address ever changes; retired pages redirect to the closest live page.
   - Prices as amount plus currency, never a formatted string; zero or empty means quote on request.
   - Every action also exposed as a tool definition so an agent can perform it, matching the UI.
   - No hardcoded content in components.

## What I need from you

- Cloudflare API token with D1 and Workers permissions, plus the account ID, so migrations and seeds can be applied to the live database from here. Without it I prepare the SQL and you run the two migrate commands yourself.
- Decision on the card processor for checkout (Stripe is the smoothest), and its keys when we reach that step.
- Decision on where the site is served from once checkout exists.
- Sender address and email service for order confirmations and the newsletter.

## Suggested order

1. D1 read layer plus content tables and seed load, verify blog, news and shop from the database.
2. Blog and news editor on D1, remove the sample article.
3. Newsletter and Report Fraud, then sign in and accounts.
4. Shop admin.
5. Cart, checkout, orders, once serving is switched.
6. Status page and Maya's AI service.

## Technical notes

- `apps/web/src/lib/supabase/*` is deleted; a new `apps/web/src/lib/db/` holds a typed query layer over the `DB` binding, resolved per request through the Cloudflare context (bindings only exist at request time).
- `lib/blog/data.ts` and `lib/shop/data.ts` stay the only files that name tables; their signatures do not change, so pages and components are untouched.
- New migrations `0003_content.sql` and later `0004_commerce.sql`; `scripts/export-supabase-seed.mjs` is reworked into a D1 seed exporter.
- `apps/web/src/app/api/blog/*` moves onto the new query layer; the D1 helper at `api/utils/sql.ts` stays.
- Secret keys read inside request handlers only, never at module scope, never in browser-reachable code.
