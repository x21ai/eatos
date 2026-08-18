# Mobile Polish: Tabs, Social Proof, Solution Cards, Newsletter

## 1. "How it Works" tabs as buttons on mobile
File: `apps/web/src/app/components/LiveDemoSection.tsx`

The six demo tabs currently sit in a single flex row that wraps awkwardly on a phone. Change the tab strip to a 2-column grid of full-width pill buttons on mobile (3 columns at `sm:`), returning to the current single inline row from `md:` up. Each button gets equal width, centered label, comfortable tap height (44px min), and keeps the active white-on-black state. Desktop and tablet appearance stays as it is today.

## 2. "Built for restaurants of every size" section
File: `apps/web/src/app/page.tsx`

- Stats row (99.9% / $300M+ / 24/7): keep the stacked-with-dividers layout but reduce mobile figure size and tighten vertical padding so the three items read as one compact block instead of a tall stack.
- Client names row: names are currently forced onto one nowrap line at 10px, which is unreadably small. On mobile switch to a centered wrapping list at a legible size (about 13px) with dot separators, allowing 2 to 3 lines. From `md:` up keep today's single-row treatment.

## 3. Solution cards text size
File: `apps/web/src/app/page.tsx` (Service Modes section)

Card body copy is 12px and the checklist 11px. Raise description to about 14px and bullets to about 13px with slightly looser line height, and bump the card title one step on mobile. Padding grows slightly so the larger text still breathes. Card image ratio and 4-up desktop grid unchanged.

## 4. Newsletter form
File: `apps/web/src/components/NewsletterSection.tsx`

- Make the email input the same height as the Subscribe button at every breakpoint (48px on mobile, 44px from `sm:`), so the stacked mobile pair looks matched, and let the input fill the available width.
- Reduce the description size one step (base to small on mobile, large to base on desktop) and tighten its max width.

All four changes are presentation only, in mobile-first classes, and leave desktop/tablet layouts visually as they are.
