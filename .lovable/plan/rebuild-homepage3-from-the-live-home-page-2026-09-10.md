# Rebuild /homepage3 from the live home page

You are right. The current /homepage3 was assembled from the older /homepage2 material instead of your real home page, so the wording, cards, images and data do not match what is live. Fix: throw that away and rebuild /homepage3 as an exact copy of the live home page, with the video hero as the only difference.

## What I found

- The live home page is one file, `HomeClient.tsx`, holding the whole page: cinematic hero, live demo rail, trust and logo strip, product hub cards (Point of Sale, Payments, Loyalty, Intelligence), service modes with the eight concept photos, reports and analytics, integrations, platform overview, intelligence highlight, then the newsletter.
- The current /homepage3 instead uses eight copied sections that came from the /homepage2 variant, with different headings, different cards and different placeholder stats.

## What I will build

- /homepage3 becomes a faithful copy of the live home page: same sections in the same order, same wording, same photos, same data sources, same brand styling.
- The only change is the top of the page: the video hero replaces the current hero, with the customer footage cross fading behind the headline, a still photo showing instantly so it is never blank, one light clip on phones, and the same buttons the live hero uses.
- The stats strip in the hero is dropped unless you want it, since the live page has no placeholder figures and I will not invent numbers.
- The eight copied /homepage2 sections under /homepage3 are deleted, so nothing old lingers.
- The live home page, /homepage1 and /homepage2 are not touched.
- Page stays hidden from search so it does not compete with the real home page.

## Verification

- Load /homepage3 at phone, tablet, laptop and wide desktop widths.
- Confirm the hero shows immediately and footage plays, and that every section matches the live home page side by side.
- Confirm no errors, and that the live home page is unchanged.

## Technical detail

- New `apps/web/src/app/homepage3/HomeClient3.tsx` copied from `apps/web/src/app/HomeClient.tsx`, with lines 127 to 202 (the hero section) replaced by `<HeroVideoSection />`; all other markup, imports and asset JSON pointers kept identical.
- `homepage3/page.tsx` renders `HomeClient3`; `homepage3/layout.tsx` keeps its own title/description and `robots: index false`.
- `homepage3/sections/HeroVideoSection.tsx` retained and trimmed: poster from an existing asset JSON, `playsInline`/`muted`/`loop`, `preload="metadata"` on clip one and `none` after, `onError` falls back to poster, reduced motion respected, headline and CTA copy matched to the live hero.
- Delete `homepage3/sections/{OnePlatformSection,ServiceModelsSection,HardwareSection,AIIntelligenceSection,ROISection,SwitchingSection,FinalCTASection}.tsx` and the `homepage2/data` imports.
- Verify with Playwright at 390, 834, 1280 and 1600 px.
