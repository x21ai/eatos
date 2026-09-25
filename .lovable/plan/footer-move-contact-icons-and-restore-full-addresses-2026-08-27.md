# Footer: Move Contact Icons and Restore Full Addresses

## 1. Move the contact channel icons

Currently the WhatsApp / Text Message / Messenger / Chat icon row sits in the left brand column, directly under the social icons.

Move that row out of the brand column and place it in the right-hand card area, directly below the "Sales / Book a personalized demo / +1 (844) 563-2867" card, so it fills the empty space under the two contact cards. The social icon row stays where it is under the logo.

Same icons, same links, same circular styling. On mobile the row still wraps normally.

## 2. Restore the office addresses

The `OFFICES` array lost its second address line and the city labels lost their bold styling. Restore both:

- Cupertino, CA
  - 20289 Stevens Creek Blvd PH 1019,
  - Cupertino - California - 95014.
- Miami, FL
  - 1111 Brickell Ave FL 10,
  - Miami - Florida - 33131.
- Los Angeles, CA
  - 750 N. San Vicente Blvd Ste 800
  - Los Angeles, California - 90048.

City labels render semibold in white; both address lines render on their own lines in the lighter gray.

## Technical notes

- Only `apps/web/src/components/Footer.tsx` changes.
- Re-add the `state` (second line) field to each `OFFICES` entry and render it; make `officeCity` semibold white.
- No em dashes; the hyphens in the address copy are regular hyphens.
- Verify desktop (1280px) and mobile (390px) rendering after the edit.
