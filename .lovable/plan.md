# New Sub-Inbox popup

Make the "New sub-inbox" button in the chat sidebar open a create popup matching the reference, with demo behavior.

## Popup layout (matches the attachment)

- Centered white dialog with a dimmed backdrop and a close X in the top right.
- Title "Create New Sub-Inbox", subtitle "Pick an icon and a name for your sub-inbox".
- Two fields side by side on wide screens, stacked on phones:
  - Icon (required): a button showing the selected icon (calendar by default) that opens a small grid of icons to pick from.
  - Name of the Sub-Inbox (required): text input with placeholder "Enter the name of the sub-inbox".
- Footer: an underlined "Learn more" link on the left, and a "Create" button with a circled plus icon on the right. Create stays disabled until a name is entered.

## Demo behavior

- Creating a sub-inbox adds it to the "Your Inboxes" group in the sidebar with the chosen icon and name, shows a confirmation toast, and closes the popup.
- The list of created sub-inboxes is in-memory demo data only; it resets on page reload. No database changes.

## Technical notes

- All changes in `apps/web/src/components/admin/chat/AdminChatShell.tsx` (plus a toast import if needed).
- Use the same browser-native popup pattern as the "…" menu and toolbar dropdowns (native details/summary or dialog), because the preview never hydrates and scripted popups do not open there.
- The popup must open and stay fully on screen at phone, tablet, and desktop widths.
- Verify at 390, 834, and 1203 px, then run the build check.
