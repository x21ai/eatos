# Repair live routing and audit every public page

## Confirmed current state

- `/shop` loads as HTML, but tested Shop collection, product, and content subpages return `application/octet-stream` on their clean URLs. Browsers treat those responses as downloads.
- `/system-status`, `/pricing`, `/platform`, `/bookademo`, `/media-kit`, and `/reseller` show the same download behavior.
- `/blog`, `/products`, `/support`, and `/news` currently return 404 on their clean live URLs.
- The matching `.html` URLs render correctly, and all tested clean routes work in preview.
- Internal navigation currently compensates by appending `.html` after hydration, but direct visits, refreshes, crawlers, sitemap links, and some framework-rendered links still use clean URLs.
- The Blog page also has a separate hydration error because date formatting produces different calendar dates between server and browser time zones.

## Plan

1. Build a complete route inventory from every page, generated Shop route, Blog route, News route, Support route, redirect, and sitemap entry.
2. Replace the partial client-side navigation workaround with one consistent published URL strategy that works for direct visits as well as clicks. Preserve clean canonical URLs where the host can serve them correctly, and remove conflicting stale or extensionless artifacts from the deployment output.
3. Make the publish artifact deterministic: every public route must have exactly the required HTML target, nested Shop routes included, without binary extensionless files or reliance on ignored host rules.
4. Align generated links, navigation, sitemap entries, canonical metadata, aliases, and legacy redirects with that strategy. Remove the global click interception once normal links are reliable.
5. Fix Blog date rendering with an explicit time zone so server and browser output match.
6. Publish the corrected artifact and test every inventoried live URL, not only a sample. Each route must return the intended redirect or a successful `text/html` response, with no binary downloads or unexpected 404s.
7. Browser-test the main navigation plus Shop collection, product, and content flows, Status, Blog, Products, Support, and News. Confirm no console or hydration errors.

## Acceptance criteria

- Shop home and every Shop subpage open normally from direct links, refreshes, navigation, and the sitemap.
- Status and every other public page render instead of downloading.
- Intended legacy URLs redirect correctly.
- No public route in the route inventory returns an unexpected 404 or `application/octet-stream`.
- Blog hydrates without date mismatches.
