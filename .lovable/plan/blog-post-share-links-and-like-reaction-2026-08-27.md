# Blog post share links and like reaction

Add a share row and a like (heart) reaction at the end of each blog post, matching the reference layout.

## What gets added

At the bottom of the article body, after the last paragraph:

1. A thin divider, then a row of share actions on the left:
   - Facebook, X, LinkedIn, and a copy-link icon
   - Each opens the platform share URL in a new tab with the post URL and title
   - The copy-link icon reuses the existing clipboard behaviour and shows the "Link copied to clipboard" toast
2. A second thin divider, then a right-aligned like control:
   - Count on the left, heart icon on the right
   - Clicking toggles the like: heart fills brand pink and count increases by one; clicking again reverts
   - State is remembered per post in the visitor's browser, so a refresh keeps the liked state

## Styling

Dark theme, consistent with the rest of the post: hairline dividers in white/10, icons in muted zinc with white hover, brand pink for the active heart. Same max-width column as the article text so it lines up with the body copy.

## Technical notes

- Edit `apps/web/src/app/blog/[slug]/BlogPostClient.tsx` only; add a small `PostReactions` component in the same folder.
- Like state: `localStorage` key per slug plus a base count derived deterministically from the slug, so counts are stable and no backend is needed.
- Icons come from `lucide-react` (Facebook, Linkedin, Link2, Heart); X uses the same custom X glyph already used in the footer.
- Existing `handleShare` clipboard logic is reused rather than duplicated.
