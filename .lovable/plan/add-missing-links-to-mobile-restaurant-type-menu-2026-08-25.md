# Add missing links to mobile Restaurant Type menu

## Problem
The desktop "Restaurant Type" dropdown (`productLinks` in `apps/web/src/components/Header.tsx`) lists 17 products. The mobile menu's tab (labeled "Restaurant Type") only shows 12 across its four groups. Five links are missing on mobile:

| Missing link | Route | Desktop group color |
|---|---|---|
| Handheld | `/products/point-of-purchase` | indigo |
| Customer Display | `/products/customer-facing-display` | sky |
| Analytics | `/products/reporting-analytics` | amber |
| Gift Cards | `/products/giftcards` | rose |
| Autonomous Delivery | `/products/autonomous-delivery` | slate |

## Changes (single file: `apps/web/src/components/Header.tsx`)

1. **Operations group**: add Handheld (`Phone` icon, `text-indigo-600`) and Analytics (`LayoutDashboard` icon, `text-amber-600`).
2. **Guest Experience group**: add Customer Display (`CreditCard` icon, `text-sky-600`) and Autonomous Delivery (`Truck` icon, `text-slate-600`).
3. **Growth & Payments group**: add Gift Cards (`CreditCard` icon, `text-rose-600`).
4. **`groupForPath` helper**: add the five new paths so the correct group auto-expands when the current page is open:
   - Operations: `/products/point-of-purchase`, `/products/reporting-analytics`
   - Guest Experience: `/products/customer-facing-display`, `/products/autonomous-delivery`
   - Growth & Payments: `/products/giftcards`

No desktop changes. No new routes needed (all five pages already exist). After this, mobile and desktop show the same 17 products.
