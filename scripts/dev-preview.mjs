import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const nextBin = require.resolve("next/dist/bin/next");
const viteBin = join(dirname(require.resolve("vite/package.json")), "bin/vite.js");

const args = process.argv.slice(2);
const portFlag = args.findIndex((arg) => arg === "--port");
const previewPort = portFlag >= 0 ? args[portFlag + 1] : "8080";
const nextPort = "3001";

const children = [];

function start(command, commandArgs, options = {}) {
  const child = spawn(command, commandArgs, {
    stdio: "inherit",
    env: process.env,
    ...options,
  });
  children.push(child);
  child.once("error", (error) => {
    console.error(`Failed to start ${command}:`, error);
    stop("SIGTERM", 1);
  });
  child.once("exit", (code, signal) => {
    if (!stopping) {
      stop(signal ?? "SIGTERM", code ?? 1);
    }
  });
  return child;
}

let stopping = false;
function stop(signal = "SIGTERM", exitCode = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children) {
    if (!child.killed) child.kill(signal);
  }
  setTimeout(() => process.exit(exitCode), 100).unref();
}

process.once("SIGINT", () => stop("SIGINT"));
process.once("SIGTERM", () => stop("SIGTERM"));

start(process.execPath, [
  nextBin,
  "dev",
  "--port",
  nextPort,
], { cwd: "apps/web" });
start(process.execPath, [
  viteBin,
  "--host",
  "0.0.0.0",
  "--port",
  previewPort,
  "--strictPort",
]);