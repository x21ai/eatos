# Unify the Platform and Concepts dropdown style

Right now the two navigation dropdowns are built as two separate blocks with different sizing rules, so they look like two different components:

| | Platform | Concepts |
|---|---|---|
| Panel width | 860px | 460px |
| Columns | 3 | 2 |
| Icon size | 16px in a small tile | 18px in a larger tile |
| Title size | 14px | 15px |
| Description | single line, truncated | wraps to 2 and 3 lines |
| Row alignment | vertically centered | top aligned, uneven row heights |

The wrapping Concepts descriptions are what make that panel look taller and looser, and the different widths make the panel jump when moving between the two triggers.

## What changes

One shared panel style used by both menus, so they are visually identical apart from their contents.

- Same panel width, radius, border, shadow, padding, and footer bar for both.
- Same 3-column grid for both. Platform has 18 items (6 rows), Concepts has 10 items (4 rows), so both read as the same component at different lengths.
- Same row treatment everywhere: one icon tile size, one title size, and a single-line description that truncates instead of wrapping. This removes the ragged row heights in Concepts.
- Same footer: helper text on the left, "View all" link on the right.
- Existing per-item icon colors stay exactly as they are.

## No scrollbars at any size

- The panels keep no `max-height` and no `overflow` rule, so a scrollbar can never appear inside them.
- Single-line rows keep the tallest panel (Platform, 6 rows) short enough to fit comfortably below the header on standard viewport heights.
- The existing horizontal clamp stays: each panel is capped at `calc(100vw - 2rem)` and shifted left when it would run past the right edge, so it never overflows the window and never triggers a page-level horizontal scrollbar.
- These dropdowns are desktop only (large screens and up). Small screens continue to use the existing mobile menu, which is unchanged.

## Technical notes

- File: `apps/web/src/components/Header.tsx`.
- Extract a single `MegaMenuPanel` component inside that file taking `open`, `shift`, `items`, `footerLabel`, and `footerHref`, then render it for both Platform and Concepts. This makes the shared style structural rather than two copies that can drift again.
- `productLinks` and `solutionLinks` data, hrefs, `iconWrap` classes, hover/open transitions, `computeShift` clamping, and the trigger links stay as they are.
- No routing, content, or metadata changes.

## Verification

- Measure both panels at 1024, 1280, 1440, and 1920 widths and confirm identical width, identical row height, and no `scrollHeight > clientHeight` inside either panel.
- Confirm no horizontal page overflow and no console errors.
- Screenshot both dropdowns open for a side-by-side check.
