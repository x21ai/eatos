# Rebuild /homepage3 to follow the uploaded reference layout

I misread the last instruction and copied your live home page section for section. What you asked for is a home page built to the structure of the reference screenshot you uploaded, using eatOS content, wording, photos and data. That is what this plan does. Nothing on the live home page, /homepage1 or /homepage2 changes.

## Page structure, following the reference top to bottom

1. **Dark full-bleed video hero.** Customer footage cross fading behind a short bold two line headline, one supporting line, a primary Book a Demo button, and a stats strip along the bottom of the hero. A still photo shows instantly so it is never blank; phones get one light clip.
2. **Light capability band.** Centred two line heading with a short lead line, then a clean bordered list of four capability rows (operations, payments, intelligence, hardware), each with a one line summary and a link.
3. **Dark band with two stacked feature cards.** First card on a teal-to-green style gradient panel carrying a single large outcome figure, second card a light panel with a product screenshot beside short copy.
4. **Light proof band.** Left hand statement heading, right hand supporting paragraph, then a numbered list of three proof points with short explanations.
5. **Dark expertise band.** Heading with a coloured second line, a row of small pill filters for concept types, and a dark panel below showing the matching product visual and copy.
6. **Dark platform band.** Angled product mockup on the left, heading and short paragraph on the right.
7. **Gradient economics band.** Full-width bright gradient with a two line heading and four short value columns.
8. **Light FAQ band.** Six collapsible questions drawn from existing site copy.
9. **Latest insights band.** Three article cards from the existing blog data, with a link to the blog.
10. **Dark closing band.** Short heading and paragraph on the left, the existing demo booking call to action on the right, then the newsletter strip.

Colour rhythm follows the reference: dark, light, dark, light, dark, gradient, light, dark. Accents stay brand pink, Montserrat throughout, no invented numbers, no em dashes. Every image, product visual and article comes from what already exists in the project.

## What gets removed

The current /homepage3 copy of the live home page is replaced entirely, so no duplicated live sections linger.

## Verification

Loaded at phone, tablet, laptop and wide desktop widths, hero shows immediately and footage plays, every band renders in order, no errors, and the live home page is untouched. Page stays hidden from search.

## Technical detail

- `apps/web/src/app/homepage3/HomeClient3.tsx` rewritten as a band composition, not a copy of `HomeClient.tsx`.
- New section files under `apps/web/src/app/homepage3/sections/`: `CapabilityListSection`, `FeatureCardsSection`, `ProofSection`, `ExpertiseTabsSection`, `PlatformMockupSection`, `EconomicsGradientSection`, `FaqSection`, `InsightsSection`, `ClosingCTASection`.
- `HeroVideoSection.tsx` kept, stats strip added back from existing stats data.
- Content pulled from existing data modules and asset JSON pointers (`customerShowcase`, demo sources, service concept photos, `lib/blog/data`), never hardcoded.
- `layout.tsx` keeps its own title/description and `robots: index false`.
- Verified with Playwright at 390, 834, 1280 and 1600 px.
