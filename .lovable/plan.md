# Footer: World-Class Polish Pass

## Goal
Elevate the footer in `apps/web/src/components/Footer.tsx` to a world-class finish while keeping the site's existing design language (dark/light variants, Montserrat, current tokens and spacing). No new full-width sections beyond what is listed; no newsletter row.

## Changes

### 1. Get in touch: add two channels (4 becomes 6)
Extend `CONTACT_CHANNELS` with:
- **Brochures**: `FileDown` icon, label "Brochures", detail "Download PDFs", links to `/brochures`
- **Text Us (SMS)**: `MessageSquare` icon, label "Text Us", detail "+1 (844) 563-2867", links to `sms:+18445632867` (opens iMessage/SMS on mobile)

Grid becomes 2 columns x 3 rows, same card style as existing channels.

### 2. Visual polish pass (structure unchanged)
- **Social icons**: wrap each in a circular chip (border, subtle fill) with hover fill/underline, consistent 18px sizing and even gaps.
- **Column headings**: keep bold uppercase, add slightly wider letter-spacing and consistent `mb-5`; align all six columns to the same top baseline.
- **Links**: consistent underline offset hover already present; add subtle horizontal nudge on hover for affordance (light-weight, no layout shift).
- **Contact cards**: unify internal padding, icon alignment, and equal heights across the 6 cards.
- **Offices row**: equal column alignment, MapPin icons vertically aligned to first line, consistent line heights.
- **Legal strip**: tighten spacing; region selector becomes a proper bordered chip with globe icon ("United States - EN").

### 3. App badges & trust marks row
Add a compact row between the offices/link area and the legal strip:
- App Store badge and Google Play badge linking to the eatOS apps (hrefs to be confirmed; if you don't have the store URLs handy I will use `https://dashboard.eatos.com/` style placeholders marked with a TODO so you can swap them).
- A "System status: Operational" trust chip linking to `https://status.eatos.com/en/`.
- Rendered as small monochrome badges that invert on dark variant, no large colorful store graphics.

## Constraints
- Only `apps/web/src/components/Footer.tsx` is edited.
- Both `light` and `dark` variants get equivalent styling.
- Montserrat, existing tokens, existing site-container spacing all preserved.
- No em dashes anywhere.
- Verify desktop and mobile footer rendering in the preview after the change.

## Open item for you
- Confirm the App Store / Google Play URLs for the eatOS apps, or I ship with placeholder hrefs marked TODO.
