# Account settings subpages

## Goal
Expand the Account category into six collapsible sublinks and recreate each supplied settings screen using the existing dark Chat App styling.

## Changes
- Make Account expandable/collapsible in the settings sidebar, remaining open whenever one of its subpages is active.
- Add these sublinks in order: Information, Notifications, Availability, Security, Interface, Keyboard Shortcuts.
- Preserve Billing, Workspace, Chatbox, Inbox, Email, and Status Page below Account.
- Keep the selected Account subpage in the URL so direct links, refresh, and back/forward navigation retain the correct screen.
- Adapt the subpage navigation for tablet and phone layouts without introducing another permanent sidebar.

## Account screens
- **Information:** avatar upload area, personal details form, password and two-factor controls, and account removal link.
- **Notifications:** browser notification warning, master notification setting, push notification choices, and email notification choices.
- **Availability:** online status notice, general availability controls, working days, timezone, and schedule interval controls.
- **Security:** authorized apps table and recent login history using safe US-based demo session data.
- **Interface:** language and appearance selectors.
- **Keyboard Shortcuts:** general interface and inbox shortcut controls, including the shortcut reference action.

## Interaction and validation
- Make subpage links, collapse/expand behavior, switches, selectors, schedule controls, and relevant buttons usable with demo state only.
- Retain the existing scoped admin theme and shared settings shell.
- Verify every Account subpage and navigation flow at desktop, tablet, and phone widths, including no horizontal overflow.
- Confirm the preview build completes without errors.

## Technical details
- Extend the settings page query handling with an Account subpage value while keeping the existing category links compatible.
- Implement the six views as focused panels inside the current settings component, sharing reusable section and setting-row patterns.
- Use semantic theme tokens and existing button, input, and switch controls throughout.
