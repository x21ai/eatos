# Rebuild the Dashboard and InventoryOS clips with new location names

The two clips currently in the "How it works" section were recorded outside this project, so the location names shown on screen ("Burbank MCS" and "Figaro") cannot be edited. I will rebuild both clips inside this project, the same way the Point of Sale, Kitchen and Kiosk clips are built, so the names live in editable text from now on.

## New location names

- Riverside Kitchen (replaces Burbank MCS)
- Harbor Street Cafe (replaces Figaro)

Both names appear consistently in the location picker, headers and any per-location rows or comparisons.

## What gets rebuilt

**Dashboard clip (landscape)**
A calm, looping walkthrough matching the current clip's beats: sign in, live sales overview with hour by hour chart, labor and menu performance, then a location switch between the two new names.

**InventoryOS clip (landscape)**
Same treatment: counts, purchases, waste and production value, with the location switcher showing the two new names.

Both keep the existing dark eatOS look, Montserrat type, brand pink accents, same frame size, frame rate and roughly the same length as today's clips, so nothing shifts in the layout.

## Where the change shows up

The clips are referenced from one shared place, so replacing them updates every spot at once: the homepage "How it works" rail, the alternate homepages, the Dashboard product page and the InventoryOS product page, on phone, tablet and desktop.

## Technical notes

- New `tools/dashboard-demo/` and `tools/inventoryos-demo/` scene folders (`scene.html`, `scene.js`, `capture.py`), following the deterministic frame-render pattern used by `tools/pos-demo` and `tools/kds-demo`.
- Render frames with Playwright, encode WebM + MP4 plus a poster JPG with ffmpeg.
- Re-point the six existing asset pointer files under `apps/web/src/app/components/assets/` (`dashboard-demo.*`, `inventoryos-demo.*`); no component or data changes needed since `demoSources.ts` already reads those.
- Verify playback and no overflow at 390, 834 and 1280 px widths, and confirm the poster frames show the new names.
