# Contacts advanced filter panel

## Goal
Replace the centered Create filter popup with the right-side Advanced Filter panel shown in the reference.

## Changes
- Open a full-height panel from the right when **Create filter** is clicked.
- Match the reference structure: Advanced Filter header, collapse control, close button, editable **Filter 1** title, and a removable criterion row.
- Add the criterion picker with search and grouped contact fields, including email, custom data, language, country, segments, full name, and gender.
- Let users add and remove criteria, then configure a selected criterion with an operator and value.
- Keep **Cancel** and **Save Filter** fixed at the bottom. Disable saving until the filter has a valid name and complete criterion.
- Save created filters for the current demo session and list them under the Contacts sidebar Filters section.
- Keep the panel usable on desktop, tablet, and phone, using the full available width on smaller screens.

## Verification
- Confirm Create filter opens the panel and close, collapse, Cancel, criterion search, remove, and Save Filter work.
- Confirm saved filters appear in the sidebar and can filter the demo contacts.
- Check the layout and controls at phone, tablet, and desktop sizes.
