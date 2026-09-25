import { describe, expect, it } from 'vitest';
import { isMissingOrdersSourceColumn } from './orders';
import { CheckoutLineError, stripeFailureResponse, toStripeLineItems } from './stripe';

describe('checkout line items', () => {
  it('sends integer minor units Stripe will accept', () => {
    expect(
      toStripeLineItems([
        {
          name: 'Sunmi T2',
          quantity: 1.2,
          unitAmountMinor: 99900.4,
          currency: 'USD',
          productSlug: 'sunmi-t2-15-10-point-of-sale',
        },
      ]),
    ).toEqual([
      {
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: 99900,
          product_data: {
            name: 'Sunmi T2',
            metadata: { product_slug: 'sunmi-t2-15-10-point-of-sale' },
          },
        },
      },
    ]);
  });

  it('rejects a zero price instead of letting Stripe 500', () => {
    expect(() =>
      toStripeLineItems([
        { name: 'Quote', quantity: 1, unitAmountMinor: 0, currency: 'USD' },
      ]),
    ).toThrow(CheckoutLineError);
  });
});

describe('orders.source migration gap', () => {
  it('recognizes a D1 database that predates the source column', () => {
    expect(isMissingOrdersSourceColumn(new Error('D1_ERROR: table orders has no column named source'))).toBe(
      true,
    );
    expect(isMissingOrdersSourceColumn(new Error('no such column: source'))).toBe(true);
    expect(isMissingOrdersSourceColumn(new Error('UNIQUE constraint failed'))).toBe(false);
  });
});

describe('stripe failure mapping', () => {
  it('treats an authentication failure as payments not configured', () => {
    const failure = stripeFailureResponse({ type: 'StripeAuthenticationError', message: 'Invalid API Key' });
    expect(failure.status).toBe(503);
    expect(failure.code).toBe('payments_unconfigured');
  });

  it('does not report a generic 500 for a Stripe request failure', () => {
    const failure = stripeFailureResponse(new Error('fetch failed'));
    expect(failure.status).not.toBe(500);
    expect(failure.message).toMatch(/checkout/i);
  });
});
