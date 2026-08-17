# Replace Option D on /home-1 with a professional Workflow Split View

## Goal
On `/home-1` only, replace the current **Option D, Device showcase** (`DemoDeviceSection`) with a new professional demo-view concept that feels distinct from the existing Tabs, Carousel, and Side Rail options.

## Proposed new direction: Option D, Workflow Split View

A cinematic, two-pane live demo that shows how two eatOS products work together in a real service flow.

- Left pane: the originating product (e.g., Point of Sale).
- Right pane: the receiving product (e.g., KDS or Dashboard).
- A subtle animated connector/arrow between the panes reinforces the integrated workflow.
- A control bar lets the visitor switch between three curated workflow pairs:
  - POS → KDS (order to kitchen)
  - POS → Dashboard (sale to reporting)
  - Kiosk → CFD (guest order to customer-facing display)
- Each pair keeps its own chrome bar, label, and "Open" link.
- The layout stays responsive: on mobile the pair stacks vertically, and the connector becomes a vertical arrow.

```text
        [ POS live demo ]  ---->  [ KDS live demo ]
                             
          order fired          ticket appears
```

## Why this is more professional
- It demonstrates the **ecosystem**, not just a single product in isolation.
- It visually communicates the value proposition of integration.
- It avoids the toy-like device frames that can feel dated or low-fidelity.
- It maintains the same dark, minimal aesthetic used across the rest of the page.

## Files to change
- `apps/web/src/app/components/DemoWorkflowSplitSection.tsx` (new)
- `apps/web/src/app/home-1/page.tsx` (replace `DemoDeviceSection` with `DemoWorkflowSplitSection`, update the option label to "Option D, Workflow split view")
- `apps/web/src/app/components/demoSources.ts` (add `workflowPairs` array or reuse existing data with a new pairing structure)

## Out of scope
- No changes to Options A, B, or C.
- No changes to the home page (`/`) or any other route.
- No new images or external dependencies.

## Acceptance criteria
- `/home-1` renders the new Option D without errors.
- The split view is responsive and functional across desktop, tablet, and mobile.
- All demo URLs are loaded in iframes with the same security sandbox settings.
- The section heading, description, and option label are updated consistently.
