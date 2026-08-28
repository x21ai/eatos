# Blog index: fix pagination and hero

Two problems on `/blog`, both confirmed in the code:

1. Pagination renders one numbered button for every page. With 966 imported posts at 6 per page that is roughly 161 buttons in a single row, which is why the strip of numbers runs off the screen and reads as noise.
2. The hero uses the first post's cover image as a faded background. That image is a brochure mockup from one arbitrary post, so it looks random behind the "Welcome to the eatOS Blog" headline and fights the text.

## What changes

**Pagination**

- Replace the full number strip with a compact, windowed control: first page, previous, a short window of pages around the current one with ellipses, next, last. Never more than about 7 numbers on screen, and on mobile it collapses to "Page 4 of 161" with previous and next arrows.
- Show a result count above the grid ("Showing 1 to 12 of 966 posts") so the position is readable without counting buttons.
- Raise page size from 6 to 12 so scrolling through the archive takes fewer steps.
- Scroll back to the top of the post grid when the page changes, instead of leaving the user mid-list.

**Hero**

- Drop the borrowed post image. The hero becomes a clean black panel in the site's existing style: brand eyebrow, headline, intro line, and the two existing buttons (Book a Demo, Brochures), with a subtle brand-pink radial wash instead of a photo, matching the treatment used on other black sections of the site.
- Keep the same spacing, rounded panel and entrance animation so it still sits consistently with the rest of the site.

## Technical notes

- Only `apps/web/src/app/blog/BlogIndexClient.tsx` is touched: `HeroBanner` loses the `posts[0].image` background, `Pagination` is rewritten as a windowed control, and `PAGE_SIZE` moves from 6 to 12.
- No content, routing, or SEO changes; post URLs and the archive itself are untouched.

## Verification

Check `/blog` at 390px, 820px and 1440px: no horizontal overflow from the pagination, the window advances correctly at page 1, a middle page, and the last page, category filters still reset to page 1, and the hero reads cleanly with no leftover image.
