# Point of Sale demo: build the animation from the screenshots

Replace the screen-recorded video in the "How it Works" > Point of Sale slot with a clean, purpose-built animation made from the seven screenshots you just attached, in the order you sent them. No macOS chrome, no cursor, no recording artifacts.

## The sequence

1. Menu grid, empty check ("Let's create an order")
2. Item sheet open: Spinach Artichoke Dip, Size modifiers
3. Same sheet, Preparation modifiers selected
4. Order built in the check panel with modifier list, Sub Total and Charge
5. Payment sheet: Total Due, Cash selected, quick-cash amounts, Charge
6. Success screen: payment processed, Change Due, receipt options
7. Tickets view with the paid check and its full detail

## How it moves

- Each screenshot is one beat, held long enough to read (about 2.5 to 4 seconds), with a slow subtle scale drift so nothing looks frozen.
- Transitions between beats are soft cross dissolves, with a short rise-and-fade on the two dialog beats so the item sheet and payment sheet feel like they open and close.
- Silent, autoplaying, looping forever, no controls, exactly like a GIF. Total loop about 22 seconds.
- Same landscape tablet mockup as today, with the aspect ratio taken from the screenshot dimensions so the frame fits with no letterboxing or stretching.

## Format

Delivered as MP4 plus WebM (muted, looping, autoplay) rather than a literal `.gif`: a real GIF of this dark UI at readable sharpness would be 20 MB or more and would visibly slow the home page. It behaves identically for the visitor. If you specifically need a `.gif` file for use elsewhere, that can be exported as well.

## Technical notes

- Compose the beats with ffmpeg from the seven uploaded screenshots: per-beat zoompan drift, xfade dissolves, dialog beats brought in with a short translate-and-fade, 30 fps, 1920 wide.
- Encode H.264 MP4 and VP9 WebM plus a poster JPG, target under about 2 MB per format.
- Upload through Lovable Assets and replace the three pointer files in `apps/web/src/app/components/assets/`; delete the superseded recording assets.
- Update the aspect ratio in `apps/web/src/app/components/TabletMockup.tsx`.
- Repair the currently invalid `pos-demo.webm.asset.json` pointer as part of the swap (it is throwing a JSON parse error in the preview).
- Verify in the preview on desktop, tablet and mobile.