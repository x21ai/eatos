# Get Started step 2: full-width booking layout

Goal: step 2 stops looking cramped. The HubSpot meetings embed spans the full content width, exactly like the Book a Demo page, and the supporting content that currently sits in a left column moves above the form as a clean, centered intro block.

## What changes

1. Remove the two-column grid on step 2. The step becomes one stacked column inside the shared `site-container`, widened from `max-w-4xl` to the same width the booking page uses so the embed has room.
2. New order, top to bottom:
   - Back to Industry link (unchanged)
   - Heading "Book your meeting" plus the industry-aware subline, centered
   - The three trust points (48 hour setup, no contracts, 24/7 support) as a centered 3-across row on desktop, stacking on mobile, and visible on mobile too instead of hidden
   - The HubSpot meetings embed, full width
   - Terms and Privacy note under the embed (unchanged)
3. The "You're in good company" paragraph merges into the intro copy so there is only one heading at the top of the step. The David Kim testimonial card moves below the terms note as a single centered quote card, so it supports rather than competes with the form.
4. Step 1 (industry picker), the header, progress bar, and footer stay as they are.

## Technical notes

- Only `apps/web/src/app/get-started/page.tsx` changes; no logic, state, or HubSpot script handling is touched.
- Trust items become a small array rendered in a grid, keeping the existing icons and colored icon tiles.
- Verification: view step 2 at 390px, 768px, and 1440px and confirm no horizontal overflow and the embed fills the container width.
