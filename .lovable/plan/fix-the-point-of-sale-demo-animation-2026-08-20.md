# Fix the Point of Sale demo animation

Two problems with the current clip in the "How it Works" section: it plays too fast, and the macOS menu bar (clock, wifi, screen recording indicator) plus the dock are visible in the frame.

## 1. Slow it down

The clip is currently sped up about 2.2x. Re-encode it close to real time (roughly 0.9x of the original speed, about 48 seconds) so each action, adding the item, choosing modifiers, taking payment, seeing the ticket, is readable. Any dead air at the start and end is trimmed so the loop stays tight.

## 2. Remove the macOS chrome

Crop the recording so only the eatOS app is inside the tablet screen:
- Cut the top menu bar strip (clock, wifi, screen recording controls).
- Scan the recording for the frames where the dock slides in at the bottom and crop that strip too, so it never appears.
- Re-derive the aspect ratio from the cropped size and update the tablet mockup so the screen matches exactly, no letterboxing or stretching.

The result stays a silent, autoplaying, looping animation in the tablet frame, no visible player controls, exactly like a GIF.

## Technical notes
- Re-encode from the original recording with ffmpeg: crop filter for the chrome, `setpts` for the slower pace, then MP4 (H.264) and WebM (VP9) plus a poster frame.
- Upload the new files through Lovable Assets and replace the three pointer files in `apps/web/src/app/components/assets/`; delete the superseded assets.
- Update the aspect ratio in `apps/web/src/app/components/TabletMockup.tsx` to the new cropped ratio.
- Keep file size modest (target under about 2 MB per format) so the home page still loads fast.
- Verify in the preview on desktop, tablet and mobile.