import { fail, ok, moneyMinor } from '@/lib/api';
import { adminFail, requireCapability } from '@/lib/admin/guard';
import { getShopAnalytics, type ShopAnalyticsPeriod } from '@/lib/shop/shop-analytics';

function parseDays(raw: string | null): ShopAnalyticsPeriod {
  const n = parseInt(raw || '7', 10);
  return n === 30 ? 30 : 7;
}

export async function GET(request: Request) {
  try {
    await requireCapability(request, 'orders:read');
  } catch (error) {
    return adminFail(error);
  }

  const url = new URL(request.url);
  const days = parseDays(url.searchParams.get('days'));

  try {
    const analytics = await getShopAnalytics(days);
    return ok({
      days: analytics.days,
      orders_count: analytics.orders_count,
      paid_orders_count: analytics.paid_orders_count,
      revenue: moneyMinor(analytics.revenue_minor, analytics.currency),
      top_products: analytics.top_products.map((p) => ({
        product_slug: p.product_slug,
        title: p.title,
        quantity: p.quantity,
        revenue: moneyMinor(p.revenue_minor, analytics.currency),
      })),
      daily_revenue: analytics.daily_revenue.map((d) => ({
        date: d.date,
        orders: d.orders,
        revenue: moneyMinor(d.revenue_minor, analytics.currency),
      })),
    });
  } catch (error) {
    console.error('shop analytics failed', error);
    return fail('read_failed', 'Could not load shop analytics.', 500);
  }
}
