// @ts-nocheck
'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Bot, LifeBuoy, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import MayaAdminShell from '@/components/admin/MayaAdminShell';

const ACCESS_ROLES = ['maya_agent', 'help_agent'];

const ROLE_LABELS = {
  maya_agent: 'Maya agent',
  help_agent: 'Help agent',
};

export default function MayaHelpAccessPage() {
  const queryClient = useQueryClient();

  const { data: me } = useQuery({
    queryKey: ['admin-me'],
    queryFn: async () => {
      const res = await fetch('/api/admin/me');
      if (!res.ok) throw new Error('Unauthorized');
      return (await res.json()).data;
    },
  });

  const canManage =
    me?.capabilities?.includes('maya:manage') ||
    me?.capabilities?.includes('help:manage');

  const { data: users, isLoading } = useQuery({
    queryKey: ['admin-users'],
    enabled: canManage,
    queryFn: async () => {
      const res = await fetch('/api/admin/users');
      if (!res.ok) throw new Error('Failed to load users');
      return (await res.json()).data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ userId, roles }) => {
      const res = await fetch(`/api/admin/users/${encodeURIComponent(userId)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roles }),
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.message || 'Update failed');
      return payload.data;
    },
    onSuccess: () => {
      toast.success('Access updated');
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
    onError: (err) => toast.error(err.message),
  });

  if (!canManage) {
    return (
      <MayaAdminShell title="Maya & helpdesk access">
        <p className="text-center text-gray-400">
          You do not have permission to manage Maya or helpdesk access.
        </p>
      </MayaAdminShell>
    );
  }

  const scopedUsers = (users || []).filter((u) =>
    u.roles?.some((r) => ACCESS_ROLES.includes(r)),
  );

  return (
    <MayaAdminShell
      title="Maya & helpdesk access"
      subtitle="Grant scoped RBAC roles for Maya AI tools and helpdesk admin screens."
    >
      <section className="grid md:grid-cols-2 gap-4">
        <div className="bg-[#111] border border-white/10 rounded-xl p-5">
          <h2 className="font-semibold flex items-center gap-2">
            <Bot size={16} /> Maya agent
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            View Maya chat logs and helpdesk inbox (read-only scaffolding for AI ops).
          </p>
        </div>
        <div className="bg-[#111] border border-white/10 rounded-xl p-5">
          <h2 className="font-semibold flex items-center gap-2">
            <LifeBuoy size={16} /> Help agent
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            Access helpdesk admin tools. Register operators under Agents for live chat replies.
          </p>
        </div>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="font-semibold">Users with Maya / help access</h2>
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <div className="space-y-3">
            {(users || [])
              .filter((u) => !u.isSuperadmin)
              .map((user) => (
                <div
                  key={user.userId}
                  className="bg-[#111] border border-white/10 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3"
                >
                  <div>
                    <p className="font-medium">{user.email}</p>
                    <p className="text-xs text-gray-500">
                      {(user.roles || [])
                        .filter((r) => ACCESS_ROLES.includes(r) || r === 'admin')
                        .map((r) => ROLE_LABELS[r] || r)
                        .join(' · ') || 'No Maya/help roles'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {ACCESS_ROLES.map((role) => {
                      const active = user.roles?.includes(role);
                      return (
                        <button
                          key={role}
                          type="button"
                          onClick={() => {
                            const base = user.roles || [];
                            const next = active
                              ? base.filter((r) => r !== role)
                              : [...base, role];
                            if (next.length) {
                              updateMutation.mutate({ userId: user.userId, roles: next });
                            }
                          }}
                          className={`text-xs px-2 py-1 rounded border ${
                            active
                              ? 'bg-white text-black border-white'
                              : 'border-white/20 text-gray-400'
                          }`}
                        >
                          {ROLE_LABELS[role]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
          </div>
        )}

        {!scopedUsers.length && !isLoading && (
          <p className="text-sm text-gray-500">
            No dedicated Maya/help agents yet. Toggle roles above or invite from Team.
          </p>
        )}
      </section>
    </MayaAdminShell>
  );
}
