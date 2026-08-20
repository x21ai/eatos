# Inventory Management Page Redesign

## Goal
Rebuild `/products/simplified-inventory-management` using the same professional dark product-page template as the recent Workforce Management, Loyalty, and Customer Facing Display redesigns. Update all copy and structure to match the requested feature set.

## Current state
- The page is rendered by the generic `ProductDetailClient` in `apps/web/src/app/products/[slug]/ProductDetailClient.tsx`.
- Dedicated redesigns exist for `workforce-management`, `loyalty`, `customer-facing-display`, etc., each with their own `content.ts` + `PageClient.tsx` + `page.tsx`.

## Plan

1. **Create a dedicated static route** for `/products/simplified-inventory-management`:
   - `apps/web/src/app/products/simplified-inventory-management/page.tsx` with metadata.
   - `apps/web/src/app/products/simplified-inventory-management/InventoryPageClient.tsx` using the Workforce-style template.
   - `apps/web/src/app/products/simplified-inventory-management/content.ts` with all copy.

2. **Exclude the slug from the dynamic route** in `apps/web/src/app/products/[slug]/page.tsx` so Next.js does not generate a conflicting generic page.

3. **Content structure** (replace the existing generic copy):
   - **Hero**: eyebrow, headline + accent, description, two CTAs, stats strip.
   - **Key features card** in the hero: include the four requested features plus supporting items (Tracking, Alerts, Recipe Costing, Reporting, Seamless Integration, etc.).
   - **Feature rows** (the four requested sections):
     - Real-time Inventory Tracking
     - Automated Stock Alerts
     - Vendor Management Made Easy
     - Recipe Costing and Menu Engineering
   - Each feature row gets a title, body paragraph, more paragraph, two metric cards, and a blank `Placeholder` image.
   - **Why Inventory Management?** section with three benefit cards.
   - **Capability cards** (3 spec cards) derived from the feature set.
   - **Related products** grid (3 items) and final CTA band.

4. **Copy rules**:
   - Use the same professional tone as the other redesigned product pages.
   - Never use the word "POS"; always use "Point of Sale" if a point-of-sale reference is needed.
   - No em dashes in any copy.
   - No pricing or terms disclaimer.

5. **Design / styling**:
   - Dark theme, `font-montserrat`, `site-container` padding.
   - Use the amber accent from the existing product registry to keep the product identity consistent.
   - Blank `Placeholder` components for images; images will be updated later.
   - Responsive layout for desktop, tablet, and mobile.

6. **Verification**:
   - Build the web app and confirm the page renders without errors.
   - Check the page on desktop, tablet, and mobile viewports.
   - Confirm navigation from the site header and product index works.
