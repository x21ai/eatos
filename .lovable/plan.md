# Import all blog posts from Wix

## Approach
Your blog pages now render from a static content module (`apps/web/src/app/blog/content.ts`), not a database. So the import is a one-time sync: pull every published post from your Wix site through the Wix connector and write them into that module. Posts prerender into the static site exactly like the existing 8 posts.

## Steps

**1. Connect Wix**
- Link your Wix account via the connector card (API key from Wix dashboard: Settings > API Keys).
- The gateway authenticates with the key; nothing is exposed to the browser.

**2. Discover your site and posts**
- Call Wix `Query Sites` to find your site ID (confirm it is the right one if you have multiple sites).
- Pull all published posts from the Wix Blog API (v3): title, slug, excerpt, rich content, cover image, publish date, author, categories/tags.

**3. Import script (run once, committed for re-runs)**
- Script at `tools/wix-blog-import/` that calls the Blog API through the gateway.
- Converts Wix rich content to the `body` block format our post page already renders (paragraphs, headings, lists, images, links).
- Downloads each cover image into `apps/web/src/app/blog/assets/blog/` as committed assets.
- Maps Wix categories to our existing category list; new categories get added to the filter row.
- Writes the merged entries into `content.ts` (existing 8 posts stay, duplicates by slug are skipped).
- Sanitizes copy on import: no em dashes (replaced with commas/colons per project rule).

**4. Verify**
- Blog index shows all imported posts with correct images, dates, excerpts and categories.
- Spot-check several post pages for correct body rendering, then publish.

## Notes
- **Ongoing publishing**: if you keep writing in Wix, the script is re-runnable to import new posts on demand. A fully automatic sync (fetching from Wix at request time) is possible but would re-introduce a live dependency that slows the static site; on-demand re-import is the better fit.
- Posts with complex Wix widgets (video embeds, galleries) that do not map to our block types will render the text around them; I will flag any such posts in the import report so we can handle them individually.

## Technical details
- Wix endpoints: `POST /site-list/v2/sites/query`, then blog query with `wix-site-id` header, all via `https://connector-gateway.lovable.dev/wix/...`.
- Import runs server-side (Node script), reads `LOVABLE_API_KEY` and `WIX_API_KEY` from env.
- No database or schema changes; `/api/blog` admin routes untouched.
