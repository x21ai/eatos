// @ts-nocheck
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Check, X } from "lucide-react";
import { toast } from "sonner";

export default function PublishQueuePage() {
  const queryClient = useQueryClient();

  const { data: me } = useQuery({
    queryKey: ["admin-me"],
    queryFn: async () => {
      const res = await fetch("/api/admin/me");
      if (!res.ok) throw new Error("Unauthorized");
      return (await res.json()).data;
    },
  });

  const canApprove = me?.permissions?.canApprovePublish;

  const { data: requests, isLoading } = useQuery({
    queryKey: ["publish-requests"],
    enabled: !!canApprove,
    queryFn: async () => {
      const res = await fetch("/api/admin/publish-requests?status=pending");
      if (!res.ok) throw new Error("Failed to load queue");
      return (await res.json()).data;
    },
  });

  const actionMutation = useMutation({
    mutationFn: async ({ id, action }) => {
      const res = await fetch(`/api/admin/publish-requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.message || "Action failed");
      return payload.data;
    },
    onSuccess: (_, vars) => {
      toast.success(vars.action === "approve" ? "Published live" : "Request rejected");
      queryClient.invalidateQueries(["publish-requests"]);
    },
    onError: (err) => toast.error(err.message),
  });

  if (!canApprove) {
    return (
      <div className="p-8 pt-8 text-center text-gray-400">
        You do not have permission to approve live publishing.
      </div>
    );
  }

  return (
    <div className="p-8 pt-8 max-w-4xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Publish approval queue</h1>
        <p className="text-gray-400 mt-2">
          Review draft content submitted by Developers and other draft-only roles.
          Admins can approve all areas; Publishers can approve only the content types
          they can publish live (blog, newsroom, or shop).
        </p>
      </header>

      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : !(requests || []).length ? (
        <p className="text-gray-500">No pending publish requests.</p>
      ) : (
        <div className="space-y-3">
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-[#111] border border-white/10 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <p className="font-medium capitalize">
                  {req.content_type} · {req.content_slug}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Requested by {req.requested_by_email} ·{" "}
                  {new Date(req.requested_at).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => actionMutation.mutate({ id: req.id, action: "approve" })}
                  className="flex items-center gap-1 px-3 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm border border-green-500/30"
                >
                  <Check size={14} /> Approve & publish
                </button>
                <button
                  type="button"
                  onClick={() => actionMutation.mutate({ id: req.id, action: "reject" })}
                  className="flex items-center gap-1 px-3 py-2 bg-red-500/10 text-red-400 rounded-lg text-sm border border-red-500/20"
                >
                  <X size={14} /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
