// @ts-nocheck
'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2, Plus, Search } from 'lucide-react';
import { toast } from 'sonner';
import AdminShopNav from '@/components/admin/AdminShopNav';

export default function ShopAdminProducts() {
  const [search, setSearch] = useState('');
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-shop-products'],
    queryFn: async () => {
      const res = await fetch('/api/shop/products?limit=100');
      if (!res.ok) throw new Error('Failed to load products');
      return res.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      const title = 'Untitled product';
      const slug = `untitled-${Date.now()}`;
      const res = await fetch('/api/shop/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, slug, status: 'draft' }),
      });
      if (!res.ok) throw new Error('Create failed');
      return (await res.json()).data;
    },
    onSuccess: (product) => {
      toast.success('Draft product created');
      window.location.href = `/admin/shop/${product.slug}`;
    },
  });

  const products = (data?.data || []).filter((p) =>
    search ? p.title.toLowerCase().includes(search.toLowerCase()) : true,
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 pt-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <AdminShopNav />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Shop products</h1>
            <p className="mt-2 text-sm text-zinc-400">Create and edit catalogue items stored in D1.</p>
          </div>
          <button
            type="button"
            onClick={() => createMutation.mutate()}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold"
          >
            {createMutation.isPending ? <Loader2 className="animate-spin" size={16} /> : <Plus size={16} />}
            New product
          </button>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products"
            className="w-full rounded-xl border border-white/10 bg-black py-2.5 pl-10 pr-4 text-sm outline-none focus:border-brand"
          />
        </div>

        {isLoading ? <p className="text-sm text-zinc-400">Loading…</p> : null}

        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-zinc-400">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.slug} className="border-t border-white/10 hover:bg-white/[0.03]">
                  <td className="px-4 py-3">
                    <a href={`/admin/shop/${p.slug}`} className="font-medium text-white hover:text-brand-on-dark">
                      {p.title}
                    </a>
                    <div className="text-xs text-zinc-500">{p.slug}</div>
                  </td>
                  <td className="px-4 py-3 capitalize text-zinc-300">{p.status}</td>
                  <td className="px-4 py-3 text-zinc-300">
                    {typeof p.price_amount === 'number' && p.price_amount > 0
                      ? `$${p.price_amount}`
                      : 'Quote'}
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
