import { defineConfig } from "vite";

export default defineConfig({
  server: {
    // Vite is only a reverse proxy here — the real app is the Next.js dev
    // server on 3001. Vite's own HMR socket must be off, otherwise it fights
    // the Next dev client for WebSocket upgrades on the preview port and the
    // resulting dropped sockets make Next full-reload the page every ~2s.
    hmr: false,
    proxy: {
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
      },
    },
  },
});