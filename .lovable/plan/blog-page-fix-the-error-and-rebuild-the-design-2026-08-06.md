# Blog page: fix the error and rebuild the design

## Why it fails today
`/blog` fetches `/api/blog`, which queries a Cloudflare D1 database. That binding does not exist in the preview and the published site is a static export, so the request returns 500 and the page shows "Unable to load stories at this time." Confirmed by calling the endpoint directly (HTTP 500, `Failed to fetch blog posts`).

## Approach
Move the blog off the database and onto a static content module, the same pattern already used for `/brochures`, `/partners`, `/privacy` and `/terms`. This makes the index and every post page render reliably in preview and in the static build.

## What gets built

**1. Content source** — `apps/web/src/app/blog/content.ts`
- One entry per post from the attached screenshot: title, slug, category, date, excerpt, body, cover image.
- Posts included: Never Miss a Beat (Offline Resilience), Empower Your Restaurant Team with Simplified Workforce Management, 10 Tips to Enhance Your Restaurant Analytics and Reporting System, How Tableside Ordering and Payment Enhances Restaurant Experience, The Complete Guide to Restaurant Inventory Management, How Much Does It Cost to Implement a Point of Sale System, 6 Must-Have Features in the Best Fast Casual POS, 8 Online Ordering and Delivery Challenges Restaurants Face.
- Placeholder image plates for now; real covers can be swapped in later.

**2. New blog index design** — editorial layout, distinct from the legacy page
- Dark hero band: "Newsroom" eyebrow, oversized headline, short intro, no stock banner.
- Featured post: large media plate with title, category, date and excerpt.
- Category filter row (All Posts, Point of Sale, Workforce, Inventory, Online Ordering, Self Service Kiosk) filtering client-side.
- Clean three-up card grid for the rest, uniform aspect-ratio plates, type-led hover.
- "Load more" instead of numbered pagination.
- Newsletter band reusing the existing `NewsletterSection` styling.
- Responsive across mobile, tablet and desktop.

**3. Post detail page** — `/blog/[slug]`
- Reads from the same content module via `generateStaticParams`, so posts prerender into `dist/`.
- Article layout: category + date, title, cover plate, readable prose column, related-posts row, CTA.

**4. Cleanup**
- `/blog` and `/blog/[slug]` no longer call `/api/blog`; the API routes stay in place for the admin tooling.
- Header stays white-on-dark for `/blog` given the new dark hero.

## Technical notes
- Index becomes a client component over static data (no fetch, no loading or error states).
- Existing `Placeholder` marketing component handles image plates and padding.
- Verified after build on mobile, tablet and desktop viewports.