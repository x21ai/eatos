// @ts-nocheck
'use client';

import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ArrowLeft, Loader2, Save } from 'lucide-react';

export default function EditCollection({ params }) {
  const { slug } = params;
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();

  const { data: collection, isLoading } = useQuery({
    queryKey: ['admin-collection', slug],
    queryFn: async () => {
      const res = await fetch(`/api/shop/collections/${slug}`);
      if (!res.ok) throw new Error('Failed to load collection');
      return (await res.json()).data;
    },
  });

  useEffect(() => {
    if (!collection) return;
    reset({
      title: collection.title,
      slug: collection.slug,
      description_html: collection.description_html || '',
      image: collection.image || '',
      position: collection.position ?? 0,
    });
  }, [collection, reset]);

  const updateMutation = useMutation({
    mutationFn: async (form) => {
      const res = await fetch(`/api/shop/collections/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          description_html: form.description_html,
          image: form.image || null,
          position: Number(form.position) || 0,
          new_slug: form.slug !== slug ? form.slug : undefined,
        }),
      });
      if (!res.ok) throw new Error('Update failed');
      return (await res.json()).data;
    },
    onSuccess: (data) => {
      toast.success('Collection saved');
      queryClient.invalidateQueries({ queryKey: ['admin-collection', slug] });
      if (data.slug !== slug) {
        window.location.href = `/admin/shop/collections/${data.slug}`;
      }
    },
    onError: () => toast.error('Could not save collection'),
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 pt-32">
      <div className="mx-auto max-w-3xl space-y-8">
        <a
          href="/admin/shop/collections"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
        >
          <ArrowLeft size={16} /> Collections
        </a>
        <h1 className="text-3xl font-bold tracking-tight">Edit collection</h1>
        <form
          onSubmit={handleSubmit((v) => updateMutation.mutate(v))}
          className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6"
        >
          <label className="block space-y-2 text-sm">
            <span className="text-zinc-400">Title</span>
            <input
              {...register('title', { required: true })}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2"
            />
          </label>
          <label className="block space-y-2 text-sm">
            <span className="text-zinc-400">Slug</span>
            <input
              {...register('slug', { required: true })}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2"
            />
          </label>
          <label className="block space-y-2 text-sm">
            <span className="text-zinc-400">Description HTML</span>
            <textarea
              {...register('description_html')}
              rows={6}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 font-mono text-xs"
            />
          </label>
          <label className="block space-y-2 text-sm">
            <span className="text-zinc-400">Hero image URL</span>
            <input
              {...register('image')}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2"
            />
          </label>
          <label className="block space-y-2 text-sm">
            <span className="text-zinc-400">Position</span>
            <input
              type="number"
              {...register('position')}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2"
            />
          </label>
          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold"
          >
            {updateMutation.isPending ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <Save size={16} />
            )}
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
