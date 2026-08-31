# Media Kit page

A new `/media-kit` page carrying the same content blocks as the reference, rebuilt in the site's black Montserrat theme instead of the light Wix layout.

## Content on the page

Hero: "Media Kit" title, short eyebrow ("Resources") and one-line description about using eatOS brand assets correctly.

Then the same six items from the reference:

1. **Brand Guidelines** (featured wide card) with the description about consistent brand identity, logo usage, color palette, typography, imagery and tone, plus a Download action.
2. **eatOS logo** (featured wide card) with the jewel and wordmark description and a Download action.
3. **eatOS Icons** with Download.
4. **eatOS Emblem** with Download.
5. **eatOS Products** with an Explore Photos action.
6. **Miscellaneous Images** with an Explore Photos action.

Closing CTA row matching the brochures page (Book a Demo / View Pricing).

## Layout and styling

- Two full-width feature cards at the top (text left, asset visual right), then a 2-column grid for the remaining four, matching the reference's hierarchy but on dark surfaces (`bg-white/[0.04]` cards, white headings, zinc body text, brand pink `#d70480` accents).
- Same reveal-on-scroll motion, spacing scale and hero top offset (`pt-[128px] md:pt-[176px]`) used by `/brochures`, so the page sits consistently with the rest of the site.
- Responsive: single column on mobile, stacked cards on tablet, two columns on desktop.

## Assets

The reference's downloadable files (brand book PDF, logo pack, icon set, emblem, product and lifestyle photo sets) are not in the repo. Each card will render its visual from an existing brand/product asset where one is already available, and its Download / Explore Photos action will point to a placeholder target flagged with a TODO until you send the real files or links. Send the PDFs/zips and I'll wire them to the CDN.

## Wiring

- Route: `apps/web/src/app/media-kit/page.tsx` (metadata: title, description, og/twitter) plus `MediaKitClient.tsx` for the interactive/animated parts, matching the brochures pattern.
- Add "Media Kit" to the footer Resources column and to the `/resources` hub card grid.
- Add `/media-kit` to `apps/web/src/app/sitemap.ts`.
- Verify the route returns 200 and renders cleanly at mobile, tablet and desktop widths.
