# Sound control for How it Works videos

## What you will see
- A small speaker icon in the corner of the video in the How it Works section, on phone, tablet and desktop.
- Videos start muted by default (required for autoplay in browsers). Tap the icon to hear sound, tap again to mute.
- The icon only appears on videos that actually have sound. Right now that is only the "Guest Intelligence" video, which came from your upload. The other product demos (POS, KDS, Kiosk, Guest Display, Dashboard, InventoryOS) are generated animations with no audio, so they stay silent with no icon.

## Work items
1. Re-encode the Guest Intelligence video keeping its original audio track (AAC, modest bitrate), plus a WebM copy with audio, and upload both.
2. Add an `hasAudio` flag to the `ai` entry in `demoSources.ts`.
3. Add a mute/unmute speaker button (VolumeX / Volume2 icons) overlaid on the video in `TabletMockup.tsx`, wired through `LazyVideo.tsx` (remove the hardcoded `muted`, control it with state, default muted). Button only renders when `hasAudio` is set.
4. Keep autoplay, loop, lazy loading and the scroll-to-cycle behavior unchanged.

## Technical details
- ffmpeg: libx264 CRF ~28 with `-c:a aac -b:a 96k` (no `-an`), `+faststart`; libvpx-vp9 with libopus for WebM. Upload via lovable-assets, refresh the two asset.json pointers.
- `LazyVideo` gets optional `muted`/`onToggleMute` props; `TabletMockup` owns the muted state and renders the overlay button with an accessible aria-label ("Unmute video" / "Mute video").
- Verify with Playwright at 390/834/1280 px on `/`: icon shows only on Guest Intelligence, default muted, toggle works, no console errors.
