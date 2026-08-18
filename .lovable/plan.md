# Quick Service page: use home page style imagery

## What changes

The Quick Service page currently uses its own set of images (hero plus three feature rows). Those get swapped for the cinematic dark style used in the home page "Built for every service style" cards.

- Hero: reuse the existing home page Quick Service card image, so the page and the card match exactly. No new image needed.
- The three feature rows (versatile / offline / repeat): generate three new images in the same dark cinematic style and framing as the home page service cards.
- Hardware bundle image stays as it is.

Layout, copy, icons and spacing stay unchanged. Only the image sources change, verified on desktop, tablet and mobile.

## Credits

Three image generations total (one per feature row), with the hero reusing an existing asset.

## Technical notes

- Point `hero.image` in `apps/web/src/app/solutions/quick-service/content.ts` at `apps/web/src/assets/svc-quick-service.jpg.asset.json`.
- Generate three images at the existing `aspect-[16/10]` ratio, upload as CDN asset pointers into the page's `assets/` folder, and swap the three pillar image imports.
- Leave the old `qs-*` pointers in place unless unused, then remove the unreferenced ones.
