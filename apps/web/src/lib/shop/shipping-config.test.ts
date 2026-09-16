import { describe, expect, it } from 'vitest';
import {
  DEFAULT_SHIPPING_RATES,
  mergeShippingRates,
  parseShippingRatesJson,
} from './shipping-config';
import { quoteShippingAmount } from './shipping';

describe('parseShippingRatesJson', () => {
  it('returns null for invalid JSON', () => {
    expect(parseShippingRatesJson('not-json')).toBeNull();
  });

  it('parses valid shipping config', () => {
    expect(
      parseShippingRatesJson(
        JSON.stringify({
          domesticCountry: 'US',
          domesticFlatMinor: 1200,
          domesticFreeOverMinor: 20000,
          internationalFlatMinor: 3000,
          internationalFreeOverMinor: 30000,
        }),
      ),
    ).toEqual({
      domesticCountry: 'US',
      domesticFlatMinor: 1200,
      domesticFreeOverMinor: 20000,
      internationalFlatMinor: 3000,
      internationalFreeOverMinor: 30000,
    });
  });

  it('rejects negative amounts', () => {
    expect(
      parseShippingRatesJson(JSON.stringify({ domesticFlatMinor: -1 })),
    ).toBeNull();
  });
});

describe('mergeShippingRates', () => {
  it('fills missing fields from defaults', () => {
    expect(mergeShippingRates({ domesticFlatMinor: 500 })).toEqual({
      ...DEFAULT_SHIPPING_RATES,
      domesticFlatMinor: 500,
    });
  });
});

describe('quoteShippingAmount with custom rates', () => {
  it('uses admin-configured domestic flat rate', () => {
    const rates = mergeShippingRates({ domesticFlatMinor: 500, domesticFreeOverMinor: 99999 });
    expect(
      quoteShippingAmount({
        subtotalShippableMinor: 1000,
        country: 'US',
        rates,
      }),
    ).toEqual({ amount: 500, method: 'domestic_flat' });
  });
});
