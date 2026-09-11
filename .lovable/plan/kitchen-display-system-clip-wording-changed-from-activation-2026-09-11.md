# Kitchen Display System clip: wording changed from activation to login

The opening screen of the Kitchen Display System animation currently reads as device activation. It becomes a sign in screen instead, since the three columns are simply different ways to log in. Layout, light theme, eatOS logo, QR square, pairing link, code tiles, field, button and the whole animation after it stay exactly as they are.

## Wording changes on that screen

- Title: "Sign in to eatOS"
- Line under the title: "Sign in using one of the options below."
- Option 3 heading: "Sign in with Code"
- Bottom pill: "Sign in with AI"

Everything else on the screen keeps its current text: the option labels, "Scan this QR code", "Use a browser", the two numbered steps, the pairing link, the code, the field placeholder and the "Send Code" button.

## Technical notes

- Edit the four strings in `tools/kds-demo/scene.html` (title, subtitle, option 3 heading, assist pill) and rename the stale `activation` comments in `scene.html` and `scene.js`. No timeline, cursor or layout changes.
- Re-render with `tools/kds-demo/capture.py` at 1600x868, 30fps, then encode MP4 (H.264), WebM (VP9) and a poster JPG.
- Upload through Lovable Assets and refresh the three pointers in `apps/web/src/app/components/assets/`.
- Verify playback on `/` and `/products/kitchen-display-system` at 390, 834 and 1280 widths.
- Point of Sale clip is untouched.
