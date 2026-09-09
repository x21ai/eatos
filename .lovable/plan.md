# Finish the video hero home page at /homepage3

## What I found

The page does exist and does answer on the working copy: I opened `/homepage3` in a test browser and it returned the page, the headline, and all twelve sections below it (logo marquee, platform overview, How it Works, concepts, hardware, intelligence, results, switching, closing call to action, newsletter).

Two real problems explain what you saw:

1. The hero shows as a near-black panel. The footage was set to load only on screens wider than a tablet, and the clips are remote files with no still image behind them, so before they arrive the hero looks like an empty black screen. On a phone or tablet it never loads footage at all.
2. It is not on your live site. `/homepage3` was added after the last publish, so on the published address it is simply not there yet.

## What I will build

**Hero that always shows something**
- A poster still frame renders instantly, so the hero is never blank.
- Footage plays on phone, tablet and desktop, with a light single clip on phones instead of the full rotation so mobile data is not burned.
- Clips preload the first one only, cross fade to the next, and quietly fall back to the poster plus brand gradient if a clip fails or the visitor asks for reduced motion.
- Hero content vertically centered and tightened so the headline sits in view on a 13 inch laptop without scrolling, and the stats strip stays on screen.
- Layout checked at phone, tablet, laptop and wide desktop widths.

**Brand consistency**
- Accents on this page use brand pink `#d70480` rather than the indigo and purple carried in from the older sections, including the results cards, section labels and the "Learn more" links, without touching the sections other pages use.
- Montserrat throughout, no em dashes, no hardcoded content that already lives in a data file.

**Stats strip**
- The current values read as placeholders ("Hours back", "Higher", "More", "Bigger"). I will keep the same four measures but present them as labelled outcomes so the strip reads as intentional rather than unfinished. I will not invent numbers. If you want real figures there, send them and I will drop them in.

**Make it reachable**
- Confirm the route is picked up by the publish step so `/homepage3` works on the live address exactly like `/homepage1` and `/homepage2`.
- Keep it hidden from search (no index) so it does not compete with your real home page.

**Verification before I hand back**
- Load the page at phone, tablet and desktop widths, confirm the hero shows immediately, footage plays, every section below renders, and no errors appear.
- Confirm the live home page, `/homepage1` and `/homepage2` are untouched.

## Technical detail

- `apps/web/src/app/homepage3/sections/HeroVideoSection.tsx`: add a poster image, replace the width gate with a mobile single clip path, add `onError` fallback to poster, `playsInline`/`muted`/`loop` kept, `preload="metadata"` for clip one and `none` for the rest, centered flex layout with `min-h-[100svh]` and clamped type scale.
- Brand accent pass on the sections consumed by `homepage3` only; where a shared section hardcodes indigo, wrap or pass an accent prop rather than editing the shared file used elsewhere.
- Confirm `scripts/prepare-dist.mjs` emits `dist/homepage3` from the prerendered HTML; `robots: index false` stays in `homepage3/layout.tsx`.
- Verified with Playwright at 390, 834, 1280 and 1600 px widths.
