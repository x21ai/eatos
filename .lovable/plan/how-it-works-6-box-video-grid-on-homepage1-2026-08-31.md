# How it Works: 6-box video grid on /homepage1

Replace the horizontal scrolling product rail in the "How it Works" section with a single bordered container holding a 3 x 2 grid of six video boxes.

## Behaviour

- One outer container (rounded, subtle border, black surface) sits inside the site container, with a thin divider grid so the six boxes read as one system.
- Six boxes, 3 per row on desktop, 2 per row on tablet, 1 per row on mobile. Each box keeps a fixed aspect ratio so the grid stays even.
- Idle state: the demo poster frame fills the box.
- Hover: the box lifts slightly and the product name appears as a label at the bottom inside the box, over a soft dark gradient so text stays readable.
- Click: the video plays inside that same box, filling the whole box (no modal). Controls appear while playing, and the video loops muted with sound toggle available through the native controls.
- Clicking a second box pauses the first, so only one video plays at a time. Clicking the playing box again stops it and returns to the poster with the hover label.

## Which six

The six products that already have real demo videos:

1. AI Enabled Point of Sale
2. AI Enabled Kitchen Display System
3. Self Service Kiosk
4. Guest Facing Display
5. Dashboard
6. inventoryOS

The other rail products (Table Side Order & Pay, Analytics, Autonomous Delivery, Point of Purchase, Online Ordering, Workforce Management) have no unique video yet, so they are not part of the grid. If you want twelve boxes instead, say so and the grid becomes 3 x 4 reusing videos.

## Technical notes

- Edit `apps/web/src/app/components/ProductShowcaseSection.tsx` only. The heading and description props stay as they are.
- Build the grid from `demoSources` (`apps/web/src/app/components/demoSources.ts`), which already holds webm + mp4 sources and posters for all six ids, mapped to display names and product hrefs.
- Track the active box with a single `useState<string | null>` plus a `useRef` map of `<video>` elements to pause the previous one.
- Remove the arrow buttons, scroll refs and the `ProductAnimationModal` usage from this section; keep `TabletFrame` only if still referenced elsewhere in the file.
- No backend, data or copy changes. `/homepage1` route file is untouched.
