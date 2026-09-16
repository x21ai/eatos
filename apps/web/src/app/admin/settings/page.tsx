// @ts-nocheck
"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { KeyRound, Loader2 } from "lucide-react";

export default function AdminSettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: me } = useQuery({
    queryKey: ["admin-me"],
    queryFn: async () => {
      const res = await fetch("/api/admin/me");
      if (!res.ok) throw new Error("Unauthorized");
      return (await res.json()).data;
    },
  });

  const onChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    const { error } = await authClient.changePassword({
      currentPassword,
      newPassword,
      revokeOtherSessions: true,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Could not change password");
      return;
    }

    toast.success("Password updated");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="p-8 pt-8 max-w-lg mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Account settings</h1>
        <p className="text-gray-400 mt-2">{me?.email}</p>
      </header>

      <form
        onSubmit={onChangePassword}
        className="bg-[#111] border border-white/10 rounded-xl p-6 space-y-4"
      >
        <h2 className="font-semibold flex items-center gap-2">
          <KeyRound size={18} /> Change password
        </h2>

        <label className="block space-y-1 text-sm">
          <span className="text-gray-400">Current password</span>
          <input
            type="password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full bg-[#050505] border border-white/10 rounded-lg px-3 py-2"
          />
        </label>

        <label className="block space-y-1 text-sm">
          <span className="text-gray-400">New password</span>
          <input
            type="password"
            required
            minLength={8}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full bg-[#050505] border border-white/10 rounded-lg px-3 py-2"
          />
        </label>

        <label className="block space-y-1 text-sm">
          <span className="text-gray-400">Confirm new password</span>
          <input
            type="password"
            required
            minLength={8}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-[#050505] border border-white/10 rounded-lg px-3 py-2"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-white text-black rounded-lg text-sm font-bold disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" size={16} /> : null}
          Update password
        </button>
      </form>

      {me?.isSuperadmin && (
        <p className="text-xs text-gray-500">
          As superadmin, you can reset other users by revoking their admin access and
          re-inviting them. Full password reset emails require Resend configuration.
        </p>
      )}
    </div>
  );
}
