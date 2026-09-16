import { execute, queryAll, queryOne } from '@/lib/db/client';
import { sendOrderConfirmation } from '@/lib/email/orders';
import { DEFAULT_LOCATION_ID } from '@/lib/shop/stock';

export type StripeWebhookOutcome =
  | { status: 'duplicate' }
  | { status: 'ignored' }
  | { status: 'already_paid' }
  | { status: 'paid'; orderId: string }
  | { status: 'received' };

export async function recordPaymentEvent(event: {
  id: string;
  type: string;
}): Promise<'inserted' | 'duplicate'> {
  const prior = await queryOne(`SELECT id FROM payment_events WHERE id = ?`, [event.id]);
  if (prior) return 'duplicate';

  try {
    await execute(
      `INSERT INTO payment_events (id, provider, type, payload) VALUES (?, 'stripe', ?, ?)`,
      [event.id, event.type, JSON.stringify({ type: event.type, id: event.id })],
    );
    return 'inserted';
  } catch {
    return 'duplicate';
  }
}

export async function decrementOrderInventory(orderId: string): Promise<void> {
  const items =
    (await queryAll<{ variant_id: string | null; quantity: number }>(
      `SELECT variant_id, quantity FROM order_items WHERE order_id = ?`,
      [orderId],
    )) || [];

  for (const item of items) {
    const variantId = item.variant_id;
    if (!variantId || variantId.startsWith('default:')) continue;

    const stock = await queryOne<{ quantity: number }>(
      `SELECT quantity FROM variant_stock WHERE variant_id = ? AND location_id = ?`,
      [variantId, DEFAULT_LOCATION_ID],
    );
    if (!stock) continue;

    const nextQty = Math.max(0, Number(stock.quantity) - Number(item.quantity || 0));
    await execute(
      `UPDATE variant_stock
          SET quantity = ?, updated_at = CURRENT_TIMESTAMP
        WHERE variant_id = ? AND location_id = ?`,
      [nextQty, variantId, DEFAULT_LOCATION_ID],
    );
  }
}

export async function markOrderPaidFromSession(session: {
  metadata?: { order_id?: string };
  client_reference_id?: string | null;
  payment_intent?: string | null;
  id: string;
}): Promise<'ignored' | 'already_paid' | 'paid'> {
  const orderId = session.metadata?.order_id || session.client_reference_id;
  if (!orderId) return 'ignored';

  const order = await queryOne<Record<string, unknown>>(`SELECT * FROM orders WHERE id = ?`, [
    orderId,
  ]);
  if (!order) return 'ignored';
  if (order.status === 'paid') return 'already_paid';

  await execute(
    `UPDATE orders
        SET status = 'paid',
            provider_payment_id = ?,
            paid_at = CURRENT_TIMESTAMP,
            updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`,
    [session.payment_intent || session.id, orderId],
  );

  await decrementOrderInventory(orderId);

  const items =
    (await queryAll<Record<string, unknown>>(
      `SELECT title, quantity, unit_amount FROM order_items WHERE order_id = ?`,
      [orderId],
    )) || [];

  try {
    await sendOrderConfirmation({
      to: String(order.email),
      orderNumber: String(order.order_number),
      totalMinor: Number(order.total_amount),
      currency: String(order.currency || 'USD'),
      items: items.map((i) => ({
        title: String(i.title),
        quantity: Number(i.quantity),
        unitAmountMinor: Number(i.unit_amount),
      })),
    });
  } catch (error) {
    console.error('order email failed', error);
  }

  return 'paid';
}

export async function handleStripeWebhookEvent(event: {
  id: string;
  type: string;
  data: { object: Record<string, unknown> };
}): Promise<StripeWebhookOutcome> {
  const recorded = await recordPaymentEvent(event);
  if (recorded === 'duplicate') {
    return { status: 'duplicate' };
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as {
      metadata?: { order_id?: string };
      client_reference_id?: string | null;
      payment_intent?: string | null;
      id: string;
    };
    const orderId = session.metadata?.order_id || session.client_reference_id || null;

    const result = await markOrderPaidFromSession(session);
    if (orderId && result === 'paid') {
      await execute(`UPDATE payment_events SET order_id = ? WHERE id = ?`, [orderId, event.id]);
      return { status: 'paid', orderId };
    }
    if (result === 'already_paid') return { status: 'already_paid' };
    if (result === 'ignored') return { status: 'ignored' };
  }

  return { status: 'received' };
}
