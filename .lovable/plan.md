# Reorganize the Footer Layout

## Current problems (confirmed from screenshots)
- Desktop: large empty whitespace under the logo/social block while the contact cards and CTAs crowd the right side.
- The offices row sits inside the top grid and feels detached.
- Link columns are unbalanced: Products has 12 links, Quick Links only 4, so the grid looks lopsided and the page gets very tall on mobile.
- "Quick Links" duplicates links already present elsewhere (Pricing, Enterprise, Hardware).
- Legal strip items wrap awkwardly.

## Changes to `apps/web/src/components/Footer.tsx`

1. **Top band rebalanced (desktop)**
   - Row 1: logo + description + social icons on the left; contact cards (2x2) on the right.
   - Row 2: CTA buttons (Book a Demo, Contact Sales) aligned under the contact cards, or moved next to the logo block to fill the empty space. Plan: place the CTAs directly under the social icons in the left block so the left column fills naturally.
   - Row 3: "Our Offices" as its own full-width 4-column row with a divider above.

2. **Link columns balanced**
   - Remove the "Quick Links" column (all 4 links are duplicates of existing links).
   - Rebalance Products: split into two columns or move Analytics, Loyalty, Gift Cards, Marketing, Tableside into a "Grow" style group so each column has 6 to 8 links. Result: 5 evenly sized columns instead of 6 uneven ones.

3. **Mobile**
   - Contact cards become a 2-column grid (instead of stacked full width) to cut height.
   - Link columns stay 2 per row but with balanced counts.

4. **Legal strip**
   - Copyright left, legal links center/right, locale selector right; single row on desktop, neatly stacked and centered on mobile.

5. Keep all existing links, hrefs, contact details, and both light/dark variants intact. Purely a layout/className change plus regrouping link arrays.

## Technical notes
- No new files; only `Footer.tsx` changes.
- Verify desktop (1280px) and mobile (390px) with screenshots after the edit.
- No em dashes anywhere in copy.
