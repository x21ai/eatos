# Replace the homepage Kitchen Display section

## What changes

The "Chaos, controlled." Kitchen Display System section near the bottom of the home page (just above the newsletter strip) is removed. In its place goes a two-part block that sells the platform as a whole, with an Intelligence highlight, so the home page ends on the full-stack story rather than one product.

## New content

**Part 1: Platform overview**
- Eyebrow: Platform
- Heading: one platform, every part of service
- Short paragraph: eatOS runs front of house, back of house, and growth on one connected system.
- Four compact pillar cards, reusing the same four groupings already on `/platform`:
  - Operations, run service flawlessly
  - Guest Experience, delight every guest
  - Growth, bring them back
  - Intelligence, see everything clearly
- Primary link: Explore the platform, to `/platform`

**Part 2: Intelligence highlight**
- Kept as the visual half of the block: brand-pink eyebrow, heading, short paragraph, three bullet rows with icons (real-time analytics, AI-enabled ordering, smarter daily decisions), and a link to the Intelligence area.
- Reuses the existing image slot on the right so the layout rhythm of the current section is preserved.

## Look and feel

Same black canvas, Montserrat, brand pink `#d70480` accents, rounded cards, and scroll-in motion already used elsewhere on the home page. No new fonts, colors, or layout systems.

## Technical notes

- Edit only `apps/web/src/app/page.tsx`: delete the Kitchen Display section and insert the two new blocks in its place.
- Pillar copy is taken from the existing category definitions in `apps/web/src/app/platform/page.tsx` so the two pages stay consistent.
- Drop the now-unused imports (`ChefHat`, `Route`, `Languages`, `Clock`, and the KDS image asset) if nothing else on the page uses them.
- No changes to `/products/kitchen-display-system`, `/platform`, routing, metadata, or the footer.

## Verification

Render the home page at 390px, 820px, and 1440px, confirm the old section is gone, the new blocks are aligned and free of overflow, and there are no console errors.
