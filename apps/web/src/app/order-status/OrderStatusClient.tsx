// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { Loader2, Search } from 'lucide-react';
import { formatMinor } from '@/lib/shop/cart-client';
import { normalizeLookupEmail, normalizeOrderNumber } from '@/lib/shop/order-lookup';

export default function OrderStatusClient({
  initialOrder = '',
  initialEmail = '',
  initialPaidHint = false,
}) {
  const [order, setOrder] = useState(normalizeOrderNumber(initialOrder));
  const [email, setEmail] = useState(normalizeLookupEmail(initialEmail));
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function lookup(nextOrder = order, nextEmail = email) {
    const orderNumber = normalizeOrderNumber(nextOrder);
    const lookupEmail = normalizeLookupEmail(nextEmail);
    if (!orderNumber || !lookupEmail) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(
        `/api/orders/lookup?order=${encodeURIComponent(orderNumber)}&email=${encodeURIComponent(lookupEmail)}`,
      );
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.message || 'Lookup failed');
      setResult(json.data);
    } catch (err) {
      setResult(null);
      setError(err.message || 'Lookup failed');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (initialOrder && initialEmail) lookup(initialOrder, initialEmail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-black text-zinc-200 min-h-screen">
      <section className="site-container pt-[128px] md:pt-[176px] pb-24 max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl">Order status</h1>
        <p className="mt-3 text-sm text-zinc-400">
          Enter your order number and the email used at checkout. No account required.
        </p>

        <form
          className="mt-10 space-y-4 rounded-3xl border border-white/10 p-6"
          onSubmit={(e) => {
            e.preventDefault();
            lookup();
          }}
        >
          <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
            Order number
            <input
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white outline-none focus:border-brand"
              placeholder="EO-XXXXXXXX"
              required
            />
          </label>
          <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white outline-none focus:border-brand"
              required
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white"
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : <Search size={16} />}
            Look up order
          </button>
        </form>

        {error ? <p className="mt-6 text-sm text-red-400">{error}</p> : null}

        {initialPaidHint && result?.status === 'pending' ? (
          <p className="mt-6 text-sm text-amber-300/90">
            Payment received — your order is being confirmed. Refresh in a moment if status still shows pending.
          </p>
        ) : null}

        {result ? (
          <div className="mt-10 rounded-3xl border border-white/10 p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  {result.order_number}
                </p>
                <p className="mt-1 text-xl font-semibold text-white capitalize">{result.status}</p>
              </div>
              <p className="text-lg font-semibold text-white">{formatMinor(result.total)}</p>
            </div>
            <div className="grid gap-1 text-sm border-t border-white/10 pt-4">
              <p className="flex justify-between gap-4">
                <span className="text-zinc-500">Subtotal</span>
                <span className="text-zinc-200">{formatMinor(result.subtotal)}</span>
              </p>
              <p className="flex justify-between gap-4">
                <span className="text-zinc-500">Shipping</span>
                <span className="text-zinc-200">{formatMinor(result.shipping)}</span>
              </p>
              <p className="flex justify-between gap-4">
                <span className="text-zinc-500">Tax</span>
                <span className="text-zinc-200">{formatMinor(result.tax)}</span>
              </p>
            </div>
            <ul className="divide-y divide-white/10 border-t border-white/10">
              {result.items.map((item) => (
                <li key={`${item.product_slug}-${item.title}`} className="flex justify-between gap-4 py-3 text-sm">
                  <span className="text-zinc-300">
                    {item.title} × {item.quantity}
                  </span>
                  <span className="text-white">{formatMinor(item.line_total)}</span>
                </li>
              ))}
            </ul>
            {(result.shipping_line1 || result.shipping_name) && (
              <div className="border-t border-white/10 pt-4 text-sm text-zinc-300">
                <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Ship to</p>
                {result.shipping_name ? <p>{result.shipping_name}</p> : null}
                {result.shipping_line1 ? <p>{result.shipping_line1}</p> : null}
                {result.shipping_line2 ? <p>{result.shipping_line2}</p> : null}
                <p>
                  {[result.shipping_city, result.shipping_region, result.shipping_postal]
                    .filter(Boolean)
                    .join(', ')}
                </p>
                {result.shipping_country ? <p>{result.shipping_country}</p> : null}
              </div>
            )}
            <p className="text-xs text-zinc-500">
              Placed {result.created_at}
              {result.paid_at ? ` · Paid ${result.paid_at}` : ''}
            </p>
          </div>
        ) : null}
      </section>
    </div>
  );
}
