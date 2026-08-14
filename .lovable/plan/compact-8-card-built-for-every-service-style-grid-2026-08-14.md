# Compact 8-card "Built for every service style" grid

## What changes on the home page

The two large service cards become a set of eight smaller, equally sized cards laid out four per row on desktop, two per row on tablet, and one per row on mobile.

The eight service styles, in order:

1. Quick Service
2. Full Service
3. Fine Dining
4. Cafe
5. Bar
6. Food Truck
7. Ghost Kitchen
8. Franchise

Each card keeps the same visual format as today, just tighter:

- Image on top with a consistent crop so all cards line up
- Colorful icon tile
- Title and a short two-line description
- Three short feature bullets with check marks
- Card links to its matching solutions page (all eight already exist under /solutions)

```text
Desktop (4 per row)      Tablet (2 per row)    Mobile (1 per row)
[1][2][3][4]             [1][2]                [1]
[5][6][7][8]             [3][4]                [2]
                         [5][6]                ...
                         [7][8]
```

## Images

Generate one cinematic image per service style (8 total) in the existing dark, premium eatOS look, and use them as the card visuals. Quick Service and Full Service keep their current images unless the new set looks better together, in which case all eight are generated fresh for a consistent style.

## Technical notes

- Edit `apps/web/src/app/page.tsx`: replace the two hand-written cards in the service modes section with a data array mapped into one reusable card block, so spacing and typography stay identical across all eight.
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` with a smaller gap and reduced padding (`p-6`), smaller title size, `text-sm` description clamped to two lines, and `text-xs` bullets.
- Images: fixed `aspect-[4/3]` container with `object-cover` so no card grows taller than another; each card uses `h-full` inside the grid for equal heights.
- New images generated into `apps/web/src/assets/` and referenced through asset pointers like the existing `pos.jpg` pattern.
- Verify all three viewports in the preview after the change.
