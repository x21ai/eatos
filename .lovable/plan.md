# Full Service page: rebuild on the Quick Service layout, black theme

## Goal
Replace the current light, three-card Full Service page with the same professional dark layout the Quick Service solution page uses, populated with the Full Service copy from the live site screenshot.

## Content (from the live site)
- Eyebrow: Restaurant Technology Cloud
- Title: Full-Service Restaurant Point of Sale
- Description: designed for full-service restaurants, with additional modules including reservations, table management, and order coursing support.
- Three feature pillars, taken from the screenshot's three blocks:
  1. We change the way you think about Point of Sale. All-in-one food-service and restaurant management suite for guests, staff, marketing, finances, and the menu.
  2. Never miss out on a customer. Online and offline modes keep service running when Wi-Fi drops; multi-user, multi-device environment.
  3. Make one-time customers a thing of the past. Menu and table management, seating and serving, streamlined communication so orders come out right the first time.
- Key features list: Table Management, Reservations & Waitlist, Order Coursing, Split Checks & Tableside Pay, Kitchen Display System, Reporting & Analytics
- Hardware bundle block: Full Service Bundle, $0 hardware upfront with Pay As You Go, same three spec cards style and terms note.

## Layout (mirrors Quick Service)
1. Breadcrumb (Solutions / Full Service)
2. Dark hero: colored icon tile, title, eyebrow line, description, Book a Demo + View Pricing, plus the glass "Key features" card
3. Numbers strip (4 stats)
4. Three alternating feature rows with colored icon tiles, two metric chips each, and a full-bleed image
5. "Why eatOS for full service?" three-card grid
6. Hardware bundle section with three spec cards and the terms note
7. "Works great with" cards linking to Table Side Order & Pay, Kitchen Display System, Workforce Management
8. Closing CTA band

Black theme throughout (bg-black, white text, white/5 surfaces, white/10 borders), accent color indigo/violet to keep Full Service distinct from Quick Service emerald. Responsive across mobile, tablet and desktop using the same breakpoint pattern as Quick Service.

## Imagery
Reuse the existing home page card image `svc-full-service.jpg` for the hero, and generate 3 new cinematic dark images in the same home page style for the three feature rows (table management, offline/tableside payment, coursing/kitchen communication). Images render full-cover with no side padding, matching the Quick Service fix.

## Technical notes
- New files: `apps/web/src/app/solutions/full-service/content.ts`, `FullServiceClient.tsx`, and `assets/*.asset.json` pointers.
- `page.tsx` becomes a thin server component that renders the client and exports metadata (title, description, og, twitter).
- No changes to other solution pages or shared components.
