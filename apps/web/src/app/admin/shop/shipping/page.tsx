// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2, Truck } from 'lucide-react';
import { toast } from 'sonner';
import AdminShopNav from '@/components/admin/AdminShopNav';

function minorToInput(money) {
  if (!money || typeof money.amount !== 'number') return '';
  return (money.amount / 100).toFixed(2);
}

export default function AdminShippingPage() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    domestic_country: 'US',
    domestic_flat: '',
    domestic_free_over: '',
    international_flat: '',
    international_free_over: '',
  });

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
    queryKey: ['admin-shipping-rates'],
    queryFn: async () => {
      const res = await fetch('/api/admin/shop/shipping');
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.message || 'Failed to load');
      return json.data;
    },
  });

  useEffect(() => {
    if (!data) return;
    setForm({
      domestic_country: data.domestic_country || 'US',
      domestic_flat: minorToInput(data.domestic_flat),
      domestic_free_over: minorToInput(data.domestic_free_over),
      international_flat: minorToInput(data.international_flat),
      international_free_over: minorToInput(data.international_free_over),
    });
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        domestic_country: form.domestic_country,
        domestic_flat: { amount: Math.round(Number(form.domestic_flat) * 100), currency: 'USD' },
        domestic_free_over: {
          amount: Math.round(Number(form.domestic_free_over) * 100),
          currency: 'USD',
        },
        international_flat: {
          amount: Math.round(Number(form.international_flat) * 100),
          currency: 'USD',
        },
        international_free_over: {
          amount: Math.round(Number(form.international_free_over) * 100),
          currency: 'USD',
        },
      };
      const res = await fetch('/api/admin/shop/shipping', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.message || 'Save failed');
      return json.data;
    },
    onSuccess: () => {
      toast.success('Shipping rates saved');
      queryClient.invalidateQueries({ queryKey: ['admin-shipping-rates'] });
    },
    onError: (err) => toast.error(err.message || 'Save failed'),
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 pt-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <AdminShopNav />

        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Truck size={24} /> Shipping rates
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Flat rates and free-shipping thresholds used by checkout quotes. Falls back to code defaults if unset.
          </p>
        </div>

        {isLoading ? (
          <p className="inline-flex items-center gap-2 text-sm text-zinc-400">
            <Loader2 className="animate-spin" size={16} /> Loading…
          </p>
        ) : (
          <form
            className="rounded-2xl border border-white/10 p-6 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              if (canWrite) saveMutation.mutate();
            }}
          >
            <fieldset className="space-y-4">
              <legend className="text-xs uppercase tracking-[0.16em] text-zinc-500">Domestic</legend>
              <label className="block text-xs uppercase tracking-[0.16em] text-zinc-500">
                Country code
                <input
                  value={form.domestic_country}
                  onChange={(e) =>
                    setForm({ ...form, domestic_country: e.target.value.toUpperCase().slice(0, 2) })
                  }
                  disabled={!canWrite}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black px-3 py-2.5 text-sm outline-none focus:border-brand disabled:opacity-60"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-xs uppercase tracking-[0.16em] text-zinc-500">
                  Flat rate (USD)
                  <input
                    required
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.domestic_flat}
                    onChange={(e) => setForm({ ...form, domestic_flat: e.target.value })}
                    disabled={!canWrite}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black px-3 py-2.5 text-sm outline-none focus:border-brand disabled:opacity-60"
                  />
                </label>
                <label className="block text-xs uppercase tracking-[0.16em] text-zinc-500">
                  Free over (USD subtotal)
                  <input
                    required
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.domestic_free_over}
                    onChange={(e) => setForm({ ...form, domestic_free_over: e.target.value })}
                    disabled={!canWrite}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black px-3 py-2.5 text-sm outline-none focus:border-brand disabled:opacity-60"
                  />
                </label>
              </div>
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="text-xs uppercase tracking-[0.16em] text-zinc-500">International</legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-xs uppercase tracking-[0.16em] text-zinc-500">
                  Flat rate (USD)
                  <input
                    required
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.international_flat}
                    onChange={(e) => setForm({ ...form, international_flat: e.target.value })}
                    disabled={!canWrite}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black px-3 py-2.5 text-sm outline-none focus:border-brand disabled:opacity-60"
                  />
                </label>
                <label className="block text-xs uppercase tracking-[0.16em] text-zinc-500">
                  Free over (USD subtotal)
                  <input
                    required
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.international_free_over}
                    onChange={(e) => setForm({ ...form, international_free_over: e.target.value })}
                    disabled={!canWrite}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black px-3 py-2.5 text-sm outline-none focus:border-brand disabled:opacity-60"
                  />
                </label>
              </div>
            </fieldset>

            {canWrite ? (
              <button
                type="submit"
                disabled={saveMutation.isPending}
                className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold disabled:opacity-60"
              >
                {saveMutation.isPending ? 'Saving…' : 'Save rates'}
              </button>
            ) : (
              <p className="text-xs text-zinc-500">You need shop:write to edit shipping rates.</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
