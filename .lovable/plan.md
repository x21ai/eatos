# Email settings pages

## Goal
Turn **Email** into a collapsible Settings group with these sublinks:

1. Email Behavior
2. Domains
3. Email Delivery

Each link will open a focused page matching the corresponding reference image and remain usable on desktop, tablet, and mobile.

## Page content

### Email Behavior
- Page heading and automatically-saved status.
- General Options panel with toggles for conversation transcripts, ratings, tracking pixels, and possible spam delivery.
- Custom Email Signature panel with its disabled status and unavailable toggle state.

### Domains
- Basic email domain field using eatOS wording and an online status.
- Custom domain field.
- Setup Instructions panel with the current domain status and domain verification action.
- Use demo domain values only, without performing DNS changes or verification.

### Email Delivery
- Outbound Email IPs explanation and reputation status.
- Shared email pool summary and dedicated IP installation action.
- Custom Email SMTP panel with its inactive status and disabled toggle.
- Replace reference-brand wording with eatOS wording.

## Navigation and behavior
- Make Email expand and collapse like Account, Workspace, and Chatbox.
- Use `?category=email&section=...` so each Email page can be refreshed or shared directly.
- Default Email to **Email Behavior**.
- Add a compact horizontal Email subpage navigation on tablet and phone.
- Keep controls as local demo interactions only. No email service, domain verification, SMTP connection, DNS update, or permanent saving will be added.

## Technical details
- Add a typed Email settings component containing the three focused screens.
- Extend the Settings page section parsing and navigation to support `behavior`, `domains`, and `delivery`.
- Reuse the existing dark Chat App styling, semantic controls, cards, status labels, and responsive patterns.
- Update the project architecture note for the Email section query convention.

## Verification
- Open all three pages at desktop, tablet, and phone sizes.
- Confirm sublinks, toggles, fields, and actions display correctly without horizontal overflow.
- Confirm direct links preserve the selected Email page and the project still builds successfully.
