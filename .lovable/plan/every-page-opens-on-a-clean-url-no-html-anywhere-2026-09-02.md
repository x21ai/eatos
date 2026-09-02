# Every page opens on a clean URL, no ".html" anywhere

## Goal

`https://eatos.lovable.app/pricing`, `/shop`, `/support`, `/products/...`, blog and shop
pages all open directly, and no `.html` ever appears in the address bar. The `.html` URLs
keep working silently so anything already shared or indexed is not broken.

## Why it happens today (verified on the live site)

```text
GET /pricing        -> not found
GET /pricing.html   -> 200 OK, text/html
GET /pricing/       -> not found
GET /shop           -> not found
GET /support        -> not found
```

Two causes in `scripts/prepare-dist.mjs`:

1. Pages are published only as `dist/<route>.html` and `dist/<route>/index.html`, and a
   step at the end of the script rewrites every internal link from `/pricing` to
   `/pricing.html`. That rewrite is why the extension shows in the URL on every click.
2. The `dist/_redirects` file ends with `/* /:splat.html 200`, which was supposed to make
   clean URLs resolve. The responses above prove the host is not applying it, so a typed or
   shared clean URL returns not found. The host resolves exact file keys only: it does not
   append `.html`, does not serve a directory index, and does not fall back to `404.html`.

An earlier attempt at publishing extensionless files did make clean URLs resolve, but the
host labelled them `application/octet-stream` with `nosniff`, so browsers downloaded the
page instead of rendering it. That is why they were removed and the `.html` rewrite added.

## The fix

### 1. Remove the link rewrite
Delete the href-rewriting block in `scripts/prepare-dist.mjs`. Internal links go back to
clean URLs, which is what the site's own markup, canonicals and sitemap already use. This
is the change that removes `.html` from the address bar.

### 2. Make clean URLs resolve as HTML
Publish an extensionless file at every clean path (`dist/pricing`, `dist/shop`,
`dist/products/point-of-sale`, and so on) alongside a `dist/_headers` file that pins
`content-type: text/html; charset=utf-8` for those paths. Extensionless files are the only
form the host resolves at a clean URL, so the remaining problem is purely the content type,
and `_headers` is the mechanism for that.

Then publish once and measure live: status code and `content-type` for a clean URL on a
leaf page, a section page with children, a deep shop product and a blog post.

### 3. If `_headers` is still ignored, escalate rather than reintroduce ".html"
If the probe shows `application/octet-stream` again, the static mirror cannot deliver clean
URLs on this host and the publish artifact itself is the problem. In that case I switch the
project off the hand-rolled `dist/` mirror and publish the app through the platform's own
routing, which resolves clean URLs natively, instead of flattening the Next build into a
static folder. I will explain the tradeoffs before making that change rather than doing it
silently, since it touches how the project is built and deployed rather than page content.

I will not fall back to `.html` links again. That is the behaviour you are asking to remove.

### 4. Keep old URLs alive
- `<route>.html` and `<route>/index.html` keep being published, so every previously shared
  or indexed `.html` link still loads.
- The legacy redirects already in the script (`/newsroom`, `/get-started`, `/tap-to-pay`,
  `/cart`, shop collection and page paths) stay exactly as they are.
- Canonical tags and `sitemap.xml` continue to advertise the clean URLs, which is now what
  actually loads, so search engines consolidate on one form.

### 5. Verify across the whole site, not a sample
After publishing, request every route in the inventory (all pages plus generated shop,
blog, news and support routes) and require `200` with `content-type: text/html` on the clean
URL. A `200` with `application/octet-stream` counts as a failure. Then a browser pass over
the header, footer, mega menu, shop flow and a blog post to confirm no `.html` appears in
the URL bar and no console errors.

## Technical notes
- All edits are confined to `scripts/prepare-dist.mjs` plus the new `dist/_headers` output.
  No page content, component, styling or route changes.
- The published output grows by one file per route (the extensionless copy). At roughly
  1,400 routes that is well within host limits.
- This is only observable on the published site, so a publish is part of the work, and
  nothing is reported as fixed until live headers confirm HTML on clean URLs.

## Not doing
No route renames, no copy or design changes, and no removal of the `.html` files.
