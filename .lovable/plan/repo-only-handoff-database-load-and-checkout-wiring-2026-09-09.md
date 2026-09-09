# Repo-Only Handoff: Database Load and Checkout Wiring

Yes. Everything can stay in the repo as ready-to-run files and instructions, so Cursor (or any developer with your Cloudflare login) can load the database and finish payments without me needing account access.

## What I will put in the repo

1. A single handoff guide at `docs/d1-and-checkout-handoff.md` covering:
   - The exact commands to apply the four database migrations to the live database.
   - The exact commands to load the content seed files (966 blog posts, 97 news stories, 52 products, 8 collections, images, variants, links).
   - How to verify counts after loading, with expected numbers.
   - Which secrets to add and where.

2. One helper script, `scripts/load-d1-remote.mjs`, that applies migrations and then all seed chunks in order against the live database, with progress output and safe re-runs (already-loaded rows are skipped, not duplicated).

3. A short section explaining the publishing change: a cart and card payments need a served app rather than flat files. All page addresses stay identical, so links and search rankings are unaffected.

## Payments decision left open in the repo

I will write the checkout work as a documented to-do list rather than half-built code, so whoever picks it up is not undoing guesses:
- Cart and order tables, plus the order lookup page.
- Checkout session creation, payment confirmation handling, order emails.
- The payment provider slot, with Stripe as the recommended default.

If you tell me the processor now, I will build that part directly instead of leaving it as a to-do.

## What still needs a human, and why

- Loading content into the live database: needs a Cloudflare login (browser sign-in or an API token). The commands are in the repo; only the login is missing.
- Choosing the card processor: a business decision, not a code one.
- Switching publishing from flat files to a served app: your approval.

## Technical notes

- Migrations: `apps/web/migrations/0001_app_tables.sql` through `0004_posts_editor.sql`.
- Seeds: `seed/d1/*.sql`, chunked to stay under database statement-size limits; load in filename order.
- Binding: `DB` to `eatos-web-db`, defined in `apps/web/wrangler.jsonc`.
- Remote load uses `wrangler d1 migrations apply` and `wrangler d1 execute --remote --file`.
- Verification queries return row counts per table so a partial load is obvious.
