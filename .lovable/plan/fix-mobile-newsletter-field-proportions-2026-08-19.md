# Fix mobile newsletter field proportions

## Changes
- Update only the mobile newsletter form in `NewsletterSection.tsx`.
- Increase the email field from 56px to 64px so the input has a substantial, easy-to-tap height.
- Reduce the Subscribe button from 56px to 52px so it remains prominent without overpowering the field.
- Keep both controls full width, preserve the existing spacing and rounded styling, and leave tablet and desktop sizing unchanged through the current `sm:` overrides.

## Verification
- Check the newsletter at the current 394px mobile viewport to confirm the email field is visibly taller than the button and neither control clips or overflows.
- Confirm tablet and desktop retain their existing layout and dimensions.
