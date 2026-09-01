# Fix footer link columns on tablet

## Problem (confirmed)

The footer link row has 5 groups in this order: Products, Grow, Concepts, Company, Resources. On tablet the row is a centered flex-wrap layout with each group at one third width, so the first row holds Products, Grow, Concepts and the leftover two groups (Company, Resources) get centered on the second row instead of lining up under the first two columns.

## Change

In `apps/web/src/components/Footer.tsx`, on the footer link `<nav>` only:

- Keep the wrapping items at one third width for tablet, but stop centering at the tablet breakpoint so wrapped items align to the left edge: add left alignment for the `md` range (`md:justify-start`), leaving `justify-center` for mobile and the existing `lg` behaviour untouched.

Result on tablet:

```text
Products    Grow        Concepts
Company     Resources
```

## Notes

- Mobile (2 per row) and desktop (single 5 column row) rendering stays exactly as it is.
- No copy, link, or ordering changes; single className edit.
