// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { formatMinor } from '@/lib/shop/cart-client';

export default function AdminOrderDetail() {
  const params = useParams();
  const orderNumber = params?.order_number;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fulfilling, setFulfilling] = useState(false);

  async function load() {
    if (!orderNumber) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/orders/${encodeURIComponent(orderNumber)}`);
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.message || 'Failed to load order');
      setOrder(json.data);
    } catch (err) {
      toast.error(err.message || 'Failed to load order');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderNumber]);

  async function markFulfilled() {
    if (!orderNumber) return;
    setFulfilling(true);
    try {
      const res = await fetch(`/api/admin/orders/${encodeURIComponent(orderNumber)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'fulfilled' }),
      });
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.message || 'Update failed');
      setOrder(json.data);
      toast.success('Order marked fulfilled');
    } catch (err) {
      toast.error(err.message || 'Update failed');
    } finally {
      setFulfilling(false);
    }
  }

  if (loading || !order) {
    return (
      <div className="min-h-screen bg-[#050505] text-white p-8 pt-32">
        {loading ? <Loader2 className="animate-spin" /> : <p className="text-sm text-zinc-400">Order not found.</p>}
      </div>
    );
  }

  const canFulfill = order.status === 'paid';

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 pt-32">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <a href="/admin/orders" className="text-xs text-zinc-500 hover:text-zinc-300">
              ← Orders
            </a>
            <h1 className="mt-2 text-2xl font-bold tracking-tight">{order.order_number}</h1>
            <p className="mt-1 text-sm capitalize text-zinc-400">
              {order.status} · {order.source}
            </p>
          </div>
          {canFulfill ? (
            <button
              type="button"
              onClick={markFulfilled}
              disabled={fulfilling}
              className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold"
            >
              {fulfilling ? <Loader2 className="animate-spin" size={14} /> : <CheckCircle2 size={14} />}
              Mark fulfilled
            </button>
          ) : null}
        </div>

        <div className="rounded-2xl border border-white/10 p-5 space-y-2 text-sm">
          <p>
            <span className="text-zinc-500">Email</span> · {order.email}
          </p>
          <p>
            <span className="text-zinc-500">Total</span> · {formatMinor(order.total)}
          </p>
          <p>
            <span className="text-zinc-500">Subtotal</span> · {formatMinor(order.subtotal)}
            {' · '}
            <span className="text-zinc-500">Shipping</span> · {formatMinor(order.shipping)}
            {' · '}
            <span className="text-zinc-500">Tax</span> · {formatMinor(order.tax)}
          </p>
          <p className="text-zinc-500">
            Created {order.created_at}
            {order.paid_at ? ` · Paid ${order.paid_at}` : ''}
          </p>
          {(order.shipping_line1 || order.shipping_name) && (
            <div className="pt-2 text-zinc-300">
              <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Ship to</p>
              {order.shipping_name ? <p>{order.shipping_name}</p> : null}
              {order.shipping_line1 ? <p>{order.shipping_line1}</p> : null}
              {order.shipping_line2 ? <p>{order.shipping_line2}</p> : null}
              <p>
                {[order.shipping_city, order.shipping_region, order.shipping_postal]
                  .filter(Boolean)
                  .join(', ')}
              </p>
              {order.shipping_country ? <p>{order.shipping_country}</p> : null}
            </div>
          )}
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-zinc-400">
              <tr>
                <th className="px-4 py-3 font-medium">Item</th>
                <th className="px-4 py-3 font-medium">Qty</th>
                <th className="px-4 py-3 font-medium">Unit</th>
                <th className="px-4 py-3 font-medium">Line</th>
              </tr>
            </thead>
            <tbody>
              {(order.items || []).map((item) => (
                <tr key={item.id || `${item.product_slug}-${item.title}`} className="border-t border-white/10">
                  <td className="px-4 py-3">
                    <div className="font-medium text-white">{item.title}</div>
                    <div className="text-xs text-zinc-500">{item.product_slug}</div>
                  </td>
                  <td className="px-4 py-3 text-zinc-300">{item.quantity}</td>
                  <td className="px-4 py-3 text-zinc-300">{formatMinor(item.unit_price)}</td>
                  <td className="px-4 py-3 text-zinc-300">{formatMinor(item.line_total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
