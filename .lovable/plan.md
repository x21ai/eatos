# Fix video cropping and oversized expanded player on /homepage1

## Problem
The showcase grid tiles and the expanded player both scale video to fill a fixed 16:10 / 16:9 frame, so edges of each clip are cut off. The expanded player is also taller than the viewport, so the full box is not visible on screen.

## Changes

1. Grid tiles (ProductShowcaseSection)
   - Show the whole frame instead of cropping: switch tile video from cover-fill to contain-fit, on a black tile background so letterboxing looks intentional.
   - Keep the existing tile aspect ratio and hover title overlay unchanged.

2. Expanded player
   - Fit the video inside the frame (contain) so nothing is cropped.
   - Constrain the player so the whole box fits on screen: cap its height relative to viewport height (roughly 62-68vh, smaller on mobile) and center it, letting width follow, instead of a fixed 16:9 block plus text row overflowing.
   - Keep the close button, title, caption, and Learn more row inside the visible area.

3. Scope
   - Only presentation changes in the shared showcase component. Since /homepage1 passes its own media overrides but shares this component, the fit change applies wherever the component renders; if you want it limited strictly to /homepage1, the same behavior can be gated behind an optional prop set only by that page.

## Technical notes
- File: apps/web/src/app/components/ProductShowcaseSection.tsx
- Replace `object-cover` with `object-contain` on both the tile and expanded `<video>`.
- Expanded frame: replace `aspect-[16/10] sm:aspect-[16/9]` with a max-height clamp (e.g. `h-[52vh] sm:h-[60vh] lg:h-[64vh]`) and center the video inside.
- Also fix the current runtime errors in this section (undefined media `poster` access and the missing `homepage1ShowcaseMedia` reference) so the grid renders cleanly.
