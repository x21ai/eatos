# Protect existing rankings: URL parity with eatos.com

## What I verified just now

- Live `www.eatos.com` is a Wix site. Its `pages-sitemap.xml` lists roughly 85 indexable pages using mostly flat, compressed slugs.
- This rebuild has 68 routes using nested, hyphenated slugs. Many are different strings for the same page.
- Live already 301s `/book-demo` to `/bookademo`, confirming the live slug is the ranked one.

Examples of the same page living at different URLs:

```text
LIVE (ranked, has backlinks)        THIS BUILD
/pointofsale                        /point-of-sale
/products/point-of-sale             /point-of-sale
/kitchendisplaysystem               /products/kitchen-display-system
/kioskos                            /products/self-service-kiosk
/customerfacingdisplay              /products/customer-facing-display
/pointofpurchase                    /products/point-of-purchase
/reportingandanalytics              /products/reporting-analytics
/orderattable                       /products/tableside-order-and-pay
/workforceos                        /products/workforce-management
/bookademo                          /book-demo
/contact                            /contact-sales
/about-eatos                        /about
/why-eatos                          (missing)
/privacy-policy                     /privacy
/terms-and-conditions               /terms
/quick-service                      /solutions/quick-service
/fast-casual /full-service          /solutions/fast-casual etc.
/bar-and-brewery /cafe-pos          /solutions/bar /solutions/cafe
/ghost-kitchens /enterprise-pos     /solutions/ghost-kitchen /solutions/enterprise
/eatos-vs-toast (and 6 more)        /comparison/toast
/newsroom + 4 sub pages             (missing)
/maya-ai /nameyourprice /support    (missing)
careers cluster (benefits,          /careers only
  how-we-hire, work-with-us, ...)
```

Left as is, launch would drop every one of those live URLs to a 404, so backlinks and rankings to them are lost.

## Recommended approach: live URLs stay canonical

Search equity belongs to the live strings, so the live slug becomes the real URL of each page and the tidy slug becomes a permanent redirect into it. No content is rewritten, only addresses.

1. **Build the full URL map.** Export every live URL from all live sitemaps (pages, blog posts, blog categories, store products, dynamic collections) and pair each with its counterpart in this build. Anything unmatched gets an explicit decision: closest relevant page, or keep as a page to build.
2. **Rename routes to the live slugs.** Every page that exists on live gets its live path as its primary route, including the flat product slugs and the `eatos-vs-*` comparison paths.
3. **Duplicate live paths.** Live serves some products at two URLs (`/pointofsale` and `/products/point-of-sale`). Keep both live, pick the better performing one as canonical, and point the other's canonical tag at it so they do not compete.
4. **Add 301 redirects for the new slugs.** `/point-of-sale`, `/products/self-service-kiosk`, `/book-demo`, `/privacy`, `/solutions/*`, `/comparison/*` and friends 301 into their live equivalents, so any link built during this rebuild still resolves.
5. **Blog parity.** Live blog post URLs must be preserved exactly. Current build has 5 static posts written from screenshots; the live blog has its own post set and category paths, so post slugs need to be matched one to one before launch, or the blog stays on the current site until migrated.
6. **Fill the gaps or redirect them.** For live sections this build has no page for (newsroom cluster, why-eatos, support, nameyourprice, maya-ai, workforceos, resellers, ambassadors, careers sub pages, legal set, e-sign consent, sms terms, payment terms, arbitration policy, job scams, hardware warranty), either build the page or 301 to the nearest relevant page. Redirecting many URLs to the homepage is the worst option and I will avoid it.
7. **Sitemap, canonicals, internal links.** Regenerate `sitemap.xml` from the final route list, self-referencing canonicals on every page, and rewrite internal links and menus to the final slugs so nothing links through a redirect.

## Verification before launch

- Every live URL from the live sitemaps returns 200 or a single 301 to a 200, with no chains and no loops.
- Zero live URLs answer 404.
- Sitemap contains only final 200 URLs, no redirect targets missing, no duplicates.
- Redirect map exported as a checklist so you can spot check the highest traffic pages in Search Console after launch.
- Search Console check after launch on the top pages, plus a Semrush before and after snapshot so any drop is visible early.

## Decision I need from you

Two options, and this changes the whole map:

- **A (recommended): keep the live slugs.** Zero ranking risk, but the URLs stay in the compressed Wix style, for example `/kioskos` and `/pointofsale`.
- **B: keep the new clean slugs and 301 every live URL into them.** Nicer URLs, but each redirect loses a small amount of equity and rankings usually wobble for a few weeks.

A hybrid is possible: option A for the top traffic pages, option B for low value ones. To choose properly I would pull Search Console and Semrush data on which live URLs actually earn clicks and links first.

## Technical notes

- Redirects go in `apps/web/next.config.js` as `permanent: true` (308/301), not client side.
- Route renames are directory moves under `apps/web/src/app`, with the existing client components untouched.
- `apps/web/src/app/sitemap.ts` regenerates from the final list.
- Existing `/get-started` to `/book-demo` redirect gets folded into the new map, ending at the live booking slug.
