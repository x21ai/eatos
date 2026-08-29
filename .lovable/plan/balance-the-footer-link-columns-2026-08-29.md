# Balance the footer link columns

## Problem

The footer link row is a 6-column grid on desktop but only 5 groups exist (Products, Grow, Concepts, Company, Resources), so the last column is empty and all the links sit crammed to the left with a large gap on the right.

## Change

In the footer link row:

- Use a 5-column desktop grid instead of 6, so the five groups spread evenly across the full container width.
- Keep the existing mobile (2-col) and tablet (3-col) behavior unchanged.
- Slightly widen the column gap so the wider spread stays readable, and keep each column's text left-aligned within itself (only the group block distribution changes, not the text alignment).

No link labels, URLs, ordering, headings, or the upper footer/bottom bar change.

## Technical detail

`apps/web/src/components/Footer.tsx` line 345: change `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 py-16 items-start` to a 5-column desktop track (`lg:grid-cols-5`) with a slightly larger `lg` gap. Verify at 1280px and 1440px that the five columns fill the container with no leftover right-hand space and no horizontal overflow.
