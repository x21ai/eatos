# Apple-Style Shop Flow (Custom, No Shopify)

## Goal
Rebuild `/shop` into a full ecommerce experience modeled on apple.com/shop: shop index -> product detail with configuration options -> bag -> checkout. Design-only for now with 2 products (eatOS Pro, eatOS Mini); real payment processing comes later via Lovable's built-in Stripe payments (supports physical products, no Shopify or external account needed to start).

## Pages

1. **Shop index `/shop`** (rebuild existing page)
   - Apple-style store header: "Shop hardware" title with the "Need help choosing?" expert link pattern Apple uses.
   - Horizontal product rail / clean grid of only 2 products: eatOS Pro ($999, "Best Seller") and eatOS Mini ($299, "New").
   - Product cards: large product visual, name, price, "Learn more" / "Buy" links. Remove the other 4 placeholder products.
   - Full-width hero strip per product (like Apple's product shelves) alternating dark/light.

2. **Product detail `/shop/pro` and `/shop/mini`** (new)
   - Apple product-page layout: sticky gallery left, buy panel right (name, price, financing-style subtext, configuration options).
   - Options: color/variant selector, quantity, "Add to Bag" primary button (filled pill), "Buy Now" secondary.
   - Accordion sections below: Highlights, Tech Specs, What's in the Box, Compatibility.
   - Full-bleed feature sections with imagery between header and buy box, matching the existing dark eatOS aesthetic.

3. **Bag `/shop/bag`** (new)
   - Apple-style bag: line items with image, name, options, quantity stepper, remove; order summary card with subtotal, shipping note ("Free delivery"), estimated tax, total; "Check Out" button.
   - Empty-bag state with link back to shop.

4. **Checkout `/shop/checkout`** (new, demo)
   - Apple-style single-page checkout: contact, shipping address, delivery method, payment form (card fields), order summary sidebar.
   - Submit shows a demo confirmation state; no real charge. Clear "Demo checkout" note.

## Cart logic
- Lightweight cart store (React context + localStorage) with add/remove/update-quantity. Bag badge with item count appears in the site header.
- Guest cart only; no accounts in this pass.

## Data
- Single typed catalog module `apps/web/src/app/shop/catalog.ts` defining the two products (slug, name, price as {amount, currency}, images, options, specs) so checkout wiring later only swaps the data source for API responses.

## Tech notes
- All new pages under `apps/web/src/app/shop/` (Next.js app dir in this repo), Montserrat, no em dashes, existing `site-container` spacing.
- Product imagery: reuse existing hardware assets (pro/mini visuals from the current shop page) plus generated product shots where needed, `object-contain` so devices are never cropped.
- Header gets a Bag icon with count; mobile menu gets a Shop/Bag entry.
- Later step (not in this pass): enable built-in Stripe payments, create the two products there, and replace the demo checkout submit with a real Stripe Checkout session.
