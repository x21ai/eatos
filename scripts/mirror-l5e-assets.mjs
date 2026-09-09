#!/usr/bin/env node
// Mirror Lovable CDN assets (__l5e/assets-v1/*) into Cloudflare R2.
//
//   node scripts/mirror-l5e-assets.mjs              # dry-run list
//   node scripts/mirror-l5e-assets.mjs --upload     # download + put to R2
//
// Requires CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID (Doppler x21/prd_cloudflare).

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import os from 'node:os';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const web = path.join(root, 'apps/web');
const LOVABLE = 'https://eatos.lovable.app';
const BUCKET = 'eatos-web-assets';
const CONCURRENCY = 4;
const doUpload = process.argv.includes('--upload');

const MIME = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.avif': 'image/avif',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mov': 'video/quicktime',
};

function collectKeys() {
  const keys = new Set();
  const walk = (dir) => {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'node_modules' || entry.name === '.next') continue;
        walk(full);
      } else if (entry.name.endsWith('.asset.json')) {
        try {
          const j = JSON.parse(fs.readFileSync(full, 'utf8'));
          const url = j.url || '';
          const m = url.match(/^\/__l5e\/assets-v1\/(.+)$/);
          if (m) keys.add(m[1]);
        } catch {
          // skip bad json
        }
      }
    }
  };
  walk(path.join(web, 'src'));
  // also hard-coded paths in source
  const srcRoot = path.join(web, 'src');
  const re = /\/__l5e\/assets-v1\/([a-f0-9-]+\/[^"'`\s)]+)/gi;
  const walkSrc = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'node_modules' || entry.name === '.next') continue;
        walkSrc(full);
      } else if (/\.(tsx?|jsx?|json)$/.test(entry.name) && !entry.name.endsWith('.asset.json')) {
        const text = fs.readFileSync(full, 'utf8');
        let m;
        while ((m = re.exec(text))) keys.add(m[1]);
      }
    }
  };
  walkSrc(srcRoot);
  return [...keys].sort();
}

function contentTypeFor(key) {
  const ext = path.extname(key).toLowerCase();
  return MIME[ext] || 'application/octet-stream';
}

async function mapPool(items, limit, fn) {
  const results = new Array(items.length);
  let i = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await fn(items[idx], idx);
    }
  });
  await Promise.all(workers);
  return results;
}

function putToR2(localFile, objectKey, contentType) {
  const wrangler = path.join(root, 'node_modules/.bin/wrangler');
  const result = spawnSync(
    wrangler,
    [
      'r2',
      'object',
      'put',
      `${BUCKET}/${objectKey}`,
      '--file',
      localFile,
      '--content-type',
      contentType,
      '--remote',
      '-c',
      'wrangler.jsonc',
    ],
    { cwd: web, encoding: 'utf8', env: process.env },
  );
  if (result.status !== 0) {
    throw new Error(result.stderr || result.stdout || `wrangler exit ${result.status}`);
  }
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  return buf.length;
}

const keys = collectKeys();
console.log(`Found ${keys.length} unique __l5e assets`);

if (!doUpload) {
  keys.slice(0, 10).forEach((k) => console.log(`  ${k}`));
  if (keys.length > 10) console.log(`  … +${keys.length - 10} more`);
  console.log('Dry-run only. Re-run with --upload to mirror into R2.');
  process.exit(0);
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'eatos-l5e-'));
let ok = 0;
let fail = 0;
const failures = [];

console.log(`Uploading to R2 bucket ${BUCKET} (concurrency ${CONCURRENCY})…`);
console.log(`Temp dir: ${tmp}`);

await mapPool(keys, CONCURRENCY, async (rel, idx) => {
  const objectKey = `__l5e/assets-v1/${rel}`;
  const url = `${LOVABLE}/__l5e/assets-v1/${rel.split('/').map(encodeURIComponent).join('/')}`;
  const local = path.join(tmp, String(idx));
  try {
    const bytes = await download(url, local);
    putToR2(local, objectKey, contentTypeFor(rel));
    fs.unlinkSync(local);
    ok++;
    if (ok % 25 === 0 || ok === keys.length) {
      console.log(`  ${ok}/${keys.length} uploaded (last ${rel}, ${bytes} bytes)`);
    }
  } catch (err) {
    fail++;
    failures.push({ rel, err: String(err.message || err) });
    console.error(`  FAIL ${rel}: ${err.message || err}`);
    try {
      fs.unlinkSync(local);
    } catch {
      // ignore
    }
  }
});

try {
  fs.rmSync(tmp, { recursive: true, force: true });
} catch {
  // ignore
}

console.log(`Done. ok=${ok} fail=${fail}`);
if (failures.length) {
  console.log('Failures:');
  for (const f of failures) console.log(`  ${f.rel}: ${f.err}`);
  process.exit(1);
}
