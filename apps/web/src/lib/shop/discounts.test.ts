import { describe, expect, it } from 'vitest';
import {
  computeDiscountAmount,
  normalizeDiscountCode,
  validateDiscountForSubtotal,
} from './discounts';

describe('normalizeDiscountCode', () => {
  it('trims and uppercases codes', () => {
    expect(normalizeDiscountCode('  save10  ')).toBe('SAVE10');
  });
});

describe('computeDiscountAmount', () => {
  it('applies percentage discounts capped at subtotal', () => {
    expect(
      computeDiscountAmount({ type: 'percentage', amount: 10, subtotalMinor: 5000 }),
    ).toBe(500);
    expect(
      computeDiscountAmount({ type: 'percentage', amount: 150, subtotalMinor: 1000 }),
    ).toBe(1000);
  });

  it('applies fixed discounts capped at subtotal', () => {
    expect(
      computeDiscountAmount({ type: 'fixed', amount: 1500, subtotalMinor: 5000 }),
    ).toBe(1500);
    expect(
      computeDiscountAmount({ type: 'fixed', amount: 8000, subtotalMinor: 5000 }),
    ).toBe(5000);
  });

  it('returns zero for empty subtotal', () => {
    expect(
      computeDiscountAmount({ type: 'fixed', amount: 500, subtotalMinor: 0 }),
    ).toBe(0);
  });
});

describe('validateDiscountForSubtotal', () => {
  const baseRow = {
    code: 'WELCOME10',
    type: 'percentage' as const,
    amount: 10,
    min_subtotal_minor: 5000,
    expires_at: null,
    enabled: 1,
  };

  it('rejects disabled codes', () => {
    const result = validateDiscountForSubtotal(
      { ...baseRow, enabled: 0 },
      10000,
    );
    expect(result.valid).toBe(false);
  });

  it('rejects expired codes', () => {
    const result = validateDiscountForSubtotal(
      { ...baseRow, expires_at: '2020-01-01T00:00:00.000Z' },
      10000,
      new Date('2025-01-01'),
    );
    expect(result.valid).toBe(false);
  });

  it('rejects when minimum subtotal is not met', () => {
    const result = validateDiscountForSubtotal(baseRow, 4000);
    expect(result.valid).toBe(false);
  });

  it('returns discount amount when valid', () => {
    const result = validateDiscountForSubtotal(baseRow, 10000);
    expect(result).toEqual({
      valid: true,
      code: 'WELCOME10',
      type: 'percentage',
      discount_amount: 1000,
      subtotal_after: 9000,
    });
  });
});
