# Black Footer, Same Elements

## Goal

Keep every element of the new footer exactly as it is (logo, tagline, social icons, Support/Sales cards, six link columns, offices row, legal strip, app badges, status, region selector) and render it in black on every page.

## Changes

1. **`apps/web/src/components/Footer.tsx`**: make the black (dark) styling the only variant. Remove the light/dark branching and hardcode the dark classes: black background, white headings, gray links, white social chips on white/15 borders, dark contact cards with white/10 borders, white app badges on dark, and the white eatOS mobile logo (`logo-mobile-white.png`).

2. **No layout change needed**: `apps/web/src/app/layout.tsx` already renders `<Footer />` with no variant on all pages, so every page gets the black footer automatically.

3. **Get Started page**: verify its simple inline footer still looks right on its own page (it is a separate inline block, untouched).

## Verification

- Screenshot the footer on desktop and mobile on the home page to confirm black rendering, contrast, and the white logo.
- Spot check one previously light page (e.g. /pricing) and one dark page for consistency.

## No changes to

- Footer content, links, offices, or badges
- Header, page content, or any other component
