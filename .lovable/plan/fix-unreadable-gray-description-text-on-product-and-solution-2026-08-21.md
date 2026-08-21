# Fix unreadable gray description text on product and solution pages

## Problem
On product and solution pages, body copy, feature descriptions, and secondary labels use `text-gray-400` / `text-gray-500` / `text-zinc-400` / `text-zinc-500` against dark (`bg-black`, `bg-white/5`) backgrounds. At the current font size and contrast, the descriptions are too dim and hard to read.

## Goal
Make all description/body text on dark product and solution pages clearly readable by switching it to white (or near-white) while preserving hierarchy and any intentional gray iconography.

## Scope
- Product pages: `apps/web/src/app/products/**/*.tsx`
- Solution pages: `apps/web/src/app/solutions/**/*.tsx`
- Shared product detail template: `apps/web/src/app/products/[slug]/ProductDetailClient.tsx`
- Out of scope: light-background pages, headers, footers, icon-only gray accents, and comparison pages unless requested.

## Proposed changes

### 1. Color mapping
Apply a consistent replacement rule:

| Current utility | Context | Replace with |
| --- | --- | --- |
| `text-gray-400` / `text-zinc-400` | Hero descriptions, feature body, card copy, taglines | `text-white/90` |
| `text-gray-500` / `text-zinc-500` | Labels, stat captions, secondary/supporting text | `text-white/70` |
| `text-gray-300` / `text-zinc-300` | Already light; leave unless it appears muddy | review case-by-case |

Leave pure iconography (e.g., `Package size={32} className="text-gray-500"`) unchanged unless the icon is meant to be readable body text.

### 2. Files to touch
Bulk update the following patterns in every product/solution client file and the shared template:

- Hero descriptions: `text-gray-400` -> `text-white/90`
- Stat labels: `text-gray-500` -> `text-white/70`
- Feature rows body text: `text-gray-400` / `text-gray-500` -> `text-white/90` / `text-white/70`
- Why/spec card copy: `text-gray-400` -> `text-white/90`
- CTA section descriptions: `text-gray-300` / `text-gray-400` -> `text-white/90`
- Breadcrumbs: `text-gray-500` -> `text-white/70` (keep hover white)
- Product detail template related card taglines: `text-gray-500` -> `text-white/70`

### 3. Verification
- Run a targeted search after edits to confirm no `text-gray-400` or `text-gray-500` remains on product/solution description text.
- Run `tsc --noEmit` / Next.js build to catch className typos.
- Use Playwright to screenshot a representative sample (e.g., `/products/point-of-purchase`, `/products/self-service-kiosk`, `/solutions/quick-service`, `/solutions/full-service`) at desktop and mobile to confirm descriptions are readable.

## Estimate
This is a single sweep of text-color utility replacements across a known set of files. No new design, images, or components needed.
