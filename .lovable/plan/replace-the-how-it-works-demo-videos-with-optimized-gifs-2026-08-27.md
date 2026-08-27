# Replace the "How it Works" demo videos with optimized GIFs

All six demo clips (Point of Sale, Kitchen Display System, Self Service Kiosk, Customer Facing Display, Dashboard, InventoryOS) become animated GIFs instead of MP4/WebM video, so they behave like plain images: no player, no autoplay policy, no controls, always looping.

## What changes

1. Convert each existing clip to a GIF using a high-quality two-pass palette process (per-clip palette plus dithering), so colors and text stay sharp rather than banded.
2. Optimize each GIF for size without touching resolution or visual quality: drop the frame rate to a smooth-but-lean cadence, trim duplicate frames, and run a lossless optimizer pass.
3. Swap the players for images:
   - `TabletMockup.tsx` renders an `<img>` with the GIF instead of a `<video>` (same shell, same aspect fit, alt text kept for accessibility, `loading="lazy"`).
   - `demoSources.ts` exposes a single `gif` URL per demo instead of the `sources` array plus poster.
   - The Point of Sale page and Kitchen Display System page video blocks become the same GIF image.
4. Upload the GIFs through Lovable Assets, then delete the superseded MP4, WebM and poster pointers.

## Size expectation, please read

GIF is a far less efficient format than MP4. The current clips are 1 to 2.7 MB each. Even fully optimized, a 20-second GIF at this resolution typically lands in the 4 to 10 MB range per clip. To keep the home page fast, the plan applies these levers in order, stopping as soon as each GIF is under about 4 MB:

- 15 fps (already smooth for UI motion, halves frame count)
- render width capped at 1200 px, upscaled by the browser inside the tablet frame (visually identical at the size it is displayed)
- duplicate-frame removal and lossless GIF optimization

If a clip still exceeds the budget, its loop is shortened slightly rather than degrading image quality.

## Technical notes

- ffmpeg is used for `palettegen`/`paletteuse` (`stats_mode=diff`, Bayer dithering) plus `mpdecimate`, then a GIF optimizer for the final pass.
- New pointers land in `apps/web/src/app/components/assets/*.gif.asset.json`; old `.mp4`, `.webm` and `-poster.jpg` pointers are deleted with `lovable-assets delete`.
- `DemoRailSection.tsx` keeps its current structure; only the media props change.
- Verified in the preview at desktop, tablet and mobile widths, with each GIF's final file size reported back.
