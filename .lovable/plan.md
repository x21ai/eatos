# Point of Sale page update

Keep the existing hero and the interactive Point of Sale canvas, tidy their spacing, and rebuild the rest of the page with the features content from the reference screenshot. No new images are generated: every feature uses a blank placeholder so the real images can be dropped in later.

## What stays

- Hero ("Focus on the food.") with Book a Demo and Brochure buttons.
- The interactive Point of Sale canvas mock below the hero.

## Spacing and layout fixes

- Hero and canvas both move onto the shared `site-container` spacing so their left/right edges match the header, footer and the rest of the site.
- Canvas gets a slightly tighter top/bottom rhythm and its own max width aligned to the container instead of a wider one-off wrapper.
- Canvas mock keeps its current design but stacks cleanly on tablet and mobile with no horizontal overflow.

## New content structure

1. **Key Features** band, six chips in a compact grid:
   - Built-in Online Ordering
   - Order and Pay at Table
   - Table Management
   - Works Offline
   - Real-Time Menu Management
   - Multi-User Environment
2. **Feature rows** (alternating left/right, matching the Point of Purchase page style), each with a title, two metric tiles, a description and an image slot:
   - Real-Time Menu Management, 100% AI Generated, 100% Efficiency Gain
   - Table Management, 24/7 Optimize Service Flow, 100% Turnover Visibility
   - Built-in Online Ordering, $0 3rd Party App Commission, 100% White Labeled App and Website
   - Order and Pay at Table, 100% Speedy Checkout, 100% Payment Agility
   - Multi User Environment, 100% Data Driven, 100% Team Synergy
   - Works Offline, 100% Offline Reliability, 100% Business Continuity
3. The existing three-column detail block (Dark Mode Native, Offline First, Multi-Course Fire) is replaced by the feature rows above, since the same points are covered there.

Copy is written in the site voice from the reference wording, always "Point of Sale" (never the short form), and with no em dashes.

## Technical detail

- New `apps/web/src/app/point-of-sale/content.ts` holding hero copy, key features and the feature rows (title, body, more, metrics, imageLabel, `image: null`).
- New `apps/web/src/app/point-of-sale/PosPageClient.tsx` rendering hero + canvas + key features + feature rows, reusing `Placeholder` from `@/components/marketing/Placeholder` for image slots and the existing `BrochureButton` with id `point-of-sale`.
- `page.tsx` becomes a thin server component exporting metadata (title, description, og and twitter) and rendering the client component.
- All sections use the `site-container` utility; no changes to global CSS.

## Verification

Load `/point-of-sale` at desktop, tablet and mobile widths, confirm hero and canvas align with the site container, all six feature rows render with placeholders, and there is no horizontal scrollbar.
