# Full pre-launch audit: SEO, speed, screens, browsers, duplicates

Goal: one deep audit pass that produces a written report plus a prioritised fix list, then the fixes themselves in a second round once you approve the findings.

## What I already found

Confirmed, not guesses. The audit was partway through when it was paused, so these are real measurements:

- 81 pages exist. 40 have a title and description but no self-referencing canonical address, and 13 more are built in a way that gives them no title or description at all, including the home page, Platform, Contact, Company, Resources, Reseller, Solutions and Products. Only 13 of 81 pages currently declare a canonical address.
- Duplicate near-identical pages: `home-1` (648 lines), `homepage1` (802 lines) and `homepage2` sit alongside the real home page (849 lines). Search engines are told to skip `home-1` and `homepage2`, but `homepage1` is still open to them. `solutions` (282 lines) and `platform` (546 lines) overlap and `solutions` is listed in the site map.
- Images are never served through the built-in image optimiser anywhere on the site. Of 382 image tags, 321 have no alt text and 340 do not defer loading until scrolled into view.
- Confirmed oversized downloads: the blog page pulls 14 MB of images, including two Wix originals at 3500 and 4500 pixels wide displayed at 329 pixels. `/homepage1` weighs 9.9 MB and takes 7.2 seconds to finish loading. The home page is 6.4 MB, Point of Sale 7.7 MB.
- 33 uploaded images are referenced by nothing and can be deleted.

## Audit plan

### 1. Search readiness
- Inventory every public page and list which lack a unique title, description, canonical address and share image.
- Check the site map against the real page list: missing pages, dead entries, duplicate entries.
- Check heading structure (one main heading per page) and image alt text coverage.
- Check the legacy blog and support imports still resolve to their original addresses.

### 2. Duplicate and unused content
- Compare `home-1`, `homepage1`, `homepage2` against the live home page and recommend which to delete versus keep hidden.
- Same for `solutions` vs `platform`, `news` vs `blog`.
- List the 33 unreferenced images plus any unused local files.
- Find repeated copy blocks reused verbatim across pages, which search engines treat as thin content.
- Find unused components and dead code paths.

### 3. Speed
- Finish measuring weight and load time across the home page and representative product, concept, blog, shop, support and pricing pages.
- Report the actual byte weight of the heaviest images and videos and what they should be.
- Check the videos on `/homepage1` and the animation sequences.
- Check fonts load without blocking, and that Montserrat is loaded once.
- Check what loads before anything is visible: the chat assistant, cookie banner, tracking scripts.

### 4. Screen sizes
- Check every major page at phone (390), large phone (430), tablet portrait (768), tablet landscape (1024), laptop (1280) and wide (1600) widths.
- Flag sideways scrolling, cut-off text, overlapping items, cropped images, and unreadable small text, with screenshots of each problem.

### 5. Browsers
- Review the code for anything only newer browsers support, and check Safari and mobile Safari behaviour (video autoplay, sticky headers, backdrop blur, date handling).
- Confirm the clean-address link fix behaves on all browsers.

### 6. Live-hosting correctness
- Verify every page opens at its address without the `.html` ending after publishing, since that has caused "Not Found" errors before.
- Check every internal link and button for dead destinations across the whole site.

## Deliverable

A report at `docs/pre-launch-audit.md` with:
- a pass/fail summary per area,
- every issue with its page and location,
- a fix list ordered by impact on search and speed,
- screenshots of layout problems.

No site changes in this round. After you read the report you pick what gets fixed, and I do the fixes in a follow-up.

## Technical notes

Read-only: route inventory scripting, Playwright screenshots and timing against the local preview at the six widths, asset reference cross-check via ripgrep, and transfer-size plus load-timing measurement per route. Existing SEO scanner findings will be pulled in and reconciled with the manual pass. Nothing published, no dependency changes.
