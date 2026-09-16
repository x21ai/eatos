import { fail, ok } from '@/lib/api';
import { verifyStripeWebhook } from '@/lib/payments/stripe';
import { handleStripeWebhookEvent } from '@/lib/payments/stripe-webhook';

export async function postStripeWebhook(request: Request) {
  const signature = request.headers.get('stripe-signature');
  const rawBody = await request.text();

  let event: { id: string; type: string; data: { object: Record<string, unknown> } };
  try {
    event = (await verifyStripeWebhook(rawBody, signature)) as unknown as typeof event;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Invalid webhook signature.';
    console.error('stripe webhook verify failed', error);
    return fail('invalid_signature', message, 400);
  }

  try {
    const outcome = await handleStripeWebhookEvent(event);
    switch (outcome.status) {
      case 'duplicate':
        return ok({ duplicate: true });
      case 'ignored':
        return ok({ ignored: true });
      case 'already_paid':
        return ok({ already_paid: true });
      case 'paid':
        return ok({ received: true, order_id: outcome.orderId });
      default:
        return ok({ received: true });
    }
  } catch (error) {
    console.error('stripe webhook handler failed', error);
    return fail('webhook_failed', 'Could not process webhook.', 500);
  }
}
