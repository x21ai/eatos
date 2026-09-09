import { fail, ok, readJson, newId, moneyMinor } from '@/lib/api';
import { execute, queryAll, queryOne } from '@/lib/db/client';
import { getCartByToken, listCartItems } from '@/lib/shop/cart';
import { createCheckoutSession, isStripeConfigured } from '@/lib/payments/stripe';

function orderNumber() {
  const n = Date.now().toString(36).toUpperCase();
  return `EO-${n.slice(-8)}`;
}

export async function POST(request: Request) {
  const body = (await readJson(request)) || {};
  const token = typeof body.cart_token === 'string' ? body.cart_token : '';
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (!token) return fail('validation_failed', 'cart_token is required.');
  if (!email || !email.includes('@')) return fail('validation_failed', 'A valid email is required.');

  const cart = await getCartByToken(token);
  if (!cart) return fail('not_found', 'Cart not found.', 404);
  const items = await listCartItems(cart.id);
  if (!items.length) return fail('cart_empty', 'Add at least one item before checkout.', 400);

  if (!isStripeConfigured()) {
    return fail(
      'payments_unconfigured',
      'Card payments are not configured yet. Set STRIPE_SECRET_KEY on the Worker.',
      503,
    );
  }

  const subtotal = items.reduce((s, i) => s + i.unit_amount * i.quantity, 0);
  const currency = items[0].currency || 'USD';
  const id = newId('ord');
  const number = orderNumber();

  try {
    await execute(
      `INSERT INTO orders (
         id, order_number, cart_id, email, status, currency,
         subtotal_amount, shipping_amount, tax_amount, total_amount, provider
       ) VALUES (?, ?, ?, ?, 'pending', ?, ?, 0, 0, ?, 'stripe')`,
      [id, number, cart.id, email, currency, subtotal, subtotal],
    );

    for (const item of items) {
      await execute(
        `INSERT INTO order_items (id, order_id, variant_id, product_slug, title, quantity, unit_amount, currency)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          newId('oi'),
          id,
          item.variant_id,
          item.product_slug,
          item.title,
          item.quantity,
          item.unit_amount,
          item.currency,
        ],
      );
    }

    const origin = new URL(request.url).origin;
    const session = await createCheckoutSession({
      orderId: id,
      orderNumber: number,
      email,
      lines: items.map((i) => ({
        name: i.title,
        quantity: i.quantity,
        unitAmountMinor: i.unit_amount,
        currency: i.currency,
        productSlug: i.product_slug,
      })),
      successUrl: `${origin}/order-status?order=${encodeURIComponent(number)}&email=${encodeURIComponent(email)}&paid=1`,
      cancelUrl: `${origin}/cart?cancelled=1`,
    });

    await execute(
      `UPDATE orders SET provider_session_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [session.id, id],
    );

    return ok({
      order_id: id,
      order_number: number,
      checkout_url: session.url,
      total: moneyMinor(subtotal, currency),
    }, 201);
  } catch (error) {
    console.error('checkout failed', error);
    return fail('checkout_failed', 'Could not start checkout.', 500);
  }
}
