# Conversation toolbar controls

## Goal
Replace the conversation search field with the reference-style status dropdown, then add working filter and new-conversation flows matching the supplied screenshots.

## Toolbar
- Replace the search field with an **All** dropdown.
- Include: All, Unread, Pending, Unresolved, Resolved, Mentions, Most Recent, and Longest Waiting.
- Apply each option to the current conversation list, with the selected option shown in the trigger.
- Keep the Filter and plus controls beside it, using the same compact layout on desktop, tablet, and mobile.

## Custom filters
- Open a dropdown from **Filters** showing saved custom filters or the empty state from the reference.
- Add **New custom filter...** to open an **Advanced Filter** popup.
- Include the required filter label, an empty filter-builder state, **New Filter**, and disabled **Done** state.
- Let **New Filter** add editable condition rows for conversation state, inbox, assignee, and visitor email.
- Enable **Done** only when the label and at least one valid condition are present.
- Save the custom filter in temporary page state, list it in the Filter dropdown, and apply it when selected.

## New conversation
- Open a **Create a new conversation** popup from the plus button.
- Include channel selection, required email address, optional name, participant rows, and subject.
- Validate the required email and keep **Create Conversation** disabled until valid.
- On submit, add and select a temporary conversation in the current list, then open its chat view.

## Responsive and interaction details
- Use the existing dialog and dropdown controls for keyboard focus, Escape, outside-click, and accessible labels.
- Size both popups for desktop while allowing full-width, scrollable layouts on phone and tablet.
- Keep all data temporary, consistent with the current front-end prototype, so refresh restores the sample state.

## Verification
- Test every status option, the custom-filter creation flow, and new-conversation creation.
- Confirm menus and popups do not clip or overlap at phone, tablet, and desktop widths.
- Confirm the app remains error-free and the existing inbox, transcript, and visitor details continue working.
