# Fix wrong titles in Option C (side rail)

## What is happening
In the side rail list, the rows for Point of Sale, Dashboard and inventoryOS all show the label of the **currently selected** product (so they read "Kiosk", "Point of Sale", etc. depending on the active tab). Only the three products with custom names (Kitchen Display System, Customer Facing Display, Self Service Kiosk) show correctly.

Cause: the label helper only has special cases for those three ids; for every other id it falls back to the active demo's label instead of the label of the row being rendered.

## Fix
In `apps/web/src/app/components/DemoRailSection.tsx`, make the label helper take the demo item (or look it up by id) and fall back to that item's own label, not the selected one. Result: each rail row always shows its own product name, and the chrome bar shows the selected product's name.

Rows will read: Point of Sale, Kitchen Display System, Self Service Kiosk, Customer Facing Display, Dashboard, inventoryOS.

## Scope
- Only `DemoRailSection.tsx` (Option C). Options A, B, D and the main home page untouched.
- Same behaviour on desktop, tablet and mobile.
