# eatOS pre-launch audit

Date: 7 September 2026. Read-only audit, no site changes made.
Measured against the local preview build of the site as it stands today.

## Summary

| Area | Verdict | Headline |
| --- | --- | --- |
| Search readiness | Needs work | Titles and descriptions are fine everywhere, but only 6 of 63 public pages state their own address (canonical). Four pages share the home page's exact title and description. |
| Duplicate and unused content | Needs work | Three spare home pages, an overlapping Solutions/Platform pair, 28 unused images, 13 unused components. |
| Speed | Needs work | Big original-size images and videos are downloaded at full size and shrunk in the browser. Blog page alone pulls 13.7 MB of images. |
| Screen sizes | Mostly pass | One real sideways-scroll bug (Support at 430px). Text under 11px on Shop and Support. |
| Browsers | Pass | Videos are muted and inline-safe, no risky date formats in visitor-facing pages. |
| Live hosting and links | Pass | All 63 public pages answer 200, and all 133 internal links resolve. Clean addresses without `.html` are handled by the publish script. |

Correction to an earlier assumption: the pages I first suspected had **no** title or description do in fact produce one. The site-wide default and per-folder settings fill them in. The real gap is the canonical address and the four pages sharing identical text.

---

## 1. Search readiness

### Pass
- All 63 public pages return 200 with a title and a description present.
- Every page has exactly one main heading. No page has zero or two.
- Legacy addresses still resolve: blog posts at `/blogs/<slug>`, news at `/news/<slug>`, support articles under `/support`.
- Crawler rules block admin, API, `home-1`, `homepage2` and the sign-in shim.

### Fail: only 6 pages declare their own address
57 of 63 public pages have no canonical tag. Only `/shop`, `/support` and four shop/support sub-areas do. Every marketing page is missing one, including:

`/`, `/platform`, `/products` and all 18 product pages, `/pricing`, `/blog`, `/company`, `/grow`, `/resources`, `/contact`, `/reseller`, `/partners`, `/customers`, `/brochures`, `/media-kit`, `/work-with-us`, `/about-eatos`, `/accept-payments`, `/ai`, `/ai/intelligence`, all nine concept pages, `/privacy-policy`, `/terms-and-conditions`, `/sms-policy`, `/report-fraud`, `/system-status`, `/login`, `/solutions`, `/home-1`, `/homepage1`, `/homepage2`.

Why it matters: with Wix links, tracking parameters and old `.html` variants all pointing at the same content, search engines have to guess which address is the real one. That splits the ranking value the old site earned.

### Fail: four pages share the home page's exact title and description
`/`, `/home-1`, `/homepage2` and `/login` all emit:
`The Restaurant Management System of the Future | eatOS RMS`

`/login` should have its own title and be kept out of search. `home-1` and `homepage2` are already blocked; `homepage1` is not.

### Fail: 30 pages have no share image
Includes the home page, `/platform`, `/products`, `/contact`, `/bookademo`, `/company`, `/resources`, `/grow`, `/reseller`, `/customers`, `/partners`, `/privacy-policy`, `/sms-policy`, `/solutions`, `/ai`, `/ai/intelligence`. Links to these pages in messages and social posts show no picture.

### Fail: alt text gaps
- `/blog` has 3 images with no alt text (post cards).
- `/pointofsale` has 1.
- Across the source, 62 of 66 plain image tags carry no alt text, though many are decorative.

### Site map issues
- `/solutions` is listed while `/platform` covers the same ground. One of them should not be in the site map.
- `/news` is listed as well as `/blog`, plus every news item. If Newsroom is retired in favour of Blog, its entries need removing or redirecting.
- Base address falls back to `https://eatos.com`, which is correct for launch.

---

## 2. Duplicate and unused content

### Spare home pages
| Page | Size | Search status | Recommendation |
| --- | --- | --- | --- |
| `/` | 849 lines | indexed | keep |
| `/home-1` | 648 lines | blocked | delete |
| `/homepage1` | 802 lines | **open to search** | block now, then decide keep or delete |
| `/homepage2` | 34 lines | blocked | delete |

`/homepage1` currently advertises itself as "Internal preview of the eatOS homepage". It is reachable and indexable.

### Solutions vs Platform
`/solutions` (282 lines) and `/platform` (546 lines) both present the product suite. Recommendation: keep `/platform`, redirect `/solutions` to it, remove `/solutions` from the site map. The navigation already says Platform.

