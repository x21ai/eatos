# Cafe page: rebuild on the Full Service template, black theme

## Goal
Replace the current light three-card `/solutions/cafe` page with the same professional dark layout used by the Full Service and Quick Service pages, populated with the cafe copy from the screenshot.

## Content (from the screenshot)
- Eyebrow: Restaurant Technology Cloud
- Title: Point of Sale System for Cafes
- Description: easy to learn and use, ideal for bustling cafes. Menu and inventory control let staff take complicated orders quickly and efficiently.
- Three feature pillars:
  1. Seamless connectivity for your cafe. Employees and devices stay in sync, from a two-person counter to a full staff cafe.
  2. Employee management made easy. Schedule shifts, run payroll, control time and attendance, and stay in sync with every part of the team's work.
  3. Speed things up with our Kiosk. Set the cafe apart by taking orders directly from customers to baristas with self-service Kiosk.
- Key features list: Fast Order Entry, Menu & Modifiers, Inventory Control, Loyalty & Rewards, Self-Service Kiosk, Reporting & Analytics
- Highlight cards strip (4) and a Cafe hardware bundle block with the $0 upfront Pay As You Go note, same as Full Service.

## Layout (mirrors Full Service)
1. Breadcrumb (Solutions / Cafe)
2. Dark hero: colored icon tile, title, eyebrow line, two-line description, Book a Demo + View Pricing, plus the glass "Key features" card and hero image
3. Four descriptive highlight cards
4. Three alternating feature rows with colored icon tiles and full-bleed images
5. "Why eatOS for cafes?" three-card grid
6. Hardware bundle section with three spec cards and the terms note
7. "Works great with" cards linking to Self-Service Kiosk, Point of Sale, Workforce Management
8. Closing CTA band

Black theme throughout (bg-black, white text, white/5 surfaces, white/10 borders), amber accent to keep Cafe distinct from Quick Service emerald and Full Service indigo. Responsive on mobile, tablet and desktop with the same breakpoint pattern.

## Imagery
Hero reuses the existing home page card image `svc-cafe.jpg`. Three new cinematic dark images in the same home page solution-card style are generated for the feature rows (barista counter connectivity, staff scheduling on a tablet, self-service kiosk in a cafe), rendered edge to edge with no side padding.

## Technical notes
- New files: `apps/web/src/app/solutions/cafe/content.ts`, `CafeClient.tsx`, and `assets/*.asset.json` pointers.
- `page.tsx` becomes a thin server component rendering the client and exporting metadata (title, description, og, twitter).
- No changes to other solution pages or shared components. No em dashes in copy.
