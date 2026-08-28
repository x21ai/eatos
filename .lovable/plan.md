# Fix "page does not exist" on every header and footer link

## What is happening

Right now only the home page `/` renders. Every other page returns a 404 and shows the site's "not found" screen, even though the page files all exist in the project and the link targets are correct. Requests like `/pricing`, `/blog`, `/support`, `/ai`, `/news`, `/partners` all come back 404 from the app server itself, not from the preview proxy.

Two things confirm the page files are fine:
- The route folders exist (`src/app/pricing`, `src/app/blog`, `src/app/support`, etc.) and each has a valid `page.tsx`.
- The dev server compiled those routes on request (they appear in the build's route list) and still answered 404, while redirect rules (for example `/products/point-of-sale` to `/pointofsale`) work correctly.

That pattern points at the dev server's route-matching cache being stale after the large route renames done for live URL parity (many folders were moved and renamed), rather than at broken links or missing pages. Exact cause is not yet proven, so verifying it is the first step of the work.

## Plan

1. Stop the app server, delete its build cache for the web app, and start it clean. Then request a spread of pages (`/pricing`, `/blog`, `/support`, `/ai`, `/news`, `/pointofsale`, `/products/kitchen-display-system`, `/quick-service`) and confirm they return 200.
2. If pages still 404 after a clean start, investigate route matching directly:
   - check for conflicting or stray route entries inside `src/app` (including the two URL-encoded helper folders) that can break the app router's path table,
   - confirm the root layout and `not-found.tsx` are not intercepting matches,
   - confirm the server is reading `apps/web` as its app root and not a second location.
   Fix whichever of those turns out to be the real cause.
3. Crawl every link in `Header.tsx` and `Footer.tsx` and check each destination's status code, so nothing that shows in navigation lands on a 404 or an unintended redirect chain.
4. Report any header or footer link whose target page genuinely does not exist yet, so you can decide whether to add the page or point the link elsewhere. No new pages will be created without your go-ahead.

## Technical notes

- No page content, design, or copy changes are part of this work.
- Expected touch points: the app's build cache, and only if step 2 finds a real code cause, the specific offending file in `src/app` or `next.config.js`. Redirect rules stay as they are unless a broken pair shows up in the crawl.
- Verification is by HTTP status codes plus a browser pass on a few pages to confirm they render without console errors.
