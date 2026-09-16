// @ts-nocheck
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowRight, Inbox, Loader2, MessageSquareQuote, Users } from 'lucide-react';
import MayaAdminShell from '@/components/admin/MayaAdminShell';

const cards = [
  {
    href: '/admin/maya/inbox',
    title: 'Conversation inbox',
    body: 'Review open, pending, and resolved threads from the Maya assistant.',
    icon: Inbox,
  },
  {
    href: '/admin/maya/canned',
    title: 'Quick replies',
    body: 'Saved responses with optional help-article links for faster agent replies.',
    icon: MessageSquareQuote,
  },
  {
    href: '/admin/maya/agents',
    title: 'Helpdesk agents',
    body: 'Operators who can view the inbox, assign conversations, and reply to visitors.',
    icon: Users,
  },
];

export default function MayaHelpdeskHome() {
  const queryClient = useQueryClient();
  const [bootstrapState, setBootstrapState] = useState('idle');

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['maya-inbox-preview'],
    queryFn: async () => {
      const res = await fetch('/api/admin/maya/conversations?status=open&limit=5');
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.message || 'Failed to load inbox');
      return json.data;
    },
    retry: false,
  });

  const openCount = data?.conversations?.length ?? 0;
  const needsBootstrap = error?.message?.includes('not registered as a Maya helpdesk agent');

  return (
    <MayaAdminShell
      title="Maya Helpdesk"
      subtitle="Internal support operations for the eatOS AI assistant and visitor escalations."
    >
      {needsBootstrap ? (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5">
          <p className="text-sm text-amber-100">
            Your admin account is not registered as a helpdesk agent yet. Bootstrap yourself as the
            first lead agent to unlock the inbox.
          </p>
          <button
            type="button"
            disabled={bootstrapState === 'loading'}
            onClick={async () => {
              setBootstrapState('loading');
              try {
                const res = await fetch('/api/admin/maya/agents', { method: 'PUT' });
                const json = await res.json();
                if (!res.ok) {
                  alert(json.message || 'Bootstrap failed');
                  setBootstrapState('idle');
                  return;
                }
                setBootstrapState('done');
                await queryClient.invalidateQueries({ queryKey: ['maya-inbox-preview'] });
                await refetch();
              } catch {
                alert('Bootstrap failed');
                setBootstrapState('idle');
              }
            }}
            className="mt-4 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-black disabled:opacity-50"
          >
            {bootstrapState === 'loading' ? 'Registering…' : 'Register as lead agent'}
          </button>
          {bootstrapState === 'done' ? (
            <p className="mt-3 text-xs text-emerald-300">
              You are registered as lead agent. Inbox access is unlocked.
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map(({ href, title, body, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-white/25"
          >
            <Icon size={20} className="text-brand-on-dark" aria-hidden />
            <h2 className="mt-3 text-base font-semibold text-white">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-400">{body}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500 group-hover:text-white">
              Open
              <ArrowRight size={12} />
            </span>
          </Link>
        ))}
      </div>

      <section className="rounded-2xl border border-white/10 p-5">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-400">
            Open conversations
          </h2>
          <Link href="/admin/maya/inbox" className="text-xs text-brand-on-dark hover:underline">
            View inbox
          </Link>
        </div>
        {isLoading ? (
          <p className="mt-4 inline-flex items-center gap-2 text-sm text-zinc-500">
            <Loader2 size={14} className="animate-spin" /> Loading…
          </p>
        ) : null}
        {!isLoading && !needsBootstrap && openCount === 0 ? (
          <p className="mt-4 text-sm text-zinc-500">No open conversations right now.</p>
        ) : null}
        <ul className="mt-4 divide-y divide-white/10">
          {(data?.conversations ?? []).map((c) => (
            <li key={c.id}>
              <Link
                href={`/admin/maya/inbox/${c.id}`}
                className="flex items-start justify-between gap-4 py-3 transition-colors hover:bg-white/[0.02]"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">
                    {c.subject || c.visitor_email || 'Visitor conversation'}
                  </p>
                  <p className="mt-1 truncate text-xs text-zinc-500">
                    {c.last_message_preview || 'No messages yet'}
                  </p>
                </div>
                <span className="shrink-0 rounded-full border border-white/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-zinc-400">
                  {c.status}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </MayaAdminShell>
  );
}
