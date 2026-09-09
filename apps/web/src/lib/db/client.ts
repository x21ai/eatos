// Cloudflare D1 read/write layer.
//
// The `DB` binding only exists while a request is being served, so every call
// resolves it lazily. During `next build` (static prerender) there is no
// binding: getDb() returns null and the callers fall back to the content that
// ships with the site, so pages always render.

type Row = Record<string, unknown>;

export async function getDb(): Promise<any | null> {
  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare');
    const { env } = getCloudflareContext();
    const db = (env as any)?.DB;
    return db ?? null;
  } catch {
    return null;
  }
}

export function isDbAvailable(db: unknown): boolean {
  return Boolean(db);
}

/** Run a SELECT and return the rows, or null when the database is unreachable. */
export async function queryAll<T = Row>(
  sql: string,
  params: unknown[] = []
): Promise<T[] | null> {
  const db = await getDb();
  if (!db) return null;
  try {
    const safe = params.map((p) => (p === undefined ? null : p));
    const stmt = safe.length ? db.prepare(sql).bind(...safe) : db.prepare(sql);
    const { results } = await stmt.all();
    return (results ?? []) as T[];
  } catch {
    return null;
  }
}

/** Run a SELECT expecting at most one row. */
export async function queryOne<T = Row>(
  sql: string,
  params: unknown[] = []
): Promise<T | null> {
  const rows = await queryAll<T>(sql, params);
  if (!rows || rows.length === 0) return null;
  return rows[0] ?? null;
}

/** Run an INSERT/UPDATE/DELETE. Throws when the database is unreachable. */
export async function execute(sql: string, params: unknown[] = []) {
  const db = await getDb();
  if (!db) throw new Error('No D1 database binding `DB` is available.');
  const safe = params.map((p) => (p === undefined ? null : p));
  const stmt = safe.length ? db.prepare(sql).bind(...safe) : db.prepare(sql);
  return stmt.run();
}

/** SQLite stores JSON as text. Parse defensively so a bad row never breaks a page. */
export function parseJson<T>(value: unknown, fallback: T): T {
  if (value === null || value === undefined) return fallback;
  if (typeof value !== 'string') return (value as T) ?? fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}
