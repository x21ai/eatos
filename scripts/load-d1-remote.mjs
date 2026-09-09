#!/usr/bin/env node
/**
 * Load migrations + content seeds into the eatOS Cloudflare D1 database.
 *
 * Usage (from the repo root):
 *   node scripts/load-d1-remote.mjs            # live (remote) database
 *   node scripts/load-d1-remote.mjs --local    # local dev copy
 *   node scripts/load-d1-remote.mjs --seeds-only
 *   node scripts/load-d1-remote.mjs --migrations-only
 *
 * Requirements:
 *   - Cloudflare login: `npx wrangler login`  (or set CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID)
 *   - Run from the repo root; wrangler commands execute inside apps/web.
 *
 * Safe to re-run: every seed statement uses INSERT OR REPLACE / OR IGNORE,
 * so re-running updates existing rows instead of duplicating them.
 */

import { spawnSync } from "node:child_process";
import { readdirSync, existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const REPO_ROOT = process.cwd();
const WEB_DIR = path.join(REPO_ROOT, "apps", "web");
const SEED_DIR = path.join(REPO_ROOT, "seed", "d1");
const DB_NAME = "eatos-web-db";
const WRANGLER = "wrangler@4";

const args = process.argv.slice(2);
const isLocal = args.includes("--local");
const seedsOnly = args.includes("--seeds-only");
const migrationsOnly = args.includes("--migrations-only");
const scopeFlag = isLocal ? "--local" : "--remote";

if (!existsSync(WEB_DIR) || !existsSync(SEED_DIR)) {
  console.error(
    "Run this script from the repository root (apps/web and seed/d1 must exist).",
  );
  process.exit(1);
}

function runWrangler(wranglerArgs) {
  const result = spawnSync(
    "npx",
    ["--yes", WRANGLER, ...wranglerArgs],
    { cwd: WEB_DIR, stdio: "inherit", env: process.env },
  );
  return result.status === 0;
}

function applyMigrations() {
  console.log(`\n== Applying migrations (${isLocal ? "local" : "live"}) ==`);
  const ok = runWrangler(["d1", "migrations", "apply", DB_NAME, scopeFlag]);
  if (!ok) {
    console.error("Migrations failed. Fix the error above before seeding.");
    process.exit(1);
  }
}

function seedFiles() {
  return readdirSync(SEED_DIR)
    .filter((f) => f.endsWith(".sql"))
    .sort();
}

function loadSeeds() {
  const files = seedFiles();
  console.log(`\n== Loading ${files.length} seed files (${isLocal ? "local" : "live"}) ==`);
  const failed = [];

  files.forEach((file, index) => {
    const rel = path.relative(WEB_DIR, path.join(SEED_DIR, file));
    console.log(`[${index + 1}/${files.length}] ${file}`);
    const ok = runWrangler([
      "d1",
      "execute",
      DB_NAME,
      scopeFlag,
      "--file",
      rel,
      "--yes",
    ]);
    if (!ok) failed.push(file);
  });

  if (failed.length) {
    console.error(`\n${failed.length} seed file(s) failed:`);
    failed.forEach((f) => console.error(`  - ${f}`));
    console.error("Re-run the script; already-loaded rows are skipped safely.");
    process.exit(1);
  }
}

function verify() {
  // Table names match apps/web/migrations/0003_content.sql (not shop_* aliases).
  // Query one table at a time: D1 rejects large compound SELECTs.
  const checks = [
    ["posts", 966],
    ["news_posts", 97],
    ["products", 52],
    ["collections", 8],
    ["product_images", 59],
    ["product_variants", 120],
    ["collection_products", 38],
  ];

  console.log("\n== Verifying row counts ==");
  let mismatch = 0;
  for (const [table, expected] of checks) {
    const result = spawnSync(
      "npx",
      [
        "--yes",
        WRANGLER,
        "d1",
        "execute",
        DB_NAME,
        scopeFlag,
        "--json",
        "--command",
        `SELECT COUNT(*) AS n FROM ${table}`,
      ],
      { cwd: WEB_DIR, encoding: "utf8", env: process.env },
    );
    let actual = null;
    try {
      const parsed = JSON.parse(result.stdout || "[]");
      actual = parsed[0]?.results?.[0]?.n ?? null;
    } catch {
      actual = null;
    }
    const ok = actual === expected;
    if (!ok) mismatch++;
    console.log(
      `  ${table}: actual=${actual ?? "?"} expected=${expected}${ok ? "" : "  MISMATCH"}`,
    );
  }
  if (mismatch) {
    console.error(`\n${mismatch} table(s) below expected. Re-run the loader.`);
    process.exit(1);
  }
}

if (!seedsOnly) applyMigrations();
if (!migrationsOnly) loadSeeds();
verify();

console.log("\nDone.");
