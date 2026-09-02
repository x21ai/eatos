# Make the expanded video popup match the video exactly

## Problem
On /homepage1, the expanded player is a fixed-height box (46/54/60vh) with the video fit inside it. Because the box shape rarely matches the clip's shape, the video shows black bars on the sides or top. Nothing is cropped, but the box is not "full" either.

## Fix
Let the popup take the shape of the video itself:

1. Read each clip's real width and height when it loads (video metadata), then apply that ratio to the player frame.
2. Size the frame to fit the screen: cap height at roughly 60vh (52vh on mobile) and width at the container width, whichever limit hits first. Center it.
3. Video fills the frame edge to edge with no bars and no cropping, since frame shape equals video shape.
4. Before metadata arrives, fall back to a 16:9 frame so there is no layout jump on open.
5. Keep close button, title, caption, and Learn more row unchanged and on screen.

## Technical notes
- File: `apps/web/src/app/components/ProductShowcaseSection.tsx`
- Add state for the expanded video's aspect ratio, set in `onLoadedMetadata` from `videoWidth / videoHeight`; reset when `expandedId` changes.
- Replace the fixed `h-[46vh] sm:h-[54vh] lg:h-[60vh]` frame with an inline `style={{ aspectRatio, maxHeight: 'min(60vh, ...)', maxWidth: '100%' }}` wrapper, centered via `mx-auto`.
- Keep `object-contain` on the video as a safety net; with a matched ratio it renders identically to cover with no crop.
- Grid tiles stay as they are.
