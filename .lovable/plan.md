# Video popup on intelligence detail cards

Clicking any of the three detail cards (in every role: Operator, Manager, Finance, Guest, Server, Kitchen) opens a popup that plays a video for that card. Until you send real footage, every card uses the same placeholder clip.

## Behaviour

- Detail cards become clickable (button role, keyboard focusable, purple focus ring like the role cards).
- Click opens a centered dark overlay popup with:
  - the card title and a short description line
  - a video player sized to the video's own shape, capped so it always fits the screen
  - a close button top right
- Close on close button, click on the dim backdrop, or Escape.
- Escape inside the popup closes the popup only; it does not jump back to the six role cards.
- Background page scroll is locked while the popup is open.
- Works the same at phone, tablet and desktop widths; on phone the popup is near full width with safe padding.

## Video source

- Each capability gets an optional `video` field. Where it is empty, the popup falls back to a shared placeholder clip already in the project, so all 18 cards work now.
- When you send the real videos, they drop into these fields one by one with no other change.

## Technical notes

- File: `apps/web/src/components/AIIntelligence/sections/AgentsSection.tsx`.
- Add `activeCapability` state (role title + index). Detail `Card` wraps in a `button` like the role cards do.
- Popup rendered inline at the end of the section as a fixed-position overlay (z above header), not a portal, to keep the change to one file.
- `<video controls autoPlay muted playsInline>` with `aspect-ratio` derived from `onLoadedMetadata`, falling back to 16:9; `maxHeight: min(70vh, ...)`, `maxWidth: 100%`.
- Extend the existing Escape listener: close the popup first, then role view.
- No routing, data-layer or backend change.
