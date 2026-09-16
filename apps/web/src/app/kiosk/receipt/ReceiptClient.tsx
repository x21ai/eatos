'use client';

import { useEffect, useState } from 'react';
import { formatMinor } from '@/lib/shop/cart-client';
import { normalizeLookupEmail, normalizeOrderNumber } from '@/lib/shop/order-lookup';

type Money = { amount: number; currency: string };

type OrderResult = {
  order_number: string;
  email: string;
  status: string;
  total: Money;
  created_at: string;
  paid_at?: string | null;
  items: Array<{
    product_slug: string;
    title: string;
    quantity: number;
    line_total: Money;
  }>;
};

export default function ReceiptClient({
  initialOrder = '',
  initialEmail = '',
}: {
  initialOrder?: string;
  initialEmail?: string;
}) {
  const [result, setResult] = useState<OrderResult | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(Boolean(initialOrder && initialEmail));

  useEffect(() => {
    if (!initialOrder || !initialEmail) {
      setLoading(false);
      setError('Missing order or email.');
      return;
    }
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(
          `/api/orders/lookup?order=${encodeURIComponent(normalizeOrderNumber(initialOrder))}&email=${encodeURIComponent(normalizeLookupEmail(initialEmail))}`,
        );
        const json = await res.json();
        if (!res.ok || json.error) throw new Error(json.message || 'Lookup failed');
        if (!cancelled) setResult(json.data);
      } catch (err: any) {
        if (!cancelled) {
          setResult(null);
          setError(err?.message || 'Lookup failed');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [initialOrder, initialEmail]);

  return (
    <div className="min-h-screen bg-white text-zinc-900 print:bg-white">
      <div className="mx-auto max-w-md px-6 py-10">
        <div className="print:hidden mb-6 flex items-center justify-between gap-3">
          <a href="/kiosk" className="text-sm text-zinc-500 underline">
            Back to kiosk
          </a>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white"
          >
            Print
          </button>
        </div>

        <header className="border-b border-zinc-200 pb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">eatOS</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">Receipt</h1>
        </header>

        {loading ? <p className="mt-8 text-sm text-zinc-500">Loading receipt…</p> : null}
        {error ? <p className="mt-8 text-sm text-red-600">{error}</p> : null}

        {result ? (
          <div className="mt-8 space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                {result.order_number}
              </p>
              <p className="mt-1 text-lg font-semibold capitalize">{result.status}</p>
              <p className="mt-1 text-sm text-zinc-500">{result.email}</p>
            </div>

            <ul className="divide-y divide-zinc-200 border-y border-zinc-200">
              {result.items.map((item) => (
                <li
                  key={`${item.product_slug}-${item.title}`}
                  className="flex justify-between gap-4 py-3 text-sm"
                >
                  <span>
                    {item.title} × {item.quantity}
                  </span>
                  <span className="font-medium">{formatMinor(item.line_total)}</span>
                </li>
              ))}
            </ul>

            <p className="text-right text-xl font-semibold">
              Total {formatMinor(result.total)}
            </p>

            <p className="text-xs text-zinc-500">
              Placed {result.created_at}
              {result.paid_at ? ` · Paid ${result.paid_at}` : ''}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
