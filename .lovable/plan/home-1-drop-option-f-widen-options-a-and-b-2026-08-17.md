# Home-1: drop Option F, widen Options A and B

## What changes

1. **Remove Option F (Spotlight grid)** from `/home-1`: delete the section from the page and delete its component file.
2. **Make Option A (tabs) and Option B (carousel) use the same demo frame as Option D (guided journey)**, which has the better width and spacing.

Option D's frame, which A and B will adopt:
- Full-width section with a centered `container` and `px-4 md:px-6` padding, inner wrapper capped at `max-w-5xl` (instead of the current fixed 818px box).
- Frame: `rounded-2xl` bordered card, chrome bar with small 2.5px dots, product name centered, "Open" link on the right.
- Viewport: `aspect-[16/10]` on mobile/tablet, fixed `lg:h-[480px]` on desktop, so the iframe fills the frame edge to edge with no leftover space.

Everything else stays: tab bar in A, arrows/dots in B, full product names (Kitchen Display System, Customer Facing Display, Self Service Kiosk), and their headings/descriptions.

## Responsive

Checked on mobile, tablet and desktop: A's tab strip stays horizontally scrollable with hidden scrollbar, B's arrow row and dots stay centered under the wider frame, and the 16/10 ratio keeps the demo readable on small screens.

## Technical notes

- `apps/web/src/app/home-1/page.tsx`: remove the `DemoSpotlightSection` import and its section.
- Delete `apps/web/src/app/components/DemoSpotlightSection.tsx`.
- `LiveDemoSection.tsx` (Option A) and `DemoCarouselSection.tsx` (Option B): replace the `w-full lg:w-[818px]` section wrapper with `container mx-auto px-4 md:px-6` plus a `max-w-5xl mx-auto` inner wrapper, and switch the iframe container to `aspect-[16/10] lg:aspect-auto lg:h-[480px]`, matching `DemoJourneySection.tsx`.
- Option A is shared with the main home page, so its frame change is scoped by copying the Option D frame markup into it only if it is only used by `/home-1`; otherwise a `/home-1`-local variant is used so the live home page layout is untouched.
