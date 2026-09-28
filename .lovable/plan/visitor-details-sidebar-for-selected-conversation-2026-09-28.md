# Visitor details sidebar for selected conversation

## Goal
When a conversation is selected in `/chatapp`, the right sidebar shows the full visitor details matching the reference screenshot, on desktop, tablet, and phone.

## What changes

### Visitor details panel (right sidebar)
Upgrade the existing panel in `AdminInbox.tsx` to match the reference:

- **Header**: avatar, visitor name, verified email with check badge, city/location, and a full-width "View profile" button.
- **Conversation Routing** (collapsible section): current assignee row with avatar, plus the assignee dropdown that already works.
- **Main information** (collapsible): location with pin, local time with UTC offset, language/country flags, channel (Chat), last visited page URL, and email address.
- **Visitor device** (collapsible): browser and OS (for example "Chrome 153 on Windows"), IP address with ISP name, and current page.
- **Conversation participants** (collapsible): participant email list with an "Add" action that adds a temporary participant row.
- **Quick jump** (collapsible): placeholder links area matching the reference layout.
- Sections expand and collapse with chevrons, all open by default.

### Visibility behavior
- Desktop (wide): panel always visible beside the open conversation.
- Tablet and smaller desktop: hidden by default, opened with the existing panel button in the conversation header, as a slide-over.
- Phone: same slide-over, full-height, with a close button.
- Selecting a different conversation updates the panel contents immediately.

### Data
- Extend the typed mock data with the new fields needed (verified email, UTC offset, languages, ISP, participants). All temporary, reset on refresh, no backend changes.

## Verification
- Select each conversation and confirm the sidebar shows its details.
- Check collapsible sections, assignee change, and Add participant.
- Confirm layout at phone, tablet, and desktop widths with no overlap or clipping.
- Build passes without errors.
