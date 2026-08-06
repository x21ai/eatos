# Match Home page typography sitewide

## What I found

Only one font is loaded for the whole site: Montserrat, imported in `apps/web/src/app/global.css`, and both the `font-sans` and `font-montserrat` utilities resolve to it. `<body>` in `apps/web/src/app/layout.tsx` already sets `font-montserrat`. So no page is loading a second typeface.

What makes the Kitchen Display System page read as a different font is its type styling, not its family:

- Home headings: `font-bold` with `tracking-tighter` at standard Tailwind sizes (`text-4xl`, `text-6xl`, `text-9xl`).
- KDS headings: `font-semibold` with `tracking-[-0.03em]` at fluid `text-[clamp(...)]` sizes.
- Home eyebrows: `uppercase tracking-widest font-semibold`.
- KDS eyebrows: `uppercase tracking-[0.24em]` at `text-[11px]`.

Lighter weight plus fluid sizing is what makes the letters look like a different typeface.

## What I'll do

1. Keep Montserrat as the single source of truth in `global.css` so `font-sans` and `font-montserrat` stay identical and cannot drift.
2. Normalize the KDS page (`apps/web/src/app/products/kitchen-display-system/KdsPageClient.tsx`) onto Home's typographic system:
   - headings move to `font-bold` with `tracking-tighter` / `tracking-tight`
   - fluid `clamp()` heading sizes replaced with Home's responsive steps (`text-4xl md:text-6xl` family)
   - eyebrow labels aligned to Home's `text-sm uppercase tracking-widest font-semibold`
   - body copy aligned to Home's sizes and weights
   - layout, images, sections and colors stay untouched: only weight, size and tracking change
3. Sweep the other pages that use bespoke `clamp()` heading sizes and `font-semibold` headings and bring them onto the same scale: `/solutions/quick-service`, `/products/self-service-kiosk`, `/comparison`, `/report-fraud`, `/brochures`, `/partners`.
4. Apply `antialiased` consistently at the body level so text rendering weight matches Home everywhere.

## Verification

Screenshot Home and every touched page at desktop, tablet and mobile widths, and confirm the computed font family plus heading weight and tracking match Home on each. Production build check before handoff.

## Not changing

No new fonts, no layout restructuring, no copy or image changes.