# Plan: Fit the Live Demo Iframe to Its Section Horizontally

## Goal
Eliminate the remaining empty horizontal space to the right of the demo iframe so the iframe/frame and its section share the exact same width.

## Current State
- `apps/web/src/app/components/LiveDemoSection.tsx` constrains the section to `max-w-4xl mx-auto` (896px).
- The chrome bar + iframe wrapper inside it uses `w-full`.
- The iframe wrapper applies both `aspect-[16/9]` and `lg:h-[460px]`, which creates a conflict:
  - At `lg`, the height is forced to 460px while the container remains 896px wide.
  - A 16:9 frame at 460px height should be ~818px wide, so the iframe content is stretched across 896px, leaving visible dead space on the right side of the demo frame.

## Proposed Changes
1. Remove the conflicting `aspect-[16/9]` at desktop (`lg`) and replace it with a width that matches the 16:9 ratio of the fixed height.
2. Set the iframe container width to exactly `460px × 16/9` at desktop so it is a true 16:9 frame with no extra horizontal space.
3. Center the iframe frame within the section using `mx-auto`.
4. Keep responsive behavior for smaller screens: use `aspect-[16/9]` on mobile/tablet so the frame scales with the full width.
5. Ensure the outer section/container width equals the iframe frame width (adjust `max-w-4xl` or remove the max-width wrapper at desktop if needed) so the section boundary and frame boundary align.

## Expected Outcome
The demo frame and its containing section will have identical horizontal boundaries, removing the empty space highlighted in the screenshot. The POS/demo content will render at its intended 16:9 aspect ratio without horizontal stretching or dead space.

## Files to Update
- `apps/web/src/app/components/LiveDemoSection.tsx`
