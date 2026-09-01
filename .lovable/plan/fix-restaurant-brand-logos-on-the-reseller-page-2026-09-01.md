# Fix restaurant brand logos on the Reseller page

## Problem

In the "Our technology cloud powers the world's best restaurant brands" marquee, each logo image is rendered with the `brightness-0 invert` filter. That filter crushes every pixel to solid white, so multi-color logos lose all inner detail and read as blobs or silhouettes. The same nine logos already render correctly elsewhere (the customer showcase marquee) with no filter, on a light background.

## Fix

In the Reseller brands section:

- Remove the `brightness-0 invert` filter so each logo shows its real artwork.
- Because several of these logos are dark artwork on a transparent background (unreadable on black), place each one in a light rounded tile: white/near-white background, subtle border, padding, fixed height with `object-contain` so nothing stretches or crops.
- Keep the existing marquee motion, duplicated track, and edge fade gradients.
- Slightly raise the logo box height and max width for legibility, keeping mobile and desktop sizes responsive.
- Keep alt text as the brand name.

No changes to the logo asset list or any other section.

## Technical detail

Single file: `apps/web/src/app/reseller/page.tsx`, the Brands section around lines 127-141. Logos come from `showcaseLogos` in `apps/web/src/components/marketing/customerShowcase.ts` and stay unchanged.
