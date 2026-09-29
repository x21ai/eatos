# Make All, Filters and New conversation open again

## Why they don't open
The chat preview never fully "wakes up" its interactive scripts, so these three controls look right but ignore clicks. The three-dot "…" menu had the same problem and was fixed by switching it to the browser's own built-in open/close behavior. That fix was never applied to these three.

## Changes
- **All dropdown:** rebuild as a browser-native dropdown. It opens under the button with the same 8 options, grouping and icons. Choosing an option filters the list and shows the choice on the button.
- **Filters dropdown:** rebuild the same way. It keeps the "No custom filters" empty state, saved filters, "Clear custom filter" and the pink "New custom filter..." button.
- **Advanced Filter and Create a new conversation popups:** switch to the browser's built-in popup window. They keep the same layout, required fields, disabled Done/Create buttons, Cancel, Escape to close, and scrolling on small screens.
- Opening one menu closes the other, and clicking outside closes them.
- Menus stay fully on screen on phone, tablet and desktop.

## Verification
- In the preview at 1203px, 834px and 390px, click each control and confirm it opens. Pick a status, create a custom filter and create a conversation.
- Confirm the build is clean and the "…" menu and guest sidebar still work.

## Technical details
- In `ConversationToolbar.tsx`, replace the Radix `DropdownMenu` with `<details>/<summary>` panels. Replace the Radix `Dialog` with native `<dialog>` using `showModal()`, plus a small inline script fallback where needed. The Select fields inside the filter builder become native `<select>`.
- Set panel widths with explicit rem values, such as `w-[15rem]`, because of the `--spacing: 0.19rem` override. Use z-50 so the panels sit above chat bubbles.
