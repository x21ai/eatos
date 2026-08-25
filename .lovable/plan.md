# Fix "How it Works" rail tabs overflow on mobile

## Problem
In `apps/web/src/app/components/DemoRailSection.tsx` the product rail (Point of Sale, Kitchen Display System, Self Service Kiosk, Customer Facing Display buttons) renders as a horizontal-scroll row with `min-w-[190px]` buttons on mobile, so the buttons extend past the layout and feel broken. Desktop and tablet (the `lg:` vertical rail) are fine.

## Changes (mobile only, desktop/tablet untouched)
File: `apps/web/src/app/components/DemoRailSection.tsx`

1. **Rail layout on mobile**: replace the horizontal-scroll row with a wrapping 2-column grid below `lg`:
   - Container: `grid grid-cols-2 gap-2 lg:flex lg:flex-col ...` and drop `overflow-x-auto`/`scrollbar-hidden` on mobile (keep for nothing; lg uses flex-col as today).
2. **Buttons on mobile**: remove `min-w-[190px]` and `shrink-0` below `lg` so each button fills its grid cell; keep `lg:min-w-0 lg:w-full` behavior as-is. Allow long labels (e.g. "Customer Facing Display") to wrap or truncate cleanly with `min-w-0` and `leading-tight`.
3. **Hide the blurb on mobile**: the description line under each tab label gets `hidden lg:block`, per the request. Desktop keeps the blurb.

No changes to the demo viewer, `demoSources.ts`, icons, or any `lg:` styling.

## Verification
- Playwright at 390px width: rail buttons fit inside the viewport, no horizontal overflow (`document.documentElement.scrollWidth <= innerWidth`), labels readable, blurbs hidden.
- Playwright at 1280px: desktop rail unchanged, blurbs visible.
