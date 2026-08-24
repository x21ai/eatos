# Pricing Page: Simple Pricing Layout

Replace the current three-tier pricing grid on `/pricing` with the two-row card layout from the reference.

## What the page will show

Heading: "Simple Pricing" (left aligned, bold, tight tracking), on a light grey page background.

### Row 1 (three panels)
1. White panel, statement copy: "Don't Pay More, **Eliminate Complex Pricing** and Simplify for the Future." (bold on the middle phrase).
2. Card "$0 Upfront Hardware Cost" (black header bar, white body):
   - `2.99%+20¢` / `per tap, dip or swipe`
   - "No Hardware to Purchase, No Monthly SaaS Fees*"
   - Black "Book a Demo" button
   - Fine print: "*Restaurant qualification criteria applies. Pricing is per location per Point of Sale, excluding accessories."
3. Card "Build your Own Bundle" (black header bar, white body):
   - `2.39%+15¢` / `per tap, dip or swipe`
   - "Customize Your Hardware*"
   - Black "Book a Demo" button
   - Fine print: "*Pricing is per location cost. Terms apply."

### Row 2 (two panels)
1. White panel: "Discuss your requirements with our team, upload your quote, statement and bill, it's that simple, **we will beat it**." (em dash from the reference replaced with a comma per project rule).
2. Wide card: white "YOUR PRICE" header, then a black body:
   - "Any Point of Sale or Payment Processing Quote"
   - "Upload last three months statements or a quote."
   - Two-column bullet list: Low Monthly Software or SaaS Fees / Lowest Payment Processing Rates in the Industry / NO Setup and Maintenance Costs / Live Training and Setup | World-Class Hardware, Lowest Prices / 24x7, 365 Days Live Customer Support / Get Started in 24 hours.
   - White "Learn More" button

## Technical notes

- Edit `apps/web/src/app/pricing/page.tsx` only. Remove the Solo/Pro/Scale tier grid and its `Feature` helper; keep the existing FAQ section below unchanged.
- Rebuild with small local components (`RateCard`, statement panel, quote panel) in the same file, Montserrat via existing global font, `site-container` for side padding.
- Responsive: row 1 stacks to one column on mobile and the bullet list collapses to a single column; desktop keeps a 3-column / statement + wide-card structure.
- Buttons link to the existing demo route used elsewhere on the site ("Book a Demo") and to `/contact` style destination for "Learn More"; no new routes or backend work.
- Update the route metadata description to reflect the new rate messaging.
