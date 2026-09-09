// @ts-nocheck
'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { formatMinor } from '@/lib/shop/cart-client';

const STATUSES = ['all', 'pending', 'paid', 'fulfilled', 'cancelled', 'refunded'];
const SOURCES = ['all', 'web', 'kiosk'];

export default function AdminOrdersList() {
  const [status, setStatus] = useState('all');
  const [source, setSource] = useState('all');

  const { data, isLoading, error } = useQuery({
    queryKey: ['admin-orders', status, source],
    queryFn: async () => {
      const params = new URLSearchParams({ limit: '50' });
      if (status && status !== 'all') params.set('status', status);
      if (source && source !== 'all') params.set('source', source);
      const res = await fetch(`/api/admin/orders?${params}`);
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.message || 'Failed to load orders');
      return json;
    },
  });

  const orders = data?.data || [];

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 pt-32">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Paid and pending shop orders from web and kiosk checkout.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <label className="text-xs uppercase tracking-[0.16em] text-zinc-500">
            Status
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-2 block min-w-[160px] rounded-xl border border-white/10 bg-black px-3 py-2.5 text-sm text-white outline-none focus:border-brand"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs uppercase tracking-[0.16em] text-zinc-500">
            Source
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="mt-2 block min-w-[160px] rounded-xl border border-white/10 bg-black px-3 py-2.5 text-sm text-white outline-none focus:border-brand"
            >
              {SOURCES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>

        {isLoading ? (
          <p className="inline-flex items-center gap-2 text-sm text-zinc-400">
            <Loader2 className="animate-spin" size={16} /> Loading…
          </p>
        ) : null}
        {error ? <p className="text-sm text-red-400">{error.message}</p> : null}

        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-zinc-400">
              <tr>
                <th className="px-4 py-3 font-medium">Order</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Source</th>
                <th className="px-4 py-3 font-medium">Total</th>
                <th className="px-4 py-3 font-medium">Created</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 && !isLoading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-zinc-500">
                    No orders match these filters.
                  </td>
                </tr>
              ) : null}
              {orders.map((o) => (
                <tr key={o.order_number} className="border-t border-white/10 hover:bg-white/[0.03]">
                  <td className="px-4 py-3">
                    <a
                      href={`/admin/orders/${encodeURIComponent(o.order_number)}`}
                      className="font-medium text-white hover:text-brand-on-dark"
                    >
                      {o.order_number}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-zinc-300">{o.email}</td>
                  <td className="px-4 py-3 capitalize text-zinc-300">{o.status}</td>
                  <td className="px-4 py-3 capitalize text-zinc-300">{o.source}</td>
                  <td className="px-4 py-3 text-zinc-300">{formatMinor(o.total)}</td>
                  <td className="px-4 py-3 text-zinc-500">{o.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
