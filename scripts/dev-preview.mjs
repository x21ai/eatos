import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import http from "node:http";
import path from "node:path";

const args = process.argv.slice(2);
const portFlag = args.findIndex((arg) => arg === "--port");
const previewPort = portFlag >= 0 ? args[portFlag + 1] : "8080";
const nextPort = "3001";

const NEXT_BIN_CANDIDATES = [
  "./apps/web/node_modules/.bin/next",
  "./node_modules/.bin/next",
];
const VITE_BIN_CANDIDATES = [
  "./node_modules/.bin/vite",
  "./apps/web/node_modules/.bin/vite",
];

const STARTUP_PAGE = `<!doctype html>
<html lang="en"><head><meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Starting up…</title>
<meta http-equiv="refresh" content="3" />
<style>
  html,body{height:100%;margin:0;background:#000;color:#fff;
    font-family:Montserrat,system-ui,sans-serif;display:grid;place-items:center}
  .box{text-align:center;opacity:.85}
  .dot{display:inline-block;width:8px;height:8px;border-radius:50%;
    background:#d70480;margin-right:8px;animation:p 1s infinite}
  @keyframes p{0%,100%{opacity:.3}50%{opacity:1}}
</style></head>
<body><div class="box"><p><span class="dot"></span>Dev server is starting, retrying automatically…</p></div></body></html>`;

let stopping = false;
let vite = null;
let next = null;
let placeholder = null;

// Restart bookkeeping: allow frequent restarts, but stop looping if the Next
// dev server is fundamentally broken (e.g. a syntax error at boot).
const RESTART_WINDOW_MS = 60_000;
const MAX_RESTARTS_PER_WINDOW = 10;
let restartTimestamps = [];

function resolveBin(candidates) {
  for (const candidate of candidates) {
    if (existsSync(path.resolve(candidate))) return candidate;
  }
  return null;
}

function killTree(child, signal) {
  if (!child) return;
  try {
    // Killing the process group takes the next-server worker down too;
    // otherwise the orphan keeps port 3001 and every restart hits EADDRINUSE.
    process.kill(-child.pid, signal);
  } catch {
    try {
      child.kill(signal);
    } catch {
      /* already gone */
    }
  }
}

function stop(signal = "SIGTERM", exitCode = 0) {
  if (stopping) return;
  stopping = true;
  killTree(next, signal);
  if (vite && !vite.killed) vite.kill(signal);
  if (placeholder) {
    try {
      placeholder.close();
    } catch {
      /* already closed */
    }
  }
  setTimeout(() => process.exit(exitCode), 100).unref();
}

process.once("SIGINT", () => stop("SIGINT"));
process.once("SIGTERM", () => stop("SIGTERM"));
process.once("exit", () => killTree(next, "SIGKILL"));

/**
 * Answer on the preview port immediately so a visitor never gets a bare
 * "Not Found" while dependencies install or Next boots.
 */
function startPlaceholder() {
  return new Promise((resolve) => {
    placeholder = http.createServer((_req, res) => {
      res.writeHead(503, {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "no-store",
      });
      res.end(STARTUP_PAGE);
    });
    placeholder.on("error", (err) => {
      console.error(`[dev-preview] placeholder server error: ${err.message}`);
      placeholder = null;
      resolve();
    });
    placeholder.listen(Number(previewPort), "0.0.0.0", () => {
      console.error(
        `[dev-preview] startup page listening on ${previewPort} until the app is ready`,
      );
      resolve();
    });
  });
}

function stopPlaceholder() {
  return new Promise((resolve) => {
    if (!placeholder) return resolve();
    const server = placeholder;
    placeholder = null;
    server.close(() => resolve());
    // closeAllConnections keeps keep-alive sockets from holding the port.
    try {
      server.closeAllConnections?.();
    } catch {
      /* older node */
    }
    setTimeout(resolve, 1000).unref();
  });
}

/**
 * Dependencies can be temporarily missing while the platform installer is
 * restoring a sandbox. Never launch another installer here: competing Bun or
 * Yarn processes contend for the same lock and can exhaust the install timeout.
 * Keep the startup page available and begin booting as soon as the binaries
 * installed by the platform appear.
 */
