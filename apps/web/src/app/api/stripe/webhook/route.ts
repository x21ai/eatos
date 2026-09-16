import { postStripeWebhook } from '@/lib/payments/stripe-webhook-request';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  return postStripeWebhook(request);
}
