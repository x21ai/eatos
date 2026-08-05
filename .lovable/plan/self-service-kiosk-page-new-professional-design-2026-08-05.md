# Self-Service Kiosk page — new professional design

A dedicated page at `/products/self-service-kiosk` (currently rendered by the generic `products/[slug]` template). Content follows the live-site screenshot; images are neutral placeholders you can swap later.

## Design direction — distinct from the KDS page

The KDS page is alternating light/dark bands with centered Apple-style type. The kiosk page takes a different route: a bright, editorial, left-aligned layout with a sticky rail.

- Light canvas (off-white) as the default, with only two dark accent bands (hardware + closing CTA) instead of KDS's dark-dominant rhythm.
- Split hero: copy left, tall portrait kiosk media right, plus a thin row of three key numbers under the copy. Not centered, not full-bleed.
- Feature sections as a numbered editorial list (01–07) with a sticky section title on the left and stacked feature blocks scrolling on the right at `lg`; collapses to plain stacked blocks below `lg`.
- Metrics inline within each feature as a two-column figure/label pair on a hairline rule, no cards.
- Portrait media ratio (3/4) for kiosk shots so tall devices aren't letterboxed, landscape for multi-device shots.
- Accent: single indigo tone (matching the kiosk product color already in the catalog) used for the numbered index, eyebrows and metric numerals only.
- Motion: quiet fade-and-rise on entry, hover lift on offer tiles, sticky-rail progress; respects reduced motion.

## Page structure

1. **Hero** — eyebrow "Self-Service Kiosk", headline "Make Self Ordering Simple & Boost Guests Satisfaction", short subhead, Book a Demo CTA, three inline stats, portrait media on the right.
2. **Key features strip** — six quiet labels in two rows: Designed for Restaurants, Increase Average Check Size, Reduce Wait Times, Reduce Costs, Direct Integration, Durable Hardware.
3. **Feature spotlights (7)** in the sticky-rail editorial list, each with media, heading, two metrics, paragraph and an inline "Read more" reveal:
   - Designed For Restaurant Industry (100% menu efficiency / 100% intuitive ordering)
   - Increase Average Check Size (100% choice assistant / 100% smart upsell)
   - Reduce Wait Times (100% workflow profits / 100% queue-less sales)
   - Reduce Costs (100% customer empowerment / 100% staff-less ordering)
   - Direct Integration (0% synchronization struggles / 100% unified kitchen)
   - Durable Hardware (100% trusted hardware / 100% samsung tablets)
   - Dynamic Payment Processing (100% seamless transactions / 10x secured)
4. **Offers** — two tiles: "Get Your Own Self Service Kiosk" and "Make your own Custom bundle", each with Shop Now, plus the small terms note.
5. **Hardware band** (dark) — one large kiosk shot with three short spec columns.
6. **Closing CTA** (dark) — "Start Using Restaurant Technology Cloud" with Book a Demo / View Pricing.

Per your earlier preference, no "All-in-One" ecosystem grid, no testimonial, no newsletter on this page.

## Responsive

Explicit treatment at all three breakpoints: hero splits at `lg` and stacks below; stats 3-up → 3-up compact → 2-up; key-feature strip 3 cols → 2 → 1; sticky rail only at `lg`, plain stack on tablet/mobile; feature media full-width on mobile with matched aspect ratio; hardware specs 3 → 1.

## Technical

- New static route `apps/web/src/app/products/self-service-kiosk/page.tsx` (wins over `products/[slug]`) exporting page metadata (title, description, og/twitter), rendering a `KioskPageClient.tsx`.
- Copy and metrics in a local `content.ts` so text is editable in one file.
- Reuse the shared `apps/web/src/components/marketing/Placeholder.tsx` for every image slot (label + aspect ratio), so swapping in real assets is a one-line change per slot.
- `motion/react` for entry animation; Montserrat from the global theme; no new dependencies.
- Header light/dark handling: since the hero is light here, confirm `Header.tsx` treats this route as a light page so the logo and nav stay legible.
- The generic `products/[slug]` route and `products.ts` catalog stay unchanged.
