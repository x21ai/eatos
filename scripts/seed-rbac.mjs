#!/usr/bin/env node
/**
 * Seed RBAC: ensure pmt@eatos.com is superadmin in admin_users.
 * Run after migrations (0011_rbac.sql).
 *
 * Usage:
 *   node scripts/seed-rbac.mjs
 *   doppler run --project x21 --config prd_cloudflare -- node scripts/seed-rbac.mjs
 *
 * Signup allowlist (no DB row required — enforced in auth hooks):
 *   - pmt@eigital.com
 *   - pmt@eatos.com
 *   - jaspreet.singh@eigital.com
 *
 * Only pmt@eatos.com receives superadmin. Other allowlisted emails can sign up
 * but need an admin invite (admin_users row) for /admin access.
 */
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const WEB = path.join(ROOT, 'apps/web');
const SUPERADMIN = 'pmt@eatos.com';

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

const email = SUPERADMIN;
const findOut = wrangler([
  'd1',
  'execute',
  'eatos-web-db',
  '--remote',
  '--json',
  '--command',
  `SELECT id FROM user WHERE lower(email) = '${email.replace(/'/g, "''")}' LIMIT 1`,
]);

let userId = email;
try {
  const parsed = JSON.parse(findOut);
  const row = parsed[0]?.results?.[0];
  if (row?.id) userId = row.id;
} catch {
  // keep email fallback until first sign-in
}

const sql = `INSERT INTO admin_users (user_id, email, role, roles)
VALUES (
  '${String(userId).replace(/'/g, "''")}',
  '${email}',
  'superadmin',
  '["superadmin"]'
)
ON CONFLICT(email) DO UPDATE SET
  user_id = excluded.user_id,
  role = 'superadmin',
  roles = '["superadmin"]'`;

wrangler(['d1', 'execute', 'eatos-web-db', '--remote', '--command', sql]);
console.log('Superadmin seeded for pmt@eatos.com');
