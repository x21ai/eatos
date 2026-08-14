# Compact the Bento Grid on the Home Page

## Goal
Tighten the spacing between the card titles and their content/images in the home page "An ecosystem of power" bento grid, while keeping the existing four-card layout and visual style intact.

## What will change
1. **Point of Sale card** — Remove `justify-between` so the title/description sit directly above the image with a small, fixed gap instead of being pushed to opposite ends of the card.
2. **Payments card** — Remove `justify-between` and stack the title row and the rate block close together with a small gap.
3. **Intelligence card** — Remove `justify-between` and keep the title and description compact.
4. **Grid height** — Drop the fixed `md:h-[800px]` (or reduce it) so the cards no longer stretch and create empty vertical space.
5. **Spacing tokens** — Keep padding and rounded corners the same; only reduce the internal `gap`/`mt` values between title and content.

## What will not change
- The four-column/row layout, colors, borders, hover effects, and images.
- Typography, icons, and copy.
- The Hardware card and the rest of the home page.

## Files
- `apps/web/src/app/page.tsx` — Bento Grid section only.

## Verification
- Visual check in the preview for desktop, tablet, and mobile to confirm the bento cards are compact with no large empty gaps.
