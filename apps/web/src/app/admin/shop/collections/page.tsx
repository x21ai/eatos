// @ts-nocheck
'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2, Plus, Search } from 'lucide-react';
import { toast } from 'sonner';

export default function ShopAdminCollections() {
  const [search, setSearch] = useState('');
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-shop-collections'],
    queryFn: async () => {
      const res = await fetch('/api/shop/collections?limit=100');
      if (!res.ok) throw new Error('Failed to load collections');
      return res.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      const title = 'Untitled collection';
      const slug = `untitled-collection-${Date.now()}`;
      const res = await fetch('/api/shop/collections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, slug }),
      });
      if (!res.ok) throw new Error('Create failed');
      return (await res.json()).data;
    },
    onSuccess: (collection) => {
      toast.success('Draft collection created');
      queryClient.invalidateQueries({ queryKey: ['admin-shop-collections'] });
      window.location.href = `/admin/shop/collections/${collection.slug}`;
    },
  });

  const collections = (data?.data || []).filter((c) =>
    search ? c.title.toLowerCase().includes(search.toLowerCase()) : true,
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 pt-32">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Collections</h1>
            <p className="mt-2 text-sm text-zinc-400">
              Group products for shop merchandising.
            </p>
          </div>
          <button
            type="button"
            onClick={() => createMutation.mutate()}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold"
          >
            {createMutation.isPending ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <Plus size={16} />
            )}
            New collection
          </button>
        </div>

        <div className="relative max-w-md">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            size={16}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search collections"
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-white/30"
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-zinc-500" />
          </div>
        ) : (
          <ul className="divide-y divide-white/10 rounded-2xl border border-white/10">
            {collections.map((c) => (
              <li key={c.slug}>
                <a
                  href={`/admin/shop/collections/${c.slug}`}
                  className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-white/[0.03]"
                >
                  <div>
                    <div className="font-semibold">{c.title}</div>
                    <div className="mt-1 text-xs text-zinc-500">{c.slug}</div>
                  </div>
                  <span className="text-xs text-zinc-500">Edit</span>
                </a>
              </li>
            ))}
            {!collections.length ? (
              <li className="px-5 py-10 text-center text-sm text-zinc-500">
                No collections yet.
              </li>
            ) : null}
          </ul>
        )}
      </div>
    </div>
  );
}
