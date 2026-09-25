# Replace Indian menu items in every KDS animation

Update every Kitchen Display System animation used across the website so its visible menu reads like a US restaurant menu.

## Menu replacements

- Samosa → Mozzarella Sticks
- Tamarind chutney → Marinara sauce
- Prawn Curry → Grilled Shrimp
- Chicken Biryani → BBQ Chicken Plate
- Medium spice → BBQ sauce
- Raita → Ranch
- Butter Naan → Garlic Bread
- Mango Lassi → Vanilla Shake

Existing neutral US-facing items such as Steamed Rice, Soup of the Day, Chicken Wrap, Onion Rings, Iced Tea, Bruschetta and Calamari remain unchanged.

## Shared KDS animation

- Update the editable KDS scene so every affected ticket, modifier and translated item label uses the replacement menu text.
- Preserve the current light login screen, eatOS logo, timing, interactions, ticket states, dimensions and visual styling.
- Re-render the complete animation and regenerate its MP4, WebM and poster image.
- Replace the shared media references used by the main homepage, alternate demo layouts and the Kitchen Display System product page. This updates every page that reads the shared KDS animation without duplicating it.

## Separate `/homepage1` animation

- The `/homepage1` showcase uses its own KDS video rather than the shared animation.
- Replace any Indian menu names visible in that clip with the same US menu names while preserving its existing login sequence, dark interface, timing and dimensions.
- Regenerate and replace its MP4, WebM and poster image so `/homepage1` is covered as well.

## Verification

- Inspect frames throughout both rebuilt videos to confirm no Indian product names remain.
- Verify the KDS animation on the main homepage, `/homepage1`, and the Kitchen Display System page.
- Check playback, framing and text clarity at phone, tablet and desktop widths.
- Confirm both browser video formats load and the site remains error-free.
