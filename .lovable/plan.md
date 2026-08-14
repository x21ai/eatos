# Plan: Add Live Demo Section to Home Page

## Goal
Add a new "Live Demo" section immediately after the Hero section on the home page. The section will display horizontal tabs for six eatOS products, and load the selected product's live demo URL inside an embedded content area below the tabs.

## Demo URLs
- POS: https://mobileposapp.lovable.app/
- KDS: https://kds6.lovable.app/kds/v3
- Kiosk: https://kiosk6.lovable.app/
- CFD: https://cfd6.lovable.app/
- Dashboard: https://dashboard6c.lovable.app/
- InventoryOS: https://inventoryos6.lovable.app/

## Implementation Details

### 1. Create a new `LiveDemoSection` component
- Location: `apps/web/src/app/components/LiveDemoSection.tsx` (or inline in `apps/web/src/app/page.tsx` if kept small).
- Use the existing shadcn `Tabs` component (`apps/web/src/components/ui/tabs.tsx`) for the tab bar.
- Tab labels: POS, KDS, Kiosk, CFD, Dashboard, InventoryOS.
- Tab content area: an `<iframe>` that renders the selected demo URL.
- Use a `useState` hook to track the active tab, defaulting to "POS".
- On tab change, update the iframe `src`.

### 2. Visual Design
- Match the current dark home page theme: black background, white text, subtle zinc borders.
- Section title: "Live Demo" with `text-4xl md:text-6xl font-bold tracking-tighter` style.
- Tabs: horizontal pill-style list on desktop, horizontally scrollable on mobile.
- Active tab: white background with black text; inactive tab: white/10 background with white text.
- Content area: rounded-2xl border border-white/10, overflow-hidden, with a subtle gradient or shadow to frame the iframe.
- Iframe aspect ratio: `aspect-[16/9]` or fixed height (e.g., `h-[600px]`) so the demo is visible without taking over the whole page.
- Add a loading placeholder or spinner while the iframe loads.
- Add an "Open in new tab" link next to the content area for users who cannot view the iframe.

### 3. Insert on the Home Page
- Place the new section directly after the Hero section and before the "Social Proof / Trust Section" in `apps/web/src/app/page.tsx`.
- Use the existing `container mx-auto px-4 md:px-6` wrapper.
- Apply `motion` reveal animation for consistent scroll effects.

### 4. Mobile Responsiveness
- Tabs should be horizontally scrollable on small screens with hidden scrollbar (`scrollbar-hidden` utility if available).
- Iframe should scale down to fit mobile viewport width while preserving usability.

### 5. Iframe Considerations
- Some target domains may block iframe embedding via `X-Frame-Options`. The implementation will include a fallback message and an "Open in new tab" link.
- Set `sandbox` attributes to allow scripts and same-origin navigation as needed for the demos to function.
- Add `allow="fullscreen"` if any demos support it.

### 6. Verify Before and After
- Confirm the home page builds without the existing `serviceStyles is not defined` runtime error.
- Ensure the new section appears after the Hero on desktop, tablet, and mobile viewports.
- Verify each tab switches the iframe source correctly.
- Check that the section does not break the existing `serviceStyles` grid below.

## Files to Modify
- `apps/web/src/app/page.tsx` — insert the new section and import `LiveDemoSection`.
- Optional: `apps/web/src/app/components/LiveDemoSection.tsx` — new component file.
- No backend or database changes required.
