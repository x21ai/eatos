# Plan: Compact the Live Demo Section

## Goal
Make the Live Demo section small enough that the tabs and the demo box are both visible in a single viewport, and eliminate any extra horizontal space on the right of the demo frame.

## Current State
- `LiveDemoSection.tsx` uses `max-w-7xl mx-auto` for the section container (1280px max).
- The iframe wrapper uses `aspect-[16/9] lg:h-[640px]`, making the demo box very tall (640px on desktop).
- At a typical viewport height of ~755px, the 640px demo box plus the tabs and title pushes the demo below the fold, so the tabs and demo cannot be seen at once.
- The container is still wider than needed, leaving visible space on the right side of the demo frame.

## Proposed Changes

### 1. Reduce the section width
- Replace the `max-w-7xl` container with a narrower max-width (e.g., `max-w-5xl` or a fixed max-width around 960px) so the demo box naturally shrinks and stays centered without extra right-side space.
- Keep the section centered with `mx-auto`.

### 2. Reduce the demo box height
- Lower the iframe height from `lg:h-[640px]` to something that fits in a single viewport, e.g., `lg:h-[480px]` or `max-h-[60vh]`.
- Keep `aspect-[16/9]` for smaller screens so the iframe remains proportional when width-constrained.

### 3. Align widths consistently
- Ensure the tabs list, chrome bar, and iframe all share the same effective width and are flush with the section boundary.
- Remove any horizontal padding that would create a gap between the section edge and the demo frame.

### 4. Preserve existing behavior
- Keep horizontal scrollable tabs on mobile.
- Keep the dark theme, chrome bar with colored dots, and the "Open" external link.
- Keep the default active tab as POS.

## Files to Update
- `apps/web/src/app/components/LiveDemoSection.tsx`

## Verification
- Build the project and confirm no errors.
- Check the preview at desktop, tablet, and mobile viewports to ensure the tabs and demo box are visible together and no extra right-side space remains.
