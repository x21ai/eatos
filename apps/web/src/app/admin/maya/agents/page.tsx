// @ts-nocheck
'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2, UserPlus } from 'lucide-react';
import MayaAdminShell from '@/components/admin/MayaAdminShell';

const ROLES = ['agent', 'lead', 'viewer'];

export default function MayaAgentsPage() {
  const queryClient = useQueryClient();
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState('agent');

  const { data, isLoading, error } = useQuery({
    queryKey: ['maya-agents'],
    queryFn: async () => {
      const res = await fetch('/api/admin/maya/agents');
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.message || 'Failed to load agents');
      return json.data ?? [];
    },
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/admin/maya/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, display_name: displayName, role }),
      });
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.message || 'Failed to add agent');
      return json.data;
    },
    onSuccess: () => {
      setEmail('');
      setDisplayName('');
      queryClient.invalidateQueries({ queryKey: ['maya-agents'] });
    },
  });

  const patchMutation = useMutation({
    mutationFn: async ({ id, patch }) => {
      const res = await fetch(`/api/admin/maya/agents/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch),
      });
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.message || 'Update failed');
      return json.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['maya-agents'] }),
  });

  const agents = data ?? [];

  return (
    <MayaAdminShell
      title="Helpdesk agents"
      subtitle="Operators must already be in admin_users. Roles control inbox permissions."
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createMutation.mutate();
        }}
        className="rounded-2xl border border-white/10 p-5 space-y-4"
      >
        <p className="text-sm font-medium text-white">Add agent</p>
        <div className="grid gap-4 sm:grid-cols-3">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@eatos.com"
            className="rounded-xl border border-white/10 bg-black px-3 py-2.5 text-sm text-white outline-none focus:border-white/30"
          />
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Display name"
            className="rounded-xl border border-white/10 bg-black px-3 py-2.5 text-sm text-white outline-none focus:border-white/30"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="rounded-xl border border-white/10 bg-black px-3 py-2.5 text-sm text-white"
          >
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={!email.trim() || createMutation.isPending}
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-black disabled:opacity-40"
        >
          {createMutation.isPending ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <UserPlus size={14} />
          )}
          Add agent
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

      <div className="overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-zinc-400">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {agents.length === 0 && !isLoading ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-zinc-500">
                  No agents registered yet.
                </td>
              </tr>
            ) : null}
            {agents.map((a) => (
              <tr key={a.id} className="border-t border-white/10">
                <td className="px-4 py-3 text-white">{a.display_name || '—'}</td>
                <td className="px-4 py-3 text-zinc-300">{a.email}</td>
                <td className="px-4 py-3">
                  <select
                    value={a.role}
                    onChange={(e) =>
                      patchMutation.mutate({ id: a.id, patch: { role: e.target.value } })
                    }
                    className="rounded-lg border border-white/10 bg-black px-2 py-1 text-xs text-white"
                  >
                    {ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() =>
                      patchMutation.mutate({ id: a.id, patch: { is_active: !a.is_active } })
                    }
                    className={
                      a.is_active
                        ? 'text-xs text-emerald-400'
                        : 'text-xs text-zinc-500 line-through'
                    }
                  >
                    {a.is_active ? 'Active' : 'Inactive'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-zinc-600">
        Roles: <strong className="text-zinc-400">viewer</strong> read-only inbox,{' '}
        <strong className="text-zinc-400">agent</strong> reply and assign,{' '}
        <strong className="text-zinc-400">lead</strong> manage agents and canned replies.
      </p>
    </MayaAdminShell>
  );
}
