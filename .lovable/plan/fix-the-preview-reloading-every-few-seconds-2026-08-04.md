# Fix the preview reloading every few seconds

## What's happening

The preview reloads roughly every 2-4 seconds. This is not a problem with any page code — it is the dev preview plumbing.

The setup runs two servers: the real Next.js app on an internal port, and a small Vite proxy on the preview port (8080) that forwards traffic to it. The dev-server log shows a repeating failure, once every ~2 seconds:

```text
[vite] ws proxy error: Error: socket hang up
GET /ai 200 in 133ms
GET /ai 200 in 103ms
```

The proxy is configured with a single catch-all rule for `/` with WebSocket forwarding enabled. That rule collides with Vite's own hot-reload socket, so the Next.js dev client's live-reload WebSocket never completes its upgrade. Next.js treats a dropped dev socket as "the server restarted" and does a full page reload, then reconnects, fails again, and reloads again. That loop is exactly the 3-4 second reload you see; the repeated `GET /ai` lines in the log are those forced reloads.

## The fix

1. **Stop Vite from owning the WebSocket path.** Disable Vite's own hot-reload socket in `vite.config.mjs` so it stops competing for socket upgrades on the preview port.
2. **Forward the Next.js dev socket explicitly.** Add a dedicated proxy rule for the Next.js hot-reload endpoint ahead of the catch-all rule, with WebSocket forwarding on, pointed at the internal Next.js port. Keep the catch-all rule for normal page and asset traffic but without WebSocket forwarding, so the two rules no longer fight.
3. **Verify no reload loop remains.** Load a page in a headless browser, sit on it for ~20 seconds, count navigations, and check the dev-server log for `ws proxy error`. Zero reloads and zero socket hang-ups is the pass condition.
4. **Confirm the preview health probes still answer.** The two endpoints the preview uses to detect staleness must keep returning success through the proxy so the "outdated version" banner does not come back.
5. **Re-check the three viewports.** Load key pages at desktop, tablet, and mobile widths to confirm nothing regressed and no page self-reloads.

## Fallback if the socket still misbehaves

If the Next.js dev socket cannot be proxied cleanly, the alternative is to drop the Vite proxy layer and serve Next.js directly on the preview port. The staleness probe endpoints already live inside the app itself, so they would keep answering without the proxy. This is the simpler pipeline; it is the fallback only because the proxy layer is what resolved the earlier "outdated version" problem.

## Technical notes

- Files touched: `vite.config.mjs` (proxy and WebSocket rules). `scripts/dev-preview.mjs` changes only if the fallback is used.
- No changes to any page, component, styling, Next.js config, Cloudflare deploy config, or database migrations.
- The one remaining console error — a blocked request to the external `status.eatos.com` widget — is unrelated to the reload loop and expected in the sandbox.