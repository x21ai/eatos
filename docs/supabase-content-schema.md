# Content schema for your own Supabase project

The site now reads blog, newsroom and shop content from your Supabase project
when credentials are present, and falls back to the content bundled in the site
when they are not. No database, migration or secret was created here: build the
tables in Cursor and the pages pick them up.

## Environment variables

Set these where the site is built and served:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Only the publishable (anon) key is used here. Anything needing the service role
key, including cart writes, checkout and payments, belongs in your own backend.

## Tables the reader expects

Column names are the contract. Add extra columns freely, they are ignored.

### `posts` and `news_posts`

| column | type | notes |
| --- | --- | --- |
| slug | text primary key | must match the current live URLs |
| title | text | |
| excerpt | text | |
| body | jsonb | array of `{ type: 'p' \| 'h2' \| 'h3' \| 'ul' \| 'quote', text?, items? }` |
| cover_image | text | absolute URL |
| category | text | |
| author_name | text | |
| published_at | timestamptz | list order, newest first |
| status | text | only `published` rows are read |

### `collections`

`slug` (pk), `title`, `description_html`, `image`, `position`.

### `products`

`slug` (pk), `title`, `vendor`, `product_type`, `tags text[]`,
`description_html`, `price_amount numeric`, `compare_at_amount numeric`,
`currency text`, `available boolean`, `status text`, `published_at`,
`updated_at`. Only `status = 'published'` is read. A price of 0 or null renders
as quote on request, never as free.

### `product_images`

`product_slug`, `url`, `alt`, `width`, `height`, `position`.

### `product_variants`

`id` (pk), `product_slug`, `title`, `sku`, `price_amount`, `compare_at_amount`,
`currency`, `available`, `requires_shipping`, `options text[]`, `image_url`.

### `collection_products`

`collection_slug`, `product_slug`, `position`.

## Access

Public reads go through the anon key, so each of these tables needs row level
security on with a narrow read policy, plus the grants PostgREST requires:

```sql
GRANT SELECT ON public.posts TO anon, authenticated;
GRANT ALL ON public.posts TO service_role;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read published posts" ON public.posts
  FOR SELECT TO anon, authenticated USING (status = 'published');
```

Repeat per table. Shop tables read publicly with no status filter except
`products`.

## Moving the current content in

```
node scripts/export-supabase-seed.mjs
```

Writes `seed/001_posts.sql`, `seed/002_news_posts.sql` and `seed/003_shop.sql`
from the content shipping today, 966 blog articles, 966 newsroom articles, and
the 52 products with their collections, images and variants. Run them against
your project after creating the tables. Every slug is preserved, so existing
search rankings and inbound links keep working.

## Where the reading happens

- `apps/web/src/lib/supabase/config.ts` reads the environment variables.
- `apps/web/src/lib/supabase/rest.ts` is a small fetch wrapper on the Data API,
  no SDK, so it also runs on Cloudflare.
- `apps/web/src/lib/blog/data.ts` and `apps/web/src/lib/shop/data.ts` are the
  only places the tables are named. Pages call these, never the tables.
- Responses are cached for 60 seconds.

## Still to build in your backend

Cart, checkout, tax and shipping, payments, order records and confirmation
emails. Those need write access and a served runtime, and are listed in
`docs/backend-wiring.md`.
