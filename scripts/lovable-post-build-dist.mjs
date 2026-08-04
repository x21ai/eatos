// Lovable preview dist-check shim.
//
// Lovable's preview pipeline runs `build:dev` and then verifies a static `dist/`
// folder exists at the repo root. This app is a Next.js 16 server-rendered app
// in a Yarn workspace, so its real build output is `apps/web/.next` and there is
// no root `dist/`. The build itself succeeds; only the output-location check
// fails, which leaves the preview stuck on the last successful (old) build.
//
// This script runs AFTER a successful `next build apps/web`. It creates a root
// `dist/` that satisfies the dist-check:
//   - `dist/index.html` — a minimal shell (the live preview is served by the dev
//     server, not this static folder, because the app is genuinely SSR).
//   - `dist/_next/static` — a copy of the built client assets so the folder is
//     non-empty and looks like a real build output.
//
// It never touches next.config.js, D1 bindings, or the Cloudflare deploy path.
// `dist/` is gitignored; it exists only to unblock Lovable's CI gate.

import { existsSync, mkdirSync, writeFileSync, cpSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const nextDir = join(repoRoot, 'apps', 'web', '.next');
const nextStatic = join(nextDir, 'static');
const distDir = join(repoRoot, 'dist');
const distNextStatic = join(distDir, '_next', 'static');

function log(msg) {
  console.log(`[lovable-dist] ${msg}`);
}

if (!existsSync(nextDir)) {
  console.error(
    `[lovable-dist] ERROR: ${nextDir} not found. Run \`next build apps/web\` first.`
  );
  process.exit(1);
}

// Start clean so stale assets never linger between builds.
if (existsSync(distDir)) {
  rmSync(distDir, { recursive: true, force: true });
}
mkdirSync(distDir, { recursive: true });

// Copy client static assets if present (non-fatal if absent).
if (existsSync(nextStatic)) {
  mkdirSync(dirname(distNextStatic), { recursive: true });
  cpSync(nextStatic, distNextStatic, { recursive: true });
  log(`copied ${nextStatic} -> ${distNextStatic}`);
} else {
  log(`no ${nextStatic} to copy (continuing)`);
}

const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>eatOS - server-rendered</title>
    <meta name="robots" content="noindex" />
  </head>
  <body>
    <main style="font-family: system-ui, sans-serif; padding: 2rem; max-width: 48rem; margin: 0 auto;">
      <h1>eatOS</h1>
      <p>
        This is a Next.js 16 server-rendered application (app lives in
        <code>apps/web</code>). The live preview is served by the dev server;
        this static <code>dist/</code> exists only to satisfy the build check.
      </p>
    </main>
  </body>
</html>
`;

writeFileSync(join(distDir, 'index.html'), indexHtml, 'utf8');
log(`wrote ${join(distDir, 'index.html')}`);
log('dist-check shim complete.');
