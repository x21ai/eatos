#!/usr/bin/env node
/**
 * Seed the first admin_users row from ADMIN_OWNER_EMAIL.
 * Looks up Better Auth `user` by email when present; otherwise stores email only
 * and fills user_id on first successful requireAdmin match path via email.
 *
 * Usage (never print the email in logs if sensitive — we log domain only):
 *   doppler run --project x21 --config prd_cloudflare -- node scripts/seed-admin-owner.mjs
 */
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const WEB = path.join(ROOT, "apps/web");
const email = (process.env.ADMIN_OWNER_EMAIL || "").trim().toLowerCase();
if (!email || !email.includes("@")) {
  console.error("Set ADMIN_OWNER_EMAIL to the owner account email.");
  process.exit(1);
}

const domain = email.split("@")[1] || "?";
console.log(`Seeding admin owner for *@${domain}`);

function wrangler(args) {
  const r = spawnSync(
    "npx",
    ["--yes", "wrangler@4", ...args],
    { cwd: WEB, encoding: "utf8", env: process.env },
  );
  if (r.status !== 0) {
    console.error(r.stdout || "");
    console.error(r.stderr || "");
    process.exit(r.status || 1);
  }
  return r.stdout || "";
}

const findOut = wrangler([
  "d1",
  "execute",
  "eatos-web-db",
  "--remote",
  "--json",
  "--command",
  `SELECT id, email FROM user WHERE lower(email) = '${email.replace(/'/g, "''")}' LIMIT 1`,
]);

let userId = email; // fallback key until they sign up
try {
  const parsed = JSON.parse(findOut);
  const row = parsed[0]?.results?.[0];
  if (row?.id) userId = row.id;
} catch {
  // keep email fallback
}

const sql = `INSERT INTO admin_users (user_id, email, role)
VALUES ('${String(userId).replace(/'/g, "''")}', '${email.replace(/'/g, "''")}', 'owner')
ON CONFLICT(email) DO UPDATE SET user_id = excluded.user_id, role = 'owner'`;

wrangler([
  "d1",
  "execute",
  "eatos-web-db",
  "--remote",
  "--command",
  sql,
]);

console.log("admin_users owner upserted.");
