import { describe, expect, it } from 'vitest';
import { StripeCheckoutError, STRIPE_CHECKOUT_TIMEOUT_MS } from './stripe';

describe('stripe checkout config', () => {
  it('uses a 15s checkout timeout budget', () => {
    expect(STRIPE_CHECKOUT_TIMEOUT_MS).toBe(15_000);
  });

  it('surfaces StripeCheckoutError codes for API responses', () => {
    const err = new StripeCheckoutError('stripe_timeout', 'Timed out');
    expect(err.code).toBe('stripe_timeout');
    expect(err.message).toBe('Timed out');
  });
});
