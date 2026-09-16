// @ts-nocheck
'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2, Plus, Tag } from 'lucide-react';
import { toast } from 'sonner';
import AdminShopNav from '@/components/admin/AdminShopNav';
import { formatMinor } from '@/lib/shop/cart-client';

const emptyForm = {
  code: '',
  type: 'percentage',
  amount: '',
  min_subtotal: '',
  expires_at: '',
};

export default function AdminDiscountsPage() {
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();

  const { data: me } = useQuery({
    queryKey: ['admin-me'],
    queryFn: async () => {
      const res = await fetch('/api/admin/me');
      if (!res.ok) throw new Error('Unauthorized');
      return (await res.json()).data;
    },
  });

  const canWrite = (me?.capabilities ?? []).includes('shop:write');

  const { data, isLoading } = useQuery({
    queryKey: ['admin-discounts'],
    queryFn: async () => {
      const res = await fetch('/api/admin/shop/discounts');
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.message || 'Failed to load');
      return json.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      const amount = Number(form.amount);
      const payload = {
        code: form.code,
        type: form.type,
        amount: form.type === 'fixed' ? Math.round(amount * 100) : Math.round(amount),
        min_subtotal_minor: form.min_subtotal
          ? Math.round(Number(form.min_subtotal) * 100)
          : null,
        expires_at: form.expires_at || null,
      };
      const res = await fetch('/api/admin/shop/discounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.message || 'Create failed');
      return json.data;
    },
    onSuccess: () => {
      toast.success('Discount code created');
      setForm(emptyForm);
      setShowForm(false);
      queryClient.invalidateQueries({ queryKey: ['admin-discounts'] });
    },
    onError: (err) => toast.error(err.message || 'Create failed'),
  });

  const disableMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/admin/shop/discounts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: false }),
      });
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.message || 'Update failed');
      return json.data;
    },
    onSuccess: () => {
      toast.success('Discount disabled');
      queryClient.invalidateQueries({ queryKey: ['admin-discounts'] });
    },
    onError: (err) => toast.error(err.message || 'Update failed'),
  });

  const discounts = data || [];

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 pt-32">
      <div className="max-w-6xl mx-auto space-y-8">
        <AdminShopNav />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Tag size={24} /> Discount codes
            </h1>
            <p className="mt-2 text-sm text-zinc-400">
              Create percentage or fixed-amount codes for checkout.
            </p>
          </div>
          {canWrite ? (
            <button
              type="button"
              onClick={() => setShowForm((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold"
            >
              <Plus size={16} /> New code
            </button>
          ) : null}
        </div>

        {showForm && canWrite ? (
          <form
            className="rounded-2xl border border-white/10 p-6 grid gap-4 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              createMutation.mutate();
            }}
          >
            <label className="block text-xs uppercase tracking-[0.16em] text-zinc-500">
              Code
              <input
                required
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                className="mt-2 w-full rounded-xl border border-white/10 bg-black px-3 py-2.5 text-sm outline-none focus:border-brand"
                placeholder="SAVE10"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.16em] text-zinc-500">
              Type
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="mt-2 w-full rounded-xl border border-white/10 bg-black px-3 py-2.5 text-sm outline-none focus:border-brand"
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed amount (USD)</option>
              </select>
            </label>
            <label className="block text-xs uppercase tracking-[0.16em] text-zinc-500">
              {form.type === 'percentage' ? 'Percent off' : 'Amount off (USD)'}
              <input
                required
                type="number"
                min="0.01"
                step={form.type === 'percentage' ? '1' : '0.01'}
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="mt-2 w-full rounded-xl border border-white/10 bg-black px-3 py-2.5 text-sm outline-none focus:border-brand"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.16em] text-zinc-500">
              Min subtotal (USD, optional)
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.min_subtotal}
                onChange={(e) => setForm({ ...form, min_subtotal: e.target.value })}
                className="mt-2 w-full rounded-xl border border-white/10 bg-black px-3 py-2.5 text-sm outline-none focus:border-brand"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.16em] text-zinc-500 sm:col-span-2">
              Expires at (optional, ISO date)
              <input
                type="datetime-local"
                value={form.expires_at}
                onChange={(e) => setForm({ ...form, expires_at: e.target.value })}
                className="mt-2 w-full rounded-xl border border-white/10 bg-black px-3 py-2.5 text-sm outline-none focus:border-brand"
              />
            </label>
            <div className="sm:col-span-2 flex gap-3">
              <button
                type="submit"
                disabled={createMutation.isPending}
                className="rounded-full bg-brand px-5 py-2 text-sm font-semibold disabled:opacity-60"
              >
                {createMutation.isPending ? 'Saving…' : 'Create code'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-full border border-white/15 px-5 py-2 text-sm text-zinc-300"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : null}

        {isLoading ? (
          <p className="inline-flex items-center gap-2 text-sm text-zinc-400">
            <Loader2 className="animate-spin" size={16} /> Loading…
          </p>
        ) : null}

        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-zinc-400">
              <tr>
                <th className="px-4 py-3 font-medium">Code</th>
                <th className="px-4 py-3 font-medium">Value</th>
                <th className="px-4 py-3 font-medium">Min subtotal</th>
                <th className="px-4 py-3 font-medium">Expires</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {discounts.length === 0 && !isLoading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-zinc-500">
                    No discount codes yet.
                  </td>
                </tr>
              ) : null}
              {discounts.map((d) => (
                <tr key={d.id} className="border-t border-white/10">
                  <td className="px-4 py-3 font-mono text-white">{d.code}</td>
                  <td className="px-4 py-3 text-zinc-300">
                    {d.type === 'percentage' ? `${d.amount}%` : formatMinor(d.amount_display)}
                  </td>
                  <td className="px-4 py-3 text-zinc-300">
                    {d.min_subtotal ? formatMinor(d.min_subtotal) : '—'}
                  </td>
                  <td className="px-4 py-3 text-zinc-500">{d.expires_at || '—'}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        d.enabled
                          ? 'bg-green-500/10 text-green-400'
                          : 'bg-zinc-500/10 text-zinc-400'
                      }`}
                    >
                      {d.enabled ? 'Active' : 'Disabled'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {d.enabled && canWrite ? (
                      <button
                        type="button"
                        onClick={() => disableMutation.mutate(d.id)}
                        disabled={disableMutation.isPending}
                        className="text-xs text-red-400 hover:text-red-300"
                      >
                        Disable
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
