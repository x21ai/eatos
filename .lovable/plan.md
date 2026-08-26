# Blog: 5 static posts from your screenshots

Replace the current blog data set with exactly the five posts shown in the screenshots, keeping the existing black blog layout, cards, category filter and article template untouched.

## What changes

The blog currently lists 8 static posts. Three of them are not in your screenshots and will be removed:

- How Much Does It Cost to Implement a Point of Sale System?
- 6 Must-Have Features in the Best Fast Casual Point of Sale Systems
- 8 Online Ordering and Delivery Challenges Restaurants Face

The remaining five are rewritten so their titles, dates, sections and body copy follow the screenshots:

1. Never Miss a Beat: How Offline Resilience Keeps Your Sales Rolling with edgeOS (Nov 19, 2026)
2. Empower Your Restaurant Team with Simplified Workforce Management (Nov 14, 2026)
3. 10 Tips to Enhance Your Restaurant Analytics and Reporting System (Feb 16, 2026)
4. How Tableside Ordering and Payment Enhances Restaurant Service and Increases Sales (Nov 2026)
5. The Complete Guide to Restaurant Inventory Management (Jan 2026)

Each post keeps: eatOS Staff byline, date, category chip, hero image, section headings, paragraphs and bullet lists, related-posts row at the bottom.

## Copy handling

Body copy is written from the screenshot content, section by section, in the existing house voice: no em dashes, "Point of Sale" spelled out, "eatOS" and "edgeOS" cased correctly. Where screenshot text is too small to read reliably, the section is written to match its visible heading and intent rather than invented as a new topic.

## Images

The five existing blog hero assets already map to these five topics and stay in place. Screenshots are used as content reference only, not embedded. If you want the exact brochure-style cover images from your live site, upload those five image files and they get swapped in.

## Category filter

Categories are trimmed to the ones the five posts actually use, so no empty filters appear: All Posts, Point of Sale, Workforce Management, Inventory Management, Tableside Ordering.

## Technical notes

- Single file edit: `apps/web/src/app/blog/content.ts` (the `posts` array plus the `categories` list).
- `BlogIndexClient.tsx`, `[slug]/BlogPostClient.tsx` and `[slug]/page.tsx` need no changes; `generateStaticParams` and related-posts logic derive from `posts`.
- Slugs stay the same for the five kept posts, so existing links and the sitemap keep working; the three removed slugs disappear from the static export.
- Verify: `/blog` and all five post routes return 200, and the em dash copy guard passes.
