# Kitchen Display System: rebuild on the Handheld page layout

The current KDS page uses its own long cinematic editorial layout. Replace it with the same structure the Handheld POP page (`/products/point-of-purchase`) uses, keeping all existing KDS copy, metrics and images.

## New page structure (matching Handheld)

1. **Hero (two columns)**
   - Breadcrumb: Products > Kitchen Display System
   - Rounded icon tile (ChefHat) in the accent color
   - H1 "Chaos, controlled." plus an accent tagline line and the description paragraph
   - Buttons: Book a Demo / Get Started
   - Right column: glass "Key Features" card listing the six KDS features with check bullets
   - Soft accent gradient glow behind the hero

2. **Numbers strip**
   - The four existing KDS stats (10x, 100%, 5 yrs, 24/7) in a quiet row under the hero. This is the one addition to the Handheld skeleton, since the KDS content already has them.

3. **Feature sections**
   - The six KDS features (Prep Station Routing, Multi-Lingual Support, Seamless Connectivity, Kitchen-Grade Hardware, Save on Printing, Analytics and Reporting) as alternating image and text rows in the Handheld card language: rounded 2rem cards, white/5 surfaces, images filling their frame edge to edge.
   - Each keeps its two metrics, main body and extra detail paragraph.

4. **"Why Kitchen Display System?"**
   - Three benefit cards in the Handheld style (Built for speed, Reliable at scale, 24/7 support) with copy tuned to the kitchen.

5. **Works great with**
   - Three related product cards from the existing product list, same card and hover treatment as Handheld.

6. **CTA band**
   - Gradient rounded panel: "Ready to get started?" with Book a Demo and Contact Sales.
   - Keep the existing customer quote and the offer note beneath it.

## Design rules kept
- Montserrat, `font-bold tracking-tighter`, sentence case headings
- Section rhythm `py-20 md:py-28`
- Zinc, black and white palette plus one accent color for KDS
- No em dashes in any copy
- Desktop, tablet and mobile all verified: single column stacking below `lg`, images stay full cover, tap targets stay comfortable

## Technical notes
- Rewrite `apps/web/src/app/products/kitchen-display-system/KdsPageClient.tsx` to the Handheld layout, driven by the existing `content.ts`. No copy or asset changes.
- Sections the new layout does not use (scroll driven editorial blocks, hardware spec split, offers grid, cloud product list) are dropped or folded into the sections above.
- Route, metadata and `page.tsx` stay as they are.
- Verified with a production build and screenshots at all three viewports.