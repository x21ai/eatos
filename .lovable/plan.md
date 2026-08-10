# Rebuild Tap to Pay with the Intelligence page layout

Re-skin `/tap-to-pay` so it looks and behaves like the AI Intelligence deep dive page, keeping all current Tap to Pay copy.

## What changes visually

- Dark `#0a0a0a` canvas with the violet accent system used on the Intelligence page, instead of the current pure-black centered layout.
- Every section becomes a two-column alternating block: copy on one side, a glass card on the other. Left/right sides alternate down the page.
- Each block gets a small violet eyebrow label with a sparkle icon, a two-line bold headline, a supporting paragraph, a checklist, and an inline stat row under a divider.
- Closing CTA becomes the large glass card with a violet glow behind it and the two buttons centered inside.

## Section-by-section mapping (existing content reused)

1. Hero: left-aligned eyebrow "Tap to Pay", headline "Tap to Pay. Right at the table.", existing subline (kept to two lines), Book a Demo and See Pricing buttons.
2. During the order: the three existing steps become the checklist plus a card that renders them as a numbered sequence with the violet accent.
3. Stats: the four existing figures move into stat rows inside the relevant blocks rather than a standalone band, matching the Intelligence page rhythm.
4. Everything the terminal did: the six existing features render as glass cards in a responsive grid, keeping each item's existing colorful icon tile.
5. What you need to start: becomes a glass card with the four requirements as violet check items.
6. Closing CTA: existing headline, subline and both buttons inside the glowing card.

No text is rewritten and no new sections are invented. No em dashes.

## Responsive behaviour

- Desktop: two columns, alternating sides.
- Tablet: two columns collapse to one at `lg`, feature grid drops to two across.
- Mobile: single column, reduced section padding, stat rows two across, buttons full width and stacked.

## Technical notes

- Rewrite `apps/web/src/app/tap-to-pay/TapToPayClient.tsx` to compose the shared Intelligence primitives: `SectionLabel`, `GradientWord`, `Card`, `StatRow`, `Reveal` / `RevealProvider` from `@/components/AIIntelligence/*`.
- `apps/web/src/app/tap-to-pay/content.ts` stays the data source; only add small groupings (eyebrow labels, per-block stat pairs, checklist items derived from existing copy) if a block needs them.
- Keep the existing `page.tsx` head metadata untouched.
- The removed items from the last round (hero eyebrow image, "Wherever service actually happens", images below During the order) stay removed. The video block also goes away, since the Intelligence template has no poster/video slot.
- Verify with a production build and a Playwright pass at desktop, tablet and mobile widths.
