import { fail, okList, moneyMinor } from '@/lib/api';
import { queryAll } from '@/lib/db/client';
import { adminFail, requireCapability } from '@/lib/admin/guard';

const ORDER_STATUSES = new Set([
  'pending',
  'paid',
  'fulfilled',
  'cancelled',
  'refunded',
]);
const ORDER_SOURCES = new Set(['web', 'kiosk']);

function toOrderSummary(row: Record<string, any>) {
  const currency = row.currency || 'USD';
  return {
    id: row.id,
    order_number: row.order_number,
    email: row.email,
    user_id: row.user_id ?? null,
    status: row.status,
    source: row.source || 'web',
    currency,
    subtotal: moneyMinor(row.subtotal_amount ?? 0, currency),
    shipping: moneyMinor(row.shipping_amount ?? 0, currency),
    tax: moneyMinor(row.tax_amount ?? 0, currency),
    total: moneyMinor(row.total_amount ?? 0, currency),
    created_at: row.created_at,
    updated_at: row.updated_at,
    paid_at: row.paid_at ?? null,
  };
}

function encodeCursor(row: { created_at: string; order_number: string }) {
  return `${row.created_at}|${row.order_number}`;
}

function decodeCursor(cursor: string): { created_at: string; order_number: string } | null {
  const idx = cursor.indexOf('|');
  if (idx <= 0) return null;
  const created_at = cursor.slice(0, idx);
  const order_number = cursor.slice(idx + 1);
  if (!created_at || !order_number) return null;
  return { created_at, order_number };
}

export async function GET(request: Request) {
  try {
    await requireCapability(request, 'orders:read');
  } catch (error) {
    return adminFail(error);
  }

  const url = new URL(request.url);
  const status = (url.searchParams.get('status') || '').trim().toLowerCase();
  const source = (url.searchParams.get('source') || '').trim().toLowerCase();
  const cursorRaw = (url.searchParams.get('cursor') || '').trim();
  const limit = Math.min(
    Math.max(parseInt(url.searchParams.get('limit') || '50', 10) || 50, 1),
    100,
  );

  if (status && status !== 'all' && !ORDER_STATUSES.has(status)) {
    return fail('validation_failed', 'Invalid status filter.');
  }
  if (source && source !== 'all' && !ORDER_SOURCES.has(source)) {
    return fail('validation_failed', 'Invalid source filter.');
  }

  const where: string[] = [];
  const args: unknown[] = [];

  if (status && status !== 'all') {
    where.push('status = ?');
    args.push(status);
  }
  if (source && source !== 'all') {
    where.push('source = ?');
    args.push(source);
  }

  if (cursorRaw) {
    const cursor = decodeCursor(cursorRaw);
    if (!cursor) return fail('validation_failed', 'Invalid cursor.');
    where.push('(created_at < ? OR (created_at = ? AND order_number < ?))');
    args.push(cursor.created_at, cursor.created_at, cursor.order_number);
  }

  const clause = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const rows = await queryAll<Record<string, any>>(
    `SELECT * FROM orders ${clause} ORDER BY created_at DESC, order_number DESC LIMIT ?`,
    [...args, limit + 1],
  );
  if (rows === null) return fail('database_unavailable', 'Database unavailable.', 503);

  const hasMore = rows.length > limit;
  const page = hasMore ? rows.slice(0, limit) : rows;
  const last = page[page.length - 1];
  const nextCursor =
    hasMore && last ? encodeCursor({ created_at: last.created_at, order_number: last.order_number }) : null;

  return okList(page.map(toOrderSummary), nextCursor, hasMore);
}
