# Footer polish + live blog migration

## 1. Sales card: remove the divider line
The Sales card in the footer draws a top border above the message-channel icons. Drop that rule so the icon row sits directly under the phone number with the same spacing rhythm as the rest of the card.

## 2. Office addresses: dash before ZIP, period after
Change the shared address formatter so the locality line reads:

```text
Cupertino, California - 95014.
Miami, Florida - 33131.
Los Angeles, California - 90048.
```

One formatter change covers footer and any other surface using it. The contact page has one hardcoded Cupertino address that gets the same treatment.

## 3. Migrate the live blog and newsroom at original slugs
Goal: keep every ranking URL from the live site alive with its real content instead of redirecting to `/blog`.

Phases:

1. **Inventory.** Pull the live blog/news sitemaps, build a complete list of `/blogs/...` and `/news/...` URLs with published dates and categories. Report the exact count before importing (the ~500 figure is an estimate).
2. **Extract.** Fetch each page and capture title, publish date, author, category, hero image, body (as structured blocks), and meta description. Images are registered as CDN asset pointers, not committed binaries.
3. **Store.** Move the blog dataset out of the hand-written `content.ts` into a generated data file (`blog/posts.generated.json`) plus a small typed loader, so 5 curated posts and hundreds of imported posts coexist. The current 5 posts are preserved.
4. **Route.** Serve imported posts at their exact live paths (`/blogs/<slug>`, `/news/<slug>`) and remove the blanket redirect to `/blog` for those that now exist. Anything still missing keeps redirecting.
5. **SEO.** Per-post canonical, title, description, og/twitter tags, JSON-LD Article, and sitemap entries with real `lastModified` dates.
6. **Verify.** Crawl the imported slugs locally, confirm 200s, no empty bodies, no broken images, and spot-check a sample against the live pages.

Because this is a large batch, extraction and verification run as parallel sub-tasks and land in batches (categories at a time) rather than one giant commit.

## Technical notes
- Address formatting stays centralized in `formatOfficeAddress` in `apps/web/src/components/Footer.tsx`.
- Divider removal is the `border-t border-white/15` on the channel row in the Sales card.
- Imported content is sanitized to plain structured blocks (headings, paragraphs, lists, images, quotes); no raw Wix markup or scripts are carried over.
- Copy passes the existing no-em-dash check; imported text is normalized to commas or hyphens.
