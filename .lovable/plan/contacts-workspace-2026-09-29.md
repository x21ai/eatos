# Contacts Workspace

## Goal
Create a public `/chatapp/contacts` page that closely matches the attached contacts dashboard and connects it to Contacts in the main chat sidebar. Use realistic typed demo data only, with no database or authentication changes.

## Sidebar and navigation
- Turn Contacts into a real link to `/chatapp/contacts`, with active styling on the Contacts page.
- While Contacts is active and the main sidebar is expanded, show its nested `Filters` area and `Create filter` action beneath the Contacts row, matching the reference.
- Preserve the existing collapsible desktop sidebar and compact mobile chat header.

## Contacts page
- Build the full-height table workspace shown in the attachment.
- Add the top toolbar with the contact count, search field, filter control, Documentation button, New Contact button, and Actions menu.
- Add a dense, scrollable contacts table with selection checkboxes and these columns: Full Name, Email, Phone, Location, Company, Segments, Last Activity, and Preview.
- Use realistic demo contacts with initials avatars, country flags, truncated long values, unknown states, segment tags, and varied activity dates.
- Keep the table header visible while scrolling and preserve the compact borders, spacing, typography, and pale-blue Preview buttons from the reference.

## Demo interactions
- Search contacts by name, email, location, company, or segment.
- Filter the displayed rows and allow a named sidebar filter to be created for the current demo session.
- Open New Contact in a centered form with name, email, phone, location, company, and segment fields, then add the contact to the table in memory.
- Support row selection, select-all, and an Actions menu for demo bulk operations.
- Open Preview as a right-side contact panel with the selected contact’s profile and core details, without leaving the page.
- Use browser-native menus and popovers where practical so the key controls still open in the current preview environment.

## Responsive layout
- Desktop: retain the full main sidebar and wide horizontally scrollable contacts table.
- Tablet: keep the sidebar compact and let the table scroll horizontally without squeezing columns.
- Phone: show a compact contacts toolbar and readable contact rows, with secondary fields available through the Preview panel.
- Prevent overlapping controls and verify the layout at 390px, 834px, 1203px, and 1280px widths.

## Technical details
- Add a typed local contacts data module and focused Contacts workspace component beside the existing chat prototype files.
- Add the `/chatapp/contacts` page with page-specific noindex metadata consistent with the other public chat-building pages.
- Reuse the existing chat shell, semantic design tokens, Button controls, and current demo interaction patterns.
- Do not add persistence, APIs, authentication, or database work.

## Verification
- Confirm Contacts in the sidebar opens `/chatapp/contacts` and remains highlighted.
- Test search, filter creation, new-contact creation, selection, bulk actions, and contact preview.
- Confirm the table scrolls cleanly and all controls remain visible on phone, tablet, and desktop.
- Confirm the project build completes without errors.
