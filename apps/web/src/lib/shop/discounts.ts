import { newId } from '@/lib/api';
import { queryOne, execute } from '@/lib/db/client';

export type DiscountType = 'percentage' | 'fixed';

export type DiscountCodeRow = {
  id: string;
  code: string;
  type: DiscountType;
  amount: number;
  min_subtotal_minor: number | null;
  expires_at: string | null;
  enabled: number;
};

export type DiscountValidation = {
  valid: boolean;
  reason?: string;
  code?: string;
  type?: DiscountType;
  discount_amount?: number;
  subtotal_after?: number;
};

export function normalizeDiscountCode(raw: string): string {
  return raw.trim().toUpperCase();
}

export function computeDiscountAmount(opts: {
  type: DiscountType;
  amount: number;
  subtotalMinor: number;
}): number {
  const subtotal = Math.max(0, opts.subtotalMinor);
  if (subtotal === 0) return 0;

  if (opts.type === 'percentage') {
    const pct = Math.min(100, Math.max(0, Math.round(opts.amount)));
    return Math.min(subtotal, Math.round((subtotal * pct) / 100));
  }

  const fixed = Math.max(0, Math.round(opts.amount));
  return Math.min(subtotal, fixed);
}

export function validateDiscountForSubtotal(
  row: Pick<DiscountCodeRow, 'code' | 'type' | 'amount' | 'min_subtotal_minor' | 'expires_at' | 'enabled'>,
  subtotalMinor: number,
  now = new Date(),
): DiscountValidation {
  if (!row.enabled) {
    return { valid: false, reason: 'This discount code is no longer active.' };
  }

  if (row.expires_at) {
    const expires = new Date(row.expires_at);
    if (!Number.isNaN(expires.getTime()) && expires.getTime() < now.getTime()) {
      return { valid: false, reason: 'This discount code has expired.' };
    }
  }

  const subtotal = Math.max(0, subtotalMinor);
  const minSubtotal = row.min_subtotal_minor ?? 0;
  if (minSubtotal > 0 && subtotal < minSubtotal) {
    return {
      valid: false,
      reason: `Minimum order subtotal not met for this code.`,
    };
  }

  const discountAmount = computeDiscountAmount({
    type: row.type,
    amount: row.amount,
    subtotalMinor: subtotal,
  });

  if (discountAmount <= 0) {
    return { valid: false, reason: 'This discount code does not apply to your cart.' };
  }

  return {
    valid: true,
    code: row.code,
    type: row.type,
    discount_amount: discountAmount,
    subtotal_after: subtotal - discountAmount,
  };
}

export async function loadDiscountByCode(code: string): Promise<DiscountCodeRow | null> {
  const normalized = normalizeDiscountCode(code);
  if (!normalized) return null;
  return queryOne<DiscountCodeRow>(
    `SELECT id, code, type, amount, min_subtotal_minor, expires_at, enabled
       FROM discount_codes WHERE code = ? COLLATE NOCASE LIMIT 1`,
    [normalized],
  );
}

export async function validateDiscountCode(
  code: string,
  subtotalMinor: number,
): Promise<DiscountValidation> {
  const row = await loadDiscountByCode(code);
  if (!row) {
    return { valid: false, reason: 'Discount code not found.' };
  }
  return validateDiscountForSubtotal(row, subtotalMinor);
}

export async function recordDiscountRedemption(opts: {
  discountCodeId: string;
  orderId: string;
  email: string;
  amountSavedMinor: number;
}): Promise<void> {
  await execute(
    `INSERT INTO discount_redemptions (id, discount_code_id, order_id, email, amount_saved_minor)
     VALUES (?, ?, ?, ?, ?)`,
    [
      newId('dcr'),
      opts.discountCodeId,
      opts.orderId,
      opts.email.trim().toLowerCase(),
      opts.amountSavedMinor,
    ],
  );
}
