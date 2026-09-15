#!/usr/bin/env node
/**
 * Idempotently add products.seo_title / products.seo_description when missing.
 * Safe on live D1 where columns were added manually during cutover.
 *
 * Usage:
 *   node scripts/ensure-product-seo-columns.mjs
 *   doppler run --project x21 --config prd_cloudflare -- node scripts/ensure-product-seo-columns.mjs
 */
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const WEB = path.join(ROOT, 'apps/web');

function wrangler(args) {
  const r = spawnSync('npx', ['--yes', 'wrangler@4', ...args], {
    cwd: WEB,
    encoding: 'utf8',
    env: process.env,
  });
  if (r.status !== 0) {
    console.error(r.stdout || '');
    console.error(r.stderr || '');
    process.exit(r.status || 1);
  }
  return r.stdout || '';
}

function listProductColumns() {
  const out = wrangler([
    'd1',
    'execute',
    'eatos-web-db',
    '--remote',
    '--json',
    '--command',
    'PRAGMA table_info(products)',
  ]);
  try {
    const parsed = JSON.parse(out);
    const rows = parsed[0]?.results ?? [];
    return new Set(rows.map((row) => String(row.name)));
  } catch {
    return new Set();
  }
}

const columns = listProductColumns();
const pending = ['seo_title', 'seo_description'].filter((col) => !columns.has(col));

if (!pending.length) {
  console.log('products SEO columns already present — nothing to do.');
  process.exit(0);
}

for (const col of pending) {
  wrangler([
    'd1',
    'execute',
    'eatos-web-db',
    '--remote',
    '--command',
    `ALTER TABLE products ADD COLUMN ${col} TEXT`,
  ]);
  console.log(`Added products.${col}`);
}

console.log('Product SEO columns ensured.');
