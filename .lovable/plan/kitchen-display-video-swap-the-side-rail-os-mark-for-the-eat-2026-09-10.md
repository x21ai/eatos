# Kitchen Display video: swap the side-rail "OS" mark for the eatOS "e" logo

## What changes

In the Kitchen Display System animation, the bottom of the white left-hand rail currently shows a plain bold "OS" text mark with a version line under it. That gets replaced with the eatOS brand mark taken from the 7.0 Dashboard project: the rounded-square outline with the gold core dot, the same mark used as that product's icon. The version line stays, sized to sit neatly under the mark.

Nothing else in the animation changes: same layout, same timing, same length, same kitchen ticket flow, same sign-in screen with owner@your-restaurant.com.

Because every page pulls the Kitchen Display clip from one shared media list, the new version appears everywhere the clip is used (home page rail, the Kitchen Display System product page, and the alternate home page layouts) with no page-by-page edits.

## Steps

1. Copy the brand mark file from the 7.0 Dashboard snapshot into the animation folder next to the other artwork it already uses.
2. Update the rail footer in the animation scene so it renders the mark image above the version text, centered in the 76px rail, roughly 30px tall.
3. Re-render the full clip (690 frames, 30 fps, 23 seconds) and re-encode the WebM and MP4 versions plus a fresh still frame.
4. Upload the three new files and update their pointer records, which also repairs the still-frame pointer that is currently corrupt and throwing an error in the preview.
5. Verify the clip plays and shows the new mark at phone, tablet and desktop widths on the home page and the Kitchen Display System page.

## Technical notes

- Scene source: `tools/kds-demo/scene.html` (`#rlogo` block and its CSS), rendered by `tools/kds-demo/capture.py` at 1600x868.
- Asset source: `public/eatos-mark-gold-core.svg` from project `7.0 - Dashboard (Customer Facing)`; copied into `tools/kds-demo/` so the headless render loads it from disk.
- Outputs re-uploaded with `lovable-assets create`, refreshing `apps/web/src/app/components/assets/kds-demo.webm.asset.json`, `kds-demo.mp4.asset.json` and `kds-demo-poster.jpg.asset.json`.
- No React component or copy changes; `demoSources.ts` already reads these pointers.

## Assumption to confirm

No image came through on this message, so this plan uses the eatOS mark from the dashboard project (rounded square with gold center dot). If you meant a different lowercase "e" glyph, send it and I will use that file instead.
