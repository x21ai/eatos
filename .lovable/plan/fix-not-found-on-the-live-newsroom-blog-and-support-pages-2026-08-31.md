# Fix "Not Found" on the live Newsroom, Blog and Support pages

## What I confirmed

The Newsroom link in the footer points to `/news`, which is correct. The problem is not the link.

Checked just now:

- On the preview app, `/news`, `/blog` and `/support` all return 200 and render fine.
- On the live site (eatos.lovable.app), `/news`, `/blog` and `/support` all return a plain-text `Not Found`, while `/`, `/pricing`, `/platform`, `/shop`, `/media-kit`, `/resources`, `/system-status` and `/customers` all return 200.

The plain-text `Not Found` is the hosting layer answering, not the site's own styled 404 page, so those three routes are missing from the deployed build rather than broken in code.

The three failing routes are exactly the three built from large imported content bundles:

- `/blog` with 5.4 MB of generated posts
- `/support` with 1.4 MB of generated articles and categories
- `/news` with 605 KB of generated stories

Every other page is small and every other page works. That correlation is strong, but the exact build failure is not yet proven, so confirming it is step 1.

## Plan

1. Inspect the production build output for these routes: run the same build the publisher runs and check whether `/news`, `/blog`, `/support` and their detail routes appear in the emitted route manifest, and whether the build logs a size, memory or prerender error for them. This tells us definitively why they are absent.
2. Fix the cause found in step 1. The most likely fix, if it is bundle size: stop importing the big generated JSON files into the page modules directly and instead read them through a small server-side data layer so each route ships only the records it needs (index pages get titles, excerpts, dates and images; detail pages get one record). Detail routes keep their existing URLs and metadata.
3. If the cause is prerender volume instead (hundreds of blog, news and support detail pages generated at build time), reduce build-time generation to a recent subset and let the rest render on demand, keeping every URL live and indexable.
4. Re-verify on the deployed site: `/news`, `/blog`, `/support`, one `/news/<slug>`, one `/blog/<slug>`, one `/support/article/<slug>`, plus the `/newsroom` and `/blogs` aliases, and confirm the pages render with no console errors.

## Notes

- No design, copy or content changes. URLs, redirects, sitemap entries and metadata stay exactly as they are.
- Expected touch points: how the news, blog and support routes load their generated data, and their static-params settings. No footer change is needed.
- The fix only becomes visible on the live site after publishing, so a publish is part of the verification.
