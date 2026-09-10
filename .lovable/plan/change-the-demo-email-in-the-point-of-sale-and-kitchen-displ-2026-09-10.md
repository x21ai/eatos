# Change the demo email in the Point of Sale and Kitchen Display videos

The email shown on the sign-in screen of those two demos is baked into the video files themselves, not into page text, so changing it means re-making the two videos. That is exactly what this does.

## What changes

- The sign-in email in the Point of Sale demo and the Kitchen Display demo changes from `johndoe@eatos.com` to `owner@your-restaurant.com`.
- Both videos are re-recorded from the same animation scripts, so nothing else about the motion, timing, colours or screens changes.
- The still frame that shows before each video plays is re-made too, so it matches.
- Because the videos are shared, every place on the site that shows them updates at once: the home page How it Works rail, the alternate home pages, the Point of Sale page and the Kitchen Display page.
- The Self Service Kiosk animation also carries the old email in its script. I will leave it alone unless you want it changed as well, since you named only these two.

## Steps

1. Update the email value in the two animation scripts.
2. Re-render every frame of each demo and re-encode both video formats plus the still frame.
3. Replace the two video files and their still frames in the project with the new versions.
4. Play both videos through and confirm the sign-in screen reads `owner@your-restaurant.com`, then check the pages that use them on phone, tablet and desktop.

## Technical detail

- `tools/pos-demo/scene.js` and `tools/kds-demo/scene.js`: change the `EMAIL` constant.
- Re-run `tools/pos-demo/capture.py` and `tools/kds-demo/capture.py`, then re-encode to WebM (VP9) and MP4 (H.264) with ffmpeg at the existing frame rate and dimensions, plus a poster JPEG from the existing poster frame.
- Re-upload with `lovable-assets create` and overwrite the pointers `apps/web/src/app/components/assets/{pos,kds}-demo.{webm,mp4}.asset.json` and `{pos,kds}-demo-poster.jpg.asset.json`. `demoSources.ts` needs no change since it reads those pointers.
- Delete superseded assets only after the new pointers verify in the preview.
- Verify with Playwright: seek the video element past the sign-in beat and screenshot to read the address.
