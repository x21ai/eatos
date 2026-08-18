# Bar & Nightclub page rebuild

Bring `/solutions/bar` up to the same standard as the Cafe and Full Service pages. Today it is a short light-themed placeholder with three small cards; it will become a full dark editorial page with cinematic imagery.

## What changes

- Replace the white page with the black solutions template, using a rose accent (already the page's badge color) for glows, icon tiles and highlights.
- Hero: breadcrumb (Solutions / Bar & Nightclub), icon tile, headline "Point of Sale System for Bars and Nightclubs", accent eyebrow line, a two-line description, Book a Demo and View Pricing buttons, and a single hero image on the right in the narrower column used on the Cafe page.
- Highlights strip: four descriptive cards (fast tabs, everyone in sync, 24/7 support, no upfront hardware cost) matching the other solutions pages.
- Three alternating feature rows with generated cinematic dark images:
  1. Tab management and card on file, so tabs open and close in seconds.
  2. Real-time bar inventory for kegs, bottles and pours.
  3. Age verification and compliance with ID scanning built in.
  Each row gets body plus supporting copy long enough to visually balance its image, as on the Cafe page.
- "Why eatOS for bars and nightclubs" three-card section (speed at the rail, reliable through last call, 24/7 support).
- "Works great with" cards linking to Tap to Pay, Point of Sale and Workforce Management.
- Closing CTA band with Book a Demo and View Pricing.
- No bundle section and no separate Key Features section, matching the current Cafe layout. No em dashes anywhere in the copy.

## Technical notes

- New files: `apps/web/src/app/solutions/bar/content.ts` (all copy plus image imports), `apps/web/src/app/solutions/bar/BarClient.tsx` (client component using `motion/react` and `Placeholder`), and `page.tsx` reduced to metadata plus `<BarClient />`.
- Reuse `src/assets/svc-bar.jpg` for the hero; generate three new images into `apps/web/src/app/solutions/bar/assets/` following the `*.asset.json` pattern.
- Responsive behaviour follows the existing template: single column on mobile, stacked rows on tablet, `lg:` grids on desktop; verified across mobile, tablet and desktop widths in the preview.
