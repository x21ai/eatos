# Footer contact cards and Products dropdown order

## 1. Footer: contact icons inside the Sales box

Move the four contact icons (WhatsApp, SMS, Messenger, chat) from below the Sales card into the Sales card itself, sitting under the phone number as a small icon row separated by a subtle top divider. Because the card is a link, the icon row becomes a sibling block inside a wrapper so each icon stays independently clickable.

## 2. Footer: make both boxes the same size

The Support and Sales boxes currently size themselves independently, so they end up different heights. Both cards will stretch to equal height in the two-column row, with the label/title at the top and the action line pinned to the bottom of each card, so they read as a matched pair on desktop and stack cleanly on mobile.

## 3. Header: move "Hardware" last in the Products dropdown

Reorder the products list so Hardware appears as the final item in the dropdown, after Autonomous Delivery. Mobile menu grouping keeps working as is; only display order changes.

## Technical notes

- `apps/web/src/components/Footer.tsx`: change the card grid from `items-start` to stretched equal-height cells, wrap the Sales card so the `CONTACT_CHANNELS` row renders inside the card surface (link wraps only the top content), keep `socialClass` styling for icons.
- `apps/web/src/components/Header.tsx`: move the `/hardware` entry to the end of the `productLinks` array.
- Verify at 390px, 768px, and 1280px that both boxes match in height and every icon is clickable.
