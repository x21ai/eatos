# Desktop dropdowns: align to the menu link

Right now both desktop dropdowns (Restaurant Type, Solutions) are centered on their trigger, so a 640px wide panel spills far to the left and right of the nav link and can run past the content area.

## Change

- Anchor each dropdown to the left edge of its trigger text instead of centering it, so the panel starts exactly where the link's text starts and opens directly below the link.
- Keep the panel inside the page content area: if a left-anchored panel would overflow the right edge (Solutions sits further right), clamp it so it never extends past the site container padding.
- No change to widths, contents, hover behaviour, animation timing, or the mobile menu.

## Technical notes

In `apps/web/src/components/Header.tsx`:
- Replace `left-1/2 -translate-x-1/2` with `left-0` on both dropdown wrappers (lines 414 and 469) so they align to the trigger's box, which starts at the link text.
- Add a max width guard (`max-w-[calc(100vw-2rem)]`) and, for the panels near the right edge, keep them within the viewport by anchoring left but constraining width so nothing is clipped.
- Verify at 1317px (current viewport), 1440px, and 1920px with Playwright screenshots that each panel's left edge lines up with its link text and the right edge stays inside the content area.
