# Contact preview and profile plan

## Goal
Match the four references when a contact is previewed, then open a full contact profile from the panel while keeping the existing Contacts table and navigation intact.

## Contact preview panel
- Replace the current simple summary with a right-side panel matching the reference width, spacing, header, close control, and independent vertical scrolling.
- Add the blue location map header with a contact pin, contact name, last-active value, and **Send a message** action.
- Add structured cards in the same order and visual style:
  1. Contact Information, including name, email, phone, address, website, creation date, last update, gender, and notifications.
  2. Segments, including existing tags and a segment-contact control.
  3. Company Account Works For, including company, job title, job role, website domain, city, country, and employees.
- Keep **Copy link** and **Open profile** fixed at the bottom while only the panel content scrolls.
- Use each selected contact's demo values and sensible empty prompts where data is unavailable.

## Full contact profile
- Add a dedicated contact profile page opened by **Open profile**, using the selected contact identifier in the URL.
- Keep the chat workspace navigation and Contacts active state, then add the breadcrumb, avatar, contact name, activity, country indicator, message, new conversation, call, and more actions shown in the reference.
- Recreate the three-column profile layout:
  - Left: location map, Contact Information, Segments, and Company Account Works For.
  - Center: Data, Conversations, recently browsed pages, Campaigns, and the yellow Private Notepad.
  - Right: Last Reported Location, Recent Events, and Rating Scores.
- Match card borders, compact labels, empty states, controls, and section headers from the reference.
- Keep demo actions interactive with confirmation messages and keep profile edits or notes in memory for the current session only.

## Demo data and navigation
- Extend the typed contact demo records with profile fields needed by both views, including timestamps, profile details, location data, and optional company information.
- Reuse one shared profile-card presentation so the preview panel and full profile remain visually consistent.
- Provide a safe not-found state for an unknown contact URL with a clear return to Contacts action.
- Keep all work front-end only, with no database, authentication, or API changes.

## Responsive behavior
- Desktop: open the preview as a right overlay above the table and display the full profile in the three-column arrangement.
- Tablet: preserve the full-height preview and reorganize the profile into two columns without clipping controls.
- Phone: use a full-width preview and stack the profile sections in reference order with horizontally safe actions.

## Verification
- Test Preview, panel scrolling, close, Copy link, Send a message, and Open profile with multiple contacts.
- Test the profile URL directly and through the panel, including missing contacts.
- Check phone, tablet, the current 1203px viewport, and wide desktop for overflow, fixed footer visibility, and readable cards.
- Confirm the Contacts table and existing Actions, Import, Export, New Contact, filters, and sidebar links still work and the build remains successful.
