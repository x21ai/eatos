# Kitchen Display video: use the plain "e" mark in the left rail

## What changes

In the Kitchen Display animation, the small mark at the bottom of the white left rail is currently the rounded-square eatOS badge. It gets replaced with the plain black "e" logo you just sent: the glyph on its own, no square, no outline, no background tile. The small version line underneath stays.

Nothing else about the animation changes: same layout, same kitchen ticket flow, same timing and length, same sign-in screen with owner@your-restaurant.com.

Because every page pulls this clip from one shared media list, the new version shows up everywhere the Kitchen Display animation appears (home page rail, the Kitchen Display System page, and the alternate home page layouts) with no page-by-page edits.

## Steps

1. Add the uploaded "e" logo into the animation folder so the render loads it directly.
2. Point the rail mark at that file and drop the badge styling so only the glyph shows, centered in the rail, about 26-30px tall.
3. Re-render the full clip and re-encode the web video, the fallback video and a fresh still frame.
4. Upload the three new files and refresh their pointer records.
5. Check the clip plays and the new mark reads clearly at phone, tablet and desktop widths on the home page and the Kitchen Display System page.

## Technical notes

- Source: `tools/kds-demo/scene.html` (`#rlogo` block plus its CSS), rendered by `tools/kds-demo/capture.py` at 1600x868, 690 frames at 30fps.
- The uploaded PNG is placed in `tools/kds-demo/` (replacing the current `eatos-mark.svg` reference) since the headless render reads from disk.
- Outputs re-uploaded via `lovable-assets create`, refreshing `kds-demo.webm.asset.json`, `kds-demo.mp4.asset.json` and `kds-demo-poster.jpg.asset.json` under `apps/web/src/app/components/assets/`. The poster pointer is currently invalid JSON and throwing a preview error; this rewrite repairs it.
- No React component or copy changes; `demoSources.ts` already reads these pointers.
