# Fix uppercase "EATOS" rendering on comparison pages

The eyebrow labels on the comparison pages use a `uppercase` Tailwind class, which turns "eatOS vs ..." into "EATOS VS ...". This affects the main comparison page and every individual competitor comparison page.

## What to change

1. In `apps/web/src/app/comparison/ComparisonClient.tsx`, remove the `uppercase` class from the hero eyebrow label that currently reads "eatOS vs Other POS".
2. In `apps/web/src/app/comparison/[competitor]/CompetitorClient.tsx`, remove the `uppercase` class from the hero eyebrow label that currently reads "eatOS vs {name}".

## Verification

- Check `/comparison` and `/comparison/toast` (and one other competitor page) in the preview.
- Confirm the eyebrow text renders as "eatOS vs ..." instead of "EATOS VS ...".
- Verify the change across desktop, tablet, and mobile viewports.
