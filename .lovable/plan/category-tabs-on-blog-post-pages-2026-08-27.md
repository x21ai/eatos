# Category tabs on blog post pages

Add the same category filter row from the blog index to the top of every blog post page. Clicking a category takes the user to the blog listing filtered to that category.

## What the user sees

- On a post page, just under the header, a row of category chips: All Posts, Point of Sale, Workforce Management, Inventory Management, Tableside Ordering, with a "More" dropdown when the list overflows, matching the index styling.
- The chip matching the current post's category appears highlighted.
- Clicking a chip navigates to the blog listing already filtered to that category, for example /blog?category=Workforce%20Management.
- On mobile the row scrolls horizontally with the scrollbar hidden, same as the index.

## Technical notes

1. Extract the existing `CategoryFilter` from `apps/web/src/app/blog/BlogIndexClient.tsx` into a shared client component `apps/web/src/app/blog/CategoryFilter.tsx`, unchanged in markup and styles, with an added optional link mode (renders anchors to `/blog?category=...` instead of buttons). Index keeps using the button/callback mode.
2. Render it in `apps/web/src/app/blog/[slug]/BlogPostClient.tsx` in link mode, above the article header, with `active` set to the current post's category, using the `available` categories computed from `posts` the same way the index does.
3. In `BlogIndexClient`, initialise `active` from the `category` query param (validated against the available list, fallback to All Posts) and keep chip selection updating both state and the URL so the filter is shareable and back/forward works.
4. No content or data changes; no em dashes in any new copy.
