# Tap to Pay page — professional rebuild

## What exists today
`/tap-to-pay` already exists and is linked from the footer ("Tap to Pay") and treated as a light-hero route in the header. It is a light-themed page with a hand-built iPhone mockup, three benefit cards, and a CTA — it does not match the Home page's dark, cinematic system (black sections, `font-bold tracking-tighter` headings, `font-light` body copy, gradient headline masks).

## What I'll build
Rebuild that same route (`/tap-to-pay`) so existing links keep working, using Home's design language and a short title: **"Tap to Pay."**

Sections, top to bottom:

1. **Hero** — black, eyebrow "Payments", headline "Tap to Pay." with a gradient-masked second line ("Right at the table."), one-paragraph subhead, primary "Book a Demo" and secondary "See Pricing" buttons.
2. **Video demo** — full-width 16:9 rounded placeholder with a play badge and caption ("Taking a tap payment mid-order"). Built so a real video source can be dropped in later without layout changes; a poster image is generated.
3. **Stat band** — four figures in Home's stat style (seconds to settle, flat rate, extra hardware needed, wallets supported).
4. **How it works during the order** — 3-step flow: ring up the order on the handheld, turn it to the guest, tap and tip. Numbered cards with supporting imagery.
5. **Feature grid** — bento-style tiles matching Home's ecosystem section: contactless wallets and cards, on-device security, tips and split checks, offline resilience, receipts by text or email, one ledger with the POS.
6. **Where it works** — quick-service counter, full-service tableside, curbside and events.
7. **Requirements strip** — supported iPhone models, iOS version, eatOS app, account activation.
8. **Closing CTA** — dark band with "Book a Demo" and a link to `/pricing`, matching Home's CTA rhythm.

Copy is written fresh for eatOS, with no new pricing claims beyond the 1.8% flat rate already used on Home.

## Images
Generate and upload as CDN assets: a hero device-in-hand image, a video poster frame (server taking a tap payment at a table), and two or three supporting shots for the steps and feature tiles. The video itself stays a placeholder for you to supply.

## Responsive
Every section built for mobile, tablet, and desktop: single-column stacks on mobile, two columns at tablet, full bento layout at desktop; typography uses Home's responsive steps (`text-5xl md:text-8xl` hero, `text-4xl md:text-6xl` sections).

## Technical notes
- Rewrite `apps/web/src/app/tap-to-pay/page.tsx` as a server page with metadata (title, description, OG/Twitter), add `TapToPayClient.tsx` for scroll reveals and a `content.ts` for copy and data.
- Reuse `useRevealOnScroll` and the marketing `Placeholder` pattern already used by the KDS and Kiosk pages.
- `Header.tsx` currently lists `/tap-to-pay` as a light-hero route; remove it so nav text stays white over the new dark hero.
- Verify with screenshots at mobile, tablet, and desktop widths plus a production build.

## Not doing
No payment integration, no real video encoding, no pricing changes.