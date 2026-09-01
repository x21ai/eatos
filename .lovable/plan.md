# Footer: left-align the last column on mobile

## Problem
On mobile the footer link columns wrap two per row: Products / Grow, then Concepts / Company, leaving Resources alone on the third row. Because the row is center-aligned on mobile, Resources sits in the middle instead of under Concepts.

## Change
In `apps/web/src/components/Footer.tsx` (footer nav wrapper, line 394), replace the mobile `justify-center` with `justify-start`. Tablet (`md:justify-start`) and desktop (`lg:justify-between`, `lg:flex-nowrap`) behavior is already explicit and stays identical.

Result: Resources aligns to the left column, directly under Concepts. No other markup, spacing, or content changes.
