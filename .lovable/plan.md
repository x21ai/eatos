# Conversation header actions and state button

## Goal
Match the reference screenshot for the selected conversation header in `/chatapp`: action icons on the left (phone, video, block, more options), and the Unresolved/Resolved state button on the right, styled like Crisp.

## What changes (all in `AdminInbox.tsx` `Transcript` header)

### Left action icons
Add compact icon buttons before the existing more-options button:
- Phone (Phone)
- Video call (Video)
- Block (Ban, circle-slash style like the reference)
- More options (existing MoreHorizontal) opens a dropdown menu.

### More options dropdown
Items matching the reference, with working temporary effects (in-memory only, reset on refresh):
- Mark as unread: sets the conversation's unread flag and clears selection state so it appears unread in the list.
- Copy link: copies the current page URL for the conversation to the clipboard.
- Set Subject: opens a small dialog to set a temporary subject stored on the conversation.
- Transcript: submenu with "Email transcript" and "Download transcript" (front-end placeholders).
- Move to inbox: submenu with the five inboxes (Main Inbox, Assigned to me, New sub-inbox, Automated, Spam); choosing one re-routes the conversation in memory.
- Next (Ctrl Alt up arrow) / Previous (Ctrl Alt down arrow): keyboard shortcut chips shown in the menu; clicking navigates to the next/previous conversation in the current list. Also bind real Ctrl+Alt+Up/Down handlers while a conversation is open.
- Mark as spam: moves the conversation to the Spam inbox.
- Delete conversation (red destructive item): removes the conversation and selects the next one.

Use the existing `DropdownMenu`, `DropdownMenuSub`, and shortcut components. Menu is keyboard accessible, closes on Escape/outside click, and fits phone widths.

### Right state button
Replace the current Resolve/Reopen button with a state-styled button:
- Unresolved: orange/red background, white arrow-right icon, label "Unresolved".
- Resolved: green background, check arrow, label "Resolved".
- Clicking toggles the state (same onResolve logic as today).
The existing more-options and panel buttons keep their places; the details panel button stays.

### Mock data
Add an optional `subject?: string` field to the `Conversation` type and set subjects where sensible.

## Scope
Front-end only, in-memory state as before. No backend, no new dependencies.

## Verification
- Confirm the header shows phone, video, block, more options on the left and the orange Unresolved button on the right, matching the reference.
- Test every menu item: unread flag, copy link, subject dialog, transcript submenu, move-to-inbox routing, next/previous navigation with keyboard, spam routing, delete.
- Toggle Unresolved to Resolved and confirm the green state button.
- Check phone, tablet, and desktop widths for clipping or overlap; build passes.
