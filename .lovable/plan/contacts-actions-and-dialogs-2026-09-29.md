# Contacts actions and dialogs

## Goal
Update the Contacts toolbar and dialogs to closely match the four references, while keeping every control usable in the demo workspace.

## Actions menu
- Replace the current selected-contact actions with a compact menu containing exactly:
  - Export contact profiles
  - Import contact profiles
- Match the reference alignment, icons, row height, border, shadow, and open chevron state.
- Keep the menu anchored below the Actions button without clipping at desktop, tablet, or phone widths.

## Export contacts
- Open a centered confirmation dialog titled “You are going to export your contacts.”
- Explain that all contacts will be exported, or only filtered or selected contacts when applicable, and that completion will be confirmed by email.
- Include Learn more, Cancel, and a blue Export Contacts button.
- Make Cancel and Export Contacts close the dialog, with export showing clear demo confirmation. No file or email service will be added.

## Import contact profiles
- Open the large import dialog shown in the reference with:
  - Title and close button
  - Three-step progress header: Select File, Configure Import, Proceed Import
  - CSV upload area supporting file picker, drag and drop, and paste guidance
  - Learn more and sample CSV download links
  - Continue button disabled until a CSV is selected
- Make the three-step demo flow functional: select a CSV, review detected columns, confirm the import, then show a completion state and add valid demo contacts for the current session.
- Validate CSV type and required full-name and email fields with visible feedback.

## New Contact
- Simplify the dialog to match the reference exactly: Name of the Contact and Email of the Contact only.
- Use the same field sizing, placeholders, required indicators, centered dialog proportions, dim backdrop, Cancel button, and pale disabled Add Contact button.
- Enable Add Contact only when both fields are valid, then add the contact to the table for the current session and close the dialog.

## Responsive and verification
- Preserve the existing Contacts table, search, filters, contact preview, and sidebar navigation.
- Keep all dialogs fully visible and scrollable on phone, tablet, 1203px desktop, and wide desktop layouts.
- Use browser-native popup and form behavior so opening, closing, file selection, and submission remain reliable in the preview.
- Verify Actions, Export, Import, New Contact, Cancel, close, validation, and completion states, then confirm the project build remains successful.

## Scope
- Front-end demo behavior only. Contacts and imports reset when the page reloads.
- No database, email delivery, or external import/export service changes.
