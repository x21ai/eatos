# Role cards drill-down on the Intelligence page

Clicking one of the six role cards replaces the grid with that role's three intelligence cards. A "Show all roles" button at the top right returns to the six cards.

## Behaviour

- Default: the six role cards (Operator, Manager, Finance, Guest, Server, Kitchen), now clickable.
- On click: heading line above the grid reads "Intelligence built for operator." (role name in accent purple), with a rounded purple-outlined "Show all roles" button on the right.
- The grid swaps to three detail cards for that role, same 1 / 2 / 3 column layout on mobile, tablet and desktop.
- Each detail card: small purple icon tile, a status pill on the right (Live, Priority or Candidate), title, description, and a muted source line under a thin divider.
- Same reveal/fade animation on both states. Keyboard accessible (cards act as buttons, Escape returns to all roles).

## Detail card content

Operator
1. Multi-location intelligence (Candidate) - Compares sites side by side, using the same metrics a single unit sees, to surface which location is underperforming this month and why. Sources: Cross-site gross sales, labor cost %, refund rate
2. Revenue & margin intelligence (Priority) - Surfaces which location is underperforming, where margin is being lost, and why refunds spiked this week, rolled up across the business. Sources: Gross sales, product sales, itemized sales, tax report
3. Executive brief intelligence (Candidate) - Pulls one daily snapshot of revenue, guests and labor across every location, so the day starts already briefed instead of chasing reports. Sources: Dashboard home, gross sales, guests, payroll

Manager
1. Labor intelligence (Live) - Builds schedules from demand forecasts, identifies coverage gaps before they hit the floor, and cuts labor cost 18%. Sources: Payroll, cashout, tip
2. Loss prevention intelligence (Priority) - Catches discount abuse, void patterns and tax discrepancies while they're still small, before they surface as a finance review issue. Sources: Cash drawers, deposits, discounts, voids, refunds, cancelled orders
3. Covers forecast intelligence (Candidate) - Projects next week's covers and revenue so staffing and ordering decisions get made ahead of the problem, not after. Sources: Daily services transactions, online order report trends

Finance
1. Revenue & margin intelligence (Priority) - Surfaces which location is underperforming, where margin is being lost, and why refunds spiked this week. Sources: Gross sales, product sales, itemized sales, tax report
2. Payments intelligence (Live) - Monitors failures by card and device, catches fee spikes as they happen, and flags fraud patterns early. Sources: Cash drawers, deposits, service charges
3. Pricing & discount intelligence (Candidate) - Tracks discount leakage and promo abuse, showing exactly where discounting is eating margin faster than it drives volume. Sources: Discounts, promo code, tax itemized sales

Guest
1. Guest intelligence (Live) - Predicts churn, triggers retention offers, remembers preferences, and increases repeat visits 23%. Sources: Guests, feedback
2. Guest traffic intelligence (Priority) - Tracks whether the restaurant is full, why not, and which hours matter most for seating and staffing. Sources: Guests, daily services transactions, online order report
3. Voice order intelligence (Candidate) - Captures a voice order placed on the guest portal and hands it straight to order intelligence, so a spoken order moves exactly like a typed one. Sources: Guest ordering portal, voice channel

Server
1. Order intelligence (Live) - Captures orders via voice or text, routes to kitchen intelligence, and suggests upsells, 40% faster than manual. Sources: Sales transaction, online order report
2. Guest intelligence (Live) - Remembers guest preferences table-side and flags who's a repeat visitor before the greeting. Sources: Guests, feedback
3. Tips intelligence (Candidate) - Tracks tip trends per shift and flags gratuity anomalies, so servers see where they stand in real time. Sources: Tip report

Kitchen
1. Kitchen intelligence (Live) - Detects bottlenecks, balances stations, and predicts delays before they happen. Sources: Live ticket flow, station load, prep timing
2. Inventory intelligence (Live) - Tracks real consumption, auto-reorders, flags waste, and protects your margins. Sources: 86 report, product sales
3. Menu performance intelligence (Candidate) - Flags underperforming products to cut and modifiers that are quietly killing margin. Sources: Menu builder, products, price category, variant sales report

## Technical notes

- Single file: `apps/web/src/components/AIIntelligence/sections/AgentsSection.tsx`.
- Add a `roles` data array where each role carries `title`, `desc`, `Icon`, and a `capabilities` array of `{ title, status, desc, sources, Icon }`.
- Local `useState<string | null>(activeRole)` drives which view renders; no routing or data-layer change.
- Status pill styling: Live = neutral white/10 fill, Priority = amber text with amber/40 border, Candidate = muted outline.
- Reuse existing `Card`, `Reveal`, `SectionLabel`; add lucide icons per capability (MapPin, LineChart, FileText, CalendarDays, ShieldAlert, TrendingUp, ShieldCheck, Tag, Heart, Users, Mic, DollarSign, HandCoins, Flame, Package, BookOpen).
- Section heading and intro paragraph stay visible in both states; the role heading plus "Show all roles" row appears only in detail view.
