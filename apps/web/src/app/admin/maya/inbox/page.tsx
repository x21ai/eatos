// @ts-nocheck
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import MayaAdminShell from '@/components/admin/MayaAdminShell';

const STATUSES = ['all', 'open', 'pending', 'resolved'];
const ASSIGNED = [
  { value: 'all', label: 'All' },
  { value: 'unassigned', label: 'Unassigned' },
  { value: 'me', label: 'Assigned to me' },
];

function statusBadge(status) {
  const colors = {
    open: 'border-emerald-500/30 text-emerald-400',
    pending: 'border-amber-500/30 text-amber-300',
    resolved: 'border-zinc-500/30 text-zinc-400',
  };
  return colors[status] || colors.open;
}

export default function MayaInboxPage() {
  const [status, setStatus] = useState('open');
  const [assigned, setAssigned] = useState('all');

  const { data, isLoading, error } = useQuery({
    queryKey: ['maya-inbox', status, assigned],
    queryFn: async () => {
      const params = new URLSearchParams({ limit: '50' });
      if (status !== 'all') params.set('status', status);
      if (assigned !== 'all') params.set('assigned', assigned);
      const res = await fetch(`/api/admin/maya/conversations?${params}`);
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.message || 'Failed to load inbox');
      return json.data;
    },
  });

  const conversations = data?.conversations ?? [];

  return (
    <MayaAdminShell
      title="Inbox"
      subtitle="Visitor threads from the Maya assistant. Assign, reply, and resolve escalations."
    >
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
          Assignment
          <select
            value={assigned}
            onChange={(e) => setAssigned(e.target.value)}
            className="mt-2 block min-w-[180px] rounded-xl border border-white/10 bg-black px-3 py-2.5 text-sm text-white outline-none focus:border-brand"
          >
            {ASSIGNED.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {isLoading ? (
        <p className="inline-flex items-center gap-2 text-sm text-zinc-400">
          <Loader2 className="animate-spin" size={16} /> Loading conversations…
        </p>
      ) : null}
      {error ? <p className="text-sm text-red-400">{error.message}</p> : null}

      <div className="overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-zinc-400">
            <tr>
              <th className="px-4 py-3 font-medium">Subject</th>
              <th className="px-4 py-3 font-medium">Visitor</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Assignee</th>
              <th className="px-4 py-3 font-medium">Updated</th>
            </tr>
          </thead>
          <tbody>
            {conversations.length === 0 && !isLoading ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-zinc-500">
                  No conversations match these filters.
                </td>
              </tr>
            ) : null}
            {conversations.map((c) => (
              <tr key={c.id} className="border-t border-white/10 hover:bg-white/[0.03]">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/maya/inbox/${c.id}`}
                    className="font-medium text-white hover:text-brand-on-dark"
                  >
                    {c.subject || 'Untitled conversation'}
                  </Link>
                  {c.last_message_preview ? (
                    <p className="mt-1 max-w-md truncate text-xs text-zinc-500">
                      {c.last_message_preview}
                    </p>
                  ) : null}
                </td>
                <td className="px-4 py-3 text-zinc-300">
                  {c.visitor_email || c.visitor_name || c.visitor_id.slice(0, 12)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider ${statusBadge(c.status)}`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-zinc-400">
                  {c.assigned_agent_name || c.assigned_agent_email || '—'}
                </td>
                <td className="px-4 py-3 text-zinc-500">{c.updated_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MayaAdminShell>
  );
}
