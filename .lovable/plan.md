# Customer Showcase Section on Home Page

Add a "Next Generation Restaurant Brands We Power" section to the home page: a row of 5 vertical video cards that play on hover, plus an automatic right-to-left logo marquee below them.

## What gets built

**Video row (5 cards)**
- Each card is a tall portrait tile with a rounded white pill label at the top (Fast Casual, Full Service, Cafe and Churreria, Fast Casual, Fast Casual) matching the reference.
- Videos are the 5 provided Wix MP4 URLs, in the order given.
- Behaviour: muted, looping, no controls, paused by default showing the first frame; playback starts on hover (and on focus for keyboard users), pauses and resets on leave.
- On touch/mobile devices there is no hover, so cards autoplay when scrolled into view (muted, looping) and pause when out of view — that keeps the section alive on phones and tablets without autoplaying 5 videos at once on desktop.
- Layout: 5 across on desktop, 2-3 across on tablet, horizontal swipe row on mobile so tiles keep their portrait proportions instead of squashing.

**Logo marquee**
- Continuous right-to-left scroll, CSS-driven, duplicated track for a seamless loop, pauses on hover, respects reduced-motion.
- Uses the 10 attached customer logos (Puritas, Local Pho, Jack's Airport Cafe, Chef Al, Carbon Grill placeholder from Lucy's set, Lucy's Waffles & Ice Cream, Outta Da Shell, Fast Pizza Delivery, Figaro Bistrot, Bollywood Bites), uploaded as CDN assets.
- Logos are dark monochrome marks, so the marquee sits on a light band to stay visible.

**Placement and styling**
The home page is dark-themed, while the reference screenshot is a light band. The section will be built as a light band (white/near-white background, dark heading) as in the reference, inserted after the existing social-proof/trust block near the top of the page so it reads as customer proof. Fonts, spacing, and rounding follow the existing site system.

## Technical notes

- New component `apps/web/src/components/marketing/CustomerShowcase.tsx` plus a small `content.ts` holding the video URLs, labels and logo imports; rendered from `apps/web/src/app/page.tsx`.
- The 10 logo images are uploaded via `lovable-assets` and referenced through `.asset.json` pointers (same pattern as the partners page assets).
- Videos are hotlinked from the provided URLs with `preload="metadata"`, `playsInline`, `muted`, `loop` so no large upfront download.
- Marquee animation via a keyframe defined in `apps/web/src/app/global.css`; intersection observer for the mobile autoplay behaviour.
- Verified on desktop, tablet and mobile viewports after build.
