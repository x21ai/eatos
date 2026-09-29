# Working chat demo and persistent guest details

## Goal
Make `/chatapp` deliver a complete demo conversation flow using the existing sample conversations, and keep the selected guest's details visible in the desktop workspace, including the current 1203px-wide preview.

## Conversation experience
- Keep the sample conversations as temporary front-end data, resetting on refresh.
- Make conversation selection, replies, internal notes, resolve and reopen, assignment, move to inbox, mark unread, mark as spam, and delete work together without leaving stale selections or empty panels.
- Complete the create-conversation, status filter, and custom-filter flows with clear demo results.
- Make the header actions demonstrable: call, video, block, transcript email/download, copy link, edit subject, and next/previous navigation will provide visible feedback or a suitable demo dialog instead of silent controls.
- Preserve each selected conversation's updated information throughout the current browser session.

## Guest details layout
- Show the selected guest details as a permanent right column on desktop, starting at the desktop breakpoint so it remains visible at 1203px.
- Remove the desktop collapse/open control and overlay behavior at those widths.
- Balance the conversation list, transcript, and guest column widths so all three remain readable without blank spacing or overlap.
- Keep the existing phone and tablet drill-in layout usable, with guest details available from the conversation view where four side-by-side columns cannot fit.
- Immediately update the details column when another conversation is selected.

## Verification
- Exercise the complete demo flow from inbox filtering through selecting, updating, replying to, moving, and deleting a conversation.
- Confirm all header actions produce a visible demo result.
- Check phone, tablet, 1203px desktop, and wide desktop layouts for clipping, overlap, and accessible controls.
- Confirm the project build remains healthy.

## Technical details
- Changes stay within the chat front end and its typed demo-data layer. No database, login, or external call/video service is added.
- Reuse the existing dialogs, menus, buttons, and notification patterns rather than adding a second interaction system.
