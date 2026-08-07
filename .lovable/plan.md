# Tap to Pay polish + remove em dashes site-wide

## 1. No em dashes, anywhere
There are 71 em dashes across page copy and components. I'll remove all of them from
user-visible content, rewriting each sentence so it still reads naturally: usually a
comma, a full stop, or a simple hyphen where a range or compound is meant. Where a dash
joined two clauses, the sentence gets split so nothing becomes a run-on.

Files touched (copy only, no logic): Tap to Pay, KDS, Workforce Management, Self-Service
Kiosk, Quick Service, Comparison, Brochures, Blog, Report Fraud, Newsletter, Footer,
Customer Showcase, Privacy, Terms.

For Privacy and Terms the wording stays legally identical; only punctuation changes.

I'll also record this as a standing project rule so future copy never uses em dashes.

## 2. Hero description in two lines
The Tap to Pay hero subhead currently runs to three lines on desktop. I'll tighten the
copy and constrain the measure so it sits on exactly two lines at desktop and tablet, and
stays comfortably readable on mobile.

## 3. "During the order" images are too large
The two images under the step cards drop to a smaller, calmer scale: a wider, shorter crop
and a reduced max width, so they read as supporting shots rather than hero art. Sized per
breakpoint so mobile, tablet and desktop each stay balanced.

## 4. Colorful icons for "Everything the terminal did."
Today three icons repeat across six cards. Each card gets its own icon and its own color:

- Every contactless card and wallet: credit card, blue
- Security built into the device: shield check, emerald
- Tips and split checks: percent/split, amber
- Keeps going when Wi-Fi drops: wifi off, violet
- Digital receipts: receipt, sky
- One ledger with your POS: layers, rose

Each icon sits in a tinted rounded tile matching its own hue (soft background, saturated
glyph) so the grid stays cohesive on the dark section instead of looking random.

## Technical notes
- Icon and color mapping lives in `apps/web/src/app/tap-to-pay/content.ts` next to each
  feature, so copy and presentation stay together; `TapToPayClient.tsx` renders it and the
  repeated conditional icon block is removed.
- Image sizing changes are Tailwind classes only (aspect ratio plus max width).
- Verify at mobile, tablet and desktop widths, plus a production build.

## Not doing
No layout rebuild of other sections, no new imagery, no copy changes beyond the dash
rewrites and the hero subhead trim.