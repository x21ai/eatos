# Match the guest details sidebar reference

## Goal
Rebuild the right-side guest details panel to match the attached reference while preserving the existing demo conversation data and actions.

## Changes
- Restyle the profile summary with the large avatar, status indicator, name, verified email, location, and full-width blue profile button shown in the reference.
- Replace the expanded stacked blocks with compact, full-width accordion rows separated by subtle dividers.
- Make every section independently expandable and collapsible, with a right-side chevron that reflects its state.
- Show the reference sections in this exact order:
  1. Conversation Routing
  2. Main information
  3. Visitor device
  4. Conversation participants
  5. Quick jump
  6. Segments for conversation
  7. Custom data
  8. Last profile events
  9. Private notepad
  10. Videosupport
  11. Bot (Beta)
  12. Message Scheduler
  13. Ask Rating
  14. Hugo
- Keep the existing routing selector, visitor information, device details, participant Add action, and quick-jump state inside their corresponding expanded sections.
- Add suitable demo content or an empty-state message inside the newly introduced sections so each accordion works as part of the sample-data experience.
- Keep the sidebar scrollable and fixed on the right in desktop conversation view. Preserve the existing smaller-screen details presentation, with the same accordion layout and no clipped content.

## Technical details
- Extend the existing reusable details-section control rather than duplicating markup for each row.
- Use the current semantic design tokens and existing button/icon components.
- Preserve the typed local conversation source and all existing chat actions.
- Verify the profile header, accordion order, collapse/expand behavior, scrolling, and selected-conversation updates at phone, tablet, 1203px, and wide desktop sizes.
