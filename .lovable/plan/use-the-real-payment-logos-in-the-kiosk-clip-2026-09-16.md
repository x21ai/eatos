# Use the real payment logos in the kiosk clip

On the kiosk "Touch to Start" screen, the payment badges are currently drawn as plain coloured text ("VISA", "MC", "AMEX", "Pay") plus a hand-drawn contactless symbol. They get replaced with the five logo images you supplied, in the order given: Visa, Mastercard, Amex, Apple Pay, contactless tap.

## What changes on screen

- Each badge becomes the supplied logo image inside the same white rounded tile, same row position, same spacing, so the layout does not shift.
- Logos are sized to a consistent height and centred, kept sharp at the clip's 900x1600 portrait resolution, with nothing stretched or cropped.
- Everything else in the clip stays exactly as it is.

The updated clip replaces the current one everywhere it plays: the home page "How it Works" rail, the alternate home page grid, and the Self Service Kiosk page.

## Technical notes

- Copy the five uploaded images into `tools/kiosk-portrait/` as local render inputs (the render loads files from disk, so they must live next to `scene.html`).
- In `tools/kiosk-portrait/scene.html`, replace the `.cards` children (line 257-258) with `<img>` tiles and update the `#start .cards i.*` rules (lines 45-48) to image-based tile styling with `object-fit: contain`.
- Re-render all frames with `tools/kiosk-portrait/capture.py`, encode MP4 (H.264) and WebM (VP9) plus a poster JPG at the existing dimensions and size targets.
- Upload the three outputs through Lovable Assets and refresh the pointers at `apps/web/src/app/components/assets/kiosk-portrait.{mp4,webm}.asset.json` and `kiosk-portrait-poster.jpg.asset.json`. No component or `demoSources.ts` change is needed.
- Verify playback and badge legibility in the preview at mobile, tablet and desktop widths.
