import { describe, expect, it } from 'vitest';
import {
  lookupEmailCandidates,
  normalizeLookupEmail,
  normalizeOrderNumber,
} from './order-lookup';

describe('normalizeLookupEmail', () => {
  it('recovers plus-addressing when query decode turned + into space', () => {
    expect(normalizeLookupEmail('buy-smoke paid@eatos.dev')).toBe(
      'buy-smoke+paid@eatos.dev',
    );
  });

  it('leaves correctly decoded plus addresses unchanged', () => {
    expect(normalizeLookupEmail('buy-smoke+paid@eatos.dev')).toBe(
      'buy-smoke+paid@eatos.dev',
    );
  });

  it('trims and lowercases', () => {
    expect(normalizeLookupEmail('  Buy-Smoke+Paid@eatOS.dev  ')).toBe(
      'buy-smoke+paid@eatos.dev',
    );
  });

  it('handles multiple spaces in local part', () => {
    expect(normalizeLookupEmail('a b c@example.com')).toBe('a+b+c@example.com');
  });
});

describe('lookupEmailCandidates', () => {
  it('returns normalized first when decode mangled the address', () => {
    expect(lookupEmailCandidates('buy-smoke paid@eatos.dev')).toEqual([
      'buy-smoke+paid@eatos.dev',
      'buy-smoke paid@eatos.dev',
    ]);
  });

  it('returns a single candidate when already normalized', () => {
    expect(lookupEmailCandidates('buy-smoke+paid@eatos.dev')).toEqual([
      'buy-smoke+paid@eatos.dev',
    ]);
  });
});

describe('normalizeOrderNumber', () => {
  it('uppercases and trims order numbers', () => {
    expect(normalizeOrderNumber(' eo-mu428954 ')).toBe('EO-MU428954');
  });
});
