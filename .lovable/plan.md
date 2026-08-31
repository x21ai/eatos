# Rebuild /support as a full support experience

## Current state

`/support` today is a plain help center index: hero with search, featured articles, a category grid, and one closing CTA. The 320 imported articles and 18 categories already exist in `articles.generated.json` and `categories.generated.json`, with working `/support/category/<slug>` and `/support/article/<slug>` pages.

The original eatos.com/support page is a marketing page (24/7 assistance hero image, four contact channels, "Get Started in 3 Easy Steps", a navigate-your-app card grid, "Visit Our Support Website", a device lineup section, a free ongoing support statement, and three technical support pillars). None of that lives on our page yet.

## What gets built

One page at `/support` that keeps our real help center and adds the marketing substance from the original, done better:

1. Hero: black, Montserrat, "24/7 support, whenever you need it" style headline, live article and category counts, and the search box up top so people can self-serve immediately. Brand pink accents.
2. Contact channel row: Live chat, Email support (support@eatos.com), WhatsApp (existing `wa.me/18449732867`), and Phone (existing `+1 (844) 563-2867`), each with response-time context instead of bare icons.
3. Guided setup: the "Get started in 3 steps" flow (choose plan, connect your eatOS account, activate in Dashboard) rebuilt as a numbered stepper with links to Pricing and Book a Demo.
4. Popular help articles: real cards pulled from the generated content (featured plus most-read), not the original's static tiles, so every card links to a live article.
5. Browse all categories: the existing 18-category grid, kept, with article counts.
6. Your personal team of experts and the three support pillars (Top tier restaurant technology experts, 24/7 emergency coverage, dedicated support expert) as a supporting band with a product device visual.
7. Closing band: contact support, book a demo, and system status.

## Better than the original

- Search that actually searches all 320 articles, present in the hero and repeated near the article grid.
- Every article card resolves to a real page; no dead placeholder tiles.
- Status link plus a "we are online" indicator so people know what to expect.
- Responsive at 390px, 768px, 1280px; scroll-reveal motion consistent with the rest of the site.
- Accurate copy, no em dashes, "Point of Sale" and "Guest Facing Display" naming preserved.

## Images

The hero support-team photo and the device lineup shot from the original are not in the repo. I will generate on-brand replacements and register them through the asset pipeline. If you would rather supply the originals, send them and I will swap them in.

## Technical notes

- Rewrite `apps/web/src/app/support/SupportHomeClient.tsx` into composed sections; add a `supportPage` content block in `apps/web/src/app/support/content.ts` for the channels, steps, and pillars so no copy is hardcoded inside components.
- `apps/web/src/app/support/page.tsx` keeps its metadata and CollectionPage JSON-LD, extended with FAQPage-free `ContactPoint` entries for the support channels.
- No route changes, so existing `/support` links, canonicals, sitemap entries, and legacy redirects stay valid.
- Verification: build the web app, then check `/support`, one category, and one article at 390px, 768px, and 1280px with no console errors.
