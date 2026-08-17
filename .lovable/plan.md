# Permanently restore clean live URLs

## Confirmed live behavior

- `/home-1` and every valid `/comparison/<brand>` URL return `200 application/octet-stream` with `nosniff`, so browsers download them.
- The matching `.html` URLs return `200 text/html` and render correctly.
- `/comparisontouchbistro` is not a valid route. The intended clean URL is `/comparison/touchbistro`.
- The current root publish build creates a custom static `dist` mirror, even though the imported Next app already has a production server deployment configuration. Link rewriting cannot repair a direct clean URL when the host serves that path as a downloadable static object first.

## Implementation

1. **Restore server-backed page routing for production**
   - Stop using the custom static HTML mirror as the production page-serving strategy.
   - Route the production build through the existing Next/OpenNext deployment path so `/home-1` and nested comparison URLs are resolved as pages with `text/html`.
   - Keep public images, fonts, scripts, and other static assets served as assets.

2. **Return the site to clean canonical links**
   - Remove the production-only `.html` link normalization and generated HTML rewriting added by the previous workaround.
   - Update comparison links, back links, header links, footer links, and other internal navigation to use clean URLs consistently.
   - Preserve external links, asset paths, hashes, API paths, and `/` unchanged.

3. **Prevent this regression**
   - Add a deployment validation that requests representative clean routes and fails if a page is emitted or served as `application/octet-stream`.
   - Cover `/home-1`, `/comparison`, and all seven competitor pages.
   - Confirm the expected competitor list includes TouchBistro at `/comparison/touchbistro`.

4. **Verify the actual live deployment**
   - Validate navigation and direct page loads on desktop, tablet, and mobile.
   - Publish the corrected production build.
   - Check every requested clean live URL for `200` plus `content-type: text/html`, then open them in a browser to confirm they render and do not download.

## Technical details

- Primary files: root build scripts, Next/OpenNext publish configuration, `scripts/prepare-dist.mjs`, `PublishedLinkNormalizer`, shared navigation, and comparison page links.
- This changes routing and deployment behavior only. Page content and visual design remain unchanged.
- The fix is not complete until the live clean URLs pass response-header and browser checks after publishing.