// @ts-nocheck
"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, UserPlus, Trash2, Shield } from "lucide-react";
import { toast } from "sonner";

const ALL_ROLES = [
  "admin",
  "blogger",
  "newsroom",
  "publisher",
  "developer",
  "draft_editor",
  "maya_agent",
  "help_agent",
];

const ROLE_LABELS = {
  superadmin: "Superadmin",
  admin: "Admin",
  blogger: "Blogger",
  newsroom: "Newsroom",
  publisher: "Publisher",
  developer: "Developer",
  draft_editor: "Draft editor",
  maya_agent: "Maya agent",
  help_agent: "Help agent",
};

const ROLE_HELP = {
  developer:
    "Cross-area content builder (blog, newsroom, shop, media). Saves drafts only; Admin or Publisher must approve before anything goes live.",
  draft_editor:
    "Editorial draft access for blog and newsroom. Same draft-only publish flow — use Developer for shop and broader builds.",
  publisher:
    "Can publish live and approve pending requests for assigned content areas.",
  admin: "Full admin access including team management and publish approval.",
};

export default function AdminUsersPage() {
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [selectedRoles, setSelectedRoles] = useState(["developer"]);

  const { data: me } = useQuery({
    queryKey: ["admin-me"],
    queryFn: async () => {
      const res = await fetch("/api/admin/me");
      if (!res.ok) throw new Error("Unauthorized");
      return (await res.json()).data;
    },
  });

  const { data: users, isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await fetch("/api/admin/users");
      if (!res.ok) throw new Error("Failed to load users");
      return (await res.json()).data;
    },
  });

  const inviteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, roles: selectedRoles }),
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.message || "Invite failed");
      return payload.data;
    },
    onSuccess: () => {
      toast.success("Team member invited");
      setEmail("");
      queryClient.invalidateQueries(["admin-users"]);
    },
    onError: (err) => toast.error(err.message),
  });

  const updateRolesMutation = useMutation({
    mutationFn: async ({ userId, roles }) => {
      const res = await fetch(`/api/admin/users/${encodeURIComponent(userId)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roles }),
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.message || "Update failed");
      return payload.data;
    },
    onSuccess: () => {
      toast.success("Roles updated");
      queryClient.invalidateQueries(["admin-users"]);
    },
    onError: (err) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (userId) => {
      const res = await fetch(`/api/admin/users/${encodeURIComponent(userId)}`, {
        method: "DELETE",
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.message || "Remove failed");
      return payload.data;
    },
    onSuccess: () => {
      toast.success("Access revoked");
      queryClient.invalidateQueries(["admin-users"]);
    },
    onError: (err) => toast.error(err.message),
  });

  const toggleRole = (role) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role],
    );
  };

  if (!me?.capabilities?.includes("users:manage")) {
    return (
      <div className="p-8 pt-8 text-center text-gray-400">
        You do not have permission to manage team members.
      </div>
    );
  }

  return (
    <div className="p-8 pt-8 max-w-5xl mx-auto space-y-10">
      <header>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Shield size={28} /> Team & access
        </h1>
        <p className="text-gray-400 mt-2">
          Invite allowlisted eatOS accounts and assign roles.{" "}
          <strong className="text-gray-300">Developer</strong> is the recommended role
          for engineers and content builders who draft across blog, newsroom, and shop —
          their work stays in draft until an Admin, Publisher, or Superadmin approves it
          in the publish queue.
        </p>
      </header>

      <section className="bg-[#111] border border-white/10 rounded-xl p-6 space-y-4">
        <h2 className="font-semibold flex items-center gap-2">
          <UserPlus size={18} /> Invite team member
        </h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@eigital.com"
          className="w-full bg-[#050505] border border-white/10 rounded-lg px-3 py-2 text-sm"
        />
        <div className="flex flex-wrap gap-2">
          {ALL_ROLES.map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => toggleRole(role)}
              className={`text-xs px-2 py-1 rounded border ${
                selectedRoles.includes(role)
                  ? "bg-white text-black border-white"
                  : "border-white/20 text-gray-400"
              }`}
              title={ROLE_HELP[role] || undefined}
            >
              {ROLE_LABELS[role] || role}
            </button>
          ))}
        </div>
        {selectedRoles.some((role) => ROLE_HELP[role]) && (
          <ul className="text-xs text-gray-500 space-y-1 list-disc list-inside">
            {selectedRoles
              .filter((role) => ROLE_HELP[role])
              .map((role) => (
                <li key={role}>
                  <span className="text-gray-400">{ROLE_LABELS[role]}:</span>{" "}
                  {ROLE_HELP[role]}
                </li>
              ))}
          </ul>
        )}
        <button
          type="button"
          disabled={!email || inviteMutation.isLoading}
          onClick={() => inviteMutation.mutate()}
          className="px-4 py-2 bg-white text-black rounded-lg text-sm font-bold disabled:opacity-50"
        >
          {inviteMutation.isLoading ? "Inviting…" : "Send invite"}
        </button>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold">Current team</h2>
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <div className="space-y-3">
            {(users || []).map((user) => (
              <div
                key={user.userId}
                className="bg-[#111] border border-white/10 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <p className="font-medium">{user.email}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {(user.roles || []).map((r) => ROLE_LABELS[r] || r).join(" · ")}
                    {user.isSuperadmin && " · Superadmin"}
                  </p>
                </div>
                {!user.isSuperadmin && (
                  <div className="flex flex-wrap gap-2 items-center">
                    {ALL_ROLES.map((role) => {
                      const active = user.roles?.includes(role);
                      return (
                        <button
                          key={role}
                          type="button"
                          onClick={() => {
                            const next = active
                              ? user.roles.filter((r) => r !== role)
                              : [...(user.roles || []), role];
                            if (next.length) {
                              updateRolesMutation.mutate({
                                userId: user.userId,
                                roles: next,
                              });
                            }
                          }}
                          className={`text-[10px] px-2 py-1 rounded border ${
                            active
                              ? "bg-white/10 text-white border-white/30"
                              : "border-white/10 text-gray-500"
                          }`}
                          title={ROLE_HELP[role] || undefined}
                        >
                          {ROLE_LABELS[role]}
                        </button>
                      );
                    })}
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Revoke admin access for ${user.email}?`)) {
                          deleteMutation.mutate(user.userId);
                        }
                      }}
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
