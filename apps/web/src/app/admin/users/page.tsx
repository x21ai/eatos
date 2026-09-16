// @ts-nocheck
"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, UserPlus, Trash2, Shield } from "lucide-react";
import { toast } from "sonner";

const OTHER_ROLES = [
  "admin",
  "blogger",
  "newsroom",
  "publisher",
  "maya_agent",
  "help_agent",
];

const DEVELOPER_ACCESS_ROLES = ["developer_view", "developer", "developer_publish"];

const ROLE_LABELS = {
  superadmin: "Superadmin",
  admin: "Admin",
  blogger: "Blogger",
  newsroom: "Newsroom",
  publisher: "Publisher",
  developer_view: "Developer (view)",
  developer: "Developer (draft)",
  developer_publish: "Developer (publish)",
  draft_editor: "Draft editor",
  maya_agent: "Maya agent",
  help_agent: "Help agent",
};

const DEVELOPER_ACCESS_HELP = {
  developer_view:
    "Read-only across blog, newsroom, and shop admin. Cannot edit content or publish.",
  developer:
    "Develop and save drafts across blog, newsroom, shop, and media. Live publish requires Admin, Publisher, or Superadmin approval.",
  developer_publish:
    "Develop and publish live for blog, newsroom, and shop. Cannot manage team members or approve others' publish queue items.",
};

const OTHER_ROLE_HELP = {
  publisher: "Can publish live and approve pending requests for assigned content areas.",
  admin: "Full admin access including team management and publish approval.",
};

function stripDeveloperRoles(roles) {
  return roles.filter((role) => !DEVELOPER_ACCESS_ROLES.includes(role));
}

function getDeveloperAccess(roles) {
  return DEVELOPER_ACCESS_ROLES.find((role) => roles.includes(role)) || null;
}

function buildRoles(otherRoles, developerAccess) {
  const base = stripDeveloperRoles(otherRoles);
  return developerAccess ? [...base, developerAccess] : base;
}

export default function AdminUsersPage() {
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [selectedOtherRoles, setSelectedOtherRoles] = useState([]);
  const [developerAccess, setDeveloperAccess] = useState("developer");

  const selectedRoles = buildRoles(selectedOtherRoles, developerAccess);

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
      const roles = buildRoles(selectedOtherRoles, developerAccess);
      if (!roles.length) {
        throw new Error("Select at least one role or a Developer access level.");
      }
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, roles }),
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

  const toggleOtherRole = (role) => {
    setSelectedOtherRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role],
    );
  };

  const formatUserRoles = (roles) =>
    (roles || [])
      .map((role) => ROLE_LABELS[role] || role)
      .join(" · ");

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
          Invite allowlisted eatOS accounts and assign roles. Use{" "}
          <strong className="text-gray-300">Developer access</strong> for engineers and
          content builders — choose view-only, draft-only (needs approval to go live), or
          full develop-and-publish for blog, newsroom, and shop.
        </p>
      </header>

      <section className="bg-[#111] border border-white/10 rounded-xl p-6 space-y-5">
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

        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wider text-gray-500">Developer access</p>
          <div className="flex flex-wrap gap-2">
            {DEVELOPER_ACCESS_ROLES.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setDeveloperAccess(role)}
                className={`text-xs px-3 py-1.5 rounded border ${
                  developerAccess === role
                    ? "bg-white text-black border-white"
                    : "border-white/20 text-gray-400"
                }`}
              >
                {role === "developer_view"
                  ? "View"
                  : role === "developer"
                    ? "Draft develop"
                    : "Develop & publish"}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setDeveloperAccess(null)}
              className={`text-xs px-3 py-1.5 rounded border ${
                !developerAccess
                  ? "bg-white/10 text-white border-white/30"
                  : "border-white/20 text-gray-500"
              }`}
            >
              None
            </button>
          </div>
          {developerAccess && (
            <p className="text-xs text-gray-500">{DEVELOPER_ACCESS_HELP[developerAccess]}</p>
          )}
        </div>

        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wider text-gray-500">Other roles</p>
          <div className="flex flex-wrap gap-2">
            {OTHER_ROLES.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => toggleOtherRole(role)}
                className={`text-xs px-2 py-1 rounded border ${
                  selectedOtherRoles.includes(role)
                    ? "bg-white text-black border-white"
                    : "border-white/20 text-gray-400"
                }`}
                title={OTHER_ROLE_HELP[role] || undefined}
              >
                {ROLE_LABELS[role] || role}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          disabled={!email || !selectedRoles.length || inviteMutation.isLoading}
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
            {(users || []).map((user) => {
              const userDevAccess = getDeveloperAccess(user.roles || []);
              const userOtherRoles = stripDeveloperRoles(user.roles || []);

              return (
                <div
                  key={user.userId}
                  className="bg-[#111] border border-white/10 rounded-xl p-4 flex flex-col gap-4"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <p className="font-medium">{user.email}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatUserRoles(user.roles)}
                        {user.isSuperadmin && " · Superadmin"}
                      </p>
                    </div>
                    {!user.isSuperadmin && (
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Revoke admin access for ${user.email}?`)) {
                            deleteMutation.mutate(user.userId);
                          }
                        }}
                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg self-start md:self-center"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>

                  {!user.isSuperadmin && (
                    <div className="space-y-3 border-t border-white/5 pt-3">
                      <div className="space-y-2">
                        <p className="text-[10px] uppercase tracking-wider text-gray-500">
                          Developer access
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {DEVELOPER_ACCESS_ROLES.map((role) => (
                            <button
                              key={role}
                              type="button"
                              onClick={() => {
                                const next = buildRoles(userOtherRoles, role);
                                updateRolesMutation.mutate({
                                  userId: user.userId,
                                  roles: next,
                                });
                              }}
                              className={`text-[10px] px-2 py-1 rounded border ${
                                userDevAccess === role
                                  ? "bg-white/10 text-white border-white/30"
                                  : "border-white/10 text-gray-500"
                              }`}
                            >
                              {role === "developer_view"
                                ? "View"
                                : role === "developer"
                                  ? "Draft"
                                  : "Publish"}
                            </button>
                          ))}
                          {userDevAccess && (
                            <button
                              type="button"
                              onClick={() => {
                                if (userOtherRoles.length) {
                                  updateRolesMutation.mutate({
                                    userId: user.userId,
                                    roles: userOtherRoles,
                                  });
                                }
                              }}
                              disabled={!userOtherRoles.length}
                              className="text-[10px] px-2 py-1 rounded border border-white/10 text-gray-500 disabled:opacity-40"
                            >
                              Clear dev access
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-[10px] uppercase tracking-wider text-gray-500">
                          Other roles
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {OTHER_ROLES.map((role) => {
                            const active = userOtherRoles.includes(role);
                            return (
                              <button
                                key={role}
                                type="button"
                                onClick={() => {
                                  const nextOther = active
                                    ? userOtherRoles.filter((r) => r !== role)
                                    : [...userOtherRoles, role];
                                  const next = buildRoles(nextOther, userDevAccess);
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
                              >
                                {ROLE_LABELS[role]}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
