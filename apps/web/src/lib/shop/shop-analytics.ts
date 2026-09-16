import { queryAll, queryOne } from '@/lib/db/client';

export type ShopAnalyticsPeriod = 7 | 30;

export type ShopAnalyticsSummary = {
  days: ShopAnalyticsPeriod;
  orders_count: number;
  paid_orders_count: number;
  revenue_minor: number;
  currency: string;
  top_products: Array<{
    product_slug: string;
    title: string;
    quantity: number;
    revenue_minor: number;
  }>;
  daily_revenue: Array<{
    date: string;
    orders: number;
    revenue_minor: number;
  }>;
};

function periodStart(days: ShopAnalyticsPeriod): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 19).replace('T', ' ');
}

export async function getShopAnalytics(days: ShopAnalyticsPeriod): Promise<ShopAnalyticsSummary> {
  const since = periodStart(days);

  const summary = await queryOne<{
    orders_count: number;
    paid_orders_count: number;
    revenue_minor: number;
    currency: string;
  }>(
    `SELECT
       COUNT(*) AS orders_count,
       SUM(CASE WHEN status IN ('paid', 'fulfilled') THEN 1 ELSE 0 END) AS paid_orders_count,
       COALESCE(SUM(CASE WHEN status IN ('paid', 'fulfilled') THEN total_amount ELSE 0 END), 0) AS revenue_minor,
       COALESCE(MIN(currency), 'USD') AS currency
     FROM orders
     WHERE datetime(created_at) >= datetime(?)`,
    [since],
  );

  const topProducts =
    (await queryAll<{
      product_slug: string;
      title: string;
      quantity: number;
      revenue_minor: number;
    }>(
      `SELECT
         oi.product_slug,
         MIN(oi.title) AS title,
         SUM(oi.quantity) AS quantity,
         SUM(oi.quantity * oi.unit_amount) AS revenue_minor
       FROM order_items oi
       INNER JOIN orders o ON o.id = oi.order_id
       WHERE o.status IN ('paid', 'fulfilled')
         AND datetime(o.created_at) >= datetime(?)
       GROUP BY oi.product_slug
       ORDER BY revenue_minor DESC
       LIMIT 10`,
      [since],
    )) || [];

  const dailyRows =
    (await queryAll<{ day: string; orders: number; revenue_minor: number }>(
      `SELECT
         date(o.created_at) AS day,
         COUNT(*) AS orders,
         COALESCE(SUM(CASE WHEN o.status IN ('paid', 'fulfilled') THEN o.total_amount ELSE 0 END), 0) AS revenue_minor
       FROM orders o
       WHERE datetime(o.created_at) >= datetime(?)
       GROUP BY date(o.created_at)
       ORDER BY day ASC`,
      [since],
    )) || [];

  return {
    days,
    orders_count: Number(summary?.orders_count ?? 0),
    paid_orders_count: Number(summary?.paid_orders_count ?? 0),
    revenue_minor: Number(summary?.revenue_minor ?? 0),
    currency: summary?.currency || 'USD',
    top_products: topProducts.map((p) => ({
      product_slug: p.product_slug,
      title: p.title,
      quantity: Number(p.quantity ?? 0),
      revenue_minor: Number(p.revenue_minor ?? 0),
    })),
    daily_revenue: dailyRows.map((r) => ({
      date: r.day,
      orders: Number(r.orders ?? 0),
      revenue_minor: Number(r.revenue_minor ?? 0),
    })),
  };
}
