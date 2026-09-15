// @ts-nocheck
'use client';

import Link from 'next/link';
import { use, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BookOpen, Loader2, Send } from 'lucide-react';
import MayaAdminShell from '@/components/admin/MayaAdminShell';

function MessageBubble({ message }) {
  const isVisitor = message.role === 'visitor';
  const isMaya = message.role === 'maya';
  return (
    <div className={isVisitor ? 'flex justify-end' : 'flex justify-start'}>
      <div
        className={
          isVisitor
            ? 'max-w-[85%] rounded-2xl rounded-tr-md bg-white px-4 py-3 text-sm text-black'
            : 'max-w-[85%] rounded-2xl rounded-tl-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-zinc-200'
        }
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
          {isVisitor ? 'Visitor' : isMaya ? 'Maya AI' : 'Agent'}
        </p>
        <p className="mt-1 whitespace-pre-wrap">{message.body_text}</p>
        {message.article_slugs?.length ? (
          <ul className="mt-3 space-y-1 border-t border-white/10 pt-2">
            {message.article_slugs.map((slug) => (
              <li key={slug}>
                <a
                  href={`/support/article/${slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-brand-on-dark hover:underline"
                >
                  <BookOpen size={12} />
                  {slug}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
        <p className="mt-2 text-[10px] text-zinc-600">{message.created_at}</p>
      </div>
    </div>
  );
}

export default function MayaConversationPage({ params }) {
  const { id } = use(params);
  const queryClient = useQueryClient();
  const [reply, setReply] = useState('');
  const [selectedArticles, setSelectedArticles] = useState([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['maya-conversation', id],
    queryFn: async () => {
      const res = await fetch(`/api/admin/maya/conversations/${id}`);
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.message || 'Failed to load conversation');
      return json.data;
    },
  });

  const { data: cannedData } = useQuery({
    queryKey: ['maya-canned'],
    queryFn: async () => {
      const res = await fetch('/api/admin/maya/canned-replies');
      const json = await res.json();
      if (!res.ok || json.error) return [];
      return json.data ?? [];
    },
  });

  const { data: agentsData } = useQuery({
    queryKey: ['maya-agents'],
    queryFn: async () => {
      const res = await fetch('/api/admin/maya/agents');
      const json = await res.json();
      if (!res.ok || json.error) return [];
      return json.data ?? [];
    },
  });

  const patchMutation = useMutation({
    mutationFn: async (body) => {
      const res = await fetch(`/api/admin/maya/conversations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.message || 'Update failed');
      return json.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['maya-conversation', id] }),
  });

  const replyMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/admin/maya/conversations/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: reply, article_slugs: selectedArticles }),
      });
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.message || 'Reply failed');
      return json.data;
    },
    onSuccess: () => {
      setReply('');
      setSelectedArticles([]);
      queryClient.invalidateQueries({ queryKey: ['maya-conversation', id] });
    },
  });

  const conversation = data;
  const canned = cannedData ?? [];
  const agents = agentsData ?? [];

  return (
    <MayaAdminShell title="Conversation" subtitle={conversation?.subject || 'Loading…'}>
      <Link href="/admin/maya/inbox" className="text-xs text-zinc-500 hover:text-zinc-300">
        ← Back to inbox
      </Link>

      {isLoading ? (
        <p className="inline-flex items-center gap-2 text-sm text-zinc-400">
          <Loader2 className="animate-spin" size={16} /> Loading…
        </p>
      ) : null}
      {error ? <p className="text-sm text-red-400">{error.message}</p> : null}

      {conversation ? (
        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          <section className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              {['open', 'pending', 'resolved'].map((s) => (
                <button
                  key={s}
                  type="button"
                  disabled={patchMutation.isPending}
                  onClick={() => patchMutation.mutate({ status: s })}
                  className={
                    conversation.status === s
                      ? 'rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold capitalize text-white'
                      : 'rounded-full border border-white/10 px-3 py-1 text-xs capitalize text-zinc-400 hover:border-white/25'
                  }
                >
                  {s}
                </button>
              ))}
              <button
                type="button"
                onClick={() => patchMutation.mutate({ assign_to_me: true })}
                className="rounded-full border border-brand/40 px-3 py-1 text-xs font-semibold text-brand-on-dark"
              >
                Assign to me
              </button>
              <button
                type="button"
                onClick={() => patchMutation.mutate({ auto_assign: true })}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-400"
              >
                Auto-assign
              </button>
              <select
                value={conversation.assigned_agent_id || ''}
                onChange={(e) =>
                  patchMutation.mutate({
                    assigned_agent_id: e.target.value || null,
                  })
                }
                className="rounded-xl border border-white/10 bg-black px-3 py-1.5 text-xs text-white"
              >
                <option value="">Unassigned</option>
                {agents.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.display_name || a.email}
                  </option>
                ))}
              </select>
            </div>

            <div className="max-h-[480px] space-y-3 overflow-y-auto rounded-2xl border border-white/10 p-4">
              {conversation.messages?.length ? (
                conversation.messages.map((m) => <MessageBubble key={m.id} message={m} />)
              ) : (
                <p className="text-sm text-zinc-500">No messages yet.</p>
              )}
            </div>

            <div className="rounded-2xl border border-white/10 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Reply</p>
              {canned.length ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {canned.slice(0, 6).map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        setReply(c.body_text);
                        setSelectedArticles(c.article_slugs ?? []);
                      }}
                      className="rounded-full border border-white/15 px-3 py-1 text-xs text-zinc-300 hover:border-white/35"
                    >
                      {c.shortcut || c.title}
                    </button>
                  ))}
                </div>
              ) : null}
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                rows={4}
                placeholder="Type a reply to the visitor…"
                className="mt-3 w-full resize-none rounded-xl border border-white/10 bg-black px-3 py-3 text-sm text-white outline-none focus:border-white/30"
              />
              {selectedArticles.length ? (
                <p className="mt-2 text-xs text-zinc-500">
                  Linked articles: {selectedArticles.join(', ')}
                </p>
              ) : null}
              <button
                type="button"
                disabled={!reply.trim() || replyMutation.isPending}
                onClick={() => replyMutation.mutate()}
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-black disabled:opacity-40"
              >
                {replyMutation.isPending ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Send size={14} />
                )}
                Send reply
              </button>
            </div>
          </section>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-white/10 p-4">
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                Visitor
              </h2>
              <dl className="mt-3 space-y-2 text-sm">
                <div>
                  <dt className="text-zinc-600">Email</dt>
                  <dd className="text-zinc-200">{conversation.visitor_email || '—'}</dd>
                </div>
                <div>
                  <dt className="text-zinc-600">Name</dt>
                  <dd className="text-zinc-200">{conversation.visitor_name || '—'}</dd>
                </div>
                <div>
                  <dt className="text-zinc-600">Visitor ID</dt>
                  <dd className="break-all font-mono text-xs text-zinc-400">
                    {conversation.visitor_id}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-white/10 p-4">
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                Current page
              </h2>
              {conversation.page_url ? (
                <a
                  href={conversation.page_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 block break-all text-sm text-brand-on-dark hover:underline"
                >
                  {conversation.page_title || conversation.page_url}
                </a>
              ) : (
                <p className="mt-2 text-sm text-zinc-500">Not captured</p>
              )}
            </div>

            <div className="rounded-2xl border border-white/10 p-4">
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                Page history
              </h2>
              <ul className="mt-2 space-y-1 text-xs text-zinc-400">
                {(conversation.visitor_page_history ?? []).length ? (
                  conversation.visitor_page_history.map((url) => (
                    <li key={url} className="break-all">
                      {url}
                    </li>
                  ))
                ) : (
                  <li>—</li>
                )}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 p-4">
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                Help articles cited
              </h2>
              <ul className="mt-2 space-y-1">
                {(conversation.article_slugs ?? []).length ? (
                  conversation.article_slugs.map((slug) => (
                    <li key={slug}>
                      <a
                        href={`/support/article/${slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-brand-on-dark hover:underline"
                      >
                        {slug}
                      </a>
                    </li>
                  ))
                ) : (
                  <li className="text-xs text-zinc-500">None yet</li>
                )}
              </ul>
            </div>
          </aside>
        </div>
      ) : null}
    </MayaAdminShell>
  );
}
