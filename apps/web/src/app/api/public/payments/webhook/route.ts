import { fail, ok } from '@/lib/api';
import { execute, queryAll, queryOne } from '@/lib/db/client';
import { verifyStripeWebhook } from '@/lib/payments/stripe';
import { sendOrderConfirmation } from '@/lib/email/orders';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const signature = request.headers.get('stripe-signature');
  const rawBody = await request.text();

  let event: any;
  try {
    event = await verifyStripeWebhook(rawBody, signature);
  } catch (error: any) {
    console.error('webhook verify failed', error);
    return fail('invalid_signature', error?.message || 'Invalid webhook signature.', 400);
  }

  // Idempotency: skip if we already processed this event id.
  const prior = await queryOne(`SELECT id FROM payment_events WHERE id = ?`, [event.id]);
  if (prior) {
    return ok({ duplicate: true });
  }

  try {
    await execute(
      `INSERT INTO payment_events (id, provider, type, payload) VALUES (?, 'stripe', ?, ?)`,
      [event.id, event.type, JSON.stringify({ type: event.type, id: event.id })],
    );
  } catch {
    return ok({ duplicate: true });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const orderId = session.metadata?.order_id || session.client_reference_id;
    if (!orderId) return ok({ ignored: true });

    const order = await queryOne<Record<string, any>>(`SELECT * FROM orders WHERE id = ?`, [orderId]);
    if (!order) return ok({ ignored: true });
    if (order.status === 'paid') return ok({ already_paid: true });

    await execute(
      `UPDATE orders SET status = 'paid', provider_payment_id = ?, paid_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [session.payment_intent || session.id, orderId],
    );
    await execute(`UPDATE payment_events SET order_id = ? WHERE id = ?`, [orderId, event.id]);

    const items =
      (await queryAll<Record<string, any>>(
        `SELECT title, quantity, unit_amount FROM order_items WHERE order_id = ?`,
        [orderId],
      )) || [];

    try {
      await sendOrderConfirmation({
        to: order.email,
        orderNumber: order.order_number,
        totalMinor: order.total_amount,
        currency: order.currency,
        items: items.map((i) => ({
          title: i.title,
          quantity: i.quantity,
          unitAmountMinor: i.unit_amount,
        })),
      });
    } catch (error) {
      console.error('order email failed', error);
    }
  }

  return ok({ received: true });
}
