# Fix: role cards click shows nothing

## What is happening

Clicking a role card does work: the six role cards are swapped for the three role-specific cards. The problem is that the new cards render fully transparent, so the area looks empty.

The site's fade-in-on-scroll effect keeps a list of elements it has seen, and that list is built once when the page first loads. The role detail cards do not exist yet at that moment, so they are never marked as "seen" and stay at zero opacity forever.

## The fix

Make the fade-in effect aware of content that appears later, so any newly rendered card fades in normally.

1. Update the scroll reveal logic so it also watches for elements added to the page after load, and reveals them when they come into view.
2. As a safety net, if an element is already inside the viewport when it appears, reveal it immediately instead of waiting for a scroll.
3. Keep the existing behavior for all other sections unchanged, since the same effect is used site wide.

## Technical detail

- `apps/web/src/hooks/useRevealOnScroll.ts`: the effect queries `[data-reveal-id]` once on mount and observes only those nodes. Add a `MutationObserver` on `document.body` (subtree) that observes any new `[data-reveal-id]` nodes with the same `IntersectionObserver`, and disconnect both on cleanup. Keep the null-initial-state SSR behavior.
- No change needed in `AgentsSection.tsx` logic; its `activeRole` state, `Show all roles` button, and Escape handling already work.

## Verification

- Click each of the six roles at 390, 834, and 1280 px width and confirm three detail cards appear with icons, status pills and source lines.
- Confirm `Show all roles` and Escape return to the six role cards.
- Confirm other sections on `/ai` and the home page still fade in as before.
