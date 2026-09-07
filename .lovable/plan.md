# Full pre-launch audit: SEO, speed, screens, browsers, duplicates

Goal: one deep audit pass that produces a written report plus a prioritised fix list, then the fixes themselves in a second round once you approve the findings.

## What I already found in a quick look

These are confirmed, not guesses:

- 81 pages exist, but 36 of them have no page title or description of their own, so they fall back to the site-wide default. That includes the home page, Platform, Contact, Book a Demo, Reseller, Resources, Company, Privacy Policy, SMS Policy, and every blog, product, shop and support detail page. This is the single biggest search issue.
- Duplicate near-identical pages: `home-1`, `homepage1`, `homepage2` all exist alongside the real home page. Search engines are told to skip `home-1` and `homepage2`, but `homepage1` is still open to them. `solutions` and `platform` also both exist and `solutions` is listed in the site map.
- Images are never served through the built-in image optimiser anywhere on the site, so browsers download full-size files instead of right-sized, modern-format versions. This is the biggest speed issue.
- One oversized image found locally (a partner logo at 380 KB); most media is hosted remotely so per-image weight needs measuring, not assuming.
- 3 places use a plain image tag rather than the optimised one.

## Audit plan

### 1. Search readiness
- Inventory every public page and list which lack a unique title, description, and share image.
- Check the site map against the real page list: missing pages, dead entries, duplicate entries.
- Confirm each page's canonical address points to itself, so the old Wix links and rankings keep pointing at one address.
- Check heading structure (one main heading per page) and image alt text coverage.
- Check the legacy blog and support imports still resolve to their original addresses.

### 2. Duplicate and unused content
- Compare `home-1`, `homepage1`, `homepage2` against the live home page and recommend which to delete versus keep hidden.
- Same for `solutions` vs `platform`, `news` vs `blog`.
- Find unreferenced images and media files (292 hosted asset pointers plus local files) and list what nothing links to.
- Find repeated copy blocks reused verbatim across pages, which search engines treat as thin content.
- Find unused components and dead code paths.

### 3. Speed
- Measure the real weight and load time of the home page and five representative pages (a product page, a concept page, blog, shop, support).
- Report the actual byte weight of the heaviest images and videos and what they should be.
- Check the videos on `/homepage1` and the animation sequences, which are the likely heaviest items on the site.
- Check fonts load without blocking, and that Montserrat is loaded once, not repeatedly.
- Check what loads before anything is visible: the chat assistant, cookie banner, tracking scripts.

### 4. Screen sizes
- Screenshot every major page at phone (390), large phone (430), tablet portrait (768), tablet landscape (1024), laptop (1280) and wide (1600) widths.
- Flag sideways scrolling, cut-off text, overlapping items, cropped images, and unreadable small text.

### 5. Browsers
- Review the code for anything only newer browsers support, and check Safari and mobile Safari specific behaviour (video autoplay, sticky headers, backdrop blur, date handling).
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

Audit is read-only: route inventory scripting, Playwright screenshots and timing against the local preview at the six widths, asset reference cross-check via ripgrep, and Lighthouse-style measurement of transfer size, main-thread blocking and largest visible element. Existing SEO scanner findings will be pulled in via the SEO tools and reconciled with the manual pass. Nothing published, no dependency changes.
