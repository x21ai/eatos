import { fail, ok, readJson, moneyMinor } from '@/lib/api';
import { execute, queryAll, queryOne } from '@/lib/db/client';
import { adminFail, requireCapability } from '@/lib/admin/guard';

function toOrderDetail(row: Record<string, any>, items: Record<string, any>[]) {
  const currency = row.currency || 'USD';
  return {
    id: row.id,
    order_number: row.order_number,
    email: row.email,
    user_id: row.user_id ?? null,
    cart_id: row.cart_id ?? null,
    status: row.status,
    source: row.source || 'web',
    currency,
    subtotal: moneyMinor(row.subtotal_amount ?? 0, currency),
    shipping: moneyMinor(row.shipping_amount ?? 0, currency),
    tax: moneyMinor(row.tax_amount ?? 0, currency),
    discount: moneyMinor(row.discount_amount ?? 0, currency),
    discount_code: row.discount_code ?? null,
    total: moneyMinor(row.total_amount ?? 0, currency),
    shipping_name: row.shipping_name ?? null,
    shipping_line1: row.shipping_line1 ?? null,
    shipping_line2: row.shipping_line2 ?? null,
    shipping_city: row.shipping_city ?? null,
    shipping_region: row.shipping_region ?? null,
    shipping_postal: row.shipping_postal ?? null,
    shipping_country: row.shipping_country ?? null,
    shipping_phone: row.shipping_phone ?? null,
    provider: row.provider ?? null,
    provider_session_id: row.provider_session_id ?? null,
    provider_payment_id: row.provider_payment_id ?? null,
    created_at: row.created_at,
    updated_at: row.updated_at,
    paid_at: row.paid_at ?? null,
    items: items.map((i) => ({
      id: i.id,
      variant_id: i.variant_id ?? null,
      product_slug: i.product_slug,
      title: i.title,
      quantity: i.quantity,
      unit_price: moneyMinor(i.unit_amount ?? 0, i.currency || currency),
      line_total: moneyMinor((i.unit_amount ?? 0) * (i.quantity ?? 0), i.currency || currency),
    })),
  };
}

async function loadOrder(orderNumber: string) {
  const normalized = orderNumber.trim().toUpperCase();
  if (!normalized) return null;
  const order = await queryOne<Record<string, any>>(
    `SELECT * FROM orders WHERE order_number = ? LIMIT 1`,
    [normalized],
  );
  if (!order) return null;
  const items =
    (await queryAll<Record<string, any>>(
      `SELECT * FROM order_items WHERE order_id = ? ORDER BY title ASC`,
      [order.id],
    )) || [];
  return { order, items };
}

export async function GET(
  request: Request,
  context: { params: Promise<{ order_number: string }> },
) {
  try {
    await requireCapability(request, 'orders:read');
  } catch (error) {
    return adminFail(error);
  }

  const { order_number } = await context.params;
  const loaded = await loadOrder(order_number);
  if (!loaded) return fail('not_found', 'Order not found.', 404);
  return ok(toOrderDetail(loaded.order, loaded.items));
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ order_number: string }> },
) {
  try {
    await requireCapability(request, 'orders:manage');
  } catch (error) {
    return adminFail(error);
  }

  const { order_number } = await context.params;
  const body = (await readJson(request)) || {};
  const nextStatus = typeof body.status === 'string' ? body.status : '';

  const allowed = new Set(['fulfilled', 'cancelled', 'refunded']);
  if (!allowed.has(nextStatus)) {
    return fail(
      'validation_failed',
      "Supported status values: 'fulfilled', 'cancelled', 'refunded'.",
    );
  }

  const loaded = await loadOrder(order_number);
  if (!loaded) return fail('not_found', 'Order not found.', 404);

  const current = loaded.order.status;

  if (current === nextStatus) {
    return ok(toOrderDetail(loaded.order, loaded.items));
  }

  const transitions: Record<string, Set<string>> = {
    fulfilled: new Set(['paid']),
    cancelled: new Set(['pending', 'paid']),
    refunded: new Set(['paid', 'fulfilled']),
  };

  if (!transitions[nextStatus]?.has(current)) {
    return fail(
      'invalid_state',
      `Cannot change order from '${current}' to '${nextStatus}'.`,
      409,
    );
  }

  try {
    await execute(
      `UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE order_number = ?`,
      [nextStatus, loaded.order.order_number],
    );
  } catch (error) {
    console.error('update order status failed', error);
    return fail('write_failed', 'Could not update the order.', 500);
  }

  const refreshed = await loadOrder(loaded.order.order_number);
  if (!refreshed) return fail('not_found', 'Order not found after update.', 404);
  return ok(toOrderDetail(refreshed.order, refreshed.items));
}
