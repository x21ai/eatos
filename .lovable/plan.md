# Interactive POS Demo Animation (coded UI, real taps)

Replace the current cross-dissolve slideshow in "How it Works" > Point of Sale with a genuine coded animation: a pixel replica of the eatOS POS interface where a cursor visibly taps a button and the screen reacts, the same technique used for the Dashboard and Adyen Terminal clips in the eatOS Point of Sale 5 project.

## What the animation shows

A single continuous loop, roughly 18 to 22 seconds, with no fades between screenshots:

1. Menu grid on screen, cursor glides to "Spinach Artichoke Dip", tap ripple, modifier sheet slides up.
2. Cursor taps a Size option, the chip highlights; taps Preparation, that chip highlights; taps "Add to check".
3. Sheet slides down, the new line item animates into the check panel, totals count up.
4. Two more items are tapped in quickly to fill the check.
5. Cursor taps "Pay", the Total Due screen slides in.
6. Cursor taps the card tender, a brief processing state, then the success check mark animates in.
7. Cursor taps "Tickets", the tickets list slides in with the paid check highlighted, then the loop resets to the menu grid.

Every transition is driven by an on-screen tap: a soft ring ripple at the touch point plus a button press-down, so it reads as someone actually using the POS.

## How it gets built

- Recreate the POS screens as a standalone HTML/CSS/JS scene (not part of the site bundle) matching the seven screenshots: dark left rail, category tabs, item grid, right-hand check panel, modifier bottom sheet, payment and success screens, tickets list. Same type, colors, spacing and copy as the screenshots.
- Drive the whole sequence from one deterministic timeline (frame number in, layout out) so the render is reproducible.
- Render the scene frame by frame in a headless browser at 30fps, then encode to MP4 and WebM (silent, loop friendly) plus a poster frame. A GIF fallback is added only if you want it, since MP4/WebM stay far smaller at this resolution.
- Upload the encoded files as CDN assets and point the existing tablet mockup at them, updating the aspect ratio to the new render size.
- The previous slideshow assets are removed once the new clip is live.

## Technical notes

- Scene lives in a non-shipped folder (e.g. `tools/pos-demo/`) with a Playwright frame-capture script; only the resulting `.asset.json` pointers land in `apps/web/src/app/components/assets/`.
- Timeline uses explicit beat timings, easing on the sheet slide, ripple scale/opacity, and cursor motion so nothing snaps.
- `apps/web/src/app/components/TabletMockup.tsx` keeps its current API (`sources`, `poster`, `label`); only the sources and aspect ratio change.
- Target render 1600x1000 at 30fps, roughly 1.5 to 2 MB per format.

## Open point

If you want an actual `.gif` file rather than a looping silent video, say so and I will export a GIF as well, at the cost of a larger file and slightly reduced color fidelity.