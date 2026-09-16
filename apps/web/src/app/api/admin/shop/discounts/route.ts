import { fail, ok, readJson, newId, moneyMinor } from '@/lib/api';
import { execute, queryAll } from '@/lib/db/client';
import { adminFail, requireCapability } from '@/lib/admin/guard';
import { normalizeDiscountCode } from '@/lib/shop/discounts';

function toDiscount(row: Record<string, unknown>) {
  const currency = 'USD';
  const type = row.type === 'fixed' ? 'fixed' : 'percentage';
  return {
    id: row.id,
    code: row.code,
    type,
    amount: row.amount,
    amount_display:
      type === 'percentage'
        ? `${row.amount}%`
        : moneyMinor(Number(row.amount ?? 0), currency),
    min_subtotal: row.min_subtotal_minor
      ? moneyMinor(Number(row.min_subtotal_minor), currency)
      : null,
    expires_at: row.expires_at ?? null,
    enabled: row.enabled !== 0,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export async function GET(request: Request) {
  try {
    await requireCapability(request, 'shop:read');
  } catch (error) {
    return adminFail(error);
  }

  const rows =
    (await queryAll<Record<string, unknown>>(
      `SELECT * FROM discount_codes ORDER BY created_at DESC LIMIT 200`,
    )) || [];

  return ok(rows.map(toDiscount));
}

export async function POST(request: Request) {
  try {
    await requireCapability(request, 'shop:write');
  } catch (error) {
    return adminFail(error);
  }

  const body = (await readJson(request)) || {};
  const code = normalizeDiscountCode(typeof body.code === 'string' ? body.code : '');
  const type = body.type === 'fixed' ? 'fixed' : 'percentage';
  const amount = Number(body.amount);

  if (!code) return fail('validation_failed', 'code is required.');
  if (!Number.isFinite(amount) || amount <= 0) {
    return fail('validation_failed', 'amount must be a positive number.');
  }
  if (type === 'percentage' && amount > 100) {
    return fail('validation_failed', 'Percentage amount cannot exceed 100.');
  }

  const minSubtotal =
    body.min_subtotal_minor != null
      ? Number(body.min_subtotal_minor)
      : body.min_subtotal != null
        ? Math.round(Number(body.min_subtotal) * 100)
        : null;

  const expiresAt =
    typeof body.expires_at === 'string' && body.expires_at.trim()
      ? body.expires_at.trim()
      : null;

  const id = newId('disc');

  try {
    await execute(
      `INSERT INTO discount_codes (id, code, type, amount, min_subtotal_minor, expires_at, enabled)
       VALUES (?, ?, ?, ?, ?, ?, 1)`,
      [
        id,
        code,
        type,
        Math.round(amount),
        minSubtotal != null && Number.isFinite(minSubtotal) ? Math.round(minSubtotal) : null,
        expiresAt,
      ],
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : '';
    if (message.includes('UNIQUE')) {
      return fail('duplicate_code', 'A discount code with this value already exists.', 409);
    }
    console.error('create discount failed', error);
    return fail('write_failed', 'Could not create discount code.', 500);
  }

  return ok({ id, code, type, amount: Math.round(amount) }, 201);
}
