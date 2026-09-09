import { fail, ok, readJson } from '@/lib/api';
import { execute, queryOne } from '@/lib/db/client';

function toCollection(row: Record<string, any>) {
  return {
    slug: row.slug,
    title: row.title,
    description_html: row.description_html ?? '',
    image: row.image ?? null,
    position: row.position ?? 0,
  };
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const row = await queryOne<Record<string, any>>(`SELECT * FROM collections WHERE slug = ?`, [slug]);
  if (!row) return fail('not_found', 'Collection not found.', 404);
  return ok(toCollection(row));
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const existing = await queryOne<Record<string, any>>(`SELECT * FROM collections WHERE slug = ?`, [slug]);
  if (!existing) return fail('not_found', 'Collection not found.', 404);
  const body = (await readJson(request)) || {};
  const nextSlug = typeof body.new_slug === 'string' && body.new_slug.trim() ? body.new_slug.trim() : slug;
  try {
    await execute(
      `UPDATE collections SET slug = ?, title = ?, description_html = ?, image = ?, position = ?, updated_at = CURRENT_TIMESTAMP WHERE slug = ?`,
      [
        nextSlug,
        typeof body.title === 'string' ? body.title.trim() : existing.title,
        body.description_html !== undefined ? body.description_html : existing.description_html,
        body.image !== undefined ? body.image : existing.image,
        body.position !== undefined ? Number(body.position) || 0 : existing.position,
        slug,
      ],
    );
    if (nextSlug !== slug) {
      await execute(`UPDATE collection_products SET collection_slug = ? WHERE collection_slug = ?`, [
        nextSlug,
        slug,
      ]);
    }
    const row = await queryOne<Record<string, any>>(`SELECT * FROM collections WHERE slug = ?`, [nextSlug]);
    return ok(toCollection(row!));
  } catch (error) {
    return fail('write_failed', 'Could not update the collection.', 500);
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const existing = await queryOne(`SELECT slug FROM collections WHERE slug = ?`, [slug]);
  if (!existing) return fail('not_found', 'Collection not found.', 404);
  await execute(`DELETE FROM collection_products WHERE collection_slug = ?`, [slug]);
  await execute(`DELETE FROM collections WHERE slug = ?`, [slug]);
  return ok({ slug });
}
