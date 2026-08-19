# Comparison Table Column Spacing Plan

## Goal
Reduce the gap between the sticky "Feature Set" column and the "eatOS" column in the comparison matrix table while keeping spacing between other competitor columns unchanged.

## Current State
The comparison table in `apps/web/src/app/comparison/ComparisonClient.tsx` uses `border-spacing-0` and per-cell padding:
- The sticky "Feature Set" `<th>` and `<td>` use `pr-2` (right padding).
- The "eatOS" column uses `px-2` (left and right padding).
- Other competitor columns use `px-3` (left and right padding).

This creates a 16px gap between Feature Set and eatOS (`pr-2` + `pl-2`), while other columns have 24px between them.

## Changes
1. Reduce the right padding on the sticky "Feature Set" header and cells from `pr-2` to `pr-1`.
2. Reduce the left padding on the "eatOS" column from `px-2` to `pl-1 pr-2` (keep right padding, reduce left padding) so it sits closer to the Feature Set column.
3. Leave the other competitor column padding unchanged so the rest of the table spacing stays consistent.

## Verification
After applying the change, visually inspect the `/comparison` route in the preview to confirm the Feature Set and eatOS columns are now closer together without overlapping or crowding.
