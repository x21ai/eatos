# Connect the Shop links to the new in-site shop

Short answer: no, not yet. The header Shop button (desktop and mobile) still points to the old external store at `https://shop.eatos.com`, and two "Shop Now" buttons on restaurant-type pages do the same. The new shop pages exist at `/shop`, but nothing in the navigation reaches them.

## What to change

1. Header Shop button (desktop, `Header.tsx` line ~622) and mobile menu Shop link (line ~1040): point to `/shop` as an internal link, drop the external target/rel attributes.
2. Restaurant-type CTAs still using the external store: `quick-service/content.ts` and `pizzeria/content.ts` "Shop Now" become `/shop` with `external` removed, matching the already-internal ones in full-service, fast-casual, cafe-pos and enterprise-pos.
3. Header theme detection: `/shop` is currently in `lightPages`, which forces the light header. The new shop is black-themed, so remove `/shop` from that list so the dark header renders correctly on all shop routes.

## Verification

- Load `/shop`, a collection page and a product page in the browser and confirm the header renders dark and the Shop button navigates in-site.
- Confirm no remaining `shop.eatos.com` links in app code (the string may stay inside the imported catalog HTML, which is data, not navigation).
