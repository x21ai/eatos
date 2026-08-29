# Top Utility Bar (Subtle Slate Contrast)

Add a slim secondary navigation strip above the main header containing Dashboard, Status, Support, Blog and Shop. The icons currently sitting inside the main header move up into this new bar, each paired with a text label.

## What it looks like

- Full-width strip, 40px tall, background `#1a1a1a` so it reads as a distinct tier against the black main header, with a hairline bottom border.
- Links right-aligned, 11px uppercase Montserrat, grey by default, white on hover, icon turning brand pink `#d70480` on hover.
- Status uses a small live dot with a soft pulse instead of an icon, coloured from the existing system-status health value (green when all systems are operational).
- Icons: Dashboard grid, Status dot, Support life ring, Blog document, Shop bag.

## Behaviour

- Links: Dashboard to `https://dashboard.eatos.com/#/account/login` (new tab), Status to `/system-status`, Support to `/support`, Blog to `/blog`, Shop to `/shop`.
- The bar sits inside the existing fixed header block, so both tiers stay pinned together on scroll.
- On scroll the bar collapses out of view so only the main header remains, keeping vertical space for content.
- Mobile and small tablet: the bar stays visible as a single centred row of icons with labels hidden, horizontally scrollable if needed and with the scrollbar hidden. It is hidden entirely while the mobile menu is open.
- Light-theme pages keep the same dark utility strip for consistency.

## Main header cleanup

- Remove the three icon-only links (Dashboard, Support, System Status) and their divider from the main header right side, since they now live in the utility bar.
- Keep Shop and Book a Demo buttons in the main header unchanged.
- Remove the duplicated Dashboard, Support and Status entries from the mobile menu secondary links, keeping Pricing, Enterprise and Customers.

## Technical notes

- New component `apps/web/src/components/UtilityBar.tsx`, rendered at the top of the returned block in `apps/web/src/components/Header.tsx`.
- Reuses `overallHeaderColor` from `@/app/system-status/systems` for the status dot colour, so no new data source.
- Header top offset: pages currently rely on the fixed header height for hero padding, so verify hero spacing on `/`, `/platform`, `/shop`, `/blog` and adjust the header's internal padding rather than page-level padding.
- No routing, SEO or metadata changes.
