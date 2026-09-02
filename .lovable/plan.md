# Fix clean URLs so pages open without ".html"

## Why it happens (verified against the live site)

I tested the published site directly:

```text
GET /pricing        -> 502 / 404   (clean URL does not resolve)
GET /pricing.html   -> 200 OK      (only this exists)
GET /pricing/       -> 404
GET /shop           -> 404
GET /support        -> 404
```

Two things in `scripts/prepare-dist.mjs` combine to produce what you are seeing:

1. Every page is published as `dist/<route>.html`, and a step near the end of the script
   rewrites every internal link in the published HTML from `/pricing` to `/pricing.html`.
   That rewrite is why the extension shows up in the address bar on every click.
2. The script also writes a `dist/_redirects` file whose last rule (`/* /:splat.html 200`)
   was supposed to make the clean URLs resolve. The live responses above prove the host
   is not applying that rule, so any clean URL, typed or shared, returns not found.

The link rewrite was added as a workaround for exactly that failure. It keeps the site
clickable, but at the cost of `.html` in every URL, which also splits your canonical tags
(the sitemap and canonicals still advertise the clean URLs) from what actually loads.

## The fix

### Step 1: confirm which lookup the host honors
Before changing the publish script I will probe the live deployment for the variants the
current build already contains, including `/pricing/index.html` and an extensionless
object, and record exactly which ones return `200` with `content-type: text/html`. This
takes one pass and removes all guesswork about host behavior.

### Step 2: publish clean URLs as real files
Based on that result, one of two routes:

- **If the host serves an extensionless object as HTML**, write each page at its clean path
  (`dist/pricing`) with an explicit HTML content type, keep the `.html` copy as a fallback
  for existing shared links, and delete the internal link rewrite so navigation stays on
  clean URLs. An earlier attempt at extensionless files caused browsers to download the
  file instead of rendering it, so this route only proceeds if the probe shows a correct
  `text/html` content type.
- **Otherwise**, publish a tiny HTML page at every clean path that immediately forwards to
  the `.html` file. Typed and shared clean URLs then land on the right page, and the
  `.html` rewrite stays only for in-site links. This is the guaranteed-to-work fallback
  and is what I will use if the probe is inconclusive.

### Step 3: keep old links alive and consistent
- Every existing `.html` URL keeps working, so nothing already shared or indexed breaks.
- Canonical tags and `sitemap.xml` stay on the clean URLs, which is what you want search
  engines to consolidate on.
- The legacy redirects already in the script (`/newsroom`, `/get-started`, `/tap-to-pay`,
  shop and collection paths) are preserved untouched.

### Step 4: verify
After publishing, re-run the same probe across a representative set (`/`, `/pricing`,
`/shop`, `/support`, `/products/point-of-sale`, a blog post, a shop product) and confirm
each returns `200 text/html` at the clean URL, and that clicking through the site no longer
shows `.html`.

## Technical notes
- All changes live in `scripts/prepare-dist.mjs`: the href rewrite block and the emit step.
  No application code, routes or components change.
- The `_redirects` wildcard stays in place; it costs nothing if the host ever starts
  honoring it, and Step 2 no longer depends on it.
- Page count roughly doubles in the published output because each route ships a clean-path
  file plus its `.html` twin. With around 1,400 pages this is still well within limits.

## Not doing
No route renames, no changes to page content, and no removal of the `.html` files, since
those are what current inbound links point at.
