# Keep desktop dropdowns fully on screen

Both desktop dropdowns are anchored to the left edge of their trigger link. That looks right on wide screens, but at the smallest desktop width (1024px, where the desktop nav first appears) the Restaurant Type panel is 860px wide and starts roughly 250px in, so its right edge runs past the page content area and gets clipped. Solutions (460px) can do the same when the window is narrow.

## Change

- Measure each trigger's position when the dropdown opens and shift the panel left only as much as needed so its right edge stays inside the site container padding.
- If a panel still cannot fit at very narrow desktop widths, cap its width to the available content width instead of letting it overflow.
- Left edge stays aligned with the trigger's text whenever there is room, so nothing changes at 1280px and above.
- Recalculate on window resize so the clamp stays correct after resizing.
- No change to widths, contents, hover behaviour, animation timing, or the mobile menu.

## Technical notes

In `apps/web/src/components/Header.tsx`:
- Add a small hook/helper that, for each dropdown wrapper, reads the trigger container's `getBoundingClientRect()` plus the viewport width and computes an offset: `offset = min(0, (viewportWidth - containerPadding) - (triggerLeft + panelWidth))`.
- Apply the offset as an inline `transform: translateX(offsetPx)` on the existing absolutely positioned wrappers (lines 441 and 497), keeping `left-0`.
- Keep the existing `max-w-[calc(100vw-2rem)]` guard as the final safety net.
- Run the calculation on open and on `resize`, cleaned up on unmount.
- Verify with Playwright at 1024, 1163, 1280, and 1440px that each panel's right edge sits inside the container and the left edge aligns with its link text where space allows.
