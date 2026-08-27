# Replace the hero "Explore Hardware" button with an Intelligence CTA

## What changes

The homepage hero's secondary button currently reads "Explore Hardware" and links to `/hardware`. Hardware is not the story the hero should lead with, so the button becomes:

- Label: "Explore Intelligence"
- Link: `/ai` (the Intelligence product page)
- Icon: swap the box/hardware glyph for a sparkle/AI-style icon so the visual matches the new destination

Everything else in the hero (Get Started button, headline, badge, layout, animation) stays exactly as it is.

## Where

- `apps/web/src/app/page.tsx` (live homepage hero, around the CTA row)
- `apps/web/src/app/home-1/page.tsx` (the alternate home variant carries the same button, so it is updated in the same pass to stay consistent)

## Notes

Hardware remains reachable from the Products dropdown and the footer, so no navigation is lost. If you would prefer a different label such as "See eatOS Intelligence" or "Meet the AI", say so and it will be used instead.
