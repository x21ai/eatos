import { fail, ok, readJson } from '@/lib/api';
import { queryOne } from '@/lib/db/client';
import { adminFail, requireAdmin } from '@/lib/admin/guard';
import {
  ensureVariantStockRows,
  getProductStockLevels,
  listStockLocations,
  upsertVariantStockLevels,
  type VariantStockLevel,
} from '@/lib/shop/stock';

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  try {
    await requireAdmin(request);
  } catch (error) {
    return adminFail(error);
  }

  const { slug } = await context.params;
  const product = await queryOne(`SELECT slug FROM products WHERE slug = ?`, [slug]);
  if (!product) return fail('not_found', 'Product not found.', 404);

  const [locations, levels] = await Promise.all([
    listStockLocations(),
    getProductStockLevels(slug),
  ]);

  return ok({ locations, levels });
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  try {
    await requireAdmin(request);
  } catch (error) {
    return adminFail(error);
  }

  const { slug } = await context.params;
  const product = await queryOne(`SELECT slug FROM products WHERE slug = ?`, [slug]);
  if (!product) return fail('not_found', 'Product not found.', 404);

  const body = (await readJson(request)) || {};
  const rawLevels = Array.isArray(body.levels) ? body.levels : [];
  const levels: VariantStockLevel[] = [];

  for (const item of rawLevels) {
    if (!item || typeof item !== 'object') continue;
    const variant_id = typeof item.variant_id === 'string' ? item.variant_id.trim() : '';
    const location_id = typeof item.location_id === 'string' ? item.location_id.trim() : '';
    if (!variant_id || !location_id) continue;
    levels.push({
      variant_id,
      location_id,
      quantity: Number(item.quantity ?? 0),
    });
  }

  if (levels.length === 0) {
    return fail('validation_failed', 'levels array is required.');
  }

  const variantIds = [...new Set(levels.map((l) => l.variant_id))];
  await ensureVariantStockRows(variantIds);

  try {
    await upsertVariantStockLevels(levels);
    const updated = await getProductStockLevels(slug);
    return ok({ levels: updated });
  } catch (error) {
    console.error('patch product stock failed', error);
    return fail('write_failed', 'Could not update stock levels.', 500);
  }
}
