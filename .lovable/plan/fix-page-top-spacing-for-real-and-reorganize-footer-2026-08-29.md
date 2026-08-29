# Fix page top spacing (for real) and reorganize footer

## You were right about the spacing

I re-measured the live pages. The previous change was applied to outer wrapper elements on most pages, so it did not change where the hero content actually starts. Measured distance from the top of the viewport to the first heading:

```text
/contact            134px   (correct)
/brochures          165px
/pricing            183px
/bookademo          186px
/solutions          198px
/platform           222px
/blog               243px
/quick-service      293px
/products/loyalty   320px
```

So the pages are still inconsistent. This time the fix will be verified by measuring the rendered heading position on every page, not by checking that a class string exists.

## What will be done

### 1. One real spacing standard
- Define the hero top offset once (header 70px + utility bar 40px + breathing room), applied to the element that actually holds the hero content on each page, not a wrapper that already has its own padding.
- Target: every interior page's first heading lands at the same measured offset (approximately 176px desktop / 128px mobile).
- Remove the duplicated/conflicting padding left over from the previous pass so pages do not double-pad.
- The homepage keeps its full-height, vertically centered hero (intentionally different).

### 2. Verification loop
- Script measures the first heading's rendered top position on all interior routes at desktop and mobile widths.
- Any route outside a small tolerance gets fixed and re-measured. I will report the actual numbers, not the class names.

### 3. Footer reorganization
Move from Products to Grow:
- Online Ordering, Intelligence, Hardware, edgeOS

Products keeps: Point of Sale, Kitchen Display, Self-Service Kiosk, Handheld, Customer Display, Inventory, Workforce, Payments.

Grow becomes: Analytics, Loyalty, Gift Cards, Marketing, Order at Table, Online Ordering, Intelligence, Hardware, edgeOS.

### 4. Merge Tap to Pay into Payments
- All Tap to Pay content, copy and imagery folded into the Payments page (/accept-payments) as its own clearly labelled section, so nothing is lost.
- Tap to Pay removed from the footer and from the Platform mega menu.
- /tap-to-pay kept alive as a 308 redirect to the Payments page (with anchor) so existing links and rankings do not break.
- Sitemap updated; internal links pointing at /tap-to-pay repointed to the Payments page.

## Technical notes
- Spacing lives as a single shared constant/class used by page hero sections, so future pages inherit it.
- Redirect added in the Next.js config redirects list, matching the existing legacy-URL pattern.
- Concept pages that link to Tap to Pay (Full Service, Fast Casual, Food Truck, Bar & Brewery) get their links repointed.
