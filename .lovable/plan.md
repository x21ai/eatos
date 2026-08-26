# Black theme for the Get Started page

The Get Started wizard is currently the only white-background page in an otherwise black site. Convert it to the site's black theme while keeping the two-step flow, spacing, and HubSpot embed behaviour unchanged.

## What changes

Step 1 (industry selection)
- Page shell, sticky header, and footer move to black backgrounds with white/near-white text.
- Step counter, headings, and description copy use white and near-white gray instead of dark grays.
- Industry cards become dark surfaces with subtle white borders; the selected card gets a white border plus a light dark-tinted surface, and its icon tile and check badge invert to white-on-black styling that reads correctly on black.
- Progress bar track becomes a faint white line with a white fill.
- Continue button becomes white with black text when enabled, and a muted dark surface when disabled.

Step 2 (booking)
- Back link, heading, and intro copy switch to white and near-white gray.
- Trust-point icon tiles switch from pastel tints to dark translucent tiles with brighter accent icons so they stay legible on black.
- Terms and Privacy links become white underlined links.
- Testimonial card becomes a dark translucent panel with near-white italic copy and a dark avatar chip.
- The HubSpot embed stays full width and untouched in behaviour; only the surrounding surface changes.

Consistency
- Divider and border colours use the lighter white opacity already used in the footer so lines are visible on black rather than nearly invisible.
- Text tone follows the existing rule: white for headings, one notch below white for body copy, no dark gray on black.

## Technical notes

- Single file: `apps/web/src/app/get-started/page.tsx`. It is a client component with all styling inline via Tailwind classes, so this is a class-level swap, no structural refactor.
- Keep the shared `site-container` padding already applied to the header and main content.
- No copy changes, so the em-dash copy guard stays green; will re-run it plus a quick narrow and desktop viewport check of `/get-started` after the edit.
