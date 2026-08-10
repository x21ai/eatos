# Quick Service page: colored icons and new imagery

## What changes

1. Colored icon above each feature-row title
   Each of the three feature spotlights ("Be versatile and prepared with eatOS", "Don't refuse service if your Wi-Fi is down", "Keep them coming back for more") gets a rounded tinted icon tile above its heading, matching the style of the "Why eatOS for quick service?" cards.
   - Versatile: layers icon, sky tint
   - Offline / Wi-Fi: wifi-off icon, amber tint
   - Repeat / loyalty: heart-handshake icon, rose tint

2. Colored icons on the "Works great with" cards
   Each of the three related product cards gets the same tinted icon tile above its title:
   - Self-Service Kiosk: monitor icon, violet tint
   - Kitchen Display System: chef-hat icon, orange tint
   - Workforce Management: users icon, teal tint

3. Fresh AI imagery
   Generate new images for the hero and the three feature rows, in a consistent cinematic dark look that suits the black page background:
   - Hero: quick-service counter with an eatOS-style terminal and a guest paying
   - Versatile: multiple ordering channels (counter, handheld, kiosk) in one bright fast-casual space
   - Offline: staff completing a card payment on a handheld during a busy shift
   - Repeat: a loyalty / menu-board moment at the counter
   The old image files are replaced so nothing else on the site is affected. The hardware bundle image stays removed.

## Technical notes

- Edits are limited to `apps/web/src/app/solutions/quick-service/QuickServiceClient.tsx` (icon tiles, mapped from the pillar id and related-card entry) and `content.ts` (new image imports).
- New images are generated at 16:10 to match the existing `aspect-[16/10]` frames and stored as CDN asset pointers in the page's `assets/` folder, same pattern as today.
- Tints use the existing token-free zinc/emerald-adjacent palette used elsewhere on the page (`bg-<color>-500/15 text-<color>-400`), verified on desktop, tablet and mobile.
- Montserrat, `font-bold tracking-tighter` headings and the `py-20 md:py-28` rhythm stay unchanged. No em dashes.
