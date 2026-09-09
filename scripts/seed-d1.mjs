#!/usr/bin/env node
// Apply seed/d1/*.sql to local or remote D1.
//
//   node scripts/seed-d1.mjs --local
//   node scripts/seed-d1.mjs --remote
//
// Expects CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID for --remote
// (use: doppler run --project x21 --config prd_cloudflare -- node scripts/seed-d1.mjs --remote).

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const web = path.join(root, 'apps/web');
const seedDir = path.join(root, 'seed/d1');
const remote = process.argv.includes('--remote');
const local = process.argv.includes('--local') || !remote;

if (!fs.existsSync(seedDir)) {
  console.error('Missing seed/d1. Run: node scripts/export-d1-seed.mjs');
  process.exit(1);
}

const files = fs
  .readdirSync(seedDir)
  .filter((f) => f.endsWith('.sql'))
  .sort();

const wrangler = path.join(root, 'node_modules/.bin/wrangler');
const flag = remote ? '--remote' : '--local';

console.log(`Seeding D1 ${flag} with ${files.length} files…`);

for (const file of files) {
  const filePath = path.join(seedDir, file);
  const result = spawnSync(
    wrangler,
    ['d1', 'execute', 'eatos-web-db', flag, '--file', filePath, '-c', 'wrangler.jsonc'],
    { cwd: web, encoding: 'utf8', env: process.env },
  );
  if (result.status !== 0) {
    console.error(result.stdout || '');
    console.error(result.stderr || '');
    console.error(`FAILED on ${file}`);
    process.exit(result.status || 1);
  }
  process.stdout.write(`ok ${file}\n`);
}

console.log('D1 seed complete.');
