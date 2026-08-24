# Kitchen Display System animation in "How it Works"

The KDS tab currently loads the live KDS app in an iframe. It gets replaced by a silent, looping coded animation in the tablet frame, exactly like the Point of Sale tab, and it opens with the same sign in and PIN clock-in screens used in the Point of Sale clip.

## What the animation shows

One continuous loop, roughly 22 to 26 seconds, every change driven by a visible tap or a timer tick:

1. Sign in screen reused from the Point of Sale animation, retitled for Kitchen Display System: email types in, password fills as dots, tap Sign in, brief loading ring.
2. Clock-in keypad screen, same layout as Point of Sale: date, time, keypad, a few digits tapped, tap Clock In, success toast.
3. KDS board appears: dark top bar with chef name, HEAD CHEF badge and Dinner Service, left icon rail, four ticket columns in horizontal mode, right Summary panel with Overtime, Unseen, Appetizers, Entrees, Items, Desserts, Salads counts, bottom bar with the orders in queue count and the view controls (Grid, Horizontal, Stagger).
4. Ticket timers count up live, one ticket crosses into the red overtime state.
5. Cursor taps Seen on a ticket, then taps the bump control on individual items so they mark as prepared, then the ticket state changes to Preparing.
6. The completed ticket bumps off the board, the remaining columns slide left, a new ticket slides in from the right, and the queue count and Summary counts update.
7. Board settles, loop restarts.

Ticket names, allergy chips, item lines and timer styling follow the recording (scheduled pickup, phone in, take out, table, drive thru, plus allergy tags and prep notes). Type sizes stay large enough to read inside the tablet frame on desktop and mobile.

## Presentation

- Same tablet mockup, same caption treatment and same silent autoplay loop as Point of Sale.
- The other four tabs (Kiosk, CFD, Dashboard, InventoryOS) keep their live iframes unchanged.

## Technical notes

- New `tools/kds-demo/scene.html`, `scene.js` and `capture.py`, modelled on the existing `tools/pos-demo` deterministic single-timeline approach. The sign in and clock-in markup and timing are copied from `tools/pos-demo` and relabelled.
- Reference frames are sampled from the uploaded recording for layout, colors and copy; nothing is traced from the video file itself.
- Render at 1600x868 to match the existing tablet aspect, 30fps, then encode MP4 (H.264) and WebM (VP9) plus a poster JPG, targeting under about 2 MB per format.
- Upload the three outputs through Lovable Assets into `apps/web/src/app/components/assets/` and add a `media` block to the `kds` entry in `apps/web/src/app/components/demoSources.ts`. `DemoRailSection.tsx` already renders `TabletMockup` whenever a demo has `media`, so no component change is needed.
- Verify in the preview at desktop, tablet and mobile widths.

## Open point

The recording is 107 seconds of real-time service. The loop is condensed to roughly 22 to 26 seconds by trimming idle time. Say the word if you want a longer clip.
