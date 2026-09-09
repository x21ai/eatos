import { fail, ok, moneyMinor, majorToMinor } from '@/lib/api';
import { queryAll } from '@/lib/db/client';

/** Public catalog for kiosk ordering. Prices as moneyMinor (same as cart). */
export async function GET() {
  const rows = await queryAll<Record<string, any>>(
    `SELECT
       p.slug AS product_slug,
       p.title AS product_title,
       v.id AS variant_id,
       v.title AS variant_title,
       COALESCE(v.price_amount, p.price_amount) AS price_amount,
       COALESCE(v.currency, p.currency, 'USD') AS currency
     FROM product_variants v
     INNER JOIN products p ON p.slug = v.product_slug
     WHERE p.available != 0
       AND v.available != 0
       AND p.status = 'published'
       AND COALESCE(v.price_amount, p.price_amount) IS NOT NULL
       AND COALESCE(v.price_amount, p.price_amount) > 0
     ORDER BY p.title ASC, v.position ASC, v.title ASC`,
  );

  if (rows === null) return fail('database_unavailable', 'Database unavailable.', 503);

  const data = rows.map((row) => {
    const currency = String(row.currency || 'USD');
    const major = Number(row.price_amount) || 0;
    const title =
      row.variant_title && row.variant_title !== 'Default'
        ? `${row.product_title} (${row.variant_title})`
        : String(row.product_title);
    return {
      slug: String(row.product_slug),
      title,
      variant_id: String(row.variant_id),
      variant_title: String(row.variant_title || 'Default'),
      price: moneyMinor(majorToMinor(major, currency), currency),
    };
  });

  return ok(data);
}
