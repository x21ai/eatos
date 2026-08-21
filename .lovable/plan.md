# Brochure button in product page heroes

Replace the secondary hero button on product pages with a "Brochure" button that opens the matching brochure in a popup flipbook, the same experience as the Brochures page.

## What changes

1. A shared brochure popup is added so any product page can open a flipbook overlay with the brochure title, an "Open in new tab" link, a "PDF" download link, and a close button. Same look and behaviour as the popup on /brochures.

2. A single brochure registry maps each product page to its brochure (flipbook link plus PDF link), reusing the existing brochure data so links stay in one place.

3. On each product page below, the hero secondary button becomes "Brochure" and opens the popup:

| Page | Brochure opened |
| --- | --- |
| /point-of-sale | Point of Sale |
| /products/point-of-purchase | Point of Purchase |
| /products/tableside-order-and-pay | Tableside Order and Pay |
| /products/self-service-kiosk | Self Service Kiosk |
| /products/apponlineorderingdelivery | Online Ordering and Delivery |
| /products/customer-facing-display | Customer Facing Display |
| /products/kitchen-display-system | Kitchen Display System |
| /products/workforce-management | Workforce Management |
| /products/reporting-analytics | Reporting and Analytics |

4. Every other product page (Loyalty, Automated Marketing, Simplified Inventory Management, and the remaining products served by the shared product template) gets the same "Brochure" hero button, opening the "eatOS Restaurant Made Simple" brochure.

Scope stays on product pages. Solution pages, Hardware, Payments, and Pricing are untouched.

## Notes on current state

- Only some of these pages currently have a "Watch Video" hero button (Kitchen Display System, Customer Facing Display, Tableside Order and Pay, Workforce Management, Simplified Inventory Management). Others show "View Pricing" (Point of Purchase, Self Service Kiosk, Online Ordering and Delivery, Reporting and Analytics, Loyalty) and Point of Sale has no secondary hero button at all.
- Plan assumption: on those pages the secondary hero button is replaced by "Brochure" too, and Point of Sale, Kitchen Display System, and Self Service Kiosk get a "Brochure" button added next to their existing primary button. Say the word if you would rather keep "View Pricing" and add "Brochure" as a third button.

## Technical detail

- New client component `apps/web/src/components/BrochureDialog.tsx`: the flipbook overlay lifted from `apps/web/src/app/brochures/BrochuresClient.tsx` (iframe, Escape key handling, scroll lock, backdrop click to close), plus a small `useBrochure()`-style trigger button so each hero can render it in one line.
- New `apps/web/src/lib/brochures.ts` (or a re-export module) exposing `getBrochureFor(pageKey)`, resolving from the existing `brochures` array in `apps/web/src/app/brochures/content.ts` with `restaurants-made-simple` as fallback.
- Hero edits are per page client (`KdsPageClient`, `KioskPageClient`, `PopPageClient`, `TablesidePageClient`, `OrderingPageClient`, `CfdPageClient`, `WorkforcePageClient`, `AnalyticsPageClient`, `InventoryPageClient`, `LoyaltyPageClient`, `MarketingPageClient`, `[slug]/ProductDetailClient`, `point-of-sale/page.tsx`), keeping existing button styling so nothing shifts visually.
- Brochure links stay the existing external flipbook and HubSpot PDF URLs; no new data source and no backend work.
