# KDS Page — Tighten to Home Page Scale

The Kitchen Display System page currently runs oversized: a long two-line hero title, an eyebrow label above it, wide body copy, and a very tall hero image. This tightens the whole page to the Home page's rhythm.

## Hero changes

- Remove the "Kitchen Display System" eyebrow above the title entirely.
- Shorten the title to a short, punchy line instead of the long sentence — "Chaos, controlled." style, matching the Home page's short headline pattern.
- Move the long descriptive sentence into a shorter one-line subhead (trimmed, not the full paragraph).
- Reduce hero type from the current oversized step to the Home section scale: `text-4xl md:text-7xl font-bold tracking-tighter`, body at `text-[15px] md:text-[22px]` light grey.
- Hero image gets a shorter aspect ratio (16/9, capped max-width) instead of the tall 4/3-on-mobile full-bleed plate, and loses the scroll-scale growth so it stays contained.

## Spacing and section scale

- Match Home page vertical rhythm: sections at `py-20` to `py-32` (Home uses these), heading blocks with `mb-6` / `mb-16` gaps rather than the current larger custom spacing.
- Section headings drop to `text-4xl md:text-6xl`; feature body copy to `text-[15px] md:text-lg`.
- Metric numerals to `text-4xl md:text-5xl` with `text-sm` labels, same as Home's stat row.
- Feature spotlight images use a contained `aspect-[16/10]` and equal grid gaps so nothing dominates the band.

## Responsive

Applies at all three widths: mobile keeps stacked single-column with reduced padding, tablet collapses 2-col media+copy at `md`, desktop keeps the Home page container width. Hero and section type scale through the same responsive steps Home uses — no fluid `clamp()`.

## Technical

- Shorten `hero.title` / `hero.description` and remove use of `hero.eyebrow` in `apps/web/src/app/products/kitchen-display-system/content.ts`.
- Edit `KdsPageClient.tsx`: drop the `Eyebrow` in the hero, remove `useScroll`/`useTransform` hero scaling, and reduce type + padding classes throughout Hero, Spotlight, Hardware, Offers, Closing.
- Placeholder ratios adjusted per call site; no change to `Placeholder.tsx` itself.
- No copy source, route, metadata, or dependency changes.
