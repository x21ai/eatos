# Reduce site side padding

Yesterday all pages were moved onto one shared container (`site-container`) that sets the left/right spacing. Today that spacing feels too wide, so content sits too far from the screen edges.

## What changes

Reduce the horizontal padding in that single shared rule, so every page (home, products, solutions, blog, legal, comparison, etc.) updates at once:

- Mobile: from 20px to 16px
- Tablet: from 32px to 20px
- Desktop: from 40px to 24px

Content max width stays the same (72rem), so on large screens the layout looks unchanged; the difference shows on small and mid-size screens where the padding was doing the work.

## Technical detail

Only `@utility site-container` in `apps/web/src/app/global.css` (lines 200-211) is edited: `padding-inline` values change to `1rem`, `md:1.25rem`, `lg:1.5rem`. No component files touched.

## Verification

Screenshot the home page plus one product and one solution page at desktop, tablet and mobile widths to confirm spacing is tighter and nothing bleeds off-screen or gains a horizontal scrollbar.
