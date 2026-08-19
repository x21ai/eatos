# Full Service page: mobile responsiveness pass (mirroring Quick Service)

Apply the same mobile-only refinements already shipped on the Quick Service page to `/solutions/full-service`, leaving tablet and desktop untouched.

## Changes

1. Hero
   - Title scales down on small screens (keeps two lines, no clipping).
   - Description drops from 18px to 16px on mobile.
2. Numbers / highlights strip
   - Center-aligned cards on mobile, matching Quick Service.
3. Feature rows
   - Section titles reduced on mobile so each stays on one line, with the same step-up scale at sm / md / lg.
   - Body and supporting copy unified to the site's mobile type scale.
4. "Why eatOS for full service?" heading
   - Mobile-only line break so "full service?" moves to the second line.
5. Hardware bundle block
   - Mobile-only line break in the title.
   - Description reduced on mobile so the pricing line stays on one line.
6. Closing CTA
   - Description font reduced on mobile to cut it from four lines to three.
7. Any remaining mobile overflow (icon tiles, grids, breadcrumb) gets `min-w-0` / `shrink-0` guards so nothing clips at 394px.

## Technical notes
- All edits in `apps/web/src/app/solutions/full-service/FullServiceClient.tsx`, plus copy tweaks in `content.ts` only if a line-wrap needs it.
- Mobile-only behaviour via `md:hidden` breaks and base-vs-`md:` font classes, so desktop and tablet render exactly as today.
- Verified with screenshots at 394px, 820px and 1280px.
