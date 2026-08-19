# Site-Wide Side Spacing to Match the Service Style Section

## Goal
Give the header, footer, and every home page section the same content width and side spacing as the "Built for every service style" grid (currently constrained to `max-w-6xl`), so the whole page reads as one consistent column instead of a full-width container.

## What will change

1. **Shared content width**
   - Every home page section wrapper moves from `container mx-auto px-5 md:px-6` to a constrained wrapper: `mx-auto w-full max-w-6xl px-5 md:px-8 lg:px-10`.
   - This matches the service style grid width exactly, so its `max-w-6xl mx-auto` becomes redundant and is removed (the grid then just fills the section).

2. **Header**
   - Inner row moves to the same `max-w-6xl` + matching horizontal padding, so the logo and nav align with page content below.
   - Mega menu / dropdown panels keep their current behavior but their inner content aligns to the same width.

3. **Footer**
   - Inner wrapper moves to the same `max-w-6xl` + matching padding so footer columns line up with the sections above.

4. **Compacting sections**
   - Because content is narrower, the sections that stretched to fill width get tightened: bento grid, hardware row, integrations grid, reports, live demo, social proof, and newsletter get slightly reduced internal gaps/padding where the narrower column would otherwise feel cramped or leave odd gaps.
   - Vertical rhythm stays as-is; only horizontal spacing and internal gaps are touched.

## What will not change
- Colors, typography scale, copy, images, icons, animations.
- Mobile spacing behavior stays effectively the same (mobile is already narrower than `max-w-6xl`; padding stays at `px-5`).
- Other pages (solutions, comparison, products) are untouched in this pass.

## Files
- `apps/web/src/app/page.tsx` — all section wrappers.
- `apps/web/src/components/Header.tsx` — inner row wrapper.
- `apps/web/src/components/Footer.tsx` — inner wrapper.
- Home page section components under `apps/web/src/app/components/` that own their own wrapper (live demo, newsletter, VoiceOS) get the same wrapper treatment.

## Verification
- Preview at desktop, tablet, and mobile: header, all home sections, and footer left/right edges align on one vertical line matching the service style cards, with no horizontal scroll.
