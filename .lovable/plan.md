# Self-Service Kiosk "How it Works" animation: images, login and settings

I signed into your kiosk6 reference app and pulled the real assets, so the marketing animation can match it exactly instead of using grey placeholder shapes.

## What gets fixed

1. **Real product photography** on every screen of the kiosk animation
2. **New Login screen** before Touch to Start, styled exactly like the eatOS Point of Sale sign in
3. **New Settings screen** walking all five tabs (Menu, General, Gratuity, Printer, Advance) then DONE
4. **Touch to Start** rendered with the exact script lettering artwork from the reference app

## Assets captured

Downloaded from the reference app into `tools/kiosk-demo/products/`:

- 10 plated food photos: cheeseburger, Peruvian chicken sandwich, spaghetti and meatballs, rigatoni ragu, spicy sausage linguine, wiener schnitzel, skirt steak, branzino, jidori chicken, grilled chicken breast
- 3 drink photos, 3 category photos
- `touch.png`, the "Touch to Start" script lettering artwork

## Where the images appear

| Screen | Change |
| --- | --- |
| Menu grid | Each of the 9 cards shows its own dish photo instead of the grey disc |
| Item detail | Cheeseburger hero photo replaces the gradient block |
| Upsell modal | Suggested item shows a real dish photo, "Also try" row shows three drink photos |
| Order review | Line item and all four "Add something?" suggestions get their photos |
| Touch to Start | Script lettering image replaces the web-font headline |

## New screens and timing

The animation currently opens on Touch to Start. It will open on the login, matching the Point of Sale scene (photo left, eatOS logo and email/password panel right, pink Sign in button):

```text
Sign in            0.0 - 6.6s    types johndoe@eatos.com, password, taps Sign in
Settings           6.6 - 15.8s   Menu, General, Gratuity, Printer, Advance, taps DONE
Touch to Start    15.8 - 20.2s   unchanged, now with the script lettering artwork
Phone, menu, item, upsell, review, tip, payment, done   unchanged, shifted later
```

Total runtime goes from 33.4s to roughly 49s.

The Settings screen reproduces the reference layout: left sidebar with the five colour-coded tabs and a search field, right pane with the tab header card and its real rows (Categories and Add-Ons counts, the General toggles, gratuity unit and suggested amounts, printer selections and bill toggles, server connection and device name), plus the DONE pill bottom right.

## Technical notes

- All edits are confined to `tools/kiosk-demo/scene.html` (styles and markup) and `tools/kiosk-demo/scene.js` (timeline offset, cursor waypoints, tap ripples, per-tab state).
- The scene stays fully deterministic: `window.__render(t)` still paints the exact state at time `t`, so frame capture is unchanged.
- The existing timeline is shifted by a single offset constant rather than being rewritten, so the current kiosk ordering flow keeps its exact pacing.
- After the scene is updated I re-run `tools/kiosk-demo/capture.py` and the encode step, then swap the new MP4/WebM plus poster into the kiosk demo source so the Self-Service Kiosk page and the home page "How it Works" rail both play the updated animation.
