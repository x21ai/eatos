# Home Page: Professional Mobile Layout Pass

## What is wrong today

Confirmed on a 394px viewport in the preview:

- The hero is locked to full viewport height, so on a phone the badge, headline and buttons sit in the bottom third with a large empty area above and below. The page opens looking half-empty.
- A decorative blur element is 420px wide inside a 394px screen, which pushes the document scroll width to 402px and causes a slight sideways scroll.
- The bento "ecosystem" grid keeps desktop-scale padding (p-10, p-8) and 2.5rem corners on phones, so the cards feel oversized and cramped at the same time.
- The Hardware bento card keeps a side-by-side row with a fixed 128px circle, squeezing its text into a narrow column on mobile.
- Hardware product cards use px-12 pt-12 at every width, leaving very little room for the "eatOS Point of Sale" / "Point of Purchase" headings.
- The Reports section uses a 20-unit grid gap that becomes a very large vertical gap on mobile, and the dashboard mock keeps p-8 with a 5xl figure.
- The Kitchen Display and "How it Works" blocks keep desktop type scale and padding, and the demo tab row needs clearer horizontal-scroll affordance on a phone.

## What will change

1. **Hero**: switch to natural height with generous vertical padding on mobile, keeping the full-height cinematic treatment from `md:` up. Scale the headline down for phones, tighten the paragraph and body spacing, keep the stacked full-width buttons.
2. **Overflow fix**: constrain the oversized decorative blur so nothing exceeds the viewport width, removing the horizontal scroll.
3. **Bento grid**: responsive padding and corner radii (smaller on mobile, current values from `md:` up), tighter internal gaps, and a stacked layout for the Hardware card so the heading and copy get full width with a smaller icon badge.
4. **Service style cards**: keep the current 1 column on mobile and 4 up at large, with slightly tighter card padding on phones.
5. **Hardware product cards**: responsive padding and heading sizes so both product names read cleanly on a phone.
6. **Reports section**: reduce the mobile grid gap, make the checklist single column on small screens, and scale the dashboard mock padding and figures down for mobile.
7. **Kitchen Display and How it Works**: responsive section padding, headline and body sizes; make the demo tab strip scroll cleanly with edge padding, and keep a 16:9 demo frame on mobile.
8. **Global**: audit every home page section for mobile-safe type scale, min-w-0 on text containers in rows, and consistent section rhythm.

Tablet and desktop layouts stay visually as they are today. All values stay in the existing dark theme, Montserrat typography, and current spacing language.

## Files

- `apps/web/src/app/page.tsx` (all home page sections)
- `apps/web/src/app/components/LiveDemoSection.tsx` (mobile tab strip and frame)

## Verification

Screenshot the home page at 394px, 768px, and 1440px in the preview and confirm no horizontal scroll, no oversized empty areas, and no clipped or squeezed text.
