# Workforce Management Page Redesign

## Goal
Replace the generic `ProductDetailClient` template used at `/products/workforce-management` with a dedicated, cleaner, more professional page that matches the quality of the recently redesigned KDS and Self-Service Kiosk pages.

## What we will build

1. Dedicated route
   - Create `apps/web/src/app/products/workforce-management/page.tsx` and a `WorkforcePageClient.tsx` so the page is no longer rendered by the generic `[slug]/ProductDetailClient.tsx`.
   - Update `apps/web/src/app/products/[slug]/page.tsx` to exclude `workforce-management` from `generateStaticParams` (same pattern as KDS).

2. Content module
   - Add `apps/web/src/app/products/workforce-management/content.ts` with copy and assets for:
     - Hero section
     - Key metrics/stats
     - Feature spotlights (scheduling, GPS attendance, payroll sync, mobile clock-in, shift swap, overtime alerts)
     - Integrations / CTA section
     - Cross-product links
   - Use existing product data from `products.ts` as the source of truth for the core feature list.

3. Visual direction
   - Since the design preference questions were skipped, default to the site's established dark/Montserrat design system for consistency.
   - Layout: cinematic hero with four-word headline, centered metric strip below, alternating feature spotlight rows, and a clean CTA band.
   - Reuse the existing `Placeholder` component pattern for images and add generated/placeholder assets for workforce UI.

4. Header & navigation
   - Ensure `Header.tsx` recognizes the new dedicated route as a dark page so the white logo and nav text remain visible.
   - Keep the mega-menu link pointing to `/products/workforce-management`.

5. Verification
   - Verify the page renders correctly in the preview across desktop, tablet, and mobile.
   - Confirm navigation links to `/products/workforce-management` work and return 200.
   - Run a targeted TypeScript/build check to ensure the new route is statically prerendered.

## Out of scope
   - No changes to backend or CMS.
   - No new authentication or data fetching.
   - No comparison table or blog content updates.
