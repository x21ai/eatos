# Newsroom page, linked from the footer

The footer "Newsroom" link currently points to `/blog`. A newsroom already exists at `/news` with 97 imported items (each with title, category, date, author, excerpt, hero image and body), served at their original `/news/<slug>` URLs, with `/newsroom` already rewriting to `/news`.

So this is two things: point the footer link at the real newsroom, and restructure the `/news` index so its layout matches the reference screenshot while keeping our black site styling.

## What changes

1. **Footer link**: `Newsroom` goes to `/news` instead of `/blog`.

2. **Newsroom index layout** (`/news`), rebuilt to the reference structure, top to bottom:
   - Breadcrumb line ("Newsroom").
   - Featured lead item: category tag, date, large headline, short description, "Read More" button on the left; the item's hero image on the right.
   - Category strip: a full-width dark bar with the four categories (Event News, Product News, Industry News, Company News), each with an icon, filtering the list below.
   - Two spotlight cards side by side: image-backed panels with category tag, date, headline, description and a "Read More" button.
   - "Latest News" section: centered heading, then a two-column grid of compact cards, each with a thumbnail on the left and date, title, excerpt and "Read More" on the right. Load-more pagination stays.
   - "Access Brand Materials" band with the media-inquiries line and a "Media Kit" button.
   - Existing newsletter section stays at the bottom.

3. Styling stays ours: black background, Montserrat, brand pink accents, same container width, rounded cards and hairline borders as the blog index. Same hero top spacing as other interior pages.

4. Category filtering keeps working through the URL (`/news?category=...`) so filtered views stay linkable.

## Technical notes

- Files touched: `apps/web/src/components/Footer.tsx`, `apps/web/src/app/news/NewsIndexClient.tsx`, and `apps/web/src/app/news/content.ts` only if the category strip needs icon metadata.
- No content re-import: the existing `news.generated.json` supplies everything. Item detail pages at `/news/<slug>` are unchanged.
- The "Media Kit" button targets the existing brochures/press destination; if no media kit asset exists it links to `/brochures`.
- No em dashes in any copy.
- Verify at 390px, 768px and 1280px with no horizontal overflow and no console errors.
