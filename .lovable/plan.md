# Stabilize the Lovable preview

## Confirmed cause

- The Next.js dev process remains alive and the homepage continues returning `200`.
- Lovable periodically sends `POST /__hmr_flush` to confirm that pending edits have reached the preview.
- The imported Next.js app currently returns `404` for that request, which causes the editor to report: “Preview is showing an outdated version of your app.”
- The root dev script also supplies port `8080` while the preview harness supplies it again, producing a duplicated `--port 8080` argument. It is not crashing the app, but should be cleaned up.

## Implementation

1. Add a small Next.js route handler for `POST /__hmr_flush` that returns a successful empty response, allowing Lovable’s preview synchronization check to complete.
2. Update the root `dev` script so it delegates to the web app without hardcoding a second port argument; Lovable will continue supplying port `8080`.
3. Leave all eatOS pages, styles, Cloudflare configuration, database migrations, and mobile code unchanged.

## Verification

- Confirm `POST /__hmr_flush` returns a success status instead of `404`.
- Confirm `/` and representative nested routes continue returning `200`.
- Observe repeated preview checks long enough to confirm the outdated-version warning no longer returns.
- Verify the preview at desktop, tablet, and mobile widths to ensure the compatibility route has no visual impact.