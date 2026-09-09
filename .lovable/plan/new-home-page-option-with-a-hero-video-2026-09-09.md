# New home page option with a hero video

A third home page option, kept separate so nothing live changes. `/homepage1` and `/homepage2` already exist, so this one goes to `/homepage3`.

The reference layout is used as loose inspiration only: the big idea taken from it is a full-bleed video hero with a short bold headline and a stats strip, plus a rhythm of alternating dark, light, and gradient bands down the page. Content, wording, and brand styling stay eatOS.

## Hero

- Full-width background video using the existing restaurant customer footage already in the project (the five customer clips), muted, looping, no controls, with a still frame showing instantly so the page never looks empty.
- Clips cross-fade one into the next so the hero feels alive without a long download.
- Dark gradient wash over the video so the headline stays readable.
- Short two-line headline, one supporting line, primary Book a Demo button and a secondary Explore the platform link.
- A stats strip along the bottom of the hero (locations, orders processed, uptime, support), pulled from the existing stats data rather than typed in.
- On phones the video is replaced by its still frame plus a lighter fallback so mobile data is not burned.

## Sections below the hero

Reusing existing eatOS sections and content, in this order:

1. Customer logo marquee (already built).
2. One platform overview.
3. Live product demos rail (the existing How it Works rail).
4. Service models by concept type.
5. Hardware.
6. Intelligence / Maya.
7. ROI and switching.
8. Final call to action, then newsletter.

Band colors alternate dark, light, gradient so the page has the same visual rhythm as the reference without copying its layout.

## Notes

- Nothing on the live home page, `/homepage1`, or `/homepage2` is touched.
- New route `apps/web/src/app/homepage3/` with its own `page.tsx`, `layout.tsx`, and a `HeroVideoSection`; other sections are imported from the existing homepage2 sections and shared components where they already fit.
- Page is marked noindex so it does not compete with the real home page in search.
- Own title and description metadata, Montserrat throughout, brand pink accents, no hardcoded content that already lives in a data file.
- Checked on desktop, tablet, and phone widths before handing back.
