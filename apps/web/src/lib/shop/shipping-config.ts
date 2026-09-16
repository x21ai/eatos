import { queryOne, execute } from '@/lib/db/client';
import { SHIPPING_RATES } from '@/lib/shop/shipping';

export type ShippingRatesConfig = {
  domesticCountry: string;
  domesticFlatMinor: number;
  domesticFreeOverMinor: number;
  internationalFlatMinor: number;
  internationalFreeOverMinor: number;
};

export const SHIPPING_SETTINGS_KEY = 'shipping_rates';

export const DEFAULT_SHIPPING_RATES: ShippingRatesConfig = {
  domesticCountry: SHIPPING_RATES.domesticCountry,
  domesticFlatMinor: SHIPPING_RATES.domesticFlatMinor,
  domesticFreeOverMinor: SHIPPING_RATES.domesticFreeOverMinor,
  internationalFlatMinor: SHIPPING_RATES.internationalFlatMinor,
  internationalFreeOverMinor: SHIPPING_RATES.internationalFreeOverMinor,
};

export function parseShippingRatesJson(raw: string | null | undefined): ShippingRatesConfig | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<ShippingRatesConfig>;
    if (typeof parsed !== 'object' || parsed === null) return null;

    const domesticCountry =
      typeof parsed.domesticCountry === 'string'
        ? parsed.domesticCountry.trim().toUpperCase().slice(0, 2)
        : DEFAULT_SHIPPING_RATES.domesticCountry;

    const domesticFlatMinor = Number(parsed.domesticFlatMinor);
    const domesticFreeOverMinor = Number(parsed.domesticFreeOverMinor);
    const internationalFlatMinor = Number(parsed.internationalFlatMinor);
    const internationalFreeOverMinor = Number(parsed.internationalFreeOverMinor);

    if (
      !Number.isFinite(domesticFlatMinor) ||
      !Number.isFinite(domesticFreeOverMinor) ||
      !Number.isFinite(internationalFlatMinor) ||
      !Number.isFinite(internationalFreeOverMinor) ||
      domesticFlatMinor < 0 ||
      domesticFreeOverMinor < 0 ||
      internationalFlatMinor < 0 ||
      internationalFreeOverMinor < 0
    ) {
      return null;
    }

    return {
      domesticCountry: domesticCountry || DEFAULT_SHIPPING_RATES.domesticCountry,
      domesticFlatMinor: Math.round(domesticFlatMinor),
      domesticFreeOverMinor: Math.round(domesticFreeOverMinor),
      internationalFlatMinor: Math.round(internationalFlatMinor),
      internationalFreeOverMinor: Math.round(internationalFreeOverMinor),
    };
  } catch {
    return null;
  }
}

export function mergeShippingRates(
  partial: Partial<ShippingRatesConfig> | null | undefined,
): ShippingRatesConfig {
  const base = DEFAULT_SHIPPING_RATES;
  if (!partial) return { ...base };

  return {
    domesticCountry:
      typeof partial.domesticCountry === 'string'
        ? partial.domesticCountry.trim().toUpperCase().slice(0, 2) || base.domesticCountry
        : base.domesticCountry,
    domesticFlatMinor:
      typeof partial.domesticFlatMinor === 'number' && partial.domesticFlatMinor >= 0
        ? Math.round(partial.domesticFlatMinor)
        : base.domesticFlatMinor,
    domesticFreeOverMinor:
      typeof partial.domesticFreeOverMinor === 'number' && partial.domesticFreeOverMinor >= 0
        ? Math.round(partial.domesticFreeOverMinor)
        : base.domesticFreeOverMinor,
    internationalFlatMinor:
      typeof partial.internationalFlatMinor === 'number' && partial.internationalFlatMinor >= 0
        ? Math.round(partial.internationalFlatMinor)
        : base.internationalFlatMinor,
    internationalFreeOverMinor:
      typeof partial.internationalFreeOverMinor === 'number' && partial.internationalFreeOverMinor >= 0
        ? Math.round(partial.internationalFreeOverMinor)
        : base.internationalFreeOverMinor,
  };
}

export async function getShippingRatesConfig(): Promise<ShippingRatesConfig> {
  try {
    const row = await queryOne<{ value_json: string }>(
      `SELECT value_json FROM shop_settings WHERE key = ? LIMIT 1`,
      [SHIPPING_SETTINGS_KEY],
    );
    const parsed = parseShippingRatesJson(row?.value_json);
    if (parsed) return parsed;
  } catch {
    // Table may not exist before migration — fall back to code defaults.
  }
  return { ...DEFAULT_SHIPPING_RATES };
}

export async function saveShippingRatesConfig(
  config: ShippingRatesConfig,
): Promise<ShippingRatesConfig> {
  const merged = mergeShippingRates(config);
  const payload = JSON.stringify(merged);
  await execute(
    `INSERT INTO shop_settings (key, value_json, updated_at)
     VALUES (?, ?, CURRENT_TIMESTAMP)
     ON CONFLICT(key) DO UPDATE SET value_json = excluded.value_json, updated_at = CURRENT_TIMESTAMP`,
    [SHIPPING_SETTINGS_KEY, payload],
  );
  return merged;
}
