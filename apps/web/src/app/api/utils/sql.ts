/**
 * D1-backed SQL helper.
 *
 * Replaces the previous Neon (Postgres) tagged-template client. Preserves the
 * two call styles used across the codebase so callers need no changes:
 *   1. Tagged template:  sql`SELECT * FROM t WHERE id = ${id}`
 *   2. Positional:       sql("SELECT ... WHERE x = $1", [x])
 *
 * Both return a plain array of row objects (so `.length`, `[0]`, `.some()` keep
 * working like the Neon driver). The D1 binding is resolved lazily per call via
 * getCloudflareContext(), because Workers bindings only exist at request time.
 */
import { getCloudflareContext } from '@opennextjs/cloudflare';

type Row = Record<string, any>;

function getDb(): any {
  const { env } = getCloudflareContext();
  const db = (env as any).DB;
  if (!db) {
    throw new Error(
      'No D1 database binding `DB` was found. Check d1_databases in wrangler.jsonc.'
    );
  }
  return db;
}

async function runQuery(query: string, params: any[]): Promise<Row[]> {
  const db = getDb();
  // D1 (SQLite) rejects `undefined` bind values; coerce to null like Postgres.
  const safeParams = params.map((p) => (p === undefined ? null : p));
  const stmt = safeParams.length
    ? db.prepare(query).bind(...safeParams)
    : db.prepare(query);
  const { results } = await stmt.all();
  return (results ?? []) as Row[];
}

// Convert Postgres-style positional placeholders ($1, $2, ...) to SQLite `?`.
function toSqlitePlaceholders(query: string): string {
  return query.replace(/\$(\d+)/g, '?');
}

type SqlFn = {
  (strings: TemplateStringsArray, ...values: any[]): Promise<Row[]>;
  (query: string, params?: any[]): Promise<Row[]>;
  query: SqlFn;
};

const sql = ((first: any, ...rest: any[]): Promise<Row[]> => {
  // Tagged-template invocation: sql`... ${v} ...`
  if (Array.isArray(first) && Object.prototype.hasOwnProperty.call(first, 'raw')) {
    const strings = first as TemplateStringsArray;
    const values = rest;
    let query = '';
    strings.forEach((chunk, i) => {
      query += chunk;
      if (i < values.length) query += '?';
    });
    return runQuery(query, values);
  }

  // Positional invocation: sql("... $1 ...", [args])
  const query = toSqlitePlaceholders(String(first));
  const params = (rest[0] as any[]) ?? [];
  return runQuery(query, params);
}) as SqlFn;

sql.query = sql;

export default sql;
