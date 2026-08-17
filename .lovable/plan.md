# Fix the placeholder page showing instead of the site

## What is happening

The production build script runs the Next.js build and then also runs `scripts/prepare-dist.mjs`. That script writes a top-level `dist/` folder containing a hand-written `index.html` whose only content is the sentence "Preview assets prepared. The application is served by Next.js."

When a top-level `dist/` with an `index.html` exists, the deployment serves that static folder as the whole website, so every visitor gets the placeholder text instead of the real Next.js app. This is also the same static-mirror path that previously caused clean URLs such as `/home-1` and `/comparison/<brand>` to download instead of open.

## Fix

1. Stop the production build from creating the static `dist/` mirror.
   - `build` runs the Next.js production build only, so the server-backed output is what gets deployed.
   - Keep the preview/dev artifact path separate so the internal artifact check still passes, but never let it emit an `index.html` that can be served as the site root.
2. Remove the placeholder `index.html` generation from `scripts/prepare-dist.mjs`. Assets only (public files and `_next/static`), no HTML entry document.
3. Make sure no stale `dist/index.html` remains in the deployed artifact.

## Verification

- Local: build, confirm no `dist/index.html` is produced, and the app still serves real pages.
- Live after publish: check `/`, `/home-1`, `/comparison`, and all seven `/comparison/<brand>` URLs return `200` with `content-type: text/html` and render real content, using `scripts/validate-clean-routes.mjs`.
- Confirm rendering on desktop, tablet, and mobile widths.

## Technical notes

- Files touched: `package.json` (`build`, `build:dev`), `scripts/build-production.mjs`, `scripts/prepare-dist.mjs`.
- No page content, styling, or component changes.
- If the platform hard-requires a top-level `dist` for its artifact check, it will be satisfied with assets only, without a root HTML document that can shadow the app.