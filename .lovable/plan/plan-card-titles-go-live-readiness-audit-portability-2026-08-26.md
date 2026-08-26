# Plan: Card Titles, Go-Live Readiness Audit, Portability

## 1. Change the two hardware card titles

On the home page product cards, drop the "eatOS" prefix:

- "eatOS Point of Sale" becomes "Point of Sale"
- "eatOS Point of Purchase" becomes "Point of Purchase"

Both are in the same section of `apps/web/src/app/page.tsx` (lines 502-503 and 530-531). The `<strong>` wrapper goes away with the removed word, so the heading keeps its existing size, weight and tracking. The same pair of cards also appears on the alternate home variants (`home-1`, `homepage2/sections/HardwareSection.tsx`); I will apply the same wording there so nothing drifts if those variants are ever used.

## 2. Go-live readiness pass

Fonts and type are already standardized on Montserrat sitewide, and the em-dash build guard (`scripts/check-copy.mjs`) is wired into `build` and `build:dev`, so copy is enforced at build time. What still needs attention before go live:

- **Duplicate/draft home variants**: `/home-1` and `/homepage2` are development variants of the home page. They are publicly reachable and are duplicate content risk for SEO. Recommendation: remove them or block them from indexing.
- **Placeholder hardware pages**: `/hardware/pro` and `/hardware/mini` contain hardcoded prices ("Buy Now $299") and generic device graphics rather than real product content. Recommendation: either finish them with real content and API-driven pricing or remove them from the route tree.
- **Hardcoded prices**: the "From $99" / "From $49" chips on the home cards and the hardware sub-pages carry `TODO: fetch from pricing API` comments. Recommendation: keep the numbers as-is for launch if they are correct, and drop the stale TODO comments, or wire them to a single pricing source so one edit updates every surface.
- **Placeholder blog imagery**: several blog posts use `blog-placeholder-*` images. Recommendation: swap in real imagery for any post that will be live at launch.
- **Dev-only routes**: `/account/social-dev-shim` and the `/admin/*` and `/api/admin/*` surfaces should be confirmed as either protected or excluded from the production build.
- **Metadata sweep**: confirm every content route has a unique title, description and social tags, and that the sitemap lists exactly the routes you intend to be indexed.
- **Responsive sweep**: re-run the overflow scan at 360, 390, 768, 1024, 1280, 1440 and 1920 across all routes and fix anything that overflows, with before/after screenshots at the failing widths.

I will report findings with a short pass/fail list per item and fix everything in the same pass except the judgement calls above (removing the home variants, removing or completing the hardware sub-pages), which I will confirm with you first.

## 3. Taking this to Cursor, Cloudflare and your own database

Yes. Nothing in the app is locked to this environment:

- It is a standard Yarn monorepo (`apps/web` Next.js, `apps/mobile` Expo) that opens in Cursor and runs with `yarn dev` once you clone the branch.
- The web app is already configured for Cloudflare: `apps/web/wrangler.jsonc` targets Cloudflare Workers via OpenNext, with a D1 database binding and an R2 bucket for the incremental cache. You deploy with Wrangler using your own Cloudflare account.
- The database is already your own: it is Cloudflare D1, with SQL migrations checked into `apps/web/migrations/`. No Lovable-managed database is in use. You point `database_id` at your own D1 instance and run the migrations.
- Things you supply on your side: the Cloudflare account and D1/R2 resources, the auth environment variables in `wrangler.jsonc` (`BETTER_AUTH_URL` and trusted origins) pointed at your domain, and your DNS.
- One dependency to note: images are served through hosted asset pointers (`*.asset.json` files referencing a CDN URL) plus some ucarecdn URLs. Those keep working from anywhere, but if you want complete independence I can migrate them into your own R2 bucket as a follow-up.

## Technical notes

- No database changes, no new dependencies, no visual redesign of working pages.
- The responsive scan is a dev-only Playwright script under `scripts/`, not shipped in the build.
