# Rename navigation labels: Platform and Concepts

## Goal

Replace "Solutions" with "Platform" and "Restaurant Type / Restaurant Types" with "Concepts" across navigation and visible page headings, remove the duplicate standalone Platform link, and make every top-level nav and footer heading point to a real home page.

## Current state (verified)

The two desktop dropdowns are currently labelled the opposite way from their contents:

- Dropdown 1, label "Solutions", contains the product links, footer link "View all products" to `/products`
- Dropdown 2, label "Restaurant Type", contains the restaurant concept links, footer link "View all solutions" to `/solutions`
- Then two plain links: "Platform" (`/platform`) and "Pricing" (`/pricing`)
- Mobile menu has a two-tab switcher using the same two labels
- Footer has six groups: Platform, RESTAURANT TYPE (product links), Grow, Solutions (concept links), Company, Resources

## Header changes

| Item | Before | After | Links to |
|---|---|---|---|
| Dropdown 1 (products) | Solutions | Platform | `/platform` |
| Dropdown 2 (concepts) | Restaurant Type | Concepts | `/solutions` |
| Standalone link | Platform | removed | n/a |
| Standalone link | Pricing | Pricing | `/pricing` |

- Each dropdown trigger becomes clickable (a link with the chevron), so "Platform" opens `/platform` and "Concepts" opens `/solutions` while still revealing the panel on hover.
- Dropdown footer CTAs reworded: "View all products" stays pointing at `/products`; "View all solutions" becomes "View all concepts" pointing at `/solutions`.
- Mobile tab switcher labels become Platform / Concepts, and the mobile "All restaurant types" row becomes "All products".

## Footer changes

Group headings become links to their home pages:

- Platform, to `/platform`
- RESTAURANT TYPE (product links) renamed **Products**, to `/products`
- Grow, to `/platform` (no dedicated Grow page exists; flag if you want one built)
- Solutions renamed **Concepts**, to `/solutions`
- Company, to `/about-eatos`
- Resources, to `/support`

## Visible page headings

Update on-page eyebrow/breadcrumb labels that read "Solutions" on the concept pages (quick-service, full-service, fast-casual, pizzeria, cafe-pos, bar-and-brewery, food-truck, ghost-kitchens, catering, enterprise-pos) to "Concepts", plus the "Restaurant Type" heading on the comparison page. The `/solutions` page hero heading and grid label get the Concepts wording.

Not touched: URLs stay as they are (`/solutions`, `/platform`, `/products`), and SEO titles, descriptions, sitemap and redirects are left unchanged to protect existing rankings and backlinks.

## Technical notes

- Files: `apps/web/src/components/Header.tsx`, `apps/web/src/components/Footer.tsx`, `apps/web/src/app/solutions/page.tsx`, the ten concept `*Client.tsx` files, `apps/web/src/app/comparison/ComparisonClient.tsx`.
- Internal state names (`solutionsOpen`, `productsOpen`) stay as-is; only display strings and link targets change.
- Verify in the browser: desktop nav shows Platform, Concepts, Pricing; both dropdowns open on hover and navigate on click; mobile tabs read Platform / Concepts; footer headings navigate.
