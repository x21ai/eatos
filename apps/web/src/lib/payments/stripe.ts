// Stripe helpers. Provider-specific surface stays in this folder.

export type CheckoutLine = {
  name: string;
  quantity: number;
  unitAmountMinor: number;
  currency: string;
  productSlug?: string;
};

export const STRIPE_CHECKOUT_TIMEOUT_MS = 15_000;

export class StripeCheckoutError extends Error {
  readonly code: string;

  constructor(code: string, message: string) {
    super(message);
    this.name = 'StripeCheckoutError';
    this.code = code;
  }
}

async function resolveEnvSecret(...keys: string[]): Promise<string> {
  for (const key of keys) {
    const fromProcess = process.env[key];
    if (fromProcess) return fromProcess;
  }
  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare');
    const { env } = getCloudflareContext();
    const record = env as Record<string, string | undefined>;
    for (const key of keys) {
      const fromEnv = record?.[key];
      if (fromEnv) return fromEnv;
    }
  } catch {
    // Static build / prerender — no Cloudflare context.
  }
  return '';
}

async function getStripeSecret(): Promise<string> {
  return resolveEnvSecret('STRIPE_SECRET_KEY', 'STRIPE_API_KEY');
}

async function getStripeWebhookSecret(): Promise<string> {
  return resolveEnvSecret('STRIPE_WEBHOOK_SECRET');
}

export async function isStripeConfigured(): Promise<boolean> {
  return Boolean(await getStripeSecret());
}

type StripeClient = import('stripe').default;

let stripeClientPromise: Promise<StripeClient> | null = null;

/** Shared Stripe client for Workers / OpenNext — uses fetch, not Node http. */
async function getStripeClient(): Promise<StripeClient> {
  const secret = await getStripeSecret();
  if (!secret) {
    throw new StripeCheckoutError('payments_unconfigured', 'STRIPE_SECRET_KEY is not configured');
  }

  if (!stripeClientPromise) {
    stripeClientPromise = (async () => {
      const Stripe = (await import('stripe')).default;
      return new Stripe(secret, {
        httpClient: Stripe.createFetchHttpClient(),
        timeout: STRIPE_CHECKOUT_TIMEOUT_MS,
        maxNetworkRetries: 0,
      });
    })();
  }

  return stripeClientPromise;
}

function checkoutErrorFromUnknown(error: unknown): StripeCheckoutError {
  if (error instanceof StripeCheckoutError) return error;

  const message =
    error instanceof Error ? error.message : 'Payment provider did not respond in time.';
  const lower = message.toLowerCase();
  if (lower.includes('timeout') || lower.includes('timed out')) {
    return new StripeCheckoutError(
      'stripe_timeout',
      'Stripe did not respond in time. Your order was saved — please try checkout again.',
    );
  }

  return new StripeCheckoutError(
    'stripe_checkout_failed',
    'Could not start Stripe checkout. Your order was saved as pending — please try again.',
  );
}

export async function createCheckoutSession(opts: {
  orderId: string;
  orderNumber: string;
  email: string;
  lines: CheckoutLine[];
  shippingAmountMinor?: number;
  shippingLabel?: string;
  successUrl: string;
  cancelUrl: string;
}) {
  const stripe = await getStripeClient();

  const lineItems = opts.lines.map((line) => ({
    quantity: line.quantity,
    price_data: {
      currency: line.currency.toLowerCase(),
      unit_amount: line.unitAmountMinor,
      product_data: {
        name: line.name,
        metadata: line.productSlug ? { product_slug: line.productSlug } : undefined,
      },
    },
  }));

  const shippingMinor = Math.max(0, opts.shippingAmountMinor ?? 0);
  if (shippingMinor > 0) {
    const currency = (opts.lines[0]?.currency || 'USD').toLowerCase();
    lineItems.push({
      quantity: 1,
      price_data: {
        currency,
        unit_amount: shippingMinor,
        product_data: {
          name: opts.shippingLabel || 'Shipping',
          metadata: undefined,
        },
      },
    });
  }

  try {
    const session = await stripe.checkout.sessions.create(
      {
        mode: 'payment',
        customer_email: opts.email,
        client_reference_id: opts.orderId,
        success_url: opts.successUrl,
        cancel_url: opts.cancelUrl,
        line_items: lineItems,
        metadata: {
          order_id: opts.orderId,
          order_number: opts.orderNumber,
        },
      },
      { timeout: STRIPE_CHECKOUT_TIMEOUT_MS },
    );

    if (!session.url) {
      throw new StripeCheckoutError(
        'stripe_checkout_failed',
        'Stripe did not return a checkout URL.',
      );
    }

    return {
      id: session.id,
      url: session.url,
    };
  } catch (error) {
    throw checkoutErrorFromUnknown(error);
  }
}

export async function verifyStripeWebhook(rawBody: string, signature: string | null) {
  const secret = await getStripeWebhookSecret();
  const apiKey = await getStripeSecret();
  if (!secret || !apiKey) {
    throw new Error('Stripe webhook is not configured');
  }
  if (!signature) {
    throw new Error('Missing Stripe-Signature header');
  }
  const stripe = await getStripeClient();
  return stripe.webhooks.constructEvent(rawBody, signature, secret);
}
