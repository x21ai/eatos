# Site-wide copy and design consistency pass

Short answer: mostly, but not everywhere. I audited every route under the web app. Em
dashes are gone from real page copy, but a handful of pages still break the shared rules
for punctuation, headings, spacing rhythm and color usage. Below is what I found and what
I would fix.

## 1. Punctuation

Still to fix in visible copy:

- Kiosk hardware copy uses an en dash in a size range (22"-27").
- The dev-only sign-in shim page uses an em dash in a status line.

Everything else flagged by the scan is inside code comments in platform files marked "do
not rewrite", so those stay untouched.

## 2. Headings

The site standard is sentence case, `font-bold tracking-tighter`, with responsive size
steps. Outliers to bring in line:

- All eight `/solutions/*` category pages plus Partners, Book a Demo, Get Started and Shop
  use `tracking-tight` instead of `tracking-tighter`.
- Blog index and blog post use CSS clamp sizing instead of the shared size steps.
- The homepage2 hero uses a raw letter-spacing value instead of the utility.
- The 404 page heading uses `font-medium` instead of bold.
- Food Truck heading style ("Mobile. Powerful. Reliable.") differs from its sibling
  solution pages; I will align it to the sibling voice unless you want the punchy version
  kept.

Legal pages keep Title Case titles (Privacy Policy, Terms of Service), which is correct.

## 3. Bold and emphasis

This is already consistent: bold is only used for the eatOS brand name in body copy, and
there are no stray bold tags. One decorative extra-heavy numeral on the homepage2
switching section gets normalized to the weights used elsewhere.

## 4. Section spacing rhythm

Three conventions coexist today: static tall padding, static medium padding, and the newer
responsive pattern used by all recently redesigned pages. Two files even mix conventions
internally (Comparison, Quick Service). I will standardize marketing sections onto the
responsive pattern so vertical rhythm reads the same on mobile, tablet and desktop.

## 5. Color usage

About ten public pages hardcode raw hex color classes (off-white section backgrounds, near
black panels, a dark text gray) instead of the shared scale. I will replace those with the
site's existing gray/black/white classes so light and dark sections match exactly. Admin
tooling pages keep their own internal palette; they are not public marketing pages.

## 6. Design principle applied

Per the guidance you attached: consistency is the point, not sameness. I will not flatten
the distinct hero treatments that give pages their character. The pass only removes
accidental drift: punctuation, heading weight and tracking, spacing rhythm, and stray hex
colors.

## Verification

Every changed page checked at mobile, tablet and desktop widths, plus a production build.

## Not doing

No new layouts, no new imagery, no rewriting of page messaging beyond the punctuation and
heading-case items listed above.
