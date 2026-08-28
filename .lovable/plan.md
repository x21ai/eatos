# Align mesh diagram icons to their line endpoints

On the edgeOS / offline Point of Sale page, the Kiosk, Handheld and Payments icons sit exactly where their line from the eatOS cloud ends, but Point of Sale, Customer Display and Kitchen Display do not line up the same way. Fix is presentation only, in the diagram component.

## What changes

- Keep the six devices in the same ring order and same visual style.
- Make every icon tile sit centred on the endpoint of its own line from the cloud node, so all six read identically.
- Labels move so they never push the tile off its endpoint: labels sit outward from the ring (above the tile for the top row, below for the lower row) instead of always below.
- Nudge the top-row node coordinates inward/downward slightly so the tiles plus their labels stay inside the rounded panel at desktop and tablet widths.
- Verify at 1317px, 1024px and 390px widths that no tile overlaps a line stub or clips the panel edge.

## Technical detail

Single file: `apps/web/src/app/offline-point-of-sale/MeshDiagram.tsx`.

- Add a per-node `labelPosition` ('above' | 'below') and render the label with order-aware markup so the tile itself remains the element centred by `translate(-50%, -50%)` at the node's percentage position.
- Adjust the `nodes` array y-values for the three top/side nodes so the endpoint and the label both fit the 1000x360 viewBox.
- Line and pulse geometry keep using the same node coordinates, so connectors terminate at the tile centres automatically.

No content, copy, or data changes.
