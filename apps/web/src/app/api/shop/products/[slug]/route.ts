import { fail, ok, readJson } from '@/lib/api';
import { execute, queryOne, parseJson } from '@/lib/db/client';

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

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const row = await queryOne<Record<string, any>>(`SELECT * FROM products WHERE slug = ?`, [slug]);
  if (!row) return fail('not_found', 'Product not found.', 404);
  return ok(toProduct(row));
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const existing = await queryOne<Record<string, any>>(`SELECT * FROM products WHERE slug = ?`, [slug]);
  if (!existing) return fail('not_found', 'Product not found.', 404);

  const body = (await readJson(request)) || {};
  const nextSlug = typeof body.new_slug === 'string' && body.new_slug.trim() ? body.new_slug.trim() : slug;
  const title = typeof body.title === 'string' ? body.title.trim() : existing.title;
  const tags = Array.isArray(body.tags) ? body.tags : parseJson(existing.tags, []);

  try {
    await execute(
      `UPDATE products SET
         slug = ?, title = ?, vendor = ?, product_type = ?, tags = ?, description_html = ?,
         price_amount = ?, compare_at_amount = ?, currency = ?, available = ?, status = ?,
         published_at = ?, updated_at = CURRENT_TIMESTAMP
       WHERE slug = ?`,
      [
        nextSlug,
        title,
        body.vendor !== undefined ? body.vendor : existing.vendor,
        body.product_type !== undefined ? body.product_type : existing.product_type,
        JSON.stringify(tags),
        body.description_html !== undefined ? body.description_html : existing.description_html,
        body.price_amount !== undefined ? body.price_amount : existing.price_amount,
        body.compare_at_amount !== undefined ? body.compare_at_amount : existing.compare_at_amount,
        body.currency || existing.currency || 'USD',
        body.available === false ? 0 : body.available === true ? 1 : existing.available,
        body.status || existing.status,
        body.published_at !== undefined ? body.published_at : existing.published_at,
        slug,
      ],
    );
    if (nextSlug !== slug) {
      await execute(`UPDATE product_variants SET product_slug = ? WHERE product_slug = ?`, [
        nextSlug,
        slug,
      ]);
      await execute(`UPDATE product_images SET product_slug = ? WHERE product_slug = ?`, [
        nextSlug,
        slug,
      ]);
      await execute(`UPDATE collection_products SET product_slug = ? WHERE product_slug = ?`, [
        nextSlug,
        slug,
      ]);
    }
    // Keep default variant price in sync when provided.
    if (typeof body.price_amount === 'number') {
      await execute(
        `UPDATE product_variants SET price_amount = ?, currency = ? WHERE id = ? OR (product_slug = ? AND title = 'Default')`,
        [body.price_amount, body.currency || existing.currency || 'USD', `default:${nextSlug}`, nextSlug],
      );
    }
    const row = await queryOne<Record<string, any>>(`SELECT * FROM products WHERE slug = ?`, [nextSlug]);
    return ok(toProduct(row!));
  } catch (error) {
    console.error('patch product failed', error);
    return fail('write_failed', 'Could not update the product.', 500);
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const existing = await queryOne(`SELECT slug FROM products WHERE slug = ?`, [slug]);
  if (!existing) return fail('not_found', 'Product not found.', 404);
  try {
    await execute(`DELETE FROM collection_products WHERE product_slug = ?`, [slug]);
    await execute(`DELETE FROM product_images WHERE product_slug = ?`, [slug]);
    await execute(`DELETE FROM product_variants WHERE product_slug = ?`, [slug]);
    await execute(`DELETE FROM products WHERE slug = ?`, [slug]);
    return ok({ slug });
  } catch (error) {
    console.error('delete product failed', error);
    return fail('write_failed', 'Could not delete the product.', 500);
  }
}
