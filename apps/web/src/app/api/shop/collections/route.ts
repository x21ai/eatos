import { fail, ok, okList, readJson } from '@/lib/api';
import { execute, queryAll, queryOne } from '@/lib/db/client';
import { adminFail, requireCapability } from '@/lib/admin/guard';


function toCollection(row: Record<string, any>) {
  return {
    slug: row.slug,
    title: row.title,
    description_html: row.description_html ?? '',
    image: row.image ?? null,
    position: row.position ?? 0,
  };
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const cursor = url.searchParams.get('cursor');
  const limit = Math.min(Math.max(parseInt(url.searchParams.get('limit') || '50', 10) || 50, 1), 100);
  const args: unknown[] = [];
  let clause = '';
  if (cursor) {
    clause = 'WHERE position > ?';
    args.push(Number(cursor) || 0);
  }
  const rows = await queryAll<Record<string, any>>(
    `SELECT * FROM collections ${clause} ORDER BY position ASC, title ASC LIMIT ?`,
    [...args, limit + 1],
  );
  if (rows === null) return fail('database_unavailable', 'Database unavailable.', 503);
  const hasMore = rows.length > limit;
  const page = hasMore ? rows.slice(0, limit) : rows;
  const next = hasMore ? String(page[page.length - 1]?.position ?? '') : null;
  return okList(page.map(toCollection), next, hasMore);
}

export async function POST(request: Request) {
  try {
    await requireCapability(request, 'shop:write');
  } catch (error) {
    return adminFail(error);
  }

  const body = (await readJson(request)) || {};
  const title = typeof body.title === 'string' ? body.title.trim() : '';
  let slug = typeof body.slug === 'string' ? body.slug.trim() : '';
  if (!title) return fail('validation_failed', 'title is required.');
  if (!slug) slug = `collection-${Date.now()}`;
  try {
    await execute(
      `INSERT INTO collections (slug, title, description_html, image, position) VALUES (?, ?, ?, ?, ?)`,
      [slug, title, body.description_html ?? '', body.image ?? null, Number(body.position) || 0],
    );
    const row = await queryOne<Record<string, any>>(`SELECT * FROM collections WHERE slug = ?`, [slug]);
    return ok(toCollection(row!), 201);
  } catch (error: any) {
    if (String(error?.message || error).includes('UNIQUE')) {
      return fail('conflict', 'A collection with that slug already exists.', 409);
    }
    return fail('write_failed', 'Could not create the collection.', 500);
  }
}
