# Portrait Kiosk Ordering Animation

Rebuild the Self Service Kiosk demo animation as a tall, portrait screen that follows the full guest journey from the recordings, keeping the Memories Cafe branding, and use it everywhere the kiosk animation currently appears in landscape.

## The flow shown in the animation

Traced from the two recordings, in order:

1. Touch to Start welcome screen with the cafe logo, tagline and card and wallet logos along the bottom.
2. How would you like to dine, Dine In or Take Out.
3. Featured promo banner, search bar and category tiles: Food, Drinks, Dessert, Breakfast, Salads and Bowls, Pizza.
4. Item detail: Classic Cheeseburger with cook temperature, add ons such as double cheese, quantity stepper, Add to Order button with running price.
5. AI suggested Complete your meal panel: combo upgrade added, plus a drink chosen from the Also Try row.
6. Order Review with line items, edit and remove, quantity steppers, subtotal and tax.
7. Payment method: card, QR code, pay at cashier, plus redeem options for loyalty points, coupons and gift card.
8. Thank you for your order with order number, receipt breakdown, SMS and email receipt buttons, New Order countdown and a receipt sliding out of the printer slot at the bottom.

Motion stays gentle: soft fades, short slides, a moving touch cursor with a tap ripple, no snappy jumps. The clip loops back to the welcome screen. Target length is around 40 to 50 seconds.

## Where it gets used

The new portrait clip replaces the current landscape kiosk clip in every place the kiosk demo appears:

- The How it Works product rail and the other demo sections that read from the shared demo list.
- The Self Service Kiosk product page.
- The Homepage1 product grid and its expanded popup, replacing the landscape kiosk video there too, as confirmed.

Every one of these places shows the kiosk inside a wide box today, so each kiosk view switches to a tall kiosk frame that fits the box without cropping or stretching, matching the existing dark styling. The other products keep their current landscape frames untouched.

## Out of scope

No wording, layout or link changes elsewhere. No new pages, no page addresses change, so search rankings are unaffected.

## Technical notes

- New generator at `tools/kiosk-portrait/` following the existing pattern of `tools/kiosk-demo/` and `tools/pos-demo/`: a static `scene.html` plus `scene.js` with a deterministic `window.__render(t)` timeline, driven frame by frame through Playwright in `capture.py`. Viewport becomes portrait (approximately 900x1600 at scale 1), reusing the Montserrat and Pacifico faces and the existing product imagery in `tools/kiosk-demo/products/`, plus stills pulled from the recordings for anything missing.
- Frames encode with the already installed ffmpeg to `kiosk-portrait.webm` (VP9) and `kiosk-portrait.mp4` (H.264, yuv420p, faststart) plus a poster JPEG, then upload through `lovable-assets create` into `apps/web/src/app/components/assets/` and `apps/web/src/app/homepage1/assets/` as pointer JSON, matching how current demo media is stored. File weight is kept low to protect the load times fixed in the recent audit.
- `apps/web/src/app/components/demoSources.ts` gains an orientation flag on the kiosk entry. `TabletMockup.tsx` accepts that flag and renders a portrait kiosk shell; `DemoRailSection.tsx` and the other demo sections centre the tall frame inside their existing fixed-height boxes. `apps/web/src/app/homepage1/showcaseMedia.ts` and `ProductShowcaseSection.tsx` point the kiosk tile and its popup at the portrait sources, with the popup sizing to the portrait ratio as it already does per video.
- Verification: render stills at key timeline points, confirm the encoded clip plays, then check the rail, kiosk product page and Homepage1 grid and popup at 390, 768 and 1280px for cropping or overflow.
