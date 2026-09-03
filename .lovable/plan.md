# Fix the intermittent "Not Found" in the preview

## What I confirmed just now

- The preview log shows the same crash repeating:
  `Error: spawn ./apps/web/node_modules/.bin/next ENOENT`, then
  `script "dev" exited with code 1`.
- `apps/web/node_modules/.bin` does not exist right now, and neither does the
  root `node_modules/.bin`. The dependencies are simply not installed in the
  sandbox at that moment.
- `scripts/dev-preview.mjs` launches Next by hard-coded path
  (`./apps/web/node_modules/.bin/next`) and never handles a spawn failure. The
  unhandled `error` event kills the whole supervisor, so the web server on port
  8080 never starts and the platform returns the bare "Not Found" text you saw.

So this is not a page or routing problem. The sandbox periodically resets or
reinstalls dependencies (the log also shows `bun install` running instead of the
project's Yarn workspace install). While packages are missing, the preview
supervisor dies instead of waiting and retrying. Refreshing the editor triggers a
fresh install and start, which is why it comes back.

## The fix

1. Make the supervisor survive a missing or half-installed dependency tree:
   handle the spawn `error` event instead of letting it crash the process, and
   resolve the Next and Vite binaries by lookup rather than a single hard-coded
   path.
2. Add a dependency readiness check before launching: if the Next binary is not
   present, run the project's install once, then continue. Retry with backoff
   instead of exiting.
3. Always start the proxy on port 8080 first, so the port is answering even while
   Next is still booting or installing. Serve the existing branded "Starting up"
   page during that window, with auto-refresh, so a visitor never sees a raw
   "Not Found".
4. Keep restart limits, but treat "dependencies missing" as a retryable
   condition rather than counting toward the crash-loop cap.
5. Verify by deleting the installed binary path, restarting the preview, and
   confirming port 8080 answers with the startup page and then recovers to the
   real site without manual intervention.

## Notes

- Changes are confined to `scripts/dev-preview.mjs` (plus the startup HTML it
  serves). No page content, design, routes, or app code change.
- This affects the editor preview only. It does not change the published site.
