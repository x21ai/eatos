// Shop product admin API (mirrors /api/blog list/create shape).
import { fail, ok, okList, readJson, newId } from '@/lib/api';
import { execute, queryAll, queryOne, parseJson } from '@/lib/db/client';
import { adminFail, requireAdmin } from '@/lib/admin/guard';


function toProduct(row: Record<string, any>) {
  return {
    slug: row.slug,
    title: row.title,
    vendor: row.vendor ?? null,
    product_type: row.product_type ?? null,
    tags: parseJson<string[]>(row.tags, []),
    description_html: row.description_html ?? '',
    price_amount: row.price_amount,
    compare_at_amount: row.compare_at_amount,
    currency: row.currency || 'USD',
    available: row.available !== 0,
    status: row.status || 'draft',
    published_at: row.published_at ?? null,
    updated_at: row.updated_at ?? null,
  };
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const status = url.searchParams.get('status');
  const search = (url.searchParams.get('search') || '').trim();
  const cursor = url.searchParams.get('cursor');
  const limit = Math.min(Math.max(parseInt(url.searchParams.get('limit') || '50', 10) || 50, 1), 100);

  const where: string[] = [];
  const args: unknown[] = [];
  if (status && status !== 'all') {
    where.push('status = ?');
    args.push(status);
  }
  if (search) {
    where.push('(title LIKE ? OR slug LIKE ?)');
    args.push(`%${search}%`, `%${search}%`);
  }
  if (cursor) {
    where.push('title > ?');
    args.push(cursor);
  }
  const clause = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const rows = await queryAll<Record<string, any>>(
    `SELECT * FROM products ${clause} ORDER BY title ASC LIMIT ?`,
    [...args, limit + 1],
  );
  if (rows === null) return fail('database_unavailable', 'Database unavailable.', 503);
  const hasMore = rows.length > limit;
  const page = hasMore ? rows.slice(0, limit) : rows;
  const next = hasMore ? page[page.length - 1]?.title ?? null : null;
  return okList(page.map(toProduct), next, hasMore);
}

export async function POST(request: Request) {
  try {
    await requireAdmin(request);
  } catch (error) {
    return adminFail(error);
  }

  const body = (await readJson(request)) || {};
  const title = typeof body.title === 'string' ? body.title.trim() : '';
  let slug = typeof body.slug === 'string' ? body.slug.trim() : '';
  if (!title) return fail('validation_failed', 'title is required.');
  if (!slug) slug = `product-${Date.now()}`;

  try {
    await execute(
      `INSERT INTO products (slug, title, vendor, product_type, tags, description_html, price_amount, compare_at_amount, currency, available, status, published_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        slug,
        title,
        body.vendor ?? null,
        body.product_type ?? null,
        JSON.stringify(Array.isArray(body.tags) ? body.tags : []),
        body.description_html ?? '',
        typeof body.price_amount === 'number' ? body.price_amount : null,
        typeof body.compare_at_amount === 'number' ? body.compare_at_amount : null,
        body.currency || 'USD',
        body.available === false ? 0 : 1,
        body.status || 'draft',
        body.published_at ?? null,
      ],
    );
    // Ensure a default variant for cart/checkout.
    await execute(
      `INSERT OR IGNORE INTO product_variants (id, product_slug, title, sku, price_amount, currency, available, requires_shipping, options, position)
       VALUES (?, ?, ?, ?, ?, ?, ?, 1, '[]', 0)`,
      [
        `default:${slug}`,
        slug,
        'Default',
        null,
        typeof body.price_amount === 'number' ? body.price_amount : null,
        body.currency || 'USD',
        body.available === false ? 0 : 1,
      ],
    );
    const row = await queryOne<Record<string, any>>(`SELECT * FROM products WHERE slug = ?`, [slug]);
    return ok(toProduct(row!), 201);
  } catch (error: any) {
    if (String(error?.message || error).includes('UNIQUE')) {
      return fail('conflict', 'A product with that slug already exists.', 409);
    }
    console.error('create product failed', error);
    return fail('write_failed', 'Could not create the product.', 500);
  }
}
