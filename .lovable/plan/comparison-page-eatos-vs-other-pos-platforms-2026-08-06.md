# Comparison page — eatOS vs other POS platforms

A new page at `/comparison` that presents the same comparison content as the current live page, rebuilt to the Apple-standard design language already used on the KDS and Kiosk pages.

## Design direction

- Alternating light / dark full-bleed bands, oversized display headline (clamp 40–88px, tight tracking), narrow centered body copy, generous 120–180px section padding.
- Restrained single accent (the site's green) used only for eyebrows, eatOS column highlight, and check marks. No decorative borders or gradient blobs.
- The comparison matrix is the hero moment: a dark band with the eatOS column raised as a lighter elevated panel that stays visually dominant, competitors in quiet muted columns.
- Competitor names rendered as clean text wordmarks (Square, Toast, Lightspeed, Clover, Revel, Micros) rather than borrowed logo files, with the standard trademark disclaimer note beneath the table.

## Page structure

1. **Hero** — eyebrow "eatOS vs Other POS", headline "eatOS Restaurant Cloud: Complete Comparison", one-line subhead, Book a Demo CTA, wide hardware media plate.
2. **Why switch to eatOS** — four quiet columns (Comprehensive Integration, User-Friendly Experience, Robust Feature Set, Unparalleled Support), each with a short paragraph and an inline "Learn more" link to the matching product page.
3. **Comparison matrix** (dark band) — 13 feature rows (AI Enabled Integration, Restaurant POS with Menu Management, Real-time Cloud Reporting, Order Online, Multi-Location, Pay at Table, Kitchen Display Screen, Self-Service Kiosk, Multi-device/Offline Mode, Workforce Management & Scheduling App, Works with Multiple Payment Processors, 4G Backup + Hotspot Capability) across eatOS + 6 competitors, check / no-check per the reference. Sticky feature column and horizontal scroll on small screens; on mobile it becomes a per-competitor stacked card view so nothing is squashed.
4. **Why businesses choose eatOS** — two alternating media+copy rows (Ease of Use, Scalable) with placeholder media.
5. **All-in-One Restaurant Technology Cloud** — five image-first tiles (Point of Sale, Online Ordering, Workforce Management, Kitchen Display System, Point of Purchase) linking to existing routes.
6. **Closing CTA** (dark) — "Start Using Restaurant Technology Cloud" with Book a Demo / View Pricing.

## Responsive

Explicit desktop / tablet / mobile treatment: hero splits at `lg` and stacks below; the four "why switch" columns go 4 → 2 → 1; matrix is a full table at `lg`, sticky-column horizontal scroll at `md`, stacked per-brand cards below `md`; alternating rows collapse to stacked; ecosystem tiles 5 → 3 → 1 with a swipe row on mobile.

## Footer link

"Comparison" added to the footer Company column (next to Newsroom), matching the live site's footer placement.

## Technical

- New route `apps/web/src/app/comparison/page.tsx` exporting page metadata (title, description, og/twitter), rendering `ComparisonClient.tsx`.
- All copy, feature rows and the competitor support matrix in a local `content.ts` so it's editable in one file.
- Image slots use the shared `apps/web/src/components/marketing/Placeholder.tsx` (label + aspect ratio) so real images can be swapped in one line at a time.
- `motion/react` for fade-and-rise entry animation, respecting reduced motion; Montserrat from the global theme; no new dependencies.
- Confirm `Header.tsx` treats `/comparison` as a light-hero route so nav stays legible.
- Verify at 390px, 820px and 1440px after build.
