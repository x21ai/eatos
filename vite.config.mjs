import { defineConfig } from "vite";

const RETRY_PAGE = `<!doctype html>
<html lang="en"><head><meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Starting up…</title>
<meta http-equiv="refresh" content="2" />
<style>
  html,body{height:100%;margin:0;background:#000;color:#fff;
    font-family:Montserrat,system-ui,sans-serif;display:grid;place-items:center}
  .box{text-align:center;opacity:.85}
  .dot{display:inline-block;width:8px;height:8px;border-radius:50%;
    background:#d70480;margin-right:8px;animation:p 1s infinite}
  @keyframes p{0%,100%{opacity:.3}50%{opacity:1}}
</style></head>
<body><div class="box"><p><span class="dot"></span>Dev server is starting, retrying automatically…</p></div></body></html>`;

/** Serve a self-refreshing page instead of a bare "Not Found" while Next boots. */
function retryOnProxyError(proxy) {
  proxy.on("error", (_err, _req, res) => {
    if (!res || res.headersSent || typeof res.writeHead !== "function") return;
    res.writeHead(503, {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    });
    res.end(RETRY_PAGE);
  });
}


export default defineConfig({
  server: {
    // Vite is only a reverse proxy here — the real app is the Next.js dev
    // server on 3001. Vite's own HMR socket must be off, otherwise it fights
    // the Next dev client for WebSocket upgrades on the preview port and the
    // resulting dropped sockets make Next full-reload the page every ~2s.
    hmr: false,
    proxy: {
      // Lovable CDN-hosted assets are not served by the Next.js dev server;
      // proxy them from the published site so they render in the dev preview.
      "/__l5e/assets-v1/": {
        target: "https://eatos.lovable.app",
        changeOrigin: true,
      },
      // Next.js dev hot-reload socket — must be matched before the catch-all.
      "/_next/webpack-hmr": {
        target: "ws://127.0.0.1:3001",
        changeOrigin: false,
        ws: true,
      },
      "/_next/turbopack-hmr": {
        target: "ws://127.0.0.1:3001",
        changeOrigin: false,
        ws: true,
      },
      "/": {
        target: "http://127.0.0.1:3001",
        changeOrigin: false,
        configure: retryOnProxyError,
      },

    },
  },
});