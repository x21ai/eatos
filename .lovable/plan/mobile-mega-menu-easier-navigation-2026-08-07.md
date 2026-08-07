# Mobile Mega Menu: Easier Navigation

The mobile/tablet menu is currently one long flat scroll of ~25 links stacked in five ungrouped blocks. Everything is expanded at once, so finding a page means scrolling past the whole catalogue, and the Get Started / Shop buttons sit at the very bottom out of reach.

## New layout

```text
┌─────────────────────────────┐
│ [Products]  [Solutions]  ← segmented top tabs
├─────────────────────────────┤
│  Operations                 │
│  ▸ Point of Sale            │  scrollable panel
│  ▸ Kitchen Display          │  (only active tab shown)
│  Guest Experience           │
│  ▸ Self-Service Kiosk  ...  │
├─────────────────────────────┤
│  Platform · Pricing ·       │  compact link row
│  Enterprise · Customers     │
├─────────────────────────────┤
│  Login   Support   Status    │  quick icons
│  [ Shop ]  [ Get Started ]  │  sticky footer, always visible
└─────────────────────────────┘
```

Changes:
- **Two tabs at the top** — Products and Solutions. Only one list renders at a time, cutting visible scroll length roughly in half. Products defaults active; each tab keeps its "View all" link.
- **Collapsible groups inside Products** — Operations, Guest Experience, Growth & Payments, Intelligence & Hardware become tappable accordion headers with chevrons. Operations starts open, rest collapsed, so the panel fits on one screen.
- **Sticky action footer** — Shop and Get Started pinned to the bottom of the sheet so they're reachable without scrolling to the end; quick-access Login / Support / Status icons sit just above them.
- **Solutions as full-width rows** — replaces the cramped 2-column grid; each row gets icon + title on one line at readable size.
- **Larger tap targets** — every row moves to min-height 44px with more horizontal padding, matching accessibility guidance.
- Secondary links (Platform, Pricing, Enterprise, Customers) collapse into a compact two-column strip above the footer instead of four full-width rows.

Scrollbar stays hidden as it is now, and the whole sheet keeps the existing white surface and Montserrat type.

## Technical notes

All work is inside `apps/web/src/components/Header.tsx`, in the `xl:hidden` mobile panel block only:
- Add local state `activeTab: 'products' | 'solutions'` and `openGroup: string | null`, reset both when the menu closes.
- Extract the four product groups into a single data array (label + items) so the accordion maps over it instead of four hand-written blocks.
- Panel becomes `flex flex-col`: tabs (fixed) → scrollable region (`flex-1 overflow-y-auto scrollbar-hidden`) → sticky footer (`shrink-0 border-t`), keeping the `h-[calc(100vh-70px)]` container.
- Accordion headers are `<button aria-expanded>` with the group list toggled; no new dependencies.
- Desktop (`xl+`) mega menu is untouched. Verified afterwards at mobile (394px) and tablet widths.
