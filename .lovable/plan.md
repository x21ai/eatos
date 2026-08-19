# Comparison table spacing to match the reference

Rework the desktop/tablet comparison matrix so column widths, padding, and alignment match the attached screenshot, and center the whole table in the page.

## What changes

1. Column proportions (matching the reference)
   - Feature Set column: about 24% of the table width (currently 5/12 = 42%, far too wide).
   - eatOS column: slightly wider than the rest, about 13%, so its highlighted panel reads as the hero column.
   - Each of the 7 competitor columns: equal share of the remaining width, about 9% each.
   - Keep the fixed table layout so these proportions hold exactly.

2. Even, symmetric spacing
   - Restore balanced horizontal padding on the Feature Set cells (small left inset, normal right padding) instead of the current squeezed `pr-1`.
   - Give the eatOS column symmetric padding again (no `pl-1` / `pr-2` mismatch) so its check marks sit dead center in the panel.
   - Use the same centered padding for every competitor column so the check mark rows line up in a clean grid, as in the screenshot.
   - Slightly increase the row vertical rhythm so rows breathe like the reference (taller rows, consistent divider lines).

3. Centering
   - Center the table block itself: constrain it with a max width and `mx-auto`, and remove the asymmetric `lg:px-16` padding that currently offsets it.
   - Keep horizontal scrolling on tablet only when the table exceeds the viewport; when it fits, it stays centered rather than left-aligned.

4. Untouched
   - Mobile stacked per-brand cards stay exactly as they are.
   - Heading, subheading, competitor links, and check mark styling stay the same.

## Technical notes

- All edits are in `apps/web/src/app/comparison/ComparisonClient.tsx`, inside the `Matrix()` component.
- Column widths applied via explicit `w-[24%]`, `w-[13%]`, `w-[9%]` classes on the `<th>` elements with `table-fixed`.
- Scroll wrapper becomes `mx-auto max-w-[1200px] overflow-x-auto` with symmetric padding; table `min-w-[1000px]`.
- Verify at desktop (1340px), tablet (768px), and mobile (390px) with Playwright screenshots before finishing.
