import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const nextBin = require.resolve("next/dist/bin/next");

const args = process.argv.slice(2);
const portFlag = args.findIndex((arg) => arg === "--port");
const previewPort = portFlag >= 0 ? args[portFlag + 1] : "8080";

// Next.js is the application server. Running it directly on Lovable's supplied
// port avoids a second Vite process being mistaken for the production app.
const child = spawn(process.execPath, [
  nextBin,
  "dev",
  "--port",
  previewPort,
], {
  cwd: "apps/web",
  stdio: "inherit",
  env: process.env,
});

child.once("error", (error) => {
  console.error("Failed to start the Next.js preview:", error);
  process.exit(1);
});

child.once("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 1);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.once(signal, () => child.kill(signal));
}