# Fix the "Compare" links on the comparison page

## What is happening

On the main comparison page, each competitor's "Compare" link points to the live-parity URL `/eatos-vs-square`, `/eatos-vs-toast`, and so on. Those URLs only exist through a framework-level rewrite onto `/comparison/<competitor>`, and framework rewrites are not part of the published static artifact. The publish step only writes files for routes that were actually prerendered, so the published site has `comparison/square.html` but nothing at `eatos-vs-square`, which is why the click lands on Not Found.

The same gap applies to `/eatos-vs-other-pos-software`, the canonical URL the comparison page declares for itself.

## Fix

1. In the publish step (`scripts/prepare-dist.mjs`), add the comparison URLs to the alias map that already materialises legacy paths as real pages:
   - `eatos-vs-other-pos-software` served from the `comparison` page markup.
   - `eatos-vs-<competitor>` for every competitor slug (square, toast, lightspeed, spoton, touchbistro, revel, micros), served from the matching `comparison/<competitor>` page markup.
   Because these become real page files, the existing internal-link rewriter automatically points the "Compare" links at targets that exist.
2. Leave the canonical tags, sitemap entries, and page metadata as they are, so the live SEO URLs stay unchanged.

## Verification

- Rebuild the publish artifact and confirm a file exists for every `eatos-vs-*` URL, including all seven competitors.
- Open the comparison page in the browser, click through each competitor "Compare" link, and confirm each loads its own comparison page with no console errors.
- Confirm the comparison page itself still loads from both its clean path and its live-parity path.
