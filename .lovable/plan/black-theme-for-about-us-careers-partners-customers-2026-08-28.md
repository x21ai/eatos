# Black theme for About Us, Careers, Partners, Customers

## Goal
Restyle these four pages to match the dark look used across the rest of the site, and make the header render in its dark-page (white text, transparent to black on scroll) mode on them.

## Pages in scope
- About Us: `/about-eatos`
- Careers: `/work-with-us` (index and the `[role]` detail page)
- Partners: `/partners` (including the partner form block)
- Customers: `/customers`

## What changes
Presentation only. No copy rewrites, no layout restructure, no data or logic changes.

Swap the light surface set for the site's standard dark set, matching pages like Quick Service:
- Page shell: `bg-white text-black` becomes `bg-black text-white`
- Alternating light section bands (`bg-gray-50`, `bg-gray-100`) become black with `bg-white/5` glass panels
- Cards: white cards with `border-gray-200` become `bg-white/5` with `border-white/10`, hover to `bg-white/10`
- Body copy `text-gray-600` becomes `text-white/70`; labels and eyebrows `text-gray-500` become `text-white/50`
- Icon tiles: `bg-black/5` becomes `bg-white/10` with white icons
- Buttons: primary black-on-white flips to white-on-black; secondary outlines use `border-white/20`
- Existing dark CTA bands stay, retuned so they read as a panel against black rather than a black block on white
- Brand pink accent (`text-brand-on-dark`) used for eyebrows and highlights, consistent with the other dark pages
- Form inputs on Partners get dark field styling with readable placeholder contrast

Responsive behaviour and section order stay exactly as they are.

## Header
Remove `/about-eatos`, `/work-with-us`, `/partners`, and `/customers` from the `lightPages` list in `apps/web/src/components/Header.tsx` so these routes get the dark header treatment. `/shop` and `/login` stay light.

## Verification
Load all four routes plus one careers role page at mobile, tablet and desktop widths, confirm no light-on-light or dark-on-dark contrast failures, header renders white, and no console errors.
