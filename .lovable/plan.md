# Rebuild /pricing on the shared site template

## Why it looks different today
The pricing page was built as a one-off from a reference screenshot (light gray background, white cards, black header strips), while every other page (home, Point of Sale, accept-payments, solutions) uses the dark editorial template: black background, orange accent, Montserrat type, shared container spacing. The content is fine; only the styling is off-brand.

## What gets changed
Restyle `/pricing` (apps/web/src/app/pricing) to match the shared template, keeping all existing content and rates:

**1. Hero**
- Dark hero matching other pages: eyebrow label, "Simple Pricing" headline, short supporting line, Book a Demo primary CTA.

**2. Rate cards**
- "$0 Upfront Hardware Cost" (2.99%+15¢) and "Build your Own Bundle" (2.59%+15¢) as dark cards with white borders, orange rate highlight, Book a Demo buttons, footnote text preserved.

**3. "Your Price" quote panel**
- "We will beat it" intro copy plus the black quote panel ("Any Point of Sale or Payment Processing Quote", 6 bullet points, Learn More) restyled as a single dark section consistent with other pages' feature blocks.

**4. FAQ**
- "Questions?" section kept, restyled to the dark accordion/typography style used on other pages.

**5. Consistency details**
- Same site-container side padding, section spacing, heading sizes, and border/hover treatments as the Point of Sale and accept-payments pages.
- Header shows white-on-dark variant; footer unchanged.
- Responsive across mobile, tablet, desktop.
- No copy changes, no rate changes, no em dashes.

## Technical notes
- Edit only the pricing page files; no other pages touched.
- Verified with screenshots on desktop and mobile after the change.
