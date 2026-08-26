# Feature row images: full-cover on every solution page

Make the alternating feature row images on all solution pages fill their container edge to edge, exactly like Quick Service.

## What I found

All nine solution pages (Bar, Cafe, Catering, Enterprise, Fast Casual, Food Truck, Full Service, Ghost Kitchen, Quick Service) render the feature rows through the shared `Placeholder` component with `object-cover`, but the wrappers differ:

- Quick Service uses a `rounded-[2rem]` container.
- The other eight use a smaller `rounded-2xl` container, and Enterprise and Fast Casual also carry no hero image, so the visual rhythm and framing read differently.

Any place where a feature image is passed with `pad` or `contain` falls back to `object-contain`, which letterboxes the image inside the card instead of covering it.

## Changes

1. Standardize the feature row image container on the eight non Quick Service solution pages to match Quick Service:
   - Wrapper: `rounded-[2rem] border border-white/10 bg-white/5 overflow-hidden`
   - `Placeholder` props: `ratio="aspect-[16/10]"`, `className="rounded-none"`, no `pad`, no `contain`, so the image always uses `object-cover` and fills the card with no visible background or padding.
2. Remove any `pad` or `contain` usage on feature row images across the solution pages so nothing letterboxes.
3. Leave hero images, bundle sections, "works great with" cards, copy, layout order and animations untouched.

## Verification

Screenshot the feature row band on every solution page at mobile (390px), tablet (768px) and desktop (1280px) and confirm each image fills its card with no gutters or background showing. Run the existing copy guard.

## Files

- `apps/web/src/app/solutions/bar/BarClient.tsx`
- `apps/web/src/app/solutions/cafe/CafeClient.tsx`
- `apps/web/src/app/solutions/catering/CateringClient.tsx`
- `apps/web/src/app/solutions/enterprise/EnterpriseClient.tsx`
- `apps/web/src/app/solutions/fast-casual/FastCasualClient.tsx`
- `apps/web/src/app/solutions/food-truck/FoodTruckClient.tsx`
- `apps/web/src/app/solutions/full-service/FullServiceClient.tsx`
- `apps/web/src/app/solutions/ghost-kitchen/GhostKitchenClient.tsx`
