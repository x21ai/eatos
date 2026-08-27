# Point every "Get Started" link at /book-demo

Booking a demo is the single conversion goal, so every internal link that currently sends people to `/get-started` will send them to `/book-demo` instead.

## What changes

- All navigation and call-to-action links across the site now go to `/book-demo`:
  - Header (desktop button and mobile menu button)
  - Footer "Get Started" link
  - Home page, alternate home variants, Solutions, Platform, Products, individual product pages, Self-Service Kiosk, Customers, About, Login
- The `/get-started` page itself stays in place but redirects visitors to `/book-demo`, so old bookmarks and any external links still land on the booking page.
- `/get-started` is removed from the sitemap so search engines index only `/book-demo`.

## Technical notes

- Replace `href="/get-started"` with `href="/book-demo"` in the 14 component/page files found, plus the Header light-route list entry.
- `apps/web/src/app/get-started/page.tsx` becomes a redirect to `/book-demo` (Next.js `redirect`), keeping its route valid.
- Drop `/get-started` from `apps/web/src/app/sitemap.ts`.
- Button labels stay as they are unless you want them renamed; no copy changes, no em dashes introduced.

## Verify

- Confirm no remaining `/get-started` links in source, key routes return 200, `/get-started` redirects to `/book-demo`, and the copy guard passes.
