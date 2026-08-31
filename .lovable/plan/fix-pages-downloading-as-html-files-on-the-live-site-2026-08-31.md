# Fix pages downloading as HTML files on the live site

## What is actually happening

Confirmed with live requests to eatos.lovable.app just now:

- `/` returns 200 as `text/html` and renders.
- `/pricing` and `/platform` return 200 but with `content-type: application/octet-stream`, plus `x-content-type-options: nosniff`. That combination tells the browser "this is a binary file, do not guess", so it offers a download instead of rendering. This is the exact symptom you are seeing.
- `/pricing.html`, `/platform.html`, `/blog.html`, `/products.html` all return 200 as proper `text/html`.
- `/blog` and `/products` return a plain-text 404 from the host.
- `/shop` returns 200 as proper `text/html`.

Cause: the publish step writes each page three times, including an extensionless copy (`dist/pricing`). The host serves that exact file byte for byte and, with no extension to go by, labels it `application/octet-stream`. The `_headers` file that was meant to pin `text/html` is being ignored by the host, and the `_redirects` proxy rules are being ignored too, which is why the routes that rely on them (`/blog`, `/products`) 404 while `/shop`, which resolves through the host's own `.html` lookup, works.

So the download behaviour and the remaining 404s are the same root problem: the build is fighting the host's URL resolution instead of using it.

## The fix

1. Stop emitting extensionless page copies in the publish step. Those files are the direct cause of the download prompt.
2. Keep only what the host demonstrably serves as HTML: `<route>.html` for every page, plus `<route>/index.html` for routes that also have children, and `index.html` / `404.html` at the root.
3. Determine the host's clean-URL rule empirically instead of assuming it: probe a small matrix of live paths (extensionless, `.html`, trailing slash, `/index.html`) across a leaf route, an overview route with children, and a deep route. Whichever form the host resolves becomes the single form the build emits and links to.
4. Make in-site links match that resolved form for every page, not just the overview routes, so header, footer, menu and in-body links all land on a servable path. If the host resolves clean URLs once the extensionless files are gone, links stay clean and nothing needs rewriting.
5. Keep the legacy `_redirects` entries (`/newsroom`, `/blogs`, `/get-started`, `/tap-to-pay`) since those are redirect rules, not the 100-rule proxy class that was silently truncated.
6. Publish, then verify live with real requests across every route, checking two things per URL: status 200 and `content-type: text/html`. A 200 with `application/octet-stream` counts as a failure. Includes `/products/*`, `/solutions/*`, `/shop/*`, `/blog/*`, `/news/*`, `/support/*`.

## Notes

- No page content, design, copy or component changes. This is entirely in the publish output step (`scripts/prepare-dist.mjs`) and, if step 4 requires it, the link form used in navigation.
- The preview app already serves every page correctly, so this is only observable and only verifiable on the published site. A publish is part of the work.
- Nothing is reported as fixed until live headers confirm HTML content type on every route.
