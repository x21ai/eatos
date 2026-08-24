# Rebuild the Point of Sale animation from the new recording

The current animation in "How it Works" > Point of Sale is the old dark POS interface. Your new recording shows a completely different product: light theme, magenta accent, email sign-in, a clock-in keypad, the brunch menu, modifier sheet and a cash tender. The animation gets rebuilt as a coded replica of that new UI, same technique as today (deterministic scene rendered frame by frame, encoded to a silent looping clip), so it stays crisp and small rather than a heavy screen capture.

## What the new animation shows

One continuous loop, roughly 20 to 24 seconds, every transition triggered by a visible tap:

1. Sign in screen: eatOS Point of Sale card on a light background, cursor taps the email field, the address types in, password fills as dots, tap "Sign in".
2. Brief loading ring, then the clock-in screen with the date, time, weather and the number keypad. Cursor taps a few digits, then "Clock In".
3. Menu screen: left icon rail, Bar Menu / Brunch / Dinner tabs, category chips, item grid, guest check panel on the right.
4. Cursor taps "Chicken Crepe", the item sheet opens with Item / Add-ons tabs and modifier chips. Cursor taps Temperature, then "Medium Rare", then "Add".
5. Sheet closes, the line item animates into the check, Sub Total, Tax and Total count up.
6. Cursor taps "Charge", the Total Due screen appears, cursor taps Cash, keypad shows the tendered amount, tap "Charge".
7. Paid confirmation toast, check clears back to an empty ticket, loop restarts.

Type sizes stay large enough to read inside the tablet frame on desktop and mobile, same as the current clip.

## Technical notes

- Rewrite `tools/pos-demo/scene.html` and `scene.js` to the new light UI (magenta `#E6007E`-family accent, Montserrat, white surfaces, thin borders), keeping the existing single deterministic timeline model.
- Sample reference frames from the uploaded recording for exact layout, colors and copy; nothing is traced pixel for pixel from the video file itself.
- Re-render with the existing Playwright capture script at 30fps, encode MP4 (H.264) and WebM (VP9) plus a poster frame, target under about 2 MB per format.
- Upload through Lovable Assets and replace the three pointers in `apps/web/src/app/components/assets/`; delete the superseded assets.
- Update the aspect ratio in `apps/web/src/app/components/TabletMockup.tsx` if the render size changes; `demoSources.ts` keeps its current shape.
- Verify in the preview at desktop, tablet and mobile widths.

## Open point

The recording is 60 seconds of real-time use. The loop is condensed to roughly 20 to 24 seconds by trimming dead air and typing faster. Say the word if you want the full-length pace instead.
