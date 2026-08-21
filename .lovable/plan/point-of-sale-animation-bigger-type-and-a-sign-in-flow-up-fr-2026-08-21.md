# Point of Sale animation: bigger type and a sign-in flow up front

Two changes to the looping Point of Sale clip in the "How it Works" section on the home page.

## 1. Larger, more readable type inside the POS

The animation renders at 1600x1000 but is displayed inside a tablet frame roughly half that width, so the small labels are hard to read. Type gets scaled up across the POS screens:

- Menu item names and prices in the grid: up from ~12.5px to ~16px, with slightly taller item tiles so long names still fit on two lines at most.
- Category tabs and the top pills: up to ~15px.
- Check panel: line item names, prices, modifier lines and totals all scaled up.
- Payment screen (Total Due, tender buttons, quick-cash amounts) and the tickets list (ticket number, name, status, amount) scaled up to match.

Spacing, tile heights and column widths are adjusted alongside so nothing overflows or clips, and the layout still reads as the real eatOS Point of Sale.

## 2. Sign-in flow before the order

Three new beats are added to the front of the loop, recreated from the recording:

1. **Sign in screen.** Split layout: left side the dark marketing panel with a device image and rotating caption; right side the eatos logo, "Sign in" heading, email field already filled, password field, the Sign in button, "Forgot password?", sign up row, and the "OR SIGN IN WITH" row with QR code and Magic link buttons. The cursor moves to the password field, dots fill in as if typed, the Sign in button turns from grey to white (active), then the cursor taps it.
2. **Opening Point of Sale.** Brief black screen with a spinner and "Opening Point of Sale..." while it transitions.
3. **Clock-in / PIN screen.** Left side shows the date, a large time, temperature and location. Right side is the PIN keypad: four masked digits, 1 to 9 / C / 0 / ENTER, the Clock Out, Break, Clock In row, fingerprint / revenue centre / face options and the Logout bar. The cursor taps four digits (each key presses down, a mask character appears), then taps ENTER.
4. Screen transitions into the Point of Sale menu grid, which is where the existing flow (tap item, modifiers, add to check, pay, tickets) continues unchanged.

The whole clip stays silent, autoplaying and looping with no controls, in the same tablet frame. Total length grows from about 18 seconds to roughly 30 seconds.

## Technical notes

- Extend `tools/pos-demo/scene.html` / `scene.js`: new `#signin`, `#loading` and `#clockin` layers, added tap beats and screen crossfades on the single deterministic timeline; `DUR` raised accordingly.
- Type scale changes are CSS-only inside `scene.html`; re-measure tap coordinates after the rescale since taps are element-anchored.
- Re-render frames with `tools/pos-demo/capture.py` at 30fps, encode MP4 (H.264) and WebM (VP9) plus a new poster frame, keeping each under about 2.5 MB.
- Upload through Lovable Assets and replace the pointers in `apps/web/src/app/components/assets/` (`pos-demo.mp4`, `pos-demo.webm`, poster); the superseded assets are removed.
- No change needed to `TabletMockup.tsx` since the render size and aspect ratio stay the same.
- Verify the section on desktop, tablet and mobile widths.
