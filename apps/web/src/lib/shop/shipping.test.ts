import { describe, expect, it } from 'vitest';
import { quoteShippingAmount, SHIPPING_RATES } from './shipping';

describe('quoteShippingAmount', () => {
  it('returns zero for empty shippable subtotal (digital-only)', () => {
    expect(quoteShippingAmount({ subtotalShippableMinor: 0, country: 'US' })).toEqual({
      amount: 0,
      method: 'digital',
    });
  });

  it('applies domestic flat rate below free threshold', () => {
    expect(
      quoteShippingAmount({
        subtotalShippableMinor: SHIPPING_RATES.domesticFreeOverMinor - 1,
        country: 'us',
      }),
    ).toEqual({
      amount: SHIPPING_RATES.domesticFlatMinor,
      method: 'domestic_flat',
    });
  });

  it('waives domestic shipping at or above free threshold', () => {
    expect(
      quoteShippingAmount({
        subtotalShippableMinor: SHIPPING_RATES.domesticFreeOverMinor,
        country: 'US',
      }),
    ).toEqual({
      amount: 0,
      method: 'domestic_free',
    });
  });

  it('applies international flat rate for non-US destinations', () => {
    expect(
      quoteShippingAmount({
        subtotalShippableMinor: 5000,
        country: 'CA',
      }),
    ).toEqual({
      amount: SHIPPING_RATES.internationalFlatMinor,
      method: 'international_flat',
    });
  });
});
