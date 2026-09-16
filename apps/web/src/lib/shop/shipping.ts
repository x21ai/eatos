import { queryOne } from '@/lib/db/client';

/** Default eatOS shop shipping rates (minor units). Admin-editable table can replace this later. */
export const SHIPPING_RATES = {
  domesticCountry: 'US',
  domesticFlatMinor: 999,
  domesticFreeOverMinor: 15000,
  internationalFlatMinor: 2499,
  internationalFreeOverMinor: 25000,
} as const;

export type ShippingAddressInput = {
  name?: string;
  line1?: string;
  line2?: string;
  city?: string;
  region?: string;
  postal?: string;
  country?: string;
  phone?: string;
};

export type CartLineForShipping = {
  variant_id: string;
  product_slug: string;
  quantity: number;
  unit_amount: number;
  currency: string;
};

export type ShippingQuoteResult = {
  requires_shipping: boolean;
  shipping_amount: number;
  currency: string;
  method: string;
  subtotal_shippable: number;
  subtotal_all: number;
};

export function normalizeCountry(raw: string | undefined | null): string {
  return (raw || '').trim().toUpperCase().slice(0, 2);
}

export async function variantRequiresShipping(
  variantId: string,
  productSlug: string,
): Promise<boolean> {
  if (variantId && !variantId.startsWith('default:')) {
    const row = await queryOne<{ requires_shipping: number }>(
      `SELECT requires_shipping FROM product_variants WHERE id = ? LIMIT 1`,
      [variantId],
    );
    if (row) return row.requires_shipping !== 0;
  }

  const slug =
    productSlug ||
    (variantId.startsWith('default:') ? variantId.slice('default:'.length) : '');
  if (!slug) return true;

  const fallback = await queryOne<{ requires_shipping: number }>(
    `SELECT requires_shipping FROM product_variants
      WHERE product_slug = ? ORDER BY position ASC LIMIT 1`,
    [slug],
  );
  if (fallback) return fallback.requires_shipping !== 0;
  return true;
}

export async function cartRequiresShipping(items: CartLineForShipping[]): Promise<boolean> {
  for (const item of items) {
    if (await variantRequiresShipping(item.variant_id, item.product_slug)) {
      return true;
    }
  }
  return false;
}

export function quoteShippingAmount(opts: {
  subtotalShippableMinor: number;
  country: string;
  currency?: string;
}): { amount: number; method: string } {
  const country = normalizeCountry(opts.country);
  const subtotal = Math.max(0, opts.subtotalShippableMinor);

  if (subtotal === 0) {
    return { amount: 0, method: 'digital' };
  }

  const domestic = country === SHIPPING_RATES.domesticCountry;
  const flat = domestic
    ? SHIPPING_RATES.domesticFlatMinor
    : SHIPPING_RATES.internationalFlatMinor;
  const freeOver = domestic
    ? SHIPPING_RATES.domesticFreeOverMinor
    : SHIPPING_RATES.internationalFreeOverMinor;

  if (subtotal >= freeOver) {
    return { amount: 0, method: domestic ? 'domestic_free' : 'international_free' };
  }

  return {
    amount: flat,
    method: domestic ? 'domestic_flat' : 'international_flat',
  };
}

export async function quoteCartShipping(
  items: CartLineForShipping[],
  country: string,
): Promise<ShippingQuoteResult> {
  const requiresShipping = await cartRequiresShipping(items);
  const currency = items[0]?.currency || 'USD';
  const subtotalAll = items.reduce((sum, i) => sum + i.unit_amount * i.quantity, 0);

  if (!requiresShipping) {
    return {
      requires_shipping: false,
      shipping_amount: 0,
      currency,
      method: 'none',
      subtotal_shippable: 0,
      subtotal_all: subtotalAll,
    };
  }

  let subtotalShippable = 0;
  for (const item of items) {
    if (await variantRequiresShipping(item.variant_id, item.product_slug)) {
      subtotalShippable += item.unit_amount * item.quantity;
    }
  }

  const { amount, method } = quoteShippingAmount({
    subtotalShippableMinor: subtotalShippable,
    country,
    currency,
  });

  return {
    requires_shipping: true,
    shipping_amount: amount,
    currency,
    method,
    subtotal_shippable: subtotalShippable,
    subtotal_all: subtotalAll,
  };
}

export function validateShippingAddress(
  address: ShippingAddressInput,
  required: boolean,
): string | null {
  if (!required) return null;

  const name = (address.name || '').trim();
  const line1 = (address.line1 || '').trim();
  const city = (address.city || '').trim();
  const region = (address.region || '').trim();
  const postal = (address.postal || '').trim();
  const country = normalizeCountry(address.country);

  if (!name) return 'Shipping name is required.';
  if (!line1) return 'Address line 1 is required.';
  if (!city) return 'City is required.';
  if (!region) return 'State / region is required.';
  if (!postal) return 'Postal code is required.';
  if (!country || country.length !== 2) return 'A two-letter country code is required.';

  return null;
}
