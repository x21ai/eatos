# Apple-style dropdowns, hardware moves to Platform

## 1. Menus drop down, never sideways

Today the Platform and Concepts panels are 860px boxes anchored to their trigger, so they stretch to the right and crowd the Book a Demo button. The Apple approach is the opposite: the header itself becomes the surface. The menu is not a box next to a link, it is a sheet that unfolds downward from the whole bar.

New behaviour:

- One full-bleed panel spanning the entire viewport width, docked directly under the header bar. No left/right shifting math, so nothing can ever touch the logo or the CTA.
- Content inside the panel is constrained to the site container and centered, so link columns sit under the centered nav rather than drifting right.
- Opens with a downward reveal: the sheet grows in height while the link columns fade and rise slightly, staggered. Closing collapses upward. Same easing as the rest of the site.
- A soft dimming layer over the page below the panel, so the open menu reads as the focused layer.
- The panel is white, rounded only at the bottom, with a hairline top border and one soft shadow. Platform and Concepts stay pixel-identical to each other, which the shared panel component already guarantees.
- Layout inside: a section label on the left, then a 4-column link grid for Platform (19 items) and the same 4-column grid for Concepts (10 items, filling the first rows). Row height, icon tile size and type scale stay identical across both.
- Still no max-height and no inner scrolling at any resolution. At smaller desktop widths the grid steps to 3 then 2 columns instead of scrolling.
- Hover intent stays as it is, plus Escape to close and focus handling for keyboard users.
- Mobile menu is untouched.

```text
┌──────────────────────────────────────────────────────────┐
│ logo            Platform  Concepts  Pricing   Book a Demo │
├──────────────────────────────────────────────────────────┤
│      ┌───────── site container ─────────┐                │
│  Platform │ link │ link │ link │ link │                   │
│           │ link │ link │ link │ link │                   │
│           View all products →                             │
└──────────────────────────────────────────────────────────┘
        (page below dims while open)
```

## 2. Hardware becomes part of Platform

- Remove the full "Hardware that turns heads" section, including the Point of Sale and Point of Purchase price cards, from the homepage.
- Move that section onto `/platform`, placed after the existing platform content and before the closing call to action, with the same imagery, price pills and "Shop all hardware" link, spacing adjusted to the platform page rhythm.
- Hardware stays in the Platform dropdown and at `/products/hardware`, so no links or SEO paths change.

## 3. Homepage bento grid

- The wide Hardware card is replaced by a wide Intelligence blob: a darker AI-toned card with a bolder headline, a short outcome line and a subtle glow, linking to `/ai`.
- The existing narrow Intelligence card stays as requested, so the two are given distinct angles: the narrow one keeps the current staffing and inventory framing, the wide one leads on VoiceOS and forecasting so they do not read as duplicates.

## Technical notes

- `apps/web/src/components/Header.tsx`: rewrite `MegaMenuPanel` as a full-width fixed sheet, drop `computeShift`, `MEGA_PANEL_WIDTH`, `productsShift`, `solutionsShift` and the resize listener that feeds them. Add the dim overlay and Escape handling.
- `apps/web/src/app/page.tsx`: delete the hardware section, swap bento card 4 for the Intelligence blob.
- `apps/web/src/app/platform/page.tsx`: add the hardware section, reusing the existing image URLs and the `popTerminalsAsset` pointer.
- Verify with Playwright at 1024, 1280, 1440, 1920 and a short viewport: both panels identical, no inner scrollbar, no horizontal page overflow, no console errors, and the logo plus CTA never overlapped.
