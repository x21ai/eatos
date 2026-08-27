# Add a Pizzeria solution page

## Goal
A new `/solutions/pizzeria` page that reuses the exact Quick Service layout, plus a "Pizzeria" entry in the Restaurant Type dropdown (desktop and mobile). Images stay as placeholders until you provide the real files.

## Page content
- Eyebrow: Restaurant Technology Cloud
- Title: Point of Sale for Pizzerias
- Description: Built for pizza operations, from slice counters to delivery-heavy shops. Fast order entry with modifiers, halves and toppings, plus delivery and pickup in one system.
- Numbers strip: 4 stats (fast order entry, offline capable, 24/7 support, $0 hardware upfront)
- Three alternating feature rows, each with two metric chips and a full-cover image slot:
  1. Build any pizza in seconds (halves, toppings, crusts, sizes as fast modifiers)
  2. Delivery and pickup without the chaos (driver dispatch, order status, online orders in one queue)
  3. Control food cost per pie (recipe-level inventory, cheese and dough usage, waste tracking)
- Key features list: Pizza Builder & Modifiers, Delivery & Dispatch, Online Ordering, Kitchen Display System, Loyalty & Gift Cards, Reporting & Analytics
- Hardware bundle block: Pizzeria Bundle, $0 hardware upfront with Pay As You Go, three spec cards and the standard terms note
- "Works great with" cards and the closing CTA band, same as Quick Service

Accent color: red, to keep Pizzeria distinct from Quick Service orange. Black theme, Montserrat, no em dashes.

## Images
Every image slot uses the existing `Placeholder` component with a descriptive label and no `src`, so the page renders cleanly now and each slot can be swapped for a real asset later with a one-line change.

## Menu placement
Added to `solutionLinks` in the header, which feeds both the desktop Restaurant Type dropdown and the mobile menu list, so both stay in sync automatically. Icon: pizza slice, red tint. Placed after Fast Casual.

## Technical notes
- New files: `apps/web/src/app/solutions/pizzeria/content.ts`, `PizzeriaClient.tsx`, and `page.tsx` (thin server component exporting title, description, og and twitter metadata).
- `content.ts` mirrors the Quick Service shape but with `image: null` on each entry.
- One edit to `apps/web/src/components/Header.tsx` to add the link.
- Optionally add the Pizzeria card to `/solutions` index and the footer Restaurant Type column for consistency.
