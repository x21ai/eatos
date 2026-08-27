# Legal Pages Theme, Cookie Settings Behavior, Brand Color Token

## 1. Privacy Policy and Terms of Service in the black theme

Both pages currently render on a white background with black text and light gray cards, which is off-theme against the rest of the site.

Convert both to the site's black Montserrat theme, matching the pattern already used on Pricing, Get Started, Book a Demo, Contact Sales and Blog:
- Page surface black, body copy near-white, secondary copy light gray
- Cards and the table-of-contents panel: subtle white/5 surface with white/15 to white/25 borders
- Hero band goes dark instead of light gray, eyebrow chip on a dark translucent surface
- Inline links white with brand-pink hover, headings white
- Register both routes as dark pages so the header renders in its dark variant

## 2. Cookie Settings opens the preferences panel, not the consent bar

Today the footer's Cookie Settings button clears the stored consent value and fires `openCookieBanner`, so you get the bottom consent bar again (the screenshot). The banner component already listens for a second event, `openCookiePreferences`, which opens the full preferences dialog with the category toggles.

Change the footer button to:
- Stop clearing stored consent
- Dispatch `openCookiePreferences` so the preferences dialog opens directly with the current saved choices pre-selected

Also restyle the cookie banner and preferences dialog to the black theme so they match the site instead of the current white panel.

## 3. Brand color as a single theme setting

Add brand color tokens in `apps/web/src/app/global.css`:
- `--brand: #d70480` plus a lighter `--brand-strong` / `--brand-soft` pair for hover and background washes
- Map them into `@theme inline` as `--color-brand` etc. so `text-brand`, `bg-brand`, `border-brand` utilities work

Then replace hardcoded `#d70480` occurrences with the token classes so changing one value in `global.css` updates every accent:
- `NewsletterSection.tsx` (eyebrow, focus ring, status text)
- `BlogIndexClient.tsx` (NEWSROOM eyebrow, category labels)
- `blog/[slug]/BlogPostClient.tsx` (category label, list bullets, related-post eyebrow)

## 4. Remaining green accents

Blog and newsroom accents are already brand pink (verified in the blog files), so the leftover greens are elsewhere:
- `BrochureButton.tsx` eyebrow uses `text-emerald-500` -> brand token
- `Header.tsx` uses green/emerald for two dropdown icon chips and one highlight color -> brand token

The system-status page keeps its green "operational" dots, since green there is status semantics, not branding.

## 5. Contrast check

On black, `#d70480` sits around 3.9:1, which passes AA for the large NEWSROOM/category display type but is short of 4.5:1 for the small uppercase eyebrow labels. Fix by defining `--brand-on-dark` as a slightly lightened pink (around `#ff4fa3`, roughly 6.9:1 on black) and using it for small text on dark surfaces, while the pure brand pink stays for large text, bullets, borders and fills. Same approach in reverse for the light-surface cases.

## Technical notes

- Files touched: `app/global.css`, `app/privacy/page.tsx`, `app/terms/page.tsx`, `components/CookieBanner.tsx`, `components/Footer.tsx`, `components/NewsletterSection.tsx`, `components/BrochureButton.tsx`, `components/Header.tsx`, `app/blog/BlogIndexClient.tsx`, `app/blog/[slug]/BlogPostClient.tsx`, plus the dark-route registration list.
- No content or copy changes, no em dashes.
- Verify `/privacy`, `/terms`, `/blog`, and the cookie dialog at 390px and 1280px, and run the copy guard.
