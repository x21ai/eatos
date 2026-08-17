# How it Works: 3 Alternative Demo Views on /home-1

Keep the existing tab version, then add three more sections directly below it on `/home-1` only, so all four layouts can be compared side by side on the same page. Each gets a small label above the heading (Option A/B/C/D) so it is easy to say which one to keep.

## Option A (existing)
Horizontal tab bar with browser-chrome frame. Unchanged.

## Option B: Carousel / slider
- One demo visible at a time inside the same browser-chrome frame.
- Left/right arrow buttons plus dot indicators below, and swipe support on touch.
- Product name and a one-line description slide in with the frame.
- Only the active slide loads its iframe, so performance stays the same as today.

## Option C: Vertical side-rail selector
- Two-column layout: a left rail listing the six products as stacked rows (icon, name, short line), the demo frame on the right.
- Active row is highlighted with a light fill and an accent bar.
- On tablet and mobile the rail collapses into a horizontal scrolling strip above the frame.

## Option D: Device-mockup showcase
- The demo is framed inside a device shell: phone frame for Point of Sale and CFD, tablet frame for Kiosk and KDS, laptop frame for Dashboard and inventoryOS.
- Below the frame, a row of compact product pills switches the demo; frame type changes with the product.
- Adds a "Open full demo" link and a caption line under the device.

## Technical notes
- New components in `apps/web/src/app/components/`: `DemoCarouselSection.tsx`, `DemoRailSection.tsx`, `DemoDeviceSection.tsx`.
- Shared demo list moves to a small `demoSources.ts` module imported by all four sections, so URLs stay in one place.
- Sections are added only to `apps/web/src/app/home-1/page.tsx`, right after `<LiveDemoSection />`. The main home page is untouched.
- Each section lazy-loads only the visible iframe and reuses the existing black theme, Montserrat bold tracking-tighter headings, and zinc palette.
- All three are built responsive for desktop, tablet, and mobile.
- After you pick one, the winner replaces the current section on the main home page and the other options are deleted.
