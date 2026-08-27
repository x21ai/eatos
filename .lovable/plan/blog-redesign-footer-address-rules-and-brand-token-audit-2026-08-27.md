# Blog redesign, footer address rules, and brand token audit

## 1. Blog page redesign (`/blog`)

Keep all existing content (the five posts, categories, excerpts, dates, images) and bring back the elements from the old live page, rebuilt in the black eatOS theme.

New structure for the blog index:

```text
Hero banner card (rounded, image + dark overlay)
  "Welcome to the eatOS Blog!" style headline + intro
  Buttons: Book a Demo, Brochures
------------------------------------------------------
Latest Posts        [ All Posts | category chips | More ]
------------------------------------------------------
  MAIN COLUMN (2-up cards)          |  SIDEBAR (sticky)
   image, category + date,          |   3 recent posts
   title, excerpt,                  |   (small thumb + title + date)
   author row (avatar + name)       |
                                    |   Subscribe via Email card
------------------------------------------------------
Numbered pagination  <  1 2 3  >
------------------------------------------------------
Newsletter section (existing)
```

Details:
- Hero becomes a rounded banner card with a background image and dark scrim, matching the old page's presentation but in the site's black palette.
- Category filter row keeps the horizontal scroll with the scrollbar hidden, and collapses overflow categories behind a "More" dropdown as the old page did.
- Post cards regain the author row (initial avatar, author name, date) that the old page showed under each card.
- Right sidebar returns: a compact "Latest posts" list of the three newest stories plus a "Subscribe via Email" card wired to the existing newsletter submit handler.
- The "Load more" button is replaced by numbered pagination with previous/next arrows.
- All accents use the brand token (`text-brand-on-dark`, `bg-brand`), never raw hex.
- Sidebar collapses below the main column on mobile; cards drop to one column.

## 2. Footer address formatting

Replace the current three loose strings per office with a structured record (`street`, `suite`, `city`, `state`, `zip`) and a single formatter that renders every address into the same multi-line block:

```text
Cupertino, CA          <- bold, city + state code
20289 Stevens Creek Blvd PH 1019
Cupertino, California 95014
```

- The formatter builds the lines, so no manual line breaks live in the data.
- Heading stays semibold white in every entry.
- Street and locality lines get `text-balance` plus `whitespace-nowrap` on the city/state/ZIP fragment where it fits, so a city or state name never splits across lines.

## 3. Footer layout alignment

- Contact icon row (WhatsApp, SMS, Messenger, chat) moves to sit directly beneath the Sales card in the same grid cell, so it stays under Sales at every width instead of right-aligning across the pair.
- On mobile the Support and Sales cards stack full width with the icon row under Sales; on tablet the two cards sit side by side with the icon row anchored to the Sales column.
- Office grid: 1 column mobile, 2 tablet, 4 desktop, with consistent row gaps.

## 4. Cookie Settings verification

The footer button already dispatches `openCookiePreferences` and the banner persists consent in `localStorage`. This step is verification only: confirm in a browser run that Cookie Settings opens the preferences dialog (not the consent bar) and that a saved choice survives a reload without the bar reappearing. Fix only if the run shows otherwise.

## 5. Contrast check for NEWSROOM and POINT OF SALE labels

Measure the brand accent used for the newsroom eyebrow and category labels against the black background. The small-text variant (`--brand-on-dark`) is tuned for this; if measurement shows it under 4.5:1 at those sizes, lighten `--brand-on-dark` until it passes while keeping `--brand` unchanged for large text and fills.

## 6. Brand token audit across blog components

Sweep every blog surface (index cards, category chips, sidebar, badges, dividers, links, article body, related posts, share control) for any remaining green, emerald, teal, or hardcoded pink value and map it to the brand token. Green stays only where it means operational status (system status page).

## Technical notes

- Files: `apps/web/src/app/blog/BlogIndexClient.tsx`, `apps/web/src/app/blog/[slug]/BlogPostClient.tsx`, `apps/web/src/app/blog/content.ts` (sidebar/pagination helpers only, post text unchanged), `apps/web/src/components/Footer.tsx`, `apps/web/src/app/global.css` (only if the contrast check requires a token tweak).
- New helper `formatOfficeAddress` lives beside the footer data so address rendering has one source of truth.
- Pagination and category state stay client side; no backend work and no new data source.
- Verification: `/blog`, all five article routes, footer at 390px / 768px / 1280px, cookie dialog behavior and reload persistence, and the em-dash copy guard.
