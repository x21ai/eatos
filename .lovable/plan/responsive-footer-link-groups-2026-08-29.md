# Responsive footer link groups

## Problem

The footer link row uses a fixed grid (2 columns on mobile, 3 on tablet, 5 on desktop). Because there are five groups, mobile leaves a lone group in the last row and tablet leaves an empty third cell, so the block looks off-balance and pushed to the left.

## Change

Make the link row a centered, wrapping row instead of a rigid grid:

- Mobile: two groups per row, the leftover group centered rather than stuck to the left edge.
- Tablet: three groups per row with the remaining two centered under them.
- Desktop: unchanged, five even columns filling the container width.
- Each column keeps its own left-aligned heading and links; only the distribution of the group blocks changes.

No link labels, URLs, ordering, headings, or the upper footer and bottom bar change.

## Technical detail

In `apps/web/src/components/Footer.tsx` (line 345), replace the grid container on the link row with a centered flex-wrap layout:

- Container: `flex flex-wrap justify-center gap-10 py-16 items-start lg:flex-nowrap lg:justify-between lg:gap-x-12`
- Each group block: `w-[calc(50%-1.25rem)] min-w-0 md:w-[calc(33.333%-1.667rem)] lg:w-auto lg:flex-1`

This keeps desktop visually identical to the current 5-column grid while centering the wrapped rows on smaller screens. Verify at 390px, 768px, 1280px, and 1440px for even spacing and no horizontal overflow.
