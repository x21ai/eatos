# Inbox navigation alignment

## Goal
Show the Inbox groups and links directly beneath Inbox in the main chat sidebar, matching the supplied reference.

## Changes
- Move Main Inbox, Assigned to me, New sub-inbox, Automated, and Spam into the main sidebar under Inbox.
- Keep the groups visible while Inbox is active and hide their labels when the sidebar is collapsed.
- Remove the separate desktop Inbox sidebar so the conversation list starts immediately beside the main sidebar.
- Keep the compact inbox selector on tablet and mobile.

## Verification
- Check `/chatapp` on phone, tablet, and desktop.
- Confirm each Inbox option filters the conversation list and the active option is highlighted.
- Confirm collapse and expand remain usable and no panels overlap.
