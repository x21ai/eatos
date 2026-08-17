# Permanently fix the editor preview and published website

## Confirmed current behavior

- The current editor server returns the complete homepage: 11 sections, full footer content, and about 9,600 to 13,500 pixels of page height across desktop, tablet, and mobile.
- The current local clean routes, including `/home-1`, `/comparison`, and every competitor page, return `200 text/html`.
- The published root still returns the exact old placeholder HTML: `Preview assets prepared. The application is served by Next.js.`
- Published nested clean routes such as `/home-1` and `/comparison/square` still return `application/octet-stream`.
- The project currently starts a root Vite server only as a proxy to Next.js, and the production build always creates a top-level `dist/`. This makes the deployment look like a static Vite artifact even though the real website is the Next.js app. The static artifact then takes priority over the server-backed site.

## Fix

1. **Remove the static-app deployment conflict**
   - Stop creating `dist/` during the production build.
   - Remove the obsolete `prepare-dist` production path so a placeholder or stale page can never shadow Next.js again.
   - Remove the root Vite build signal from the publish path. The website will publish through the existing Next/OpenNext server configuration instead of being treated as a static Vite site.

2. **Run the editor preview directly through Next.js**
   - Simplify the preview launcher to start Next.js on the port supplied by Lovable.
   - Keep the existing successful `POST /__hmr_flush` handler, so editor synchronization continues to work without the Vite reverse proxy.
   - Preserve Next.js hot reload and all current pages while eliminating the extra proxy process and startup race.

3. **Make homepage content resilient in the editor**
   - Keep all existing homepage sections and design unchanged.
   - Remove any homepage reveal state that can leave whole sections permanently transparent when the editor iframe misses an intersection event.
   - Do not alter copy, layout, demo options, or navigation.

4. **Add deployment regression checks**
   - Fail the build if a production `dist/index.html` or the placeholder sentence is generated.
   - Validate `/`, `/home-1`, `/comparison`, and all seven competitor routes as `200 text/html`.
   - Confirm the rendered homepage contains its expected later sections and footer, not only the hero.

## Verification

- Editor: load and scroll the complete homepage on desktop, tablet, and mobile, confirm all sections render, hot reload remains connected, and no automatic reload loop occurs.
- Production artifact: confirm publishing uses the Next/OpenNext server output and no root static HTML can override it.
- Live after publishing: require the root to contain the real eatOS homepage, and require every clean route to return `200 text/html` without downloading.
- Browser-check `/`, `/home-1`, `/comparison`, and every competitor page on desktop, tablet, and mobile.

## Technical scope

- Expected files: root `package.json`, `scripts/dev-preview.mjs`, `scripts/build-production.mjs`, `scripts/prepare-dist.mjs`, `vite.config.mjs`, and the clean-route validator.
- Homepage motion fallback only where inspection confirms a section can remain hidden.
- No visual redesign, content changes, database work, or unrelated refactoring.
