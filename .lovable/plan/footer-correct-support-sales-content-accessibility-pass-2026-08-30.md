# Footer: correct Support/Sales content + accessibility pass

## What is wrong today

In `apps/web/src/components/Footer.tsx`:

- The **Support** card links to `mailto:cs@eatos.com` but the visible text reads "sales at eatOS.com". Support should show and link the support address.
- The **Sales** card shows the phone number as a text span inside a link that goes to `/bookademo`, so the number is not actually dialable.
- The four icons under Sales are labelled WhatsApp, Text Message, Facebook Messenger and "Chat", but "Chat" points at `tel:+18449732867` with a chat bubble icon. Icon and label do not match the action.
- The Sales card nests interactive icon links inside a card whose whole body is a link, which is confusing for keyboard and screen-reader users.

## Fixes

**Support card**
- Visible link text: `cs at eatOS.com`, linked to `mailto:cs@eatos.com`.
- Accessible name: "Email eatOS support at cs@eatos.com".

**Sales card**
- Keep heading "Book a personalized demo" linking to `/bookademo` (accessible name "Book a personalized demo").
- Make the phone number its own `tel:+18449732867` link so it dials, with accessible name "Call sales at +1 (844) 563-2867".
- Restructure so the demo link and the phone link are siblings, not nested inside one another.

**Contact channel icons**
- WhatsApp: `https://wa.me/18449732867`, WhatsApp-style icon, label "Message eatOS on WhatsApp".
- Text Message: `sms:+18449732867`, label "Text eatOS at +1 (844) 563-2867".
- Facebook Messenger: `https://m.me/myeatos`, label "Message eatOS on Facebook Messenger".
- Replace the mislabelled "Chat" bubble with a phone icon linking to `tel:+18449732867`, label "Call eatOS at +1 (844) 563-2867". (If you would rather this stays a live-chat trigger, say so and it will open the chat widget instead.)

## Accessibility pass on the whole footer

- Add `<nav aria-label="...">` landmarks for the link-group region, the social row, the contact channel row, and the bottom legal row so screen readers can jump between them.
- Give each link group heading an `id` and tie its `<ul>` to it with `aria-labelledby`, so links are announced in the right group.
- Add a visible focus ring to every footer link, icon button and the Cookie Settings button using the existing token colors (`focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black`, brand pink for the icon circles), plus `rounded-sm` where needed so the ring traces the link.
- Icon-only links keep `aria-label` but get descriptive names (as listed above) instead of bare platform names, and their `<svg>` gets `aria-hidden="true" focusable="false"`.
- External links get "(opens in a new tab)" appended to their accessible name.
- Bump icon circles to a 44x44 minimum tap target (`h-11 w-11`) while keeping the 16px glyph, so mobile hit areas pass.
- Cookie Settings stays a real `<button>`; add `type="button"` and an aria-label describing what it opens.
- Logo link gets an accessible name "eatOS home"; decorative arrow icons get `aria-hidden`.

## Scope

Presentation and markup only, inside `Footer.tsx`. No changes to link destinations other than the Support/Sales corrections above, no layout or spacing changes, no copy changes outside the two cards.
