import { fail, ok, readJson, newId, moneyMinor } from '@/lib/api';
import { execute } from '@/lib/db/client';
import { getCartByToken, listCartItems } from '@/lib/shop/cart';
import { createCheckoutSession, isStripeConfigured } from '@/lib/payments/stripe';

function orderNumber() {
  const n = Date.now().toString(36).toUpperCase();
  return `EO-${n.slice(-8)}`;
}

function resolveSource(raw: unknown): 'web' | 'kiosk' {
  return raw === 'kiosk' ? 'kiosk' : 'web';
}

function resolveCheckoutEmail(opts: {
  source: 'web' | 'kiosk';
  email: string;
  deviceId: string;
}): string | null {
  if (opts.email && opts.email.includes('@')) return opts.email;
  if (opts.source !== 'kiosk') return null;
  if (opts.deviceId) return `kiosk+${opts.deviceId}@eatos.dev`;
  return 'kiosk@eatos.dev';
}

export async function POST(request: Request) {
  const body = (await readJson(request)) || {};
  const token = typeof body.cart_token === 'string' ? body.cart_token : '';
  const emailRaw = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const source = resolveSource(body.source);
  const deviceId =
    typeof body.device_id === 'string'
      ? body.device_id.trim()
      : typeof body.deviceId === 'string'
        ? body.deviceId.trim()
        : '';

  if (!token) return fail('validation_failed', 'cart_token is required.');

  const email = resolveCheckoutEmail({ source, email: emailRaw, deviceId });
  if (!email || !email.includes('@')) {
    return fail('validation_failed', 'A valid email is required.');
  }

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
         subtotal_amount, shipping_amount, tax_amount, total_amount, provider, source
       ) VALUES (?, ?, ?, ?, 'pending', ?, ?, 0, 0, ?, 'stripe', ?)`,
      [id, number, cart.id, email, currency, subtotal, subtotal, source],
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
    const successPath =
      source === 'kiosk'
        ? `/kiosk/receipt?order=${encodeURIComponent(number)}&email=${encodeURIComponent(email)}&paid=1`
        : `/order-status?order=${encodeURIComponent(number)}&email=${encodeURIComponent(email)}&paid=1`;
    const cancelPath = source === 'kiosk' ? '/kiosk?cancelled=1' : '/cart?cancelled=1';

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
      successUrl: `${origin}${successPath}`,
      cancelUrl: `${origin}${cancelPath}`,
    });

    await execute(
      `UPDATE orders SET provider_session_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [session.id, id],
    );

    return ok({
      order_id: id,
      order_number: number,
      checkout_url: session.url,
      source,
      email,
      total: moneyMinor(subtotal, currency),
    }, 201);
  } catch (error) {
    console.error('checkout failed', error);
    return fail('checkout_failed', 'Could not start checkout.', 500);
  }
}
