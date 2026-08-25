# Plan: Offline POS page (edgeOS style) + em-dash audit

## Findings

**1. Offline POS page:** We do not have a dedicated offline connectivity page like the Zavo reference. Offline capability is only mentioned as a feature inside existing pages (Point of Sale, Quick Service, Accept Payments, Comparison, Enterprise, Full Service). There is no standalone page explaining the offline system.

**2. Em dashes:** No user-facing em dashes ("—") found. The only occurrences are inside code comments in platform-managed auth files (`apps/web/src/lib/auth.ts`, `SocialSignInButtons.tsx`, `account/signin`, `account/signup`, etc.), which are never rendered to visitors. All marketing content, pages, footer, and metadata are clean.

## What I will build

### New page: `/offline-point-of-sale`

A dark, Apple-style page inspired by the reference screenshot, matching our existing design system (black background, Montserrat, shared site-container spacing, our header/footer):

1. **Hero** — "Industry leading offline connectivity" headline, subcopy about eatOS peer-to-peer mesh networking keeping every device in sync with or without internet, Book a Demo CTA. Below it, an animated mesh-network diagram (central eatOS cloud node connected to POS, KDS, Kiosk, CFD, and payment devices) built with SVG/CSS animation, not a static screenshot.
2. **"Run fully offline. Stay fully connected." section** — device grid visual showing terminals, kitchen displays, and payment devices syncing peer-to-peer, plus three supporting points: Always in sync, One device is all it takes, Syncs the moment you are back online.
3. **Technical capabilities** — three cards: Mesh Networking (automatic device discovery, no manual pairing), Direct Sync (devices sync over local network and WiFi through the fastest path), Instant Cloud Sync (data syncs to the cloud the moment internet returns).
4. **Platform cross-links** — grid of related products (Point of Sale, Payments, Kitchen Display System, Self-Service Kiosk, etc.) reusing existing card styles.
5. **CTA band** — "New to eatOS? Book your demo" matching the existing Book a Demo pattern.

### Wiring
- Add route to `apps/web/src/app/sitemap.ts` and register it in the dark-pages list.
- Link it from the Platform dropdown in the header and the Platform column in the footer.
- SEO: unique head metadata (title, description, og tags), single H1, semantic HTML.

### Em-dash guard
- Leave platform auth file comments untouched (not user-facing, files are marked do-not-rewrite).
- Spot-check rendered pages after the build to confirm no em dashes in visible copy.

## Technical details
- New files: `apps/web/src/app/offline-point-of-sale/page.tsx`, `content.ts`, `OfflinePosClient.tsx`, and an inline SVG `MeshDiagram.tsx` component.
- Reuses `site-container`, `Placeholder`-free custom visuals, existing CTA/button components.
- No database, no new dependencies.
- Copy follows the standing rules: no em dashes, "Point of Sale" never abbreviated to "POS" in visible copy (page slug uses lowercase-hyphen URL convention only).
