# Make the kiosk screen fill its space

## Why it looks small

The demo panel on the home page rail is locked to one fixed height (480px on desktop) for every product, because all the other clips are wide. The tall kiosk clip has to fit inside that same short box, so it can only be about 270px wide, which reads as a tiny phone floating in a large black panel. The frame itself is correct, the box around it is the limit.

## The fix

- When the kiosk (tall) clip is showing, the panel grows taller instead of staying at the wide-clip height, so the kiosk screen fills the available area comfortably.
- On phones and tablets the panel uses a tall ratio for the kiosk so the screen is close to full width, rather than being squeezed into a wide ratio.
- The tall frame stays centred with a sensible maximum width so it never overflows the panel or the page.
- The other five products keep their current wide panel exactly as it is.

Same treatment is applied to the Self Service Kiosk product page block and the Homepage1 grid tile and popup, so the kiosk reads at a proper size in every place it appears.

## Checks

View the home page rail, the kiosk product page and the Homepage1 grid and popup at 390, 768, 1280 and 1600px, confirming no cropping, no stretching, no sideways scrolling, and that the other products are unchanged.

## Technical notes

- `apps/web/src/app/components/DemoRailSection.tsx`: replace the shared `lg:h-[480px]` with an orientation-aware height (portrait gets roughly `lg:h-[680px]`, mobile/tablet gets a tall `aspect-[3/4]`/`aspect-[9/16]` treatment); keep the landscape branch untouched.
- `apps/web/src/app/components/TabletMockup.tsx`: portrait shell keeps `aspect-[9/16]` with `h-full w-auto` and gains a max width so it centres cleanly.
- `apps/web/src/app/products/self-service-kiosk/KioskPageClient.tsx` and `apps/web/src/app/homepage1/ProductShowcaseSection.tsx`: widen the portrait container caps so the tall clip is not artificially small.
- Presentation only, no content, link or data changes, so no SEO impact.
