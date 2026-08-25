# Import ~1500-2000 blog posts from Wix into a database-backed blog

## Why a database (not the static module)
With 1500-2000 posts, keeping posts in `content.ts` would:
- Bundle every post's full text into the JavaScript download (multiple MB on every page load).
- Make builds slow and brittle (thousands of prerendered pages).
- Force the index page to download all post metadata just to render filters.

A database serves only the page of posts being viewed, scales to any volume, and lets you keep publishing in Wix and re-syncing on demand.

## Steps

**1. Enable Lovable Cloud**
- Built-in database and server functions, no external accounts.

**2. Create the `blog_posts` table**
- Columns: slug (unique), title, category, excerpt, content (rich HTML or block JSON), cover_image, author, published_at, seo_title, seo_description.
- Public read policy (published posts only) so the blog stays fast and anonymous-friendly.
- Full-text search index on title/excerpt for the search box.
- Migrate the 8 existing static posts into the table as part of the migration seed.

**3. Connect Wix and import**
- Link your Wix account via the connector card.
- Import script at `tools/wix-blog-import/` pulling all published posts through the Wix Blog API (v3), batched inserts, idempotent (safe to re-run; matches on slug, updates changed posts, inserts new ones).
- Cover images uploaded to Cloud storage; body images keep their Wix CDN URLs (they are public) so no 1500-image re-hosting chore.
- Sanitize on import: em dashes replaced per project rule; category mapping to our filter list.

**4. Rebuild blog pages on the database**
- Index: server function with cursor pagination, category filter and search; "Load more" appends pages; hero and featured post unchanged.
- Post page `/blog/[slug]`: fetches the single post by slug with related posts; 404 state for unknown slugs.
- SEO: per-post head metadata from the post row.

**5. Verify and publish**
- Check index pagination/filtering with the full dataset, spot-check several imported posts, confirm mobile layout.

## Notes
- **Ongoing sync**: re-run the import script anytime to pull new/updated Wix posts. If you later want automatic sync, we can add a Wix webhook endpoint.
- The existing 8 static posts remain live until the database cutover, so nothing breaks mid-migration.
- Admin `/api/blog` routes stay untouched.

## Technical details
- Reads go through `createServerFn` public server functions using the publishable key with a narrow `TO anon` SELECT policy on published rows.
- Import script runs server-side with the service role key, reading `LOVABLE_API_KEY` + `WIX_API_KEY` for the Wix gateway calls.
- Pagination is cursor-based: `{ data, next_cursor, has_more }` per project API rules.
