# Three new demo views on /home-1 (Options D, E, F)

Replace the current Option D (Workflow split view) with three new sections, so the page shows six comparable layouts of How it Works: A tabs, B carousel, C side rail, plus the three below.

## Option D, Guided journey timeline
- A numbered step strip across the top: 1 Order, 2 Kitchen, 3 Guest, 4 Reporting.
- Each step maps to a product demo (Point of Sale, Kitchen Display System, Self Service Kiosk / Customer Facing Display, Dashboard).
- Selecting a step loads that demo in the frame below with a short two-line caption explaining what happens at that stage.
- A thin progress line connects the steps and highlights up to the active one.
- On tablet and mobile the strip becomes a horizontal scrolling row.

## Option E, Expandable accordion stack
- The six products stacked as full-width rows with name and one-line blurb.
- Clicking a row expands it smoothly to reveal its live demo inline; the previously open row collapses.
- One row open by default (Point of Sale); only the open row loads its iframe.
- Chevron indicator rotates on open; row gets a light fill and accent bar when active.

## Option F, Spotlight grid
- Left: a large focused demo frame for the active product with its name and Open link.
- Right (or below on smaller screens): a compact grid of the other five products as small selectable cards with icon-free type-led labels.
- Clicking a card swaps it into the spotlight with a soft fade.
- On mobile the small cards become a two-column grid under the spotlight frame.

## Technical notes
- New components in `apps/web/src/app/components/`: `DemoJourneySection.tsx`, `DemoAccordionSection.tsx`, `DemoSpotlightSection.tsx`.
- All three read from the shared `demoSources.ts` and use the same full display names (Kitchen Display System, Customer Facing Display, Self Service Kiosk).
- `demoSources.ts` gains a small `journeySteps` array (step number, title, caption, product id).
- `apps/web/src/app/home-1/page.tsx`: remove `DemoWorkflowSplitSection`, add the three new sections in order with labels "Option D, Guided journey", "Option E, Accordion stack", "Option F, Spotlight grid".
- Delete `DemoWorkflowSplitSection.tsx` and the now unused `workflowPairs` data.
- Same iframe sandbox settings, lazy loading of only the visible demo, existing black/zinc palette, Montserrat bold tracking-tighter headings.
- Built responsive for desktop, tablet and mobile.

## Out of scope
- Options A, B, C unchanged; the main home page and all other routes untouched.
