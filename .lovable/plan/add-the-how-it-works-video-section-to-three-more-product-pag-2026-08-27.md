# Add the "How it Works" video section to three more product pages

The same section that now sits on the Kitchen Display System page gets added to:

- Self Service Kiosk (`/products/self-service-kiosk`)
- Customer Facing Display (`/products/customer-facing-display`)
- Simplified Inventory Management (`/products/simplified-inventory-management`)

Each page reuses the clip already playing in the home page "How it Works" rail for that product: the kiosk clip, the customer facing display clip, and the InventoryOS clip. No new video files are created or uploaded.

## What it looks like

Placed directly below the hero and above the numbers strip, matching the Kitchen Display System page exactly:

- Centered "How it Works" heading, same size and weight.
- The clip in the same rounded, bordered, shadowed frame, centered and capped at the same narrower width so it reads as a contained widget rather than a full-width band.
- Silent, autoplaying, looping, no player controls, with the existing poster frame and both video formats for browser support.
- Same scroll-in fade and scale motion.

## Technical notes

- Each client component imports `demoSources` from `apps/web/src/app/components/demoSources.ts` and looks up its own entry by id (`kiosk`, `cfd`, `inventoryos`), the same pattern `KdsPageClient.tsx` uses.
- The section markup is copied from `KdsPageClient.tsx` (lines 154-184) into `KioskPageClient.tsx`, `CfdPageClient.tsx` and `InventoryPageClient.tsx`, with the `aria-label` changed per product.
- The lookup stays inside the component body to avoid module-scope evaluation issues.
- Verified in the preview at desktop, tablet and mobile widths that each clip plays and the widget width matches the Kitchen Display System page.
