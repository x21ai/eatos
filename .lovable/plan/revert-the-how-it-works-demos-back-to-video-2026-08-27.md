# Revert the "How it Works" demos back to video

The animated WebP images go away and the demos play as real video again, which keeps text and UI perfectly sharp at any size.

## Why the old files can't just be restored

The previous MP4/WebM assets were deleted from the CDN when they were replaced, so their URLs now return 404. Instead of restoring dead links, the six animations you uploaded most recently (the same clips that produced the current WebP files) become the new video sources, so quality matches your originals exactly.

## What changes

1. Encode each of the six demos to MP4 (H.264) and WebM (VP9) at the source resolution and frame rate, at a high quality setting, plus a poster frame:
   Point of Sale, Kitchen Display System, Self Service Kiosk, Customer Facing Display, Dashboard, InventoryOS.
2. Upload the new files as CDN assets and delete the six WebP pointers they replace.
3. Put the video player back:
   - `TabletMockup.tsx` renders a muted, autoplaying, looping, inline `<video>` with both sources and the poster, no controls, so it still behaves like a GIF.
   - `demoSources.ts` exposes `sources` plus `poster` per demo again instead of a single `gif` URL.
   - `DemoRailSection.tsx` passes the video props.
   - The Point of Sale page and Kitchen Display System page media blocks go back to the same video component.
4. Verify in the preview at desktop, tablet and mobile widths, and report each clip's final size.

## Technical notes

- Sources: the uploaded `pointofsale-demo.mp4`, `eatos-kds-demo.webm`, `kiosk-demo.webm`, `cfd3-demo.webm`, `dashboard-demo.webm`, `inventoryos-demo.webm`.
- ffmpeg: H.264 `crf 20` yuv420p with `faststart`, VP9 `crf 28` two-pass style single output, audio stripped, poster from a representative frame.
- Video attributes: `muted playsInline autoPlay loop preload="metadata"` with the poster as the first paint, so no player chrome appears.
- Expected sizes: roughly 1 to 3 MB per clip per format, well under the current WebP sizes (up to 5.1 MB).
