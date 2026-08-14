# Individual competitor comparison pages

Add a dedicated page for each competitor listed in the comparison table, using our own dark page template rather than the layout in the screenshots.

## Pages

Seven new pages, one per competitor:

- /comparison/toast, /comparison/square, /comparison/lightspeed, /comparison/spoton, /comparison/touchbistro, /comparison/revel, /comparison/micros

Each page reuses the existing comparison page structure (black theme, emerald accents, Montserrat, bold tight-tracked headings) and contains:

1. Hero: breadcrumb (Comparison > eatOS vs Brand), title "eatOS vs Brand", the subline "What's the best all-in-one restaurant Point of Sale for your business?", Book a Demo and View Pricing buttons, plus a key highlights card.
2. Head-to-head table: "How eatOS compares to Brand" with two columns (eatOS, Brand) and the same twelve feature rows, with each brand's check marks taken from its screenshot. Desktop and tablet get the table, mobile gets stacked cards.
3. Why Switch to eatOS: the four brand-specific reason cards from each screenshot (titles, descriptions, and "Learn more" links), with colorful icon tiles.
4. Disclaimer and competitive-data note.
5. Closing CTA (Book a Demo / View Pricing).

The "All-In-One Restaurant Technology Cloud" carousel from the screenshots is not included.

## Linking from the comparison table

On /comparison, each competitor column header becomes a link to that brand's page (the eatOS column stays plain text). On mobile, each brand card header links to the same page, so the entry point works on every viewport.

## Technical notes

- One dynamic route `apps/web/src/app/comparison/[competitor]/page.tsx` plus a client component, driven by a new `competitorContent.ts` data module keyed by slug (brand name, feature support array, why-switch items with icons).
- `generateStaticParams` returns the seven slugs so the static export includes them; per-page `metadata` (title, description, openGraph, twitter) is generated per brand.
- The twelve feature labels and their order come from the existing `matrix` data in `apps/web/src/app/comparison/content.ts`; per-brand support values live in the new module.
- Existing hero and section images are reused; no new image generation.
- Copy contains no em dashes.
- Verified across desktop, tablet, and mobile widths.