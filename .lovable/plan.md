# Comparison page: black product-style hero and full-page dark theme

Rebuild the `/comparison` hero to match the product-page template used on `/products/point-of-purchase`, Kitchen Display System, and `/tap-to-pay`: full-width black background, large icon tile, headline, tagline, and CTAs. Because the hero will now be dark, the rest of the page also switches to a cohesive dark theme.

## Changes

### 1. Hero section (`apps/web/src/app/comparison/ComparisonClient.tsx`)
- Replace the current light centered hero with a full-width black hero.
- Add the same background elements used on product pages: `bg-gradient-to-b` from the emerald accent and a blurred orb behind the copy.
- Add a breadcrumb: `Products / Comparison` (or `Restaurant Type / Comparison` to match the current nav rename).
- Use a large emerald icon tile (e.g., `LayoutGrid` or `BarChart3`) above the headline.
- Headline: `Compare. Decide. Grow.` (or keep the existing title if shorter is not preferred).
- Tagline in emerald accent color: existing sub-copy from `content.ts`.
- Description in `text-gray-400` with `max-w-xl`.
- Two CTAs: `Book a Demo` (white/black) and `View Pricing` (outline).
- Remove the hero media plate; instead, place a glass-morphism "Key Highlights" card on the right that lists the main comparison wins (AI integration, all-in-one platform, offline/4G backup, multi-processor support).

### 2. Header theme (`apps/web/src/components/Header.tsx`)
- Remove `/comparison` from the `lightPages` array so the header renders as a dark/transparent nav over the black hero, consistent with other product pages.

### 3. Rest of the page darkened
- Convert the alternating light/dark bands to a single dark progression:
  - `WhySwitch` section: `bg-black` with subtle `border-t border-white/5` separators; keep the editorial numbered list but switch text to white/zinc tones.
  - `Matrix` section: keep the existing dark matrix but make it flow continuously without a hard contrast cut from a white section above.
  - `Reasons` section: `bg-black` with alternating image+copy rows, zinc captions.
  - `ClosingCta` section: keep the dark gradient panel at the bottom.
- Adjust the `Mark` component colors so the matrix stays legible on the dark-only background (eatOS column stays the elevated lighter panel).

### 4. Content helpers
- Add a `highlights` array to `apps/web/src/app/comparison/content.ts` for the hero right-side card so copy is editable in one place.
- No new dependencies; reuse `motion/react` animations already present in the file.

### 5. Verification
- Confirm the page renders at 390px, 820px, and 1440px.
- Confirm the header is white/legible on the black hero and transitions correctly on scroll.
- Confirm the Next.js build succeeds.
