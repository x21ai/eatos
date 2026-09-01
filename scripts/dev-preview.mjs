import { spawn } from "node:child_process";

const args = process.argv.slice(2);
const portFlag = args.findIndex((arg) => arg === "--port");
const previewPort = portFlag >= 0 ? args[portFlag + 1] : "8080";
const nextPort = "3001";

let stopping = false;
let vite = null;
let next = null;

// Restart bookkeeping: allow frequent restarts, but stop looping if the Next
// dev server is fundamentally broken (e.g. a syntax error at boot).
const RESTART_WINDOW_MS = 60_000;
const MAX_RESTARTS_PER_WINDOW = 10;
let restartTimestamps = [];

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
  setTimeout(() => process.exit(exitCode), 100).unref();
}

process.once("SIGINT", () => stop("SIGINT"));
process.once("SIGTERM", () => stop("SIGTERM"));
process.once("exit", () => killTree(next, "SIGKILL"));

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

function startNext() {
  next = spawn(
    "./apps/web/node_modules/.bin/next",
    ["dev", "apps/web", "--port", nextPort],
    {
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
    },
  );

  const supervised = next;
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

function startVite() {
  vite = spawn(
    "./node_modules/.bin/vite",
    ["--host", "0.0.0.0", "--port", previewPort, "--strictPort"],
    { stdio: "inherit", env: process.env },
  );

  // Vite is the preview entrypoint: if it dies, the whole supervisor goes down
  // so the platform can respawn it.
  vite.once("exit", (code, signal) => {
    if (!stopping) stop(signal ?? "SIGTERM", code ?? 1);
  });
}

startNext();
const ready = await waitForNext();
if (!ready) {
  console.error(
    "[dev-preview] Next dev server did not become ready in time; starting the proxy anyway.",
  );
}
startVite();
