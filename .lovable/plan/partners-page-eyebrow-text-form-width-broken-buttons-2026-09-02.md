# Partners page: eyebrow text, form width, broken buttons

## Confirmed current state

- The hero eyebrow in `apps/web/src/app/partners/page.tsx` reads "eatOS Partner Program" in the code, but the class list includes `uppercase`, so it renders as "EATOS PARTNER PROGRAM".
- The HubSpot application form sits in a `max-w-3xl` wrapper inside an already padded card, so it renders narrower than the section around it.
- Every CTA on the page uses `next/link`. Published pages are served only from `.html` keys, and the publish step rewrites hrefs to `/contact.html`, `/bookademo.html`. Verified live: `/partners.html` and `/contact.html` return 200, while `/contact` and `/bookademo` return 404. Because these are `next/link` components, the click is handled by the client router, which has no route matching `/contact.html`, so it renders the Not Found page instead of loading the real page.

## Plan

1. Remove `uppercase` from the hero eyebrow span so it displays "eatOS Partner Program" with correct casing.
2. Widen the application form: drop the `max-w-3xl` constraint so the HubSpot embed fills the section card width, keeping comfortable padding on mobile.
3. Fix all CTAs on the Partners page by replacing `next/link` with plain anchor tags for the internal marketing links (hero "Become a partner" and "Talk to our team", the four partner track "Book a Demo" links, and "Apply now"). Plain anchors follow the rewritten `.html` target as a real page load instead of being intercepted by the client router.
4. Verify in the preview that each button navigates to the intended page and that the eyebrow and form render as expected.

## Technical notes

- Only `apps/web/src/app/partners/page.tsx` changes; the HubSpot embed component itself stays the same.
- No change to `scripts/prepare-dist.mjs` is needed: the href rewriting is already correct, the problem is client-side interception by `next/link`.
- If you want, the same anchor fix can be applied site-wide in a follow-up pass, since any other page using `next/link` for internal navigation has the same failure on the published site.
