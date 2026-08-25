#!/usr/bin/env node
/**
 * Copy guard: fails the build if user-facing source contains an em dash "—".
 * Comment blocks are stripped before scanning, so code comments never fail.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('../apps/web/src', import.meta.url).pathname;
const EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mdx']);
const SKIP_DIRS = new Set(['node_modules', '.next', 'dist']);

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) out.push(...walk(full));
    else if (EXTENSIONS.has(full.slice(full.lastIndexOf('.')))) out.push(full);
  }
  return out;
}

function stripComments(source) {
  // Remove block comments and line comments (good enough for a copy lint).
  return source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');
}

let failures = 0;
for (const file of walk(ROOT)) {
  const text = stripComments(readFileSync(file, 'utf8'));
  const lines = text.split('\n');
  lines.forEach((line, i) => {
    if (line.includes('—')) {
      failures += 1;
      console.error(`em dash found: ${relative(ROOT, file)}:${i + 1}`);
      console.error(`  ${line.trim().slice(0, 120)}`);
    }
  });
}

if (failures > 0) {
  console.error(`\nCopy check failed: ${failures} em dash occurrence(s). Use a comma, colon, or hyphen instead.`);
  process.exit(1);
}
console.log('Copy check passed: no em dashes in user-facing source.');
