import { execute, queryOne } from '@/lib/db/client';

function getResendKey() {
  return process.env.RESEND_API_KEY || process.env.RESEND_KEY || '';
}

export function isEmailConfigured() {
  return Boolean(getResendKey());
}

export async function sendOrderConfirmation(opts: {
  to: string;
  orderNumber: string;
  totalMinor: number;
  currency: string;
  items: { title: string; quantity: number; unitAmountMinor: number }[];
}) {
  const key = getResendKey();
  if (!key) {
    console.warn('Resend not configured; skipping order confirmation email');
    return { skipped: true as const };
  }

  const { Resend } = await import('resend');
  const resend = new Resend(key);
  const total = (opts.totalMinor / 100).toFixed(2);
  const lines = opts.items
    .map(
      (i) =>
        `<li>${escapeHtml(i.title)} x ${i.quantity}: $${(i.unitAmountMinor / 100).toFixed(2)}</li>`,
    )
    .join('');

  const html = `
    <div style="font-family:Montserrat,Arial,sans-serif;color:#111">
      <h1>Order confirmed</h1>
      <p>Thanks for your order. Your order number is <strong>${escapeHtml(opts.orderNumber)}</strong>.</p>
      <ul>${lines}</ul>
      <p>Total: <strong>$${total} ${escapeHtml(opts.currency)}</strong></p>
      <p>Track it any time at <a href="https://s.eatos.dev/order-status">s.eatos.dev/order-status</a>.</p>
    </div>
  `;

  const result = await resend.emails.send({
    from: process.env.RESEND_FROM || 'eatOS <orders@eatos.dev>',
    to: opts.to,
    subject: `eatOS order ${opts.orderNumber}`,
    html,
  });

  return { skipped: false as const, id: (result as any)?.data?.id ?? null };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function markOrderEmailQueued(orderId: string) {
  await execute(`UPDATE orders SET updated_at = CURRENT_TIMESTAMP WHERE id = ?`, [orderId]);
  return queryOne(`SELECT id FROM orders WHERE id = ?`, [orderId]);
}