### News vs Blog
Both exist with separate content sets and both are in the site map. Decide which is the public destination; the footer already points at Blog.

### 28 unused images
Nothing in the site links to these. Safe to delete:

- 8 blog placeholder images (`blog-placeholder-*`) in `src/app/blog/assets/blog/`
- 10 product showcase images (`showcase-*`) in `src/app/components/assets/`
- 4 kitchen display images: `connectivity-ui`, `multilingual-ui`, `prep-station-routing-v4`, `printing-ui`
- 3 guest display images in `src/assets/`: `cfd-marketing`, `cfd-order-review`, `cfd-tips`
- superseded versions: `cat-guests-v2`, `cat-ops-v2`, `svc-bar-v2`

### 13 unused components
`DemoDeviceSection`, `LiveDemoSection`, `CustomerShowcase`, and ten unused interface parts (`accordion`, `alert-dialog`, `avatar`, `button-group`, `combobox`, `dropdown-menu`, `scroll-area`, `sidebar`, `slider`, `toggle-group`).

### Repeated copy
The support block "Real people, real help, any time you need it..." appears on 26 pages verbatim, with the surrounding three-card block also repeated. Search engines discount repeated blocks, and they do not help a visitor who has seen it four pages earlier. Recommendation: keep one instance per page but vary the wording per product, or move it into a shared strip that is clearly a site-wide element.

---

## 3. Speed

Measured at 1280px on the local preview. Note that the JavaScript figures include development-only tooling of roughly 5 MB per page, which will not exist in the published build. Image and video figures are real and will ship as measured.

| Page | Total | Images | Video | Load |
| --- | --- | --- | --- | --- |
| `/blog` | 24.9 MB | **13.7 MB** | 0 | 2.5 s |
| `/homepage1` | 15.6 MB | 0.8 MB | **7.8 MB** | 2.9 s |
| `/pointofsale` | 13.2 MB | 3.0 MB | 3.0 MB | 2.0 s |
| `/` | 12.3 MB | 2.2 MB | 3.0 MB | 2.2 s |
| `/quick-service` | 9.1 MB | 3.3 MB | 0 | 2.2 s |
| `/support` | 7.8 MB | 0.6 MB | 0 | 1.8 s |
| `/shop` | 6.4 MB | 0.6 MB | 0 | 1.9 s |
| `/platform` | 6.2 MB | 0.4 MB | 0 | 2.1 s |
| `/pricing` | 5.6 MB | 0.01 MB | 0 | 1.4 s |

### Heaviest single items
- `/blog`: four Wix originals at 2.8 MB, 2.4 MB, 2.2 MB and 2.0 MB each. Displayed at 329px wide. Should be roughly 40-60 KB each.
- `/homepage1`: six product videos, largest `hp1-inventoryos.webm` at 2.4 MB, `hp1-dashboard.webm` 1.5 MB, `hp1-pos.webm` 1.5 MB. All six start downloading at once.
- `/` and `/pointofsale`: `pos-demo.webm` at 3.0 MB, downloaded on first view.
- `/quick-service`: `qs-versatile-v5.png` 1.7 MB and `qs-offline-v4.png` 1.3 MB, both shown at 526px.
- A partner logo served from a remote address at 1.1 MB, loaded on **every** page including Pricing.

### Images are never right-sized
The site uses no image optimisation layer anywhere: 0 uses of the framework's image component. Every picture is downloaded at its original size and shrunk by the browser. Concrete waste found on the pages sampled:

| Page | Image | Downloaded | Shown at |
| --- | --- | --- | --- |
| `/blog` | five post images | 1920-1944px | 329px |
| `/quick-service` | `qs-repeat-v3` | 1920px | 526px |
| `/support` | `support-team` | 1600px | 499px |
| `/platform` | two product images | 1600px | 541px |
| `/` | six service-style images | 1000px | 265px |
| every page | partner logo | 592px | 107px |
| `/shop` | product images | 800-1200px | 263px |

Fixing sizing alone should remove roughly 12-14 MB from the Blog page and 1-3 MB from most others.

### Loading behaviour
- 65 of 66 image tags do not defer loading until scrolled into view, so below-the-fold pictures compete with the first screen.
- No page splits its heavy sections out of the initial download (0 uses of dynamic loading). The chat assistant, cookie banner and demo tracker all load in the first bundle on every page.

