# Remove recording controls from Dashboard and InventoryOS videos

Remove the macOS “Stop Screen Recording” toolbar shown at the end of both clips, without changing the visible product walkthroughs.

## Changes

- Download the current Dashboard and InventoryOS master clips referenced by the shared demo media set.
- Inspect the ending frames of each clip and cut at the last clean frame before the recording toolbar appears.
- Re-encode each cleaned clip as MP4 and WebM, preserving its current dimensions, silent autoplay behavior, playback speed and visual quality.
- Generate refreshed poster frames only if an existing poster includes the unwanted toolbar.
- Upload the cleaned media and update the shared Dashboard and InventoryOS asset pointers so every page using these shared videos receives the fix.
- Leave the separate `/homepage1` media set unchanged unless inspection shows it uses the same affected footage.

## Verification

- Check the final seconds and loop boundary of both videos to confirm the controls never appear and the loop does not freeze or flash.
- Verify Dashboard and InventoryOS playback on phone, tablet and desktop sizes wherever the shared clips appear.
- Confirm the other product videos and page layouts remain unchanged.
