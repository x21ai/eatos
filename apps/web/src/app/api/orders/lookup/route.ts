import { fail, ok, moneyMinor } from '@/lib/api';
import { queryAll, queryOne } from '@/lib/db/client';
import {
  lookupEmailCandidates,
  normalizeLookupEmail,
  normalizeOrderNumber,
} from '@/lib/shop/order-lookup';

async function findOrder(orderNumber: string, emailRaw: string) {
  const candidates = lookupEmailCandidates(emailRaw);
  for (const email of candidates) {
    const order = await queryOne<Record<string, any>>(
      `SELECT * FROM orders WHERE order_number = ? AND lower(email) = ? LIMIT 1`,
      [orderNumber, email],
    );
    if (order) return order;
  }
  return null;
}

function serializeOrder(order: Record<string, any>, items: Record<string, any>[]) {
  return {
    order_number: order.order_number,
    email: order.email,
    status: order.status,
    currency: order.currency,
    subtotal: moneyMinor(order.subtotal_amount, order.currency),
    shipping: moneyMinor(order.shipping_amount, order.currency),
    tax: moneyMinor(order.tax_amount, order.currency),
    total: moneyMinor(order.total_amount, order.currency),
    created_at: order.created_at,
    paid_at: order.paid_at,
    shipping_name: order.shipping_name ?? null,
    shipping_line1: order.shipping_line1 ?? null,
    shipping_line2: order.shipping_line2 ?? null,
    shipping_city: order.shipping_city ?? null,
    shipping_region: order.shipping_region ?? null,
    shipping_postal: order.shipping_postal ?? null,
    shipping_country: order.shipping_country ?? null,
    shipping_phone: order.shipping_phone ?? null,
    items: items.map((i) => ({
      product_slug: i.product_slug,
      title: i.title,
      quantity: i.quantity,
      unit_price: moneyMinor(i.unit_amount, i.currency),
      line_total: moneyMinor(i.unit_amount * i.quantity, i.currency),
    })),
  };
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const orderNumber = normalizeOrderNumber(
    url.searchParams.get('order') || url.searchParams.get('order_number') || '',
  );
  const emailRaw = url.searchParams.get('email') || '';

  if (!orderNumber || !normalizeLookupEmail(emailRaw)) {
    return fail('validation_failed', 'order and email query params are required.');
  }

  const order = await findOrder(orderNumber, emailRaw);
  if (!order) return fail('not_found', 'No order matched that number and email.', 404);

  const items =
    (await queryAll<Record<string, any>>(
      `SELECT product_slug, title, quantity, unit_amount, currency FROM order_items WHERE order_id = ?`,
      [order.id],
    )) || [];

  return ok(serializeOrder(order, items));
}
