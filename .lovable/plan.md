# Plan: Responsive Audit, EdgeOS Offline Page, Em-Dash Build Guard

## 1. Sitewide responsive audit and fixes

The concern about content cutting off on some screen sizes is valid to verify systematically rather than page by page.

- Run an automated overflow scan with Playwright across all routes at standard widths: 360 (small mobile), 390 (mobile), 768 (tablet), 1024 (small laptop), 1280 (laptop), 1440 and 1920 (desktop).
- The scan flags any page where content overflows the viewport horizontally (the "data is cutting" symptom) or where elements overlap.
- Fix every flagged page using the existing responsive conventions: `site-container` padding, `min-w-0` / `truncate` on text, grid instead of flex for mixed rows, hiding non-essential text on mobile where already established.
- Verify fixes with before/after screenshots at the failing widths.

## 2. EdgeOS offline Point of Sale page

This page already exists from the previous request:

- Route: `/offline-point-of-sale` (hero, animated eatOS Cloud mesh diagram, offline sync sections, technical capability cards, platform cross-links, demo CTA).
- Linked from the Footer (Platform > Offline Connectivity), the header mobile menu, and the sitemap.

Remaining work in this plan: verify it renders correctly at all audit breakpoints in step 1 and confirm the copy fully matches the offline connectivity story. If you want the URL renamed to `/edgeos` or the heading to say "EdgeOS" explicitly, say so and I will adjust.

## 3. Em-dash build guard

- Add `scripts/check-copy.mjs`: scans all user-facing source files (page content, components, metadata) for the em dash character "—" and fails with a list of offending files and line numbers.
- Platform-managed auth files (marked "DO NOT REWRITE") are excluded since their em dashes live in code comments only, never in rendered copy.
- Wire it into the root `build` script so the build fails if any em dash is introduced:
  `node scripts/check-copy.mjs && next build ...`

## Technical details

- Scanner: Node script, recursive scan of `apps/web/src`, checks `.ts`/`.tsx` files, strips comment blocks before checking so code comments never fail the build; only renderable strings are checked.
- Audit: one Playwright script under `scripts/` (dev-only, not shipped), checking `document.documentElement.scrollWidth > window.innerWidth` per route per width.
- No database, no new dependencies, no visual redesign of working pages.
