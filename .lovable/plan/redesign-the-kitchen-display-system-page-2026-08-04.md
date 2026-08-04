# Redesign the Kitchen Display System page

A dedicated, professionally designed page for Kitchen Display System, replacing the generic product template for this one product. Content follows the reference screenshot; images use neutral placeholders you can swap later.

## Design direction

- Dark, product-first aesthetic consistent with the rest of the site (black canvas, Montserrat, restrained green accent for KDS).
- Editorial rhythm: full-bleed hero, then alternating feature rows, then proof and conversion. Generous whitespace, one idea per section, no decorative clutter.
- Feature stats presented as compact metric pairs (large figure + short label) rather than the cramped stacked blocks on the current live page.
- Responsive at all three breakpoints: single column on mobile, two-column feature rows from `md`, wider container and alternating image side from `lg`.

## Page structure

1. Hero - headline "Streamlines Kitchen Communication and Improves Productivity", short subhead, two CTAs (Book a Demo, Watch Video), placeholder device image, subtle gradient.
2. Key Features strip - six chips: Prep Station Routing, Multi-Lingual Support, Seamless Connectivity, Kitchen-Grade Hardware, Save on Printing, Analytics & Reporting.
3. Six alternating feature sections, each with placeholder screenshot, heading, two metrics, paragraph, and a "Read more" disclosure:
   - Prep Station Routing (10x error-free orders / 100% real-time orders)
   - Multi-Lingual Support (100% multilingual service / 10x more language options)
   - Seamless Connectivity (100% all-in-one / 100% guest-driven)
   - Kitchen-Grade Hardware (5 years peak-tested / 100% grease resistant)
   - Save on Printing (100% smart savings / 24-7 digital shift)
   - Analytics & Reporting (100% cloud-driven / 100% data-driven)
4. Two-up offer cards - "Get Your Own Kitchen Display System" and "Make your own Custom bundle", each with a Shop Now action, plus the small terms note.
5. All-in-One Restaurant Technology Cloud - six-card grid (Point of Sale, Online Ordering, Workforce Management, Kitchen Display System, Front of House, Reporting) with placeholder imagery linking to existing product routes.
6. Band CTA - "Start Using Restaurant Technology Cloud" with Book a Demo / View Pricing.
7. Customer testimonial - quote card with placeholder video still and attribution.
8. Newsletter strip - "Connect to the Future" with email field and Subscribe (static, no submission wiring).

## Technical notes

- New route: `apps/web/src/app/products/kitchen-display-system/page.tsx` (static segment wins over `products/[slug]`), with section components in a `sections/` folder beside it.
- Content lives in a local `content.ts` so text and metrics are editable in one file.
- Placeholder images: a small local `Placeholder` component rendering a neutral block with correct aspect ratio and a label, so swapping in real images later is a one-line change per slot.
- Page-level metadata (title, description, og/twitter) exported from the new `page.tsx`.
- The generic `products/[slug]` route, `products.ts` catalog, and all other pages stay unchanged.
- Verify after build: the page renders at `/products/kitchen-display-system` and looks correct at 390px, 820px, and 1440px widths.