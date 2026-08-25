# Footer revamp (Obsidian Precision) + full site cleanup

## 1. Footer rebuild: "Obsidian Precision" direction

Rebuild `apps/web/src/components/Footer.tsx` to match the approved prototype, adapted to real eatOS content and the project design system (Montserrat, existing light/dark variants, site-container spacing).

Structure:
- **Top band**: logo + tagline ("The operating system for the modern restaurant...") + social icons on the left; two large contact cards on the right (Support: 24/7 help, cs(at)eatos.com; Sales: Book a demo, +1 (844) 563-2867). Hairline divider below.
- **Link grid**: six columns (Platform, Products, Grow, Solutions, Company, Resources) with the exact current links, uppercase micro headings, generous vertical rhythm.
- **Offices row**: compact horizontal office listing (Cupertino, Miami, Los Angeles, Houston) above the legal strip, as in the prototype.
- **Legal strip**: © 2017 - 2026 eatOS POS Inc., Privacy Policy, Terms of Service, Cookie Settings (keeps the cookie-banner event), United States - EN region selector, system status indicator, App Store / Google Play badges (minimal monochrome, current placeholder URLs with TODO).

Details:
- Contact channels (WhatsApp, Text Us, Brochures, Help Center) fold into the two contact cards and the Resources column so nothing is lost.
- Both light and dark variants preserved; dark variant mirrors the same structure with white/10 hairlines.
- No em dashes anywhere. Hover = color/underline only, no transforms.

## 2. Full cleanup

**Unused files to delete:**
- ~50 unreferenced CDN asset pointers and their CDN objects via `lovable-assets delete` (old KDS prep-routing iterations, qs-offline/qs-versatile v2-v4, fs-v3 images, pop-costs/payments old versions, comparison-scalable v1/v2, cfd-demo video/poster old renders, unused bar/cafe/catering/food-truck/ghost-kitchen images).
- 5 unused images in `apps/web/public/images/` (kiosk-hero-dark, workforce-hero, workforce-payroll, workforce-scheduling, workforce-timeclock).

**Foreign/leftover content sweep:**
- Rewrite the "Clover and HP" hardware copy line in `apps/web/src/app/hardware/content.ts` to eatOS hardware language.
- Sweep for leftover placeholder text, competitor references outside `/comparison` pages, stale generator/meta tags, and any lorem ipsum. Comparison pages stay as-is (user decision).

**Verification:**
- Rebuild, then Playwright pass on desktop + mobile checking the footer on a light page and a dark page, and spot-check pages whose assets were deleted to confirm nothing referenced them.
