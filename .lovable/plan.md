# How it Works grid: autoplay tiles and full-container playback

Three changes to the six-box grid in the "How it Works" section on `/homepage1`.

## 1. Videos autoplay in the tiles

Every box plays its demo automatically as soon as it scrolls into view, muted and looping, so the grid reads as six live screens instead of static posters. The center play button is removed. Playback pauses when the section leaves the viewport to keep scrolling smooth on lower-powered devices.

## 2. Click opens the video in the full container

Clicking any box switches the container into a single full-width player:

- The selected demo fills the whole container area, with sound-capable native controls.
- The product name and a short caption sit under the player, with a "Learn more" link to that product page.
- A close button (and Escape) returns to the six-box grid, where the tiles resume autoplaying.
- The grid and the expanded player share the same container, so the section height stays stable and nothing jumps on the page.

## 3. Hover title at bottom center

On hover, the product name fades up at the bottom center of the box over a soft dark gradient, instead of bottom left. On touch devices the name stays visible since there is no hover state.

## Technical notes

- Single file: `apps/web/src/app/components/ProductShowcaseSection.tsx`.
- Replace the `activeId` play/pause toggle with `expandedId` state for the full-container view, plus an `IntersectionObserver` on the container to start and stop tile autoplay.
- Tiles keep `muted autoPlay loop playsInline preload="metadata"` with no controls; the expanded player gets `controls` and starts unmuted-capable but muted-by-default to satisfy browser autoplay rules.
- Titles centered with `left-0 right-0 text-center` on the existing overlay span.
- No data or copy changes; `demoSources` continues to supply the sources, posters and captions.
