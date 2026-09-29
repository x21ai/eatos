# Match the conversation More menu

## Goal
Rebuild the selected three-dot conversation menu on `/chatapp` so it visually and functionally matches the attached reference.

## Changes
- Keep the menu anchored below the three-dot button and left-aligned with it.
- Match the reference width, compact row heights, white surface, subtle border and shadow, and small corner radius.
- Present the actions in the same order and groups:
  1. Mark as unread
  2. Copy link
  3. Set Subject
  4. Transcript, with a right-facing submenu arrow
  5. Move to inbox, with a right-facing submenu arrow
  6. Next, with `Ctrl`, `Alt`, and up-arrow key badges
  7. Previous, with `Ctrl`, `Alt`, and down-arrow key badges
  8. Mark as spam
  9. Delete conversation in red
- Use the matching action icons, separators, text emphasis, alignment, and keyboard-key styling shown in the reference.
- Preserve and verify the existing demo behaviors for unread, copying, subject editing, transcript actions, moving, navigation, spam, and deletion.
- Ensure submenu panels remain within the screen and are usable at desktop, tablet, and phone widths.

## Verification
- Open the menu from an active conversation and compare it against the reference.
- Test each direct action and both nested submenus.
- Confirm keyboard navigation, focus states, and Escape dismissal.
- Check the menu at phone, tablet, 1203px desktop, and wide desktop widths with no clipping.
