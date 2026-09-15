import { parseJson, queryAll, queryOne } from '@/lib/db/client';
import {
  ensureVariantStockRows,
  getProductStockLevels,
  listStockLocations,
} from '@/lib/shop/stock';

export function toProduct(row: Record<string, unknown>) {
  return {
    slug: String(row.slug),
    title: String(row.title),
    vendor: row.vendor != null ? String(row.vendor) : null,
    product_type: row.product_type != null ? String(row.product_type) : null,
    tags: parseJson<string[]>(row.tags, []),
    description_html: row.description_html != null ? String(row.description_html) : '',
    price_amount: row.price_amount as number | null,
    compare_at_amount: row.compare_at_amount as number | null,
    currency: row.currency ? String(row.currency) : 'USD',
    available: row.available !== 0,
    status: row.status ? String(row.status) : 'draft',
    seo_title: row.seo_title != null ? String(row.seo_title) : null,
    seo_description: row.seo_description != null ? String(row.seo_description) : null,
    published_at: row.published_at != null ? String(row.published_at) : null,
    updated_at: row.updated_at != null ? String(row.updated_at) : null,
  };
}

function toVariant(row: Record<string, unknown>) {
  return {
    id: String(row.id),
    product_slug: String(row.product_slug),
    title: String(row.title),
    sku: row.sku != null ? String(row.sku) : null,
    price_amount: row.price_amount as number | null,
    compare_at_amount: row.compare_at_amount as number | null,
    currency: row.currency ? String(row.currency) : 'USD',
    available: row.available !== 0,
    requires_shipping: row.requires_shipping !== 0,
    options: parseJson<string[]>(row.options, []),
    image_url: row.image_url != null ? String(row.image_url) : null,
    position: Number(row.position ?? 0),
  };
}

function toImage(row: Record<string, unknown>) {
  return {
    id: Number(row.id),
    product_slug: String(row.product_slug),
    url: String(row.url),
    alt: row.alt != null ? String(row.alt) : null,
    width: row.width != null ? Number(row.width) : null,
    height: row.height != null ? Number(row.height) : null,
    position: Number(row.position ?? 0),
  };
}

export async function loadProductDetail(slug: string) {
  const row = await queryOne<Record<string, unknown>>(`SELECT * FROM products WHERE slug = ?`, [
    slug,
  ]);
  if (!row) return null;

  const [variants, images, locations, stockLevels] = await Promise.all([
    queryAll<Record<string, unknown>>(
      `SELECT * FROM product_variants WHERE product_slug = ? ORDER BY position ASC, title ASC`,
      [slug],
    ),
    queryAll<Record<string, unknown>>(
      `SELECT * FROM product_images WHERE product_slug = ? ORDER BY position ASC`,
      [slug],
    ),
    listStockLocations(),
    getProductStockLevels(slug),
  ]);

  const variantRows = (variants ?? []).map(toVariant);
  await ensureVariantStockRows(variantRows.map((v) => v.id));
  const refreshedStock = await getProductStockLevels(slug);

  const stockByVariant: Record<string, Record<string, number>> = {};
  for (const level of refreshedStock) {
    if (!stockByVariant[level.variant_id]) stockByVariant[level.variant_id] = {};
    stockByVariant[level.variant_id][level.location_id] = level.quantity;
  }

  return {
    ...toProduct(row),
    variants: variantRows,
    images: (images ?? []).map(toImage),
    stock_locations: locations,
    stock: stockByVariant,
  };
}
