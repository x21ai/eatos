// @ts-nocheck
'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChart3, Loader2 } from 'lucide-react';
import AdminShopNav from '@/components/admin/AdminShopNav';
import { formatMinor } from '@/lib/shop/cart-client';

export default function AdminShopAnalyticsPage() {
  const [days, setDays] = useState(7);

  const { data, isLoading, error } = useQuery({
    queryKey: ['admin-shop-analytics', days],
    queryFn: async () => {
      const res = await fetch(`/api/admin/shop/analytics?days=${days}`);
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.message || 'Failed to load');
      return json.data;
    },
  });

  const maxRevenue = Math.max(
    ...(data?.daily_revenue || []).map((d) => d.revenue?.amount || 0),
    1,
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 pt-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <AdminShopNav />

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <BarChart3 size={24} /> Shop analytics
            </h1>
            <p className="mt-2 text-sm text-zinc-400">
              Order volume and paid revenue from D1 aggregates.
            </p>
          </div>
          <label className="text-xs uppercase tracking-[0.16em] text-zinc-500">
            Period
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="mt-2 block min-w-[140px] rounded-xl border border-white/10 bg-black px-3 py-2.5 text-sm text-white outline-none focus:border-brand"
            >
              <option value={7}>Last 7 days</option>
              <option value={30}>Last 30 days</option>
            </select>
          </label>
        </div>

        {isLoading ? (
          <p className="inline-flex items-center gap-2 text-sm text-zinc-400">
            <Loader2 className="animate-spin" size={16} /> Loading…
          </p>
        ) : null}
        {error ? <p className="text-sm text-red-400">{error.message}</p> : null}

        {data ? (
          <>
            <section className="grid sm:grid-cols-3 gap-4">
              {[
                { label: 'Orders', value: data.orders_count },
                { label: 'Paid orders', value: data.paid_orders_count },
                { label: 'Revenue (paid)', value: formatMinor(data.revenue) },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-2xl border border-white/10 p-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">{label}</p>
                  <p className="mt-2 text-2xl font-semibold">{value}</p>
                </div>
              ))}
            </section>

            <section className="rounded-2xl border border-white/10 p-6 space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-400">
                Daily revenue
              </h2>
              {data.daily_revenue?.length ? (
                <div className="space-y-2">
                  {data.daily_revenue.map((d) => {
                    const pct = Math.round(((d.revenue?.amount || 0) / maxRevenue) * 100);
                    return (
                      <div key={d.date} className="grid grid-cols-[100px_1fr_80px] items-center gap-3 text-sm">
                        <span className="text-zinc-500">{d.date}</span>
                        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                          <div
                            className="h-full bg-brand rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-right text-zinc-300">{formatMinor(d.revenue)}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-zinc-500">No paid orders in this period.</p>
              )}
            </section>

            <section className="overflow-hidden rounded-2xl border border-white/10">
              <h2 className="px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-zinc-400 bg-white/5">
                Top products
              </h2>
              <table className="w-full text-left text-sm">
                <thead className="bg-white/5 text-zinc-400">
                  <tr>
                    <th className="px-4 py-3 font-medium">Product</th>
                    <th className="px-4 py-3 font-medium">Qty sold</th>
                    <th className="px-4 py-3 font-medium">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {(data.top_products || []).length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-4 py-8 text-center text-zinc-500">
                        No product sales in this period.
                      </td>
                    </tr>
                  ) : null}
                  {(data.top_products || []).map((p) => (
                    <tr key={p.product_slug} className="border-t border-white/10">
                      <td className="px-4 py-3">
                        <div className="font-medium">{p.title}</div>
                        <div className="text-xs text-zinc-500">{p.product_slug}</div>
                      </td>
                      <td className="px-4 py-3 text-zinc-300">{p.quantity}</td>
                      <td className="px-4 py-3 text-zinc-300">{formatMinor(p.revenue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </>
        ) : null}
      </div>
    </div>
  );
}
