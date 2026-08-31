# Show product title on video hover (Homepage1, How it Works)

## Goal
When hovering any of the six video tiles in the How it Works container, that tile's product name appears clearly at the bottom center of the box.

## What changes
- Keep the 3x2 grid and inline expansion behaviour as-is.
- Make the per-tile label a reliable hover overlay:
  - Bottom-centered inside the tile, on top of the playing video.
  - Fades in with a dark gradient scrim behind it so white text stays readable over bright video frames.
  - Hidden by default on pointer devices, shown on hover and on keyboard focus of the tile.
- On touch screens (no hover), the label stays visible so mobile users still see the product name.
- Label text keeps the existing names: AI Enabled Point of Sale, AI Enabled Kitchen Display System, Self Service Kiosk, Guest Facing Display, Dashboard, inventoryOS.

## Technical notes
- File: `apps/web/src/app/components/ProductShowcaseSection.tsx`
- Adjust the tile `<button>` overlay: replace the current always-mounted `opacity-0` label with a focus-visible aware `group-hover`/`group-focus-visible` overlay, raise its z-index above the `<video>`, and gate the hidden state behind a `hover`-capable media query so touch devices show it.
- No data, routing, or video-source changes.
