# Self-Service Kiosk hero — smaller home-page-style type

## Current state
- `/products/self-service-kiosk` is rendered by `KioskPageClient.tsx`.
- The hero `h1` is `text-4xl md:text-6xl font-bold tracking-tighter leading-[1.06]`.
- An eyebrow `Self-Service Kiosk` sits above the title.
- The description is `text-base sm:text-lg leading-8 text-zinc-600`.

## Goal
Make the hero type and rhythm match the home page while keeping the light split-hero layout.

## Changes

1. **Remove the eyebrow**
   - In `apps/web/src/app/products/self-service-kiosk/KioskPageClient.tsx`, delete the `<Eyebrow>{hero.eyebrow}</Eyebrow>` line above the hero title.
   - In `apps/web/src/app/products/self-service-kiosk/content.ts`, remove the unused `hero.eyebrow` field.

2. **Match home-page title style at a smaller size**
   - Update the hero `h1` to:
     - `text-3xl md:text-5xl font-bold tracking-tighter leading-[1.05]`
     - `max-w-[24ch]`
     - Remove the `mt-5` top margin that was only there for the eyebrow.
   - Keep the title left-aligned to fit the split-hero layout; the home page is centered, so the alignment is adapted for this page.

3. **Match home-page description style and spacing**
   - Update the hero `<p>` to:
     - `text-[15px] md:text-[22px] font-light leading-relaxed text-zinc-600`
     - `mt-8 max-w-xl`
   - Adjust the CTA row to `mt-12 gap-6` to match the home page rhythm.
   - Keep the stats row but adjust its top margin to `mt-12`/`mt-16` to fit the new rhythm.

4. **Leave the rest of the page unchanged**
   - The key features strip, feature list, offers, hardware band, and closing CTA stay as they are.

## Verification
- Rebuild the Next.js app and refresh the preview.
- Use Playwright to capture the hero at desktop, tablet, and mobile viewports.
- Confirm the eyebrow is gone, the title is smaller, and the description/CTA spacing matches the home page rhythm.
- Clear the stale `mobileLogoWhite` runtime warning if it still appears after rebuild.
