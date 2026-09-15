import { execute, queryAll, queryOne } from '@/lib/db/client';

export type StockLocation = {
  id: string;
  name: string;
  label: string | null;
  is_default: boolean;
};

export type VariantStockLevel = {
  variant_id: string;
  location_id: string;
  quantity: number;
};

export const DEFAULT_LOCATION_ID = 'primary';

export function toStockLocation(row: Record<string, unknown>): StockLocation {
  return {
    id: String(row.id),
    name: String(row.name),
    label: row.label != null ? String(row.label) : null,
    is_default: row.is_default !== 0,
  };
}

export async function listStockLocations(): Promise<StockLocation[]> {
  const rows = await queryAll<Record<string, unknown>>(
    `SELECT id, name, label, is_default FROM stock_locations ORDER BY is_default DESC, name ASC`,
  );
  return (rows ?? []).map(toStockLocation);
}

export async function ensureDefaultLocation(): Promise<StockLocation> {
  await execute(
    `INSERT OR IGNORE INTO stock_locations (id, name, label, is_default)
     VALUES (?, ?, ?, 1)`,
    [DEFAULT_LOCATION_ID, 'Primary', 'Main stock'],
  );
  const row = await queryOne<Record<string, unknown>>(
    `SELECT id, name, label, is_default FROM stock_locations WHERE id = ?`,
    [DEFAULT_LOCATION_ID],
  );
  return toStockLocation(row!);
}

export async function getProductStockLevels(productSlug: string): Promise<VariantStockLevel[]> {
  const rows = await queryAll<Record<string, unknown>>(
    `SELECT vs.variant_id, vs.location_id, vs.quantity
       FROM variant_stock vs
       JOIN product_variants pv ON pv.id = vs.variant_id
      WHERE pv.product_slug = ?`,
    [productSlug],
  );
  return (rows ?? []).map((row) => ({
    variant_id: String(row.variant_id),
    location_id: String(row.location_id),
    quantity: Number(row.quantity ?? 0),
  }));
}

export async function ensureVariantStockRows(variantIds: string[]): Promise<void> {
  if (variantIds.length === 0) return;
  await ensureDefaultLocation();
  const locations = await listStockLocations();
  for (const variantId of variantIds) {
    for (const location of locations) {
      await execute(
        `INSERT OR IGNORE INTO variant_stock (variant_id, location_id, quantity)
         VALUES (?, ?, 0)`,
        [variantId, location.id],
      );
    }
  }
}

export async function upsertVariantStockLevels(levels: VariantStockLevel[]): Promise<void> {
  for (const level of levels) {
    const quantity = Math.max(0, Math.floor(Number(level.quantity) || 0));
    await execute(
      `INSERT INTO variant_stock (variant_id, location_id, quantity, updated_at)
       VALUES (?, ?, ?, CURRENT_TIMESTAMP)
       ON CONFLICT(variant_id, location_id) DO UPDATE SET
         quantity = excluded.quantity,
         updated_at = CURRENT_TIMESTAMP`,
      [level.variant_id, level.location_id, quantity],
    );
  }
}

export async function createStockLocation(name: string, label?: string | null): Promise<StockLocation> {
  const id = `loc_${Date.now()}`;
  await execute(
    `INSERT INTO stock_locations (id, name, label, is_default) VALUES (?, ?, ?, 0)`,
    [id, name.trim(), label?.trim() || null],
  );
  const variants = await queryAll<{ id: string }>(`SELECT id FROM product_variants`);
  for (const variant of variants ?? []) {
    await execute(
      `INSERT OR IGNORE INTO variant_stock (variant_id, location_id, quantity) VALUES (?, ?, 0)`,
      [variant.id, id],
    );
  }
  const row = await queryOne<Record<string, unknown>>(
    `SELECT id, name, label, is_default FROM stock_locations WHERE id = ?`,
    [id],
  );
  return toStockLocation(row!);
}
