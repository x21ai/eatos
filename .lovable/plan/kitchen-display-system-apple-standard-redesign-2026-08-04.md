# Kitchen Display System — Apple-Standard Redesign

Rebuild `/products/kitchen-display-system` from scratch with an Apple-style product page structure, not the current screenshot layout. Same copy and metrics, entirely new composition, typography scale, and motion.

## Design direction

- Alternating light/dark full-bleed bands instead of one continuous dark page. Apple product pages breathe: near-black hero, then off-white sections, then black again for hardware.
- Oversized display typography: hero headline at clamp 44px–96px, tight tracking (-0.03em), weight 600. Section headlines centered, short, one idea per band.
- Body copy narrow and centered (max-w-2xl), muted grey, generous 24px+ line height.
- Restrained accent: a single cool green used only for eyebrows, metric numerals, and focus rings. No gradients on text, no glow blobs, no emerald cards everywhere.
- Whitespace-first: sections at 120–200px vertical padding on desktop, scaled down for tablet/mobile.
- No borders as decoration. Depth comes from surface tone shifts and soft shadow, not 1px white/10 outlines.
- Rounded 24–32px media containers, edge-to-edge on mobile.

## New page structure

1. **Hero** — centered, stacked: small eyebrow, huge headline, one-line subhead, two pill CTAs, then a wide full-bleed media plate below that scales up slightly on scroll.
2. **Metric marquee** — four large numerals in a single quiet row (from the existing feature metrics), no cards.
3. **Feature spotlights (6)** — each a full-band section, media above or beside copy, alternating alignment, centered headline treatment. Progressive disclosure keeps the "Read more" text but as an inline reveal, not a bordered button.
4. **Hardware band** — black section with a single large centered device shot and three short spec columns underneath.
5. **Ecosystem grid** — six product tiles, uniform, image-first, label under image, hover lift only.
6. **Testimonial** — quiet centered pull quote at large type with attribution beneath; no card.
7. **Offers** — two-up on desktop, stacked on mobile, image-led with a text CTA link rather than a filled button.
8. **Closing CTA** — light band, centered headline, two buttons, then newsletter as a single-line inline field.

## Responsive

Every band gets explicit desktop / tablet / mobile treatment: 2-col media+copy collapses to stacked at `md`, metric marquee goes 4→2 columns, ecosystem grid 3→2→1, hero type and section padding scale via clamp. Media placeholders keep aspect ratio at all widths.

## Technical

- Rewrite `apps/web/src/app/products/kitchen-display-system/KdsPageClient.tsx` fully; keep `content.ts` as the copy source (add a small hardware-spec array and a metrics-marquee array).
- Keep `Placeholder.tsx` but restyle: neutral tone-shift surface that adapts to light and dark bands via a `tone` prop, no visible border.
- Motion via `motion/react`: fade-and-rise on section entry, 0.6s ease-out, stagger 60ms; hero media scale on scroll. Respect reduced motion.
- Continue to use Montserrat from the global theme; no new fonts, no new dependencies.
- Page metadata in `page.tsx` stays as-is.
