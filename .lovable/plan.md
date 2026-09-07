# Fix Not Found on mobile menu Platform and Concepts links

## What is happening

On the published site, pages are served only as `page.html` keys. The publish step rewrites links inside the already-built page HTML so they point at the working `.html` address.

The mobile menu is only created after you tap the hamburger, so its links do not exist when the publish step runs. They keep the plain address (for example `/platform`), which the host cannot serve, so you land on Not Found. The desktop menu triggers are present in the page from the start, which is why they work.

## The fix

Add one small runtime link handler, mounted once for the whole site, that catches clicks on internal links and sends the visitor to the address the host can actually serve. This covers every menu, popup and panel that appears after a tap, not just Platform and Concepts.

- Only affects same-site page links. External links, downloads, files, anchors, new-tab clicks and modifier-clicks are left alone.
- Only active in the published static build, so local preview keeps clean addresses.
- The visible link text and addresses stay the same, so nothing changes for search engines.

## Verification

- Tap Platform and Concepts in the mobile menu, plus "All products", "All concepts" and the Pricing/Enterprise/Customers shortcuts, and confirm each opens its page.
- Confirm desktop navigation and footer links still work unchanged.

## Technical detail

- New client component (for example `apps/web/src/components/StaticLinkFix.tsx`) mounted in the web root layout / `Providers`.
- Delegated `click` listener on `document`: resolve the anchor via `closest("a")`, skip when `target`, `download`, `rel=external`, non-http protocol, cross-origin, hash-only, or `metaKey/ctrlKey/shiftKey/button !== 0`; skip paths that already contain a dot.
- Rewrite `pathname` to `${pathname.replace(/\/$/, "")}.html` and navigate, preserving search and hash.
- Gate behind a build flag (for example `NEXT_PUBLIC_STATIC_HTML_LINKS`) set for the publish build only, matching the existing rewrite logic in `scripts/prepare-dist.mjs`.
- No change to `Header.tsx` link hrefs and no change to `prepare-dist.mjs` output keys.
