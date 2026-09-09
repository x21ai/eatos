// Stripe helpers. Provider-specific surface stays in this folder.

export type CheckoutLine = {
  name: string;
  quantity: number;
  unitAmountMinor: number;
  currency: string;
  productSlug?: string;
};

function getStripeSecret() {
  return (
    process.env.STRIPE_SECRET_KEY ||
    process.env.STRIPE_API_KEY ||
    ''
  );
}

export function isStripeConfigured() {
  return Boolean(getStripeSecret());
}

export async function createCheckoutSession(opts: {
  orderId: string;
  orderNumber: string;
  email: string;
  lines: CheckoutLine[];
  successUrl: string;
  cancelUrl: string;
}) {
  const secret = getStripeSecret();
  if (!secret) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }

  // Lazy import so builds without the package still typecheck until install.
  const Stripe = (await import('stripe')).default;
  const stripe = new Stripe(secret);

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_email: opts.email,
    client_reference_id: opts.orderId,
    success_url: opts.successUrl,
    cancel_url: opts.cancelUrl,
    line_items: opts.lines.map((line) => ({
      quantity: line.quantity,
      price_data: {
        currency: line.currency.toLowerCase(),
        unit_amount: line.unitAmountMinor,
        product_data: {
          name: line.name,
          metadata: line.productSlug ? { product_slug: line.productSlug } : undefined,
        },
      },
    })),
    metadata: {
      order_id: opts.orderId,
      order_number: opts.orderNumber,
    },
  });

  return {
    id: session.id,
    url: session.url,
  };
}

export async function verifyStripeWebhook(rawBody: string, signature: string | null) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET || '';
  const apiKey = getStripeSecret();
  if (!secret || !apiKey) {
    throw new Error('Stripe webhook is not configured');
  }
  if (!signature) {
    throw new Error('Missing Stripe-Signature header');
  }
  const Stripe = (await import('stripe')).default;
  const stripe = new Stripe(apiKey);
  return stripe.webhooks.constructEvent(rawBody, signature, secret);
}
