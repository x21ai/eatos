# Point of Purchase page rebuild (handheld)

Rebuild `/products/point-of-purchase` on the same template already used by the Self-Service Kiosk product page, with copy taken from the live page screenshot.

## Content from the screenshot

Hero
- Eyebrow: Point of Purchase
- Title: All The Power of Full Size Point of Sale in Your Hands
- Subline: Contactless payments keep things smooth. A handheld eatOS terminal takes orders, fires to the kitchen and accepts payment tableside.
- CTAs: Book a Demo, View Pricing

Key features card (hero right)
- All-in-One POS
- Contactless Payments
- Fire To Kitchen
- Real-time MenuSync
- Save Cost, Powerful Features
- Table management

Alternating feature rows (image opposite text, metrics under each)
1. Save Costs, Powerful Features (100% Powerful Point of Sale, 100% Mobile Checkout)
2. Real-Time MenuSync (100% Time Saver, 10x Efficient Menu)
3. Dynamic Payment Processing (100% Guest Empowerment, 100% Split Receipt Features)
4. Powerful Compatibility (100% Speedy Checkout, 100% Inclusivity)
5. Table Management (10x Profit Booster, 100% Convenient)
6. Fire To Kitchen (10x Faster, 100% Kitchen Continuity)

Closing sections (same as kiosk template)
- Numbers strip under the hero
- Why Point of Purchase: speed, reliability, 24/7 support
- Hardware section: handheld terminal, charging dock, built-in reader
- Two offer cards: Get your own Point of Purchase / Make your own custom bundle, with the terms note
- Works great with (related products) and the final CTA band

## Technical notes

- New folder `apps/web/src/app/products/point-of-purchase/` with `content.ts`, `PopPageClient.tsx`, `page.tsx` (metadata + client render), mirroring the kiosk page structure so it stops falling through to the generic `[slug]` template.
- Reuse `Placeholder`, `site-container`, `motion` reveals, `font-montserrat`, and the black theme. Accent color: purple (matches the product entry in `products.ts`).
- Generate 7 images (hero plus six feature rows) into `./assets/` as `.asset.json` pointers, in the same cinematic dark style as the kiosk assets.
- Update the `point-of-purchase` entry in `apps/web/src/app/products/products.ts` so the title and tagline match the new page.
- Responsive across mobile, tablet and desktop: single column stacking, reduced type scale, and horizontal-safe metric chips, matching the kiosk breakpoints.
- No em dashes in any copy.
