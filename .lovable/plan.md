# Keep the preview always available

## What I confirmed

- The preview is served by `scripts/dev-preview.mjs`, which starts two processes: the Next dev server on port 3001 and Vite on port 8080 that proxies to it.
- The launcher kills everything as soon as either child exits: any `exit` event calls `stop()`, so a single Next dev crash or restart takes the whole preview down.
- The log already shows the failure signature: `http proxy error: / Error: connect ECONNREFUSED 127.0.0.1:3001` while Next was still starting. When Next is not answering, the proxy returns a bare `Not Found` page, which is exactly what the attachment shows.
- Right now both processes are up and `/homepage1` returns 200, so this is an intermittent availability problem, not a broken route.

## Plan

1. Supervise the Next dev process inside `scripts/dev-preview.mjs`: if it exits unexpectedly, restart it instead of tearing down the whole preview. Use a short backoff and a restart cap so a genuinely broken build still surfaces clearly in the logs.
2. Only shut everything down when Vite itself dies or when a stop signal arrives.
3. Add a readiness gate: before Vite starts proxying, poll `http://127.0.0.1:3001` until it answers, so early requests do not hit a refused connection.
4. Handle proxy errors gracefully: when Next is momentarily unavailable, return a short "starting up, retrying" HTML page with auto-refresh instead of the bare `Not Found`, so the preview recovers on its own.
5. Reduce restart pressure from memory: raise the Next dev process heap limit via `NODE_OPTIONS` so long editing sessions are less likely to hit an out-of-memory kill.
6. Verify by restarting the preview, confirming several routes return 200, then killing the Next dev process on purpose and confirming the preview recovers automatically without manual action.

## Notes

- This only changes local preview supervision. No application pages, content, or published build output are touched.
- If verification shows the crashes come from something other than an unexpected exit (for example a repeated compile failure on a specific route), I will report the exact cause before changing app code.
