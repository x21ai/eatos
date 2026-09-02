# Use the six new demo videos on /homepage1 only

The "How it Works" grid on /homepage1 currently reuses the same demo clips as the main homepage. The six uploaded videos will replace them there, in the given order, without touching any other page.

## Order in the grid

1. AI Enabled Point of Sale
2. AI Enabled Kitchen Display System
3. Self Service Kiosk
4. Guest Facing Display
5. Dashboard
6. inventoryOS

## What changes

- Encode each uploaded MP4 into a web-ready MP4 plus a WebM, and pull a poster frame from each so the tiles look right before playback starts.
- Upload all of them as CDN assets and add a new content file used only by the /homepage1 grid.
- The grid keeps its current behavior: muted looping autoplay on the tiles, hover shows the product name, click expands to the full container with controls, plus the existing "Learn more" link.
- The main homepage and every product page keep their existing clips, untouched.

## Notes

- Source clips run roughly 29 to 127 seconds at 1080p (the Guest Facing Display clip is 720p). Point of Sale is by far the longest, so all clips are re-encoded at a modest bitrate to keep the page fast; if a clip should be trimmed shorter, say which and I will cut it.
- New assets live in a homepage1-specific folder so nothing else on the site can pick them up.
