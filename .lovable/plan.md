# Scroll to switch products in How it Works

Make the demo panel on the homepage "How it Works" section respond to the mouse wheel: while the pointer is over the demo area, scrolling moves to the next or previous product instead of scrolling the page. Anywhere else on the page, scrolling behaves normally.

## Behaviour

- Pointer over the demo panel, scroll down: advance to the next product in the rail (Point of Sale, Kitchen Display System, Self Service Kiosk, Guest Facing Display, Dashboard, InventoryOS).
- Scroll up: go back to the previous product.
- Past the last product, the next scroll wraps back to the first product, so the set loops instead of releasing the page.
- Pointer outside the demo panel: the page scrolls as usual, nothing changes.
- Each wheel gesture moves one product at a time, with a short cooldown so one fast flick does not jump through several products.
- Trackpad momentum is treated as a single gesture, not many steps.
- Touch devices keep current behaviour: tapping a product in the rail switches it, and vertical swipes scroll the page normally.
- Keyboard and click selection in the rail continue to work, and the active rail item stays in sync.
- A small hint under the panel tells people they can scroll to switch products.

## Technical notes

- Change is limited to `apps/web/src/app/components/DemoRailSection.tsx` (the section used by `HomeClient.tsx`).
- Add a wrapper ref around the demo panel and register a non-passive `wheel` listener via `addEventListener` in `useEffect`, so `preventDefault()` works (React's JSX `onWheel` is passive in this setup).
- Guard with a `useRef` timestamp cooldown (about 450 ms) and ignore events whose `deltaY` magnitude is below a small threshold to absorb momentum tails.
- Index math wraps with modulo in both directions, driving the existing `activeId` state so rail highlight, header label, and the video/iframe swap stay unchanged.
- Respect `matchMedia('(hover: hover)')` so the hijack only applies to pointer devices.
- No changes to data, video assets, or other pages.
