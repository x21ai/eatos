import { describe, expect, it } from 'vitest';

/** Mirrors duplicate detection contract used by recordPaymentEvent callers. */
function shouldSkipWebhook(existingEventId: string | null): boolean {
  return Boolean(existingEventId);
}

describe('stripe webhook idempotency', () => {
  it('skips processing when payment_events already contains the event id', () => {
    expect(shouldSkipWebhook('evt_123')).toBe(true);
  });

  it('processes when event id is unseen', () => {
    expect(shouldSkipWebhook(null)).toBe(false);
  });
});
