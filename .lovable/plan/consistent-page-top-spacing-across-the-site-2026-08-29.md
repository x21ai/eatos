# Consistent Page Top Spacing Across the Site

## Problem

Interior page heroes currently start at many different top offsets, so the gap between the header and the first heading changes from page to page. Audit of the current values:

```text
pt-32 md:pt-44   most product, concept and company pages (the de-facto standard)
pt-32            /bookademo (no larger desktop step, so it sits high on desktop)
pt-32 md:pt-48   /platform (too low)
pt-36            /solutions, /customers (no responsive step)
pt-36 md:pt-44   /system-status
pt-28 md:pt-40   /partners
pt-28 md:pt-36   /blog, /news, /shop (+ shop product, collection, content), /support (+ category), /brochures
pt-28 md:pt-32   /blog/[slug]
pt-28 md:pt-36   /report-fraud
pt-44 md:pt-52   /contact (far too low)
```

The home page hero is a different type (full-viewport centered hero), so it cannot share a raw padding number. What it establishes visually is the amount of breathing room under the fixed header plus utility bar, and centered hero text.

## Approach

1. Introduce one shared spacing token in `apps/web/src/app/global.css`, e.g. a `page-hero-top` utility equal to the current dominant standard (`pt-32 md:pt-44`), plus an optional `page-hero-top-tight` for list/index pages if a smaller step is wanted. Single source of truth so future pages inherit it.
2. Replace every hero top padding listed above with that utility, leaving each page's own bottom padding and background treatment untouched.
3. Keep the home page hero as is (full-height centered), but align its internal top offset so the first visible text sits at the same distance from the header as interior pages.
4. Hero text alignment: leave existing left-aligned split heroes (partners, work-with-us role, pointofsale) as they are unless you want them centered too. Centered heroes (Book a Demo, Platform, Concepts, Company, Grow, Resources, Brochures, Contact) all get the same centered container width and top offset.
5. Verify: load a representative set of routes at 1280 and 390 wide and confirm the first heading baseline is identical, with no clipping under the header.

## Pages touched

`/`, `/bookademo`, `/platform`, `/solutions`, `/products` and all `/products/*`, all concept pages (quick-service, full-service, fast-casual, food-truck, pizzeria, ghost-kitchens, bar-and-brewery, catering, cafe-pos, enterprise-pos, offline-point-of-sale), `/company`, `/grow`, `/resources`, `/about-eatos`, `/work-with-us` (+ role), `/partners`, `/contact`, `/pricing`, `/customers`, `/brochures`, `/blog` (+ post), `/news`, `/support` (+ category), `/shop` (+ product, collection, content), `/system-status`, `/tap-to-pay`, `/accept-payments`, `/report-fraud`, `/comparison/[competitor]`, `/terms-and-conditions`, `/privacy-policy`.

## Technical notes

- Utility defined once in `global.css` via `@utility` (Tailwind v4), no config file.
- Only presentation classes change; no content, routing or data changes.
- Left-aligned two-column heroes keep their layout, only the top offset is normalised.

## Question

Should the left-aligned heroes (Partners, Point of Sale, Work With Us role pages) also become centered like Book a Demo, or keep their current layout with only spacing normalised?
