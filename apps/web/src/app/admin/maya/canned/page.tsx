// @ts-nocheck
'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2, Plus } from 'lucide-react';
import MayaAdminShell from '@/components/admin/MayaAdminShell';

export default function MayaCannedPage() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [shortcut, setShortcut] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [category, setCategory] = useState('');
  const [articleSlugs, setArticleSlugs] = useState('');

  const { data, isLoading, error } = useQuery({
    queryKey: ['maya-canned'],
    queryFn: async () => {
      const res = await fetch('/api/admin/maya/canned-replies?all=1');
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.message || 'Failed to load quick replies');
      return json.data ?? [];
    },
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      const slugs = articleSlugs
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      const res = await fetch('/api/admin/maya/canned-replies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          shortcut: shortcut || null,
          body_text: bodyText,
          category: category || null,
          article_slugs: slugs,
        }),
      });
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.message || 'Failed to create');
      return json.data;
    },
    onSuccess: () => {
      setTitle('');
      setShortcut('');
      setBodyText('');
      setCategory('');
      setArticleSlugs('');
      queryClient.invalidateQueries({ queryKey: ['maya-canned'] });
    },
  });

  const replies = data ?? [];

  return (
    <MayaAdminShell
      title="Quick replies"
      subtitle="Saved responses agents can insert in the inbox. Link help articles by slug."
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createMutation.mutate();
        }}
        className="rounded-2xl border border-white/10 p-5 space-y-4"
      >
        <p className="text-sm font-medium text-white">New quick reply</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="rounded-xl border border-white/10 bg-black px-3 py-2.5 text-sm text-white outline-none"
          />
          <input
            value={shortcut}
            onChange={(e) => setShortcut(e.target.value)}
            placeholder="Shortcut e.g. /thanks"
            className="rounded-xl border border-white/10 bg-black px-3 py-2.5 text-sm text-white outline-none"
          />
        </div>
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category (optional)"
          className="w-full rounded-xl border border-white/10 bg-black px-3 py-2.5 text-sm text-white outline-none"
        />
        <textarea
          value={bodyText}
          onChange={(e) => setBodyText(e.target.value)}
          rows={4}
          placeholder="Reply body…"
          className="w-full resize-none rounded-xl border border-white/10 bg-black px-3 py-3 text-sm text-white outline-none"
        />
        <input
          value={articleSlugs}
          onChange={(e) => setArticleSlugs(e.target.value)}
          placeholder="Article slugs (comma-separated)"
          className="w-full rounded-xl border border-white/10 bg-black px-3 py-2.5 text-sm text-white outline-none"
        />
        <button
          type="submit"
          disabled={!title.trim() || !bodyText.trim() || createMutation.isPending}
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-black disabled:opacity-40"
        >
          {createMutation.isPending ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Plus size={14} />
          )}
          Save quick reply
        </button>
        {createMutation.error ? (
          <p className="text-sm text-red-400">{createMutation.error.message}</p>
        ) : null}
      </form>

      {isLoading ? (
        <p className="inline-flex items-center gap-2 text-sm text-zinc-400">
          <Loader2 className="animate-spin" size={16} /> Loading…
        </p>
      ) : null}
      {error ? <p className="text-sm text-red-400">{error.message}</p> : null}

      <div className="space-y-3">
        {replies.length === 0 && !isLoading ? (
          <p className="text-sm text-zinc-500">No quick replies yet.</p>
        ) : null}
        {replies.map((r) => (
          <article
            key={r.id}
            className={`rounded-2xl border p-4 ${r.is_active ? 'border-white/10' : 'border-white/5 opacity-60'}`}
          >
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-sm font-semibold text-white">{r.title}</h2>
              {r.shortcut ? (
                <code className="rounded bg-white/10 px-2 py-0.5 text-xs text-zinc-300">
                  {r.shortcut}
                </code>
              ) : null}
              {r.category ? (
                <span className="text-[10px] uppercase tracking-wider text-zinc-500">
                  {r.category}
                </span>
              ) : null}
            </div>
            <p className="mt-2 whitespace-pre-wrap text-sm text-zinc-400">{r.body_text}</p>
            {r.article_slugs?.length ? (
              <p className="mt-2 text-xs text-brand-on-dark">
                Articles:{' '}
                {r.article_slugs.map((slug) => (
                  <a
                    key={slug}
                    href={`/support/article/${slug}`}
                    className="mr-2 underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {slug}
                  </a>
                ))}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </MayaAdminShell>
  );
}
