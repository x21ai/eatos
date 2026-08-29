# Header alignment rule + footer heading destinations

## 1. Hard rule: header alignment at every width

Current state: the header row is `site-container flex items-center justify-between`, with the logo on the left, the nav as `flex-1 justify-center`, and Book a Demo on the right. Because the nav is a flex child sharing space with the logo and CTA, its centre drifts as the logo or CTA width changes, and it is hidden below `lg` (mobile shows a hamburger instead).

Change the desktop header row to a three-column grid so the centre is mathematically the centre of the page container, never affected by logo or CTA width:

```text
[ logo (auto) ][ nav (1fr, centered) ][ actions (auto) ]
```

- Desktop (`lg` and up): `grid grid-cols-[auto_minmax(0,1fr)_auto]`, logo `justify-self-start`, nav `justify-self-center`, actions `justify-self-end`.
- Below `lg`: two columns, `[auto_auto]` with logo left and hamburger right (nav column collapses), so logo and menu button stay exactly flush to the container edges.
- Keep the existing `site-container` padding so left/right edges match the rest of the site on every resolution.
- Nav dropdown anchoring (Platform / Concepts) keeps its existing trigger-relative positioning and viewport clamping; only the row layout changes.

Verification: screenshots at 1280, 1440, 1920 and 390 px confirming the nav block is centered on the viewport and the logo/CTA sit at the container edges.

## 2. Footer heading destinations

The six footer headings are Platform, Products, Grow, Concepts, Company, Resources. Current link targets:

| Heading | Links to | Page exists |
| --- | --- | --- |
| Platform | /platform | Yes |
| Products | /products | Yes |
| Grow | /platform | No dedicated page |
| Concepts | /solutions | Yes |
| Company | /about-eatos | Yes (About page, not a hub) |
| Resources | /support | Yes (Help Center, not a hub) |

So: four of six headings already land on a real page; only Grow has no destination of its own, and Company/Resources currently borrow an existing page rather than a hub.

Proposed fix, styled to match the existing dark hub pages (`/platform`, `/products`, `/solutions`):

- New `/grow` hub: Analytics, Loyalty, Gift Cards, Marketing, Order at Table, each as a card linking to its product page, plus intro copy and a Book a Demo CTA. Footer Grow heading points here.
- New `/company` hub: About Us, Careers, Partners, Customers, Contact Sales, Report Fraud, Newsroom, Comparison. Footer Company heading points here.
- New `/resources` hub: Pricing, Blog, Brochures, Book a Demo, Help Center, Status, Dashboard. Footer Resources heading points here.
- Each new page gets its own metadata (unique title, description, og/twitter tags) and a sitemap entry. No existing URLs change, so rankings and redirects are untouched.

If you would rather Company and Resources keep pointing at About Us and the Help Center, say so and only `/grow` gets built.

## Technical notes

- `apps/web/src/components/Header.tsx`: replace the flex row with the responsive grid described above; no changes to link sets, dropdown data, or the utility bar.
- `apps/web/src/components/Footer.tsx`: update the `href` on the Grow, Company and Resources groups in `LINK_GROUPS`.
- New routes under `apps/web/src/app/grow/`, `apps/web/src/app/company/`, `apps/web/src/app/resources/`, reusing the existing hub page pattern and Montserrat black theme with brand pink accents.
- Add the three routes to the sitemap generator.
