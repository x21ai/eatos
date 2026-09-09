// Shared JSON API helpers for eatOS backend routes.

export function fail(code: string, message: string, status = 400) {
  return Response.json({ error: true, code, message }, { status });
}

export function ok(data: unknown, status = 200) {
  return Response.json({ data }, { status });
}

export function okList(
  data: unknown[],
  nextCursor: string | null,
  hasMore: boolean,
) {
  return Response.json({ data, next_cursor: nextCursor, has_more: hasMore });
}

export async function readJson(request: Request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

export function newId(prefix = '') {
  const id =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  return prefix ? `${prefix}_${id}` : id;
}

/** Catalog prices are major units (e.g. 59 = $59). Cart/order store minor units. */
export function majorToMinor(amount: number, currency = 'USD') {
  const zeroDecimal = new Set(['JPY', 'KRW']);
  if (zeroDecimal.has(currency.toUpperCase())) return Math.round(amount);
  return Math.round(amount * 100);
}

export function minorToMajor(amount: number, currency = 'USD') {
  const zeroDecimal = new Set(['JPY', 'KRW']);
  if (zeroDecimal.has(currency.toUpperCase())) return amount;
  return amount / 100;
}

export function moneyMinor(amount: number, currency = 'USD') {
  return { amount, currency: currency || 'USD' };
}