### Fonts
Montserrat is loaded once, from a single import in the global stylesheet, with swap behaviour so text is never invisible. This is correct, but the import blocks the stylesheet: moving it to a preconnect plus link in the page head would start the download earlier.

---

## 4. Screen sizes

Checked 15 major pages at 390, 430, 768, 1024, 1280 and 1600px.

### Real problems
1. **Support page scrolls sideways at 430px.** The row of category buttons under the search box is forced to a single non-wrapping line, pushing the page to 510px wide against a 430px screen. Only occurs at 430px, not 390 or 768.
2. **Text below 11px** on `/shop` (5 items) and `/support` (2 items). Too small to read comfortably on a phone.

### Checked and clear
- No page at 390px had any layout problem.
- No sideways scrolling at 768, 1024, 1280 or 1600 on any page tested.
- Wide decorative background glows on Platform, Products, Pricing, Company and the concept pages extend past the screen edge by design and are correctly clipped; they do not cause scrolling.
- The reseller logo strip is an intentional scrolling marquee, correctly clipped at every width.

Screenshots of each flagged combination were captured during the run at `/tmp/browser/audit/shots/`. The two items above are the only ones needing a fix; the rest are decorative overhang.

---

## 5. Browsers

- **Video autoplay (Safari, iOS):** all 9 videos are muted with inline playback set, which is what Safari requires. Pass.
- **Backdrop blur:** used in 50 files. Supported in current Safari, Chrome, Edge and Firefox. Older browsers show a solid panel instead, which stays readable. Acceptable.
- **Date handling:** all visitor-facing date formatting uses standard formats and US locale. The only unusual parsing is in the admin area, which visitors never see. Pass.
- **Modern language features:** optional chaining and default-value operators used widely; both are supported in every browser released since 2020. Pass.
- **Clean-address link fix:** the script only rewrites same-origin links on static hosts, and leaves external links, downloads, anchors and modifier-clicks alone. All 133 internal links tested resolve. Pass.

---

## 6. Live hosting

- All 63 public pages answer 200 locally.
- All 133 unique internal links found across 21 major pages resolve. No dead buttons.
- The publish script writes each page three ways: at the clean address, at the `.html` address so old shared links keep working, and as a folder index where a page has children. Routes that cannot be both a file and a folder get an explicit rewrite rule. This matches how the host resolves addresses.
- Remaining risk: the host serves extensionless files as a generic download unless a content type is pinned. The script writes that header file, so this is handled; it is worth confirming on the first publish that a page such as `/platform` opens rather than downloads.

---

## Fix list, by impact

### Do before launch
1. **Add a self-referencing address to all 57 pages missing one.** Biggest single search win. Protects the rankings the old site earned.
2. **Right-size every image.** Route pictures through the optimisation layer, or pre-generate correctly sized versions. Removes roughly 13 MB from Blog and 1-3 MB from most other pages.
3. **Block or delete `/homepage1`.** It is currently open to search as an internal preview page.
4. **Give `/login` its own title and keep it out of search.** It currently duplicates the home page.
5. **Fix the Support page sideways scroll at 430px** by letting the category buttons wrap.
6. **Cut `pos-demo.webm` (3 MB) and the 1.1 MB partner logo from the first load** on every page, or delay them until scrolled to.
7. **Remove `/solutions` from the site map and redirect it to `/platform`.**

### Do soon after
8. Defer loading of below-the-fold images (65 tags).
9. Delay the six videos on `/homepage1` so only the visible one downloads first.
10. Add share images to the 30 pages without one, starting with home, Platform, Products, Pricing and Book a Demo.
11. Raise text under 11px on Shop and Support to at least 12px.
12. Add alt text to the blog card images and the Point of Sale image.
13. Decide News vs Blog and redirect the retired one.
14. Delay the chat assistant and cookie banner until after the first screen is drawn.

### Housekeeping
15. Delete the 28 unused images and 13 unused components.
16. Delete `/home-1` and `/homepage2`.
17. Vary the repeated support block that appears verbatim on 26 pages.
18. Move the font import to a link in the page head so it starts downloading sooner.

Nothing in this list has been changed. Tell me which numbers you want done and I will do them in one pass.
