# New activation screen for the Kitchen Display System clip

The Kitchen Display System animation currently opens with a sign in screen (photo on the left, email and password form on the right). That opening screen gets replaced by a device activation screen modelled on the reference, rebuilt in a light theme with the eatOS logo. Everything after it (the clock-in keypad, the ticket board, the taps and the loop) stays exactly as it is.

## What the new opening screen shows

Light background, eatOS logo centred at the top, then:

- Title "Activate your device" with the line "Activate your device using one of the options below."
- Three columns separated by thin dividers with a small "OR" between them:
  1. Option 1, "Scan this QR code", with a QR square and its short instruction line.
  2. Option 2, "Use a browser", with the eatOS pairing link and a six character code shown in individual key tiles.
  3. Option 3, "Activate with Code", with an email or phone field and a "Send Code" button.
- A single pill button at the bottom for activating with assistance.

## How it animates

Around the same length as the current sign in beat, so the overall clip length does not change:

1. Screen fades in, logo and title settle.
2. The code tiles pop in one after another.
3. The cursor moves to the Option 3 field, the email types in, then the Send Code button is tapped.
4. Brief loading ring, then the clock-in keypad appears exactly as it does today.

Type sizes stay large enough to read inside the tablet frame on phone, tablet and desktop.

## Notes

- Colours follow the site: light surfaces, dark text, brand pink for the active field, the tap target and the loading ring. The reference is used for layout only, not for its dark palette or its branding.
- The QR square is generated as part of the screen, not copied from the reference image.
- Only the Kitchen Display System clip changes. The Point of Sale clip keeps its current sign in screen.

## Technical notes

- Edit `tools/kds-demo/scene.html` and `tools/kds-demo/scene.js`: replace the `#signin` markup, styles and its timeline segment with an `#activate` screen; reuse the existing cursor waypoint, tap ripple and loading helpers. Keep the existing eatOS mark asset in `tools/kds-demo/`.
- Re-render with `tools/kds-demo/capture.py` at 1600x868, 30fps, then encode MP4 (H.264) and WebM (VP9) plus a poster JPG, targeting roughly the current file sizes.
- Upload through Lovable Assets and refresh the three pointers in `apps/web/src/app/components/assets/` (`kds-demo.mp4`, `kds-demo.webm`, `kds-demo-poster.jpg`). No component changes needed.
- Verify playback on `/` and `/products/kitchen-display-system` at 390, 834 and 1280 widths.

## Open point

The reference shows a pairing link and a code. Unless you tell me otherwise I will use `eatos.com/pair` and a random six character code.
