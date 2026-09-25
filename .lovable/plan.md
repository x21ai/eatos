# Add "Ai Intelligence" tab to How it Works

## What you will see
- A new first tab, "Ai Intelligence", above "Point of Sale" in the How it Works rail (all pages that use it, on phone, tablet and desktop).
- It opens by default and plays your uploaded Maya automation video, silent and looping like the others.
- Mouse-wheel cycling over the video includes the new tab.

## Video size
- Uploaded file: 6.4 MB, 67 s, 1280x720.
- Compress to roughly 1.5 to 2.5 MB: keep 1280x720, 30 fps, strip audio (demos play muted), H.264 with fast start, plus a smaller WebM copy and a poster image.
- Visual quality checked on a sample frame before publishing.

## Technical details
- Encode with ffmpeg (libx264 CRF ~28, slow preset, -an, +faststart; libvpx-vp9 CRF ~38), poster from ~5 s.
- Upload with lovable-assets to `apps/web/src/app/components/assets/ai-intelligence-demo.{mp4,webm,poster}.asset.json`.
- Add an `ai` entry as the first item in `demoSources.ts` (landscape laptop device type).
- In `DemoRailSection.tsx`: add a sparkle/brain icon and color for `ai`, label "Ai Intelligence".
- Verify with Playwright at 390/834/1280 px on `/` and product pages: tab order, playback, no console errors.