async function ensureDependencies() {
  let attempt = 0;
  while (!stopping) {
    if (resolveBin(NEXT_BIN_CANDIDATES) && resolveBin(VITE_BIN_CANDIDATES)) {
      return true;
    }
    attempt += 1;
    console.error(
      `[dev-preview] waiting for platform dependency install (attempt ${attempt})…`,
    );
    const wait = Math.min(30_000, 3_000 * attempt);
    console.error(`[dev-preview] checking dependencies again in ${wait}ms`);
    await new Promise((resolve) => setTimeout(resolve, wait));
  }
  return false;
}

async function waitForPortFree(timeoutMs = 30_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      await fetch(`http://127.0.0.1:${nextPort}/`, {
        signal: AbortSignal.timeout(2000),
      });
      // Something still answers on 3001 — an orphaned worker. Clear it.
      killTree(next, "SIGKILL");
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch {
      return true;
    }
  }
  return false;
}

async function startNext() {
  const bin = resolveBin(NEXT_BIN_CANDIDATES);
  if (!bin) {
    // Missing binary is retryable, not fatal: reinstall and try again.
    await ensureDependencies();
    if (stopping) return;
    return startNext();
  }

  next = spawn(bin, ["dev", "apps/web", "--port", nextPort], {
    stdio: "inherit",
    detached: true,
    env: {
      ...process.env,
      // Long editing sessions can exhaust the default heap and get the dev
      // server OOM-killed, which is what makes the preview go blank.
      NODE_OPTIONS: [process.env.NODE_OPTIONS, "--max-old-space-size=4096"]
        .filter(Boolean)
        .join(" "),
    },
  });

  const supervised = next;

  // An unhandled 'error' event here used to kill the whole supervisor, which
  // left port 8080 unserved and produced the bare "Not Found" page.
  supervised.once("error", async (err) => {
    if (stopping || next !== supervised) return;
    console.error(`[dev-preview] could not spawn Next dev server: ${err.message}`);
    next = null;
    await ensureDependencies();
    if (!stopping) startNext();
  });

  supervised.once("exit", async (code, signal) => {
    if (stopping || next !== supervised) return;

    const now = Date.now();
    restartTimestamps = restartTimestamps.filter(
      (t) => now - t < RESTART_WINDOW_MS,
    );
    restartTimestamps.push(now);

    if (restartTimestamps.length > MAX_RESTARTS_PER_WINDOW) {
      console.error(
        `[dev-preview] Next dev server exited ${restartTimestamps.length} times in the last minute (code=${code} signal=${signal}). Not restarting again; fix the error above.`,
      );
      return;
    }

    console.error(
      `[dev-preview] Next dev server exited (code=${code} signal=${signal}). Restarting...`,
    );
    // Make sure the old worker released port 3001 before respawning.
    killTree(supervised, "SIGKILL");
    await waitForPortFree();
    if (!stopping) startNext();
  });
}

async function waitForNext(timeoutMs = 90_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline && !stopping) {
    try {
      await fetch(`http://127.0.0.1:${nextPort}/`, {
        signal: AbortSignal.timeout(3000),
      });
      return true;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  }
  return false;
}

async function startVite() {
  const bin = resolveBin(VITE_BIN_CANDIDATES);
  if (!bin) {
    await ensureDependencies();
    if (stopping) return;
    return startVite();
  }

  await stopPlaceholder();

  vite = spawn(
    bin,
    ["--host", "0.0.0.0", "--port", previewPort, "--strictPort"],
    { stdio: "inherit", env: process.env },
  );

  vite.once("error", async (err) => {
    console.error(`[dev-preview] could not spawn Vite proxy: ${err.message}`);
    vite = null;
    await startPlaceholder();
    await ensureDependencies();
    if (!stopping) startVite();
  });

  // Vite is the preview entrypoint: if it dies, the whole supervisor goes down
  // so the platform can respawn it.
  vite.once("exit", (code, signal) => {
    if (!stopping) stop(signal ?? "SIGTERM", code ?? 1);
  });
}

await startPlaceholder();
await ensureDependencies();
await startNext();
const ready = await waitForNext();
if (!ready) {
  console.error(
    "[dev-preview] Next dev server did not become ready in time; starting the proxy anyway.",
  );
}
await startVite();
