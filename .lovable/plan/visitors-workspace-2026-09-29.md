# Visitors workspace

## Goal
Add a public `/chatapp/visitors` workspace that matches the three references and remains usable on desktop, tablet, and phone.

## Build
- Turn **Visitors** in the main chat sidebar into a real navigation link with its live-count badge and active styling.
- Add typed visitor demo records for the visible names, page titles, countries, online states, map positions, device details, and conversation state.
- Build the default visitors view with:
  - the existing eatOS sidebar
  - a dedicated **VISITORS / Live** list panel with status dots, colored avatars, country flags, page previews, dividers, and bottom filtering
  - a blue world-map area with visitor pins, an online/active summary card, and zoom controls
- Match the second reference when hovering or focusing a visitor row: highlight the row and reveal the **MagicBrowse**, conversation, and visitor-view actions without changing the list spacing.
- Build the selected visitor view shown in the third reference:
  - a compact vertical visitor rail
  - a large MagicBrowse panel with the disconnected-state message
  - a conversation panel with call, video, block, more, transcript, status, LiveTranslate, notice, tabs, composer controls, and send button
  - selecting another visitor updates the active avatar and relevant demo details
- Use browser-safe/native interactions where possible so hover, selection, close, status, and composer controls remain visible and usable in the preview.

## Responsive behavior
- Desktop keeps the full sidebar, visitor panel or rail, main map/MagicBrowse area, and conversation panel together.
- Tablet keeps the visitor rail visible and proportionally narrows the main and conversation areas.
- Phone starts with the visitor list, then opens the selected visitor workspace with clear back navigation and horizontally safe controls.

## Verification
- Check default, hover/focus, and selected visitor states at 390px, 834px, 1203px, and 1280px.
- Confirm navigation, visitor selection, filtering, zoom controls, status/actions, and message composer demo feedback.
- Confirm the page has no overflow or overlapping controls and the project build remains successful.

## Technical details
- Create the new visitors page and focused visitor components alongside the current chat workspace.
- Keep all content in the existing typed local demo-data layer. No database or authentication changes are included.
- Reuse the current semantic colors, buttons, typography, and full-height chat shell. The attached screenshots are visual references only.
