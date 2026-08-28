# Import the live newsroom at its original URLs

The blog import is done: 966 posts now serve at their real `/blogs/<slug>` paths. The remaining gap is the newsroom. Every `/news`, `/news/...` and `/newsroom/...` URL currently 301s to `/blog`, so those live pages lose their own content and any links pointing at them.

## What gets built

1. **Inventory.** Pull the live newsroom URLs through the fetch gateway (the newsroom listing plus its sitemaps; direct curl is blocked by the live site's bot challenge, the gateway is not). Report the exact count before importing, rather than assuming a number.
2. **Extract.** For each item capture title, publish date, author, category, hero image, body as structured blocks, and meta description. Wix chrome and related-post rails get stripped the same way as the blog import.
3. **Store.** Write to `apps/web/src/app/blog/news.generated.json`, kept separate from `posts.generated.json` so blog and newsroom stay distinguishable and re-runnable independently. Hero images stay as remote pointers, matching what the blog import already does.
4. **Route.** Serve items at their exact live paths (`/news/<slug>`, `/newsroom/<slug>`) through rewrites into the existing post renderer, and remove the blanket redirect for slugs that now exist. Anything not imported keeps redirecting to `/blog`.
5. **Newsroom index.** `/news` and `/newsroom` render a listing of the imported items, using the existing blog index layout, instead of redirecting.
6. **SEO.** Self-referencing canonical on each item at its live path, title, description, og/twitter tags, JSON-LD Article, and sitemap entries with each item's own publish date.
7. **Verify.** Crawl every imported slug locally, confirm 200s, non-empty bodies, working hero images, and spot-check a sample against the live pages.

Newsroom items stay out of the main `/blog` feed unless you want them mixed in; they get their own index.

## Technical notes

- Extraction runs as parallel sub-tasks in batches, same pipeline as the blog import.
- `next.config.js`: replace the `['/news', '/blog']` and `['/news/:path+', '/blog']` redirects (and the `/newsroom` pair) with rewrites into the blog routes, keeping a fallback redirect for unknown slugs.
- `scripts/prepare-dist.mjs` mirrors the new paths into the static output, as it already does for `/blogs`.
- `apps/web/src/app/sitemap.ts` gains the newsroom entries.
- Copy is normalized to the no-em-dash rule during transform.
