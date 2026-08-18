Revise the Bar & Nightclub solution page to remove an off-brand feature and tighten the hero title.

## What we will change

1. Shorten the hero title in `apps/web/src/app/solutions/bar/content.ts` from `Point of Sale System for Bars and Nightclubs` to `Bar & Nightclub POS` (matches the concise title style used on Quick Service and Full-Service pages).
2. Replace the third feature pillar `Age verification and compliance at the door` with a feature that reflects an actual eatOS service, recommended direction: **"Handheld ordering and payment at the rail"** (ties to the Tap-to-Pay / Table Side Order and Pay product). This keeps the pillar list focused on operational POS capabilities rather than introducing a third-party ID-verification feature.
3. Rewrite the pillar body and `more` copy for the new handheld/rail feature to be bar-specific and benefit-led.
4. Generate a new cinematic dark image for the replacement pillar (e.g., bartender using a handheld device at the rail) and save it to `apps/web/src/app/solutions/bar/assets/`.
5. Update the `pillarIcons` mapping in `BarClient.tsx` if the icon for the new pillar needs to change from `ShieldCheck` to something relevant (e.g., `CreditCard` or `Smartphone`).
6. Verify the page renders correctly across desktop, tablet, and mobile viewports.

## Files to edit

- `apps/web/src/app/solutions/bar/content.ts` — hero title and third pillar copy
- `apps/web/src/app/solutions/bar/BarClient.tsx` — pillar icon mapping
- Add one new image asset under `apps/web/src/app/solutions/bar/assets/`

## Acceptance criteria

- Hero title is noticeably shorter and no longer wraps awkwardly on desktop.
- The third feature pillar is an internal eatOS service, not age verification.
- All three pillars still have matching images, icons, and descriptive copy.
- Page passes a visual check on desktop, tablet, and mobile.