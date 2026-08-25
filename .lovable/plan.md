# Import 1,000 Wix blog posts into this website

## Goal
Move all ~1,000 posts from the Wix Blog app into this site, store them in a Lovable Cloud database, show them on the existing `/blog` pages, and let you publish new posts from the site's own admin dashboard.

## Steps

**1. Enable Lovable Cloud**
- Provisions the built-in database and auth. Replaces the current D1-based `/api/blog` backend, which fails in preview and on the live static site.

**2. Connect Wix**
- Link your Wix account through the Wix connector. We then query your Wix sites, pick the right one, and use the Wix Blog API (`/blog/v3/posts/query`) to read every post: title, slug, excerpt, full HTML content, cover image, author, publish date, tags, categories, and SEO fields.

**3. Database table: `blog_posts`**
- Columns: title, slug (unique), excerpt, content (HTML), cover_image, author_name, published_at, categories, tags, seo_title, seo_description, status (draft/published), timestamps.
- Public read access for published posts only; writes restricted to the signed-in admin. Includes the required GRANT statements and RLS policies.

**4. One-click "Import from Wix" action**
- A protected server-side import that pages through all 1,000 Wix posts in batches and upserts them into `blog_posts` (safe to re-run; no duplicates, matched by slug).
- Triggered once from the admin area; shows progress (imported count) as it runs.

**5. Public blog pages read from the database**
- `/blog` keeps its current design but loads posts from the database with server-side pagination and the existing category filters (categories come from the real imported data).
- `/blog/[slug]` renders the full article HTML, cover image, author, date, and per-post SEO meta from the database.
- Sitemap updated to include all published post URLs.

**6. Admin dashboard for new posts**
- `/admin/blog` is repointed from the broken D1 API to the database: list, search, filter by status, create, edit, publish.
- Protected with Lovable Cloud sign-in so only you can create or edit posts.
- Publishing a new post makes it appear on `/blog` immediately, no republish needed.

## What stays the same
- The current blog index and article designs; only the data source changes.
- The existing 8 hand-written posts are imported into the database as part of the migration so nothing is lost.

## Technical notes
- The site currently exports static HTML; the blog routes will read from the database at request time instead of at build time.
- Import is idempotent (slug-keyed upsert), so you can re-run it any time to pull in posts added on Wix before cutover.
- Cover images stay on Wix's CDN URLs initially; they keep working as long as the Wix media is public.
