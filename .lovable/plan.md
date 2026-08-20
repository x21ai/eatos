# Point of Sale demo: looping in-app animation inside a tablet mockup

In the "How it Works" section on the home page, the Point of Sale entry currently loads the live handheld POS app in an iframe framed by a browser-style panel. That gets replaced by a silent, looping animation built from your screen recording, presented inside a tablet mockup.

## What the animation shows

Taken straight from the recording, so the UI matches exactly:
1. Menu grid with the item detail sheet open (Truffle Fries, modifiers, Add to order)
2. Order building up in the right-hand check panel with modifiers and running totals
3. Payment sheet: Total Due, Cash / Card / Gift Card / Pay by Link / Split Check, quick-cash amounts, Charge
4. Tickets view: the closed check appearing in the ticket list with its full receipt detail

The 53 second recording is trimmed to a tight loop of roughly 20 to 25 seconds covering those four beats, cutting dead time and cursor idling.

## Presentation

- Landscape tablet shell: rounded bezel, thin camera dot, subtle dark metal edge, soft shadow, matching the existing black and zinc styling.
- The animation fills the tablet screen area, plays automatically, loops forever, silent, no controls.
- Small caption under the frame ("Ring in the order, take payment, close the ticket") plus the existing "Open" link so visitors can still reach the live POS app.
- The other five products (KDS, Kiosk, CFD, Dashboard, InventoryOS) keep their current live iframes and browser-style frame. Only Point of Sale changes.
- Built for desktop, tablet and mobile: the tablet shell scales down and the existing rail layout stays as it is.

## Format note

A true `.gif` of this UI at usable sharpness would be very large (tens of megabytes) and would slow the home page down. The plan uses a looping, muted, autoplaying video (MP4 plus WebM), which behaves exactly like a GIF for the visitor at a fraction of the size, with an animated WebP as fallback. If you specifically need a `.gif` file, that can be produced instead at reduced size and frame rate.

## Technical notes

- Encode from the upload with ffmpeg: trim and join the four beats, scale to about 1600px wide, 24 fps, MP4 (H.264) plus WebM (VP9), plus a poster JPG for first paint.
- Upload each output through Lovable Assets and reference the CDN pointers, so no large binaries land in the repo.
- `apps/web/src/app/components/demoSources.ts`: extend the demo entry so a product can carry `media` (poster plus video sources) instead of embedding a live `url`.
- `apps/web/src/app/components/DemoRailSection.tsx`: when the active demo has media, render the new tablet mockup with the looping video; otherwise keep the current iframe path unchanged.
- New `apps/web/src/app/components/TabletMockup.tsx` for the device shell, reusable by the other demo section variants.
- Video attributes: `autoplay muted loop playsinline preload="metadata"`, decorative frame parts marked `aria-hidden`.