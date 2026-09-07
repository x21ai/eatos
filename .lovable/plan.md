# Pre-launch fixes, round 1, with old page addresses protected

Ground rule for every step: no page address changes. Existing addresses stay exactly as they are, legacy addresses keep redirecting where they already do, and nothing is renamed or moved. Where a page is retired, its address becomes a redirect to the closest live page, never a dead end.

## Step 1: Tell search engines the real address of every page
Add a self-referencing address (canonical) to the 57 pages missing one, each pointing at its own current address, not a new one. Also add the same address as the share address so old links, tracking parameters and `.html` variants all consolidate onto the page they already rank for.

## Step 2: Fix the four pages sharing the home page text
- `/login` gets its own title and description and is kept out of search.
- `/homepage1` is closed to search (it is currently an open internal preview).
- `/home-1` and `/homepage2` are already closed; they get their own titles so nothing competes with the home page.

## Step 3: Right-size images
Serve correctly sized versions of the heavy pictures instead of full-size originals shrunk in the browser. Biggest wins: Blog post cards, Quick Service, Support, Platform, Shop, the service-style row on the home page, and the partner logo currently loaded at 1.1 MB on every page. Image file names and addresses stay the same, so nothing that links to them breaks.

## Step 4: Load below-the-fold media only when needed
Defer pictures further down each page, and stop the six videos on `/homepage1` and the demo video on the home page and Point of Sale from all downloading at once.

## Step 5: Retire the overlapping pages safely
- `/solutions` redirects to `/platform` and comes out of the site map. Its address keeps working.
- Newsroom versus Blog: you decide which is public. The other redirects, item by item, so every old article address still lands on live content.
- `/home-1` and `/homepage2` are deleted only after their addresses redirect to the home page.

## Step 6: Layout and readability
Fix the sideways scroll on Support at 430px wide, and raise the text sizes under 11px on Shop and Support.

## Step 7: Share images and alt text
Add a share picture to the 30 pages without one, and alt text to the Blog post cards, Point of Sale and other meaningful pictures.

## Step 8: Clean up
Delete the 28 unused pictures and 13 unused interface parts, and vary the repeated support paragraph that currently appears word for word on 26 pages.

## Order and checkpoints
Steps 1 and 2 first, they are the search protection. Then 3 and 4 for speed. Then 5, which is the only step that changes what a page shows, so I will confirm the Newsroom versus Blog decision with you before doing it. Then 6, 7, 8.

After each step I run the full address check: every current page still answers, every legacy address still redirects to the same place as before, and the site map matches the real page list.

## Technical notes
Per-route `alternates.canonical` and `openGraph.url` using each route's existing path; `robots: { index: false }` on the preview and login routes; sized image renditions plus `loading="lazy"`/`preload="none"`; `next.config.js` permanent redirects for retired routes, mirrored in `scripts/prepare-dist.mjs` so the static publish output keeps both clean and `.html` keys and the existing legacy alias map intact. No dependency changes, no publishing until you ask.
