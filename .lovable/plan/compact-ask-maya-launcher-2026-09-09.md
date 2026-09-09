# Compact "Ask Maya" launcher

Replace the wide "Ask the support agent" pill with a small round icon button that expands on hover into a rich card, similar to the live site's chat bubble.

## What changes

Resting state (bottom right of every page):
- A single round button, roughly 56px, black with the brand pink glyph and a small live status dot.
- No long label. Accessible label: "Ask Maya, the eatOS support agent".
- Slight lift and glow on hover, gentle pulse ring so it reads as live.

Hover / focus state (desktop):
- The button expands leftward into a card containing:
  - "Hey! I'm Maya. How can I help your restaurant today?"
  - A green dot with "We are online" plus typical reply time.
  - Two quick actions: "Chat with Maya" (opens the panel) and "Search help articles" (opens the panel in search mode).
  - Three small support-team avatars for warmth.
- Opens on mouse enter and keyboard focus, closes on mouse leave, Escape, or blur. Small close delay so moving into the card does not dismiss it.
- The card is purely a preview: clicking anywhere on it opens the existing agent panel, which is unchanged.

Mobile / touch:
- No hover card. The icon stays a single tap that opens the agent panel directly.

## Naming

Agent name becomes "Maya" in the launcher, the panel header, and the greeting, keeping "eatOS Support Agent" as the supporting subtitle so nothing about the existing answers or escalation changes.

## Technical notes

- Edit `apps/web/src/app/components/agent/AgentAssistant.tsx`: replace the `launcher` markup with an icon button plus a hover-preview card, using local state with a delayed close timer and a `matchMedia('(hover: hover)')` check to gate the card on pointer devices.
- Update `AGENT_NAME` in `apps/web/src/app/components/agent/knowledge.ts` to "Maya" and add a separate subtitle constant used by the panel header.
- The "Search help articles" action reuses the existing search entry point in the panel; the quick-action handlers call the same `setOpen(true)` path plus an initial mode flag.
- No change to retrieval, escalation, or the support page search form.
- Colors use existing brand tokens (`bg-brand`, `text-brand-on-dark`); no hardcoded hex values.
