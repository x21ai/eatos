import { fail, ok, readJson, newId, moneyMinor } from '@/lib/api';
import { execute } from '@/lib/db/client';
import { getCartByToken, listCartItems } from '@/lib/shop/cart';
import {
  createCheckoutSession,
  isStripeConfigured,
  StripeCheckoutError,
} from '@/lib/payments/stripe';
import {
  quoteCartShipping,
  validateShippingAddress,
  normalizeCountry,
  type ShippingAddressInput,
} from '@/lib/shop/shipping';
import { getShippingRatesConfig } from '@/lib/shop/shipping-config';
import {
  loadDiscountByCode,
  normalizeDiscountCode,
  recordDiscountRedemption,
  validateDiscountForSubtotal,
} from '@/lib/shop/discounts';

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

function parseShipping(body: Record<string, unknown>): ShippingAddressInput {
  const nested =
    body.shipping && typeof body.shipping === 'object' && !Array.isArray(body.shipping)
      ? (body.shipping as Record<string, unknown>)
      : body;

  return {
    name: typeof nested.name === 'string' ? nested.name : typeof nested.shipping_name === 'string' ? nested.shipping_name : '',
    line1:
      typeof nested.line1 === 'string'
        ? nested.line1
        : typeof nested.shipping_line1 === 'string'
          ? nested.shipping_line1
          : '',
    line2:
      typeof nested.line2 === 'string'
        ? nested.line2
        : typeof nested.shipping_line2 === 'string'
          ? nested.shipping_line2
          : '',
    city:
      typeof nested.city === 'string'
        ? nested.city
        : typeof nested.shipping_city === 'string'
          ? nested.shipping_city
          : '',
    region:
      typeof nested.region === 'string'
        ? nested.region
        : typeof nested.shipping_region === 'string'
          ? nested.shipping_region
          : '',
    postal:
      typeof nested.postal === 'string'
        ? nested.postal
        : typeof nested.shipping_postal === 'string'
          ? nested.shipping_postal
          : '',
    country:
      typeof nested.country === 'string'
        ? nested.country
        : typeof nested.shipping_country === 'string'
          ? nested.shipping_country
          : 'US',
    phone:
      typeof nested.phone === 'string'
        ? nested.phone
        : typeof nested.shipping_phone === 'string'
          ? nested.shipping_phone
          : '',
  };
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
  const shipping = parseShipping(body);

  if (!token) return fail('validation_failed', 'cart_token is required.');

  const email = resolveCheckoutEmail({ source, email: emailRaw, deviceId });
  if (!email || !email.includes('@')) {
    return fail('validation_failed', 'A valid email is required.');
  }

  const cart = await getCartByToken(token);
  if (!cart) return fail('not_found', 'Cart not found.', 404);
  const items = await listCartItems(cart.id);
  if (!items.length) return fail('cart_empty', 'Add at least one item before checkout.', 400);

  if (!(await isStripeConfigured())) {
    return fail(
      'payments_unconfigured',
      'Card payments are not configured yet. Set STRIPE_SECRET_KEY on the Worker.',
      503,
    );
  }

  const country = normalizeCountry(shipping.country || 'US');
  const rates = await getShippingRatesConfig();
  const quote = await quoteCartShipping(items, country, rates);
  const addressError = validateShippingAddress(shipping, quote.requires_shipping);
  if (addressError) return fail('validation_failed', addressError);

  const subtotal = items.reduce((s, i) => s + i.unit_amount * i.quantity, 0);

  const discountCodeRaw =
    typeof body.discount_code === 'string' ? normalizeDiscountCode(body.discount_code) : '';
  let discountAmount = 0;
  let appliedDiscountCode: string | null = null;
  let discountCodeId: string | null = null;

  if (discountCodeRaw) {
    const discountRow = await loadDiscountByCode(discountCodeRaw);
    if (!discountRow) {
      return fail('invalid_discount', 'Discount code not found.', 400);
    }
    const validation = validateDiscountForSubtotal(discountRow, subtotal);
    if (!validation.valid) {
      return fail('invalid_discount', validation.reason || 'Invalid discount code.', 400);
    }
    discountAmount = validation.discount_amount ?? 0;
    appliedDiscountCode = discountRow.code;
    discountCodeId = discountRow.id;
  }

  const shippingAmount = quote.shipping_amount;
  const total = Math.max(0, subtotal - discountAmount + shippingAmount);
  const currency = items[0].currency || 'USD';
  const id = newId('ord');
  const number = orderNumber();

  try {
    await execute(
      `INSERT INTO orders (
         id, order_number, cart_id, email, status, currency,
         subtotal_amount, shipping_amount, tax_amount, total_amount,
         discount_code, discount_amount,
         shipping_name, shipping_line1, shipping_line2,
         shipping_city, shipping_region, shipping_postal, shipping_country,
         shipping_phone, provider, source
       ) VALUES (?, ?, ?, ?, 'pending', ?, ?, ?, 0, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'stripe', ?)`,
      [
        id,
        number,
        cart.id,
        email,
        currency,
        subtotal,
        shippingAmount,
        total,
        appliedDiscountCode,
        discountAmount,
        quote.requires_shipping ? (shipping.name || '').trim() || null : null,
        quote.requires_shipping ? (shipping.line1 || '').trim() || null : null,
        quote.requires_shipping ? (shipping.line2 || '').trim() || null : null,
        quote.requires_shipping ? (shipping.city || '').trim() || null : null,
        quote.requires_shipping ? (shipping.region || '').trim() || null : null,
        quote.requires_shipping ? (shipping.postal || '').trim() || null : null,
        quote.requires_shipping ? country : null,
        quote.requires_shipping ? (shipping.phone || '').trim() || null : null,
        source,
      ],
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

    if (discountCodeId && discountAmount > 0) {
      await recordDiscountRedemption({
        discountCodeId,
        orderId: id,
        email,
        amountSavedMinor: discountAmount,
      });
    }

    const origin = new URL(request.url).origin;
    const successPath =
      source === 'kiosk'
        ? `/kiosk/receipt?order=${encodeURIComponent(number)}&email=${encodeURIComponent(email)}&paid=1`
        : `/order-status?order=${encodeURIComponent(number)}&email=${encodeURIComponent(email)}&paid=1`;
    const cancelPath = source === 'kiosk' ? '/kiosk?cancelled=1' : '/checkout?cancelled=1';

    let session;
    try {
      session = await createCheckoutSession({
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
        shippingAmountMinor: shippingAmount,
        shippingLabel: quote.method.includes('free') ? 'Shipping (free)' : 'Shipping',
        discountAmountMinor: discountAmount,
        discountCode: appliedDiscountCode || undefined,
        successUrl: `${origin}${successPath}`,
        cancelUrl: `${origin}${cancelPath}`,
      });
    } catch (error) {
      console.error('stripe checkout session failed', error);
      const stripeError =
        error instanceof StripeCheckoutError
          ? error
          : new StripeCheckoutError(
              'stripe_checkout_failed',
              'Could not start Stripe checkout. Your order was saved as pending — please try again.',
            );
      return Response.json(
        {
          error: true,
          code: stripeError.code,
          message: stripeError.message,
          order_id: id,
          order_number: number,
        },
        { status: 502 },
      );
    }

    await execute(
      `UPDATE orders SET provider_session_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [session.id, id],
    );

    return ok(
      {
        order_id: id,
        order_number: number,
        checkout_url: session.url,
        source,
        email,
        requires_shipping: quote.requires_shipping,
        subtotal: moneyMinor(subtotal, currency),
        discount: moneyMinor(discountAmount, currency),
        discount_code: appliedDiscountCode,
        shipping: moneyMinor(shippingAmount, currency),
        total: moneyMinor(total, currency),
      },
      201,
    );
  } catch (error) {
    console.error('checkout failed', error);
    return fail('checkout_failed', 'Could not start checkout.', 500);
  }
}
