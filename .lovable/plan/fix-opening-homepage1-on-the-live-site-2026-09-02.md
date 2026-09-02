# Fix opening /homepage1 on the live site

## What is actually happening

Checked the live site directly:

```text
https://eatos.lovable.app/homepage1        -> 404
https://eatos.lovable.app/homepage1.html   -> 200 (the real page, 140 KB)
https://eatos.lovable.app/partners         -> 404
https://eatos.lovable.app/partners.html    -> 200
https://eatos.lovable.app/pricing          -> 404
```

So the page is published and healthy. It is not a homepage1 bug: the static host
serves only exact `.html` file keys, so every clean URL 404s, and the 404 shows the
"This page couldn't load" screen. Site navigation works because the publish script
rewrites all internal links to `.html`. Homepage1 is an internal preview page with no
nav link, so it is only ever reached by typing the clean URL, which is the one form
the host does not serve.

## Plan

1. Make homepage1 reachable without typing `.html`: add a real published page at a
   key the host does serve, whose only job is to send the browser onward. Concretely,
   publish `homepage1` as a normal route and additionally emit `dist/homepage1/index.html`
   plus an extensionless probe in the same publish, then verify against the live host
   which of the two forms returns 200. Only the form proven to work is kept.
2. If neither form is served (the likely outcome, matching earlier tests on
   `/pricing`), stop guessing at the host: keep `/homepage1.html` as the working URL
   and add a visible internal entry point (a link from `/home-1` or a short list of
   preview routes) so the page can be opened by clicking instead of typing.
3. Clean URLs site-wide are a hosting-level fix, not a code fix. The two real routes
   are: deploy through the Cloudflare Worker config already in
   `apps/web/wrangler.jsonc`, or have Lovable enable extensionless handling for this
   project. I can prepare the Worker deployment path as a follow-up if you want clean
   URLs everywhere.
4. Republish so the verification is done against the live host, and report the exact
   URLs that return 200.

## Technical notes

- `scripts/prepare-dist.mjs` currently writes only `dist/<route>.html` and rewrites
  every internal `href="/route"` to `href="/route.html"`. The `dist/_redirects`
  rewrites it also writes are ignored by this host, which is why `/pricing` 404s.
- Step 1 touches only that script, no page code, so nothing in the app UI changes.
