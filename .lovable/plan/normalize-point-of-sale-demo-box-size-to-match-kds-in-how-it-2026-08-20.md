# Normalize Point of Sale demo box size to match KDS in "How it Works"

## Goal
Make the Point of Sale demo container in the home page "How it Works" section the same size as the Kitchen Display System demo container.

## Current state
- The "How it Works" section is rendered by `DemoRailSection.tsx`.
- Kitchen Display System (KDS) uses a live iframe with `aspect-[16/10] lg:aspect-auto lg:h-[480px]` and fills the right-hand content area without extra padding.
- Point of Sale (POS) uses a custom `TabletMockup` video inside a padded, centered flex container (`px-4 py-6 sm:px-8 sm:py-8 lg:min-h-[480px]`), which makes the visible box appear smaller and differently proportioned than KDS.

## Plan
1. Update the POS media branch in `DemoRailSection.tsx` so its outer container matches the KDS iframe container:
   - Use `relative w-full aspect-[16/10] lg:aspect-auto lg:h-[480px]` instead of the padded flex wrapper.
   - Keep the video content absolutely positioned to fill the container.
2. Adjust the `TabletMockup` component so it can fit inside the new container without overflowing or adding extra outer padding. Scale the mockup frame to fill the available space and remove the fixed `max-w-[820px]` constraint when used in this context, or make it responsive so it fits the container.
3. Keep the caption but position it consistently (for example, below the box like KDS has no caption, or overlay it unobtrusively). The default will keep the caption below the box, sized like the existing one.
4. Verify the change visually across desktop, tablet, and mobile viewports to ensure POS and KDS containers now match in size.

## Files to change
- `apps/web/src/app/components/DemoRailSection.tsx`
- Possibly `apps/web/src/app/components/TabletMockup.tsx` (if the mockup needs a prop to control max-width / fit behavior)

## Outcome
POS and KDS demo boxes in the "How it Works" section will share the same container dimensions and overall layout.