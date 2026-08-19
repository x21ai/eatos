# Why switch section: desktop balance and type consistency

Only desktop (`lg:` and up) changes. Tablet and mobile stay exactly as they are.

## What feels off today
On wide screens the left rail (label, heading, paragraph, image) is narrower than the numbered list but sits flush left inside a full-width container, so the whole block reads as pulled to the left with a wide empty gutter on the right. The heading is also capped at 16 characters per line, which makes it stack oddly next to the much wider list.

## What changes

1. Balance the two columns
   - Wrap the section content in a centered max-width shell (about 1200px) so the block sits optically centered instead of hugging the left edge.
   - Move the desktop column ratio from 0.85fr / 1.15fr to an even 1fr / 1fr split, and reduce the desktop column gap so the list starts closer to the rail.
   - Add a small left offset to the numbered list on desktop so the number gutter aligns with the rail text baseline rather than floating.

2. Make the type match the rest of the site
   - Left heading: same scale as other section headings on desktop (`lg:text-5xl`), keeping `font-bold tracking-tighter`.
   - Remove the `max-w-[16ch]` clamp on desktop so the heading wraps naturally over two lines.
   - Intro paragraph: step up to the site's standard `text-base lg:text-lg` body size with matching leading, and widen its max width slightly.
   - List item titles: bump to `lg:text-2xl` so they read as real sub-headings rather than near-body text.
   - List item bodies: `text-base leading-8` on desktop to match the intro paragraph and other feature copy.
   - Keep the "Learn more" links at `text-sm font-semibold` emerald, unchanged.

3. Rhythm
   - Slightly increase desktop vertical padding between list rows so the taller type does not feel cramped, and keep the top divider behaviour intact.

## Technical notes
All edits are in the `WhySwitch` component inside `apps/web/src/app/comparison/ComparisonClient.tsx`. Changes are Tailwind class-only, scoped with `lg:` prefixes where they must not affect smaller breakpoints. No content or data changes.
