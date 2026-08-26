# Fit the bundle line on one row on mobile (all solution pages)

The bundle sub-line "$0 hardware upfront cost with Pay As You Go." currently wraps or is force-broken on mobile. Make it sit on a single line on small screens across every solution page.

## Changes

For each of the nine solution page clients (bar, cafe, catering, enterprise, fast-casual, food-truck, full-service, ghost-kitchen, quick-service):

1. Set the bundle description paragraph to a smaller mobile size, stepping back up on larger screens: `text-[13px] sm:text-lg`.
2. Remove the mobile-only forced line break (`<br className="sm:hidden" />` / `md:hidden`) inside that paragraph where it exists, so the copy is one continuous line.
3. Keep desktop and tablet appearance unchanged (`sm:text-lg` and above stays as today).

## Notes

- Text content, headings, CTAs, spacing, and section structure stay exactly as they are.
- Verification: check the paragraph renders on one line at 360px and 394px widths, and that desktop is visually unchanged at 1280px.
