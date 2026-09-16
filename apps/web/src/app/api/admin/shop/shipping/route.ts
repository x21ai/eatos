import { fail, ok, readJson, moneyMinor } from '@/lib/api';
import { adminFail, requireCapability } from '@/lib/admin/guard';
import {
  getShippingRatesConfig,
  mergeShippingRates,
  saveShippingRatesConfig,
  type ShippingRatesConfig,
} from '@/lib/shop/shipping-config';

function toResponse(config: ShippingRatesConfig) {
  const currency = 'USD';
  return {
    domestic_country: config.domesticCountry,
    domestic_flat: moneyMinor(config.domesticFlatMinor, currency),
    domestic_free_over: moneyMinor(config.domesticFreeOverMinor, currency),
    international_flat: moneyMinor(config.internationalFlatMinor, currency),
    international_free_over: moneyMinor(config.internationalFreeOverMinor, currency),
    source: 'config',
  };
}

export async function GET(request: Request) {
  try {
    await requireCapability(request, 'shop:read');
  } catch (error) {
    return adminFail(error);
  }

  const config = await getShippingRatesConfig();
  return ok(toResponse(config));
}

export async function PUT(request: Request) {
  try {
    await requireCapability(request, 'shop:write');
  } catch (error) {
    return adminFail(error);
  }

  const body = (await readJson(request)) || {};

  const partial: Partial<ShippingRatesConfig> = {};

  if (typeof body.domestic_country === 'string') {
    partial.domesticCountry = body.domestic_country;
  }
  if (body.domestic_flat_minor != null) {
    partial.domesticFlatMinor = Number(body.domestic_flat_minor);
  } else if (body.domestic_flat?.amount != null) {
    partial.domesticFlatMinor = Number(body.domestic_flat.amount);
  }
  if (body.domestic_free_over_minor != null) {
    partial.domesticFreeOverMinor = Number(body.domestic_free_over_minor);
  } else if (body.domestic_free_over?.amount != null) {
    partial.domesticFreeOverMinor = Number(body.domestic_free_over.amount);
  }
  if (body.international_flat_minor != null) {
    partial.internationalFlatMinor = Number(body.international_flat_minor);
  } else if (body.international_flat?.amount != null) {
    partial.internationalFlatMinor = Number(body.international_flat.amount);
  }
  if (body.international_free_over_minor != null) {
    partial.internationalFreeOverMinor = Number(body.international_free_over_minor);
  } else if (body.international_free_over?.amount != null) {
    partial.internationalFreeOverMinor = Number(body.international_free_over.amount);
  }

  const merged = mergeShippingRates(partial);
  if (
    merged.domesticFlatMinor < 0 ||
    merged.domesticFreeOverMinor < 0 ||
    merged.internationalFlatMinor < 0 ||
    merged.internationalFreeOverMinor < 0
  ) {
    return fail('validation_failed', 'Shipping amounts must be zero or greater.');
  }

  try {
    const saved = await saveShippingRatesConfig(merged);
    return ok(toResponse(saved));
  } catch (error) {
    console.error('save shipping config failed', error);
    return fail('write_failed', 'Could not save shipping rates.', 500);
  }
}
