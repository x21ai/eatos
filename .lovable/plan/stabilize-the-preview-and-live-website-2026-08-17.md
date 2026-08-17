# Stabilize the preview and live website

## Confirmed issues

- The editor preview currently serves `/`, `/home-1`, `/comparison`, and `/comparison/square` as valid HTML, but the server history shows repeated exits and restarts. Earlier failures include unsupported forwarded CLI flags and temporarily unresolved workspace dependencies.
- The published root still serves the obsolete placeholder: `Preview assets prepared. The application is served by Next.js.`
- Published routes such as `/home-1` and `/platform` return HTML with `application/octet-stream`, which can make browsers download the page instead of displaying it.
- The current production script recreates a top-level asset-only `dist/` after the Next.js build. This satisfies the artifact check, but the live response confirms that the static deployment path is still taking precedence over the server-rendered application.

## Repair plan

1. **Make the editor preview process stable**
   - Harden the preview launcher so platform-supplied flags cannot be forwarded to Next.js unless supported.
   - Keep Next.js bound directly to the required preview port.
   - Ensure child-process exits and signals are handled without leaving the supervisor in a rapid restart loop.
   - Make workspace dependency resolution deterministic so `motion`, `framer-motion`, React Query, and Next.js resolve consistently after every install or preview restart.

2. **Remove the static-versus-server deployment conflict**
   - Stop publishing any root HTML placeholder or extensionless page copies from `dist/`.
   - Preserve the `dist-check` requirement using only a non-shadowing build artifact that cannot answer `/` or clean application routes.
   - Keep the complete Next.js build in `apps/web/.next` as the source used by the existing OpenNext publisher configuration.

3. **Correct live route responses**
   - Ensure `/` is served by Next.js, not a stale static document.
   - Ensure all clean routes return `Content-Type: text/html; charset=utf-8` instead of `application/octet-stream`.
   - Keep public files and `/_next/static/*` assets available without changing page URLs or navigation.

4. **Add regression checks to the production build**
   - Fail if the placeholder sentence or any `dist/index.html` is generated.
   - Fail if the required Next.js manifests and static assets are missing.
   - Validate `/`, `/home-1`, `/comparison`, `/platform`, and every comparison detail route against a production server, checking status, content type, and placeholder absence.

## Verification

- Run the production build and artifact validation successfully.
- Keep the editor open through multiple health-check intervals and confirm it does not become Not Found or restart unexpectedly.
- Check the homepage and representative nested routes on desktop, tablet, and mobile.
- After publishing the corrected build, verify the public URL displays the real homepage and nested routes open in the browser instead of downloading.

## Technical scope

- Expected changes are limited to root package scripts, the preview/build launchers, dependency declarations or lockfile only if required, and deployment regression validation.
- No page design, content, navigation, database, or feature changes.