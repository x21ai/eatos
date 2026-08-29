# Footer consolidation and Loyalty card on the homepage

## 1. Merge Platform and Products in the footer

Right now the footer has six headings, and two of them overlap: "Platform" lists Payments, Intelligence, Hardware, Tap to Pay, edgeOS and a self-referencing "Platform" link, while "Products" lists the actual product pages. That reads as two versions of the same thing.

Change: drop the separate "Platform" heading and keep one "Products" column, with the platform-level links folded in.

New footer columns:

```text
PRODUCTS            GROW              CONCEPTS        COMPANY        RESOURCES
Point of Sale       Analytics         (unchanged)     (unchanged)    (unchanged)
Kitchen Display     Loyalty
Self-Service Kiosk  Gift Cards
Handheld            Marketing
Customer Display    Order at Table
Online Ordering
Inventory
Workforce
Payments
Intelligence
Hardware
Tap to Pay
edgeOS
```

The "Products" heading itself links to /platform (the platform overview page), so no page is orphaned and no URL changes. Grow, Concepts, Company and Resources stay exactly as they are.

## 2. Replace the small Intelligence card on the homepage with Loyalty

In the homepage bento grid there are currently two Intelligence cards: a narrow one and the wide "Intelligence everywhere" blob. The narrow one becomes a Loyalty card, using copy and figures pulled from the Loyalty product page:

- Title: Loyalty
- Body: points, rewards and personal offers that turn first-time guests into regulars
- Stat highlight: 10x more repeat visits (from the Loyalty page stats)
- Links to /products/loyalty
- Rose/pink accent matching the Loyalty page instead of the indigo AI treatment, with a Gift icon

The wide Intelligence blob stays as is, so AI is still represented once.

## Technical notes

- apps/web/src/components/Footer.tsx: remove the Platform group from LINK_GROUPS, append its five product-level links to the Products group, point the Products heading href at /platform. Mobile accordion and desktop grid both derive from LINK_GROUPS, so both update automatically.
- apps/web/src/app/page.tsx: rewrite the "Card 3: AI" motion.a as a Loyalty card; import Gift from lucide-react; drop the Star import if it becomes unused.
- Loyalty copy source: apps/web/src/app/products/loyalty/content.ts (hero.description, hero.stats).
- No route, sitemap or metadata changes.
- Verify / and a couple of footer links return 200 and the footer renders five columns with no console errors.
