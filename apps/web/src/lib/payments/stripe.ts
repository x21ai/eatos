// Stripe helpers. Provider-specific surface stays in this folder.
// Secrets may live on process.env (local/Next) or the Worker binding (wrangler secret).

export type CheckoutLine = {
  name: string;
  quantity: number;
  unitAmountMinor: number;
  currency: string;
  productSlug?: string;
};

export class CheckoutLineError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CheckoutLineError';
  }
}

function trimSecret(value: string | undefined | null) {
  return (value || '').trim();
}

async function readWorkerSecret(name: string) {
  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare');
    const { env } = getCloudflareContext();
    const value = (env as Record<string, string | undefined> | undefined)?.[name];
    return trimSecret(value);
  } catch {
    return '';
  }
}

async function readSecret(...names: string[]) {
  for (const name of names) {
    const fromProcess = trimSecret(process.env[name]);
    if (fromProcess) return fromProcess;
  }
  for (const name of names) {
    const fromWorker = await readWorkerSecret(name);
    if (fromWorker) return fromWorker;
  }
  return '';
}

export async function getStripeSecret() {
  return readSecret('STRIPE_SECRET_KEY', 'STRIPE_API_KEY');
}

export async function isStripeConfigured() {
  return Boolean(await getStripeSecret());
}

export function toStripeLineItems(lines: CheckoutLine[]) {
  return lines.map((line) => {
    const unitAmount = Math.round(Number(line.unitAmountMinor));
    const quantity = Math.round(Number(line.quantity));
    if (!Number.isFinite(unitAmount) || unitAmount < 1) {
      throw new CheckoutLineError(`Invalid price for ${line.name || 'item'}.`);
    }
    if (!Number.isFinite(quantity) || quantity < 1) {
      throw new CheckoutLineError(`Invalid quantity for ${line.name || 'item'}.`);
    }
    const currency = String(line.currency || 'USD').toLowerCase();
    return {
      quantity,
      price_data: {
        currency,
        unit_amount: unitAmount,
        product_data: {
          name: line.name,
          ...(line.productSlug ? { metadata: { product_slug: line.productSlug } } : {}),
        },
      },
    };
  });
}

type StripeCtor = {
  new (key: string, config?: { httpClient?: unknown }): {
    checkout: {
      sessions: {
        create: (params: Record<string, unknown>) => Promise<{ id: string; url: string | null }>;
      };
    };
    webhooks: {
      constructEvent: (rawBody: string, signature: string, secret: string) => unknown;
    };
  };
  createFetchHttpClient?: () => unknown;
};

async function loadStripe(secret: string) {
  const stripeModule = await import('stripe');
  const Stripe = (stripeModule.default ?? stripeModule) as StripeCtor;
  // The Node HTTP client throws on the Cloudflare Worker. Fetch is the client
  // that can actually reach Stripe from this runtime.
  const httpClient =
    typeof Stripe.createFetchHttpClient === 'function' ? Stripe.createFetchHttpClient() : undefined;
  return new Stripe(secret, httpClient ? { httpClient } : undefined);
}

export function stripeFailureResponse(error: unknown): {
  status: number;
  code: string;
  message: string;
} {
  const type =
    (error as { type?: string; raw?: { type?: string } } | null)?.type ||
    (error as { raw?: { type?: string } } | null)?.raw?.type ||
    '';
  if (type === 'StripeAuthenticationError' || type === 'StripePermissionError') {
    return {
      status: 503,
      code: 'payments_unconfigured',
      message: 'Card payments are not configured yet. Set STRIPE_SECRET_KEY on the Worker.',
    };
  }
  if (error instanceof CheckoutLineError) {
    return { status: 400, code: 'validation_failed', message: error.message };
  }
  return {
    status: 502,
    code: 'checkout_failed',
    message: 'Could not start checkout. Please try again.',
  };
}

export async function createCheckoutSession(opts: {
  orderId: string;
  orderNumber: string;
  email: string;
  lines: CheckoutLine[];
  successUrl: string;
  cancelUrl: string;
}) {
  const secret = await getStripeSecret();
  if (!secret) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }

  const stripe = await loadStripe(secret);
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_email: opts.email,
    client_reference_id: opts.orderId,
    success_url: opts.successUrl,
    cancel_url: opts.cancelUrl,
    line_items: toStripeLineItems(opts.lines),
    metadata: {
      order_id: opts.orderId,
      order_number: opts.orderNumber,
    },
  });

  if (!session.url) {
    throw new Error('Stripe did not return a checkout URL');
  }

  return {
    id: session.id,
    url: session.url,
  };
}

export async function verifyStripeWebhook(rawBody: string, signature: string | null) {
  const secret = trimSecret(process.env.STRIPE_WEBHOOK_SECRET) || (await readSecret('STRIPE_WEBHOOK_SECRET'));
  const apiKey = await getStripeSecret();
  if (!secret || !apiKey) {
    throw new Error('Stripe webhook is not configured');
  }
  if (!signature) {
    throw new Error('Missing Stripe-Signature header');
  }
  const stripe = await loadStripe(apiKey);
  return stripe.webhooks.constructEvent(rawBody, signature, secret);
}
