// @ts-nocheck
"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  Plus,
  Search,
  FileText,
  Calendar,
  CheckCircle2,
  Archive,
  MoreHorizontal,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

export default function BlogDashboard() {
  const [filter, setFilter] = useState("all"); // all | published | draft | scheduled | archived
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

  // Fetch Posts
  const { data: response, isLoading } = useQuery({
    queryKey: ["blog-posts", filter],
    queryFn: async () => {
      // In a real app we'd pass the filter to the API
      // For now we'll fetch all and filter client side if the API doesn't support complex filtering yet
      const res = await fetch("/api/blog");
      if (!res.ok) throw new Error("Failed to fetch posts");
      return res.json();
    },
  });

  const posts = response?.data || [];

  const createMutation = useMutation({
    mutationFn: async () => {
      const title = "Untitled Post";
      const slug = `untitled-${Date.now()}`;
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, slug }),
      });
      if (!res.ok) throw new Error("Failed to create post");
      return res.json();
    },
    onSuccess: (data) => {
      toast.success("Draft created");
      window.location.href = `/admin/blog/${data.slug}`;
    },
  });

  const filteredPosts = posts.filter((post) => {
    if (filter !== "all" && post.status !== filter) return false;
    if (search && !post.title.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "published":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "scheduled":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "archived":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
      default:
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 pt-32">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
            <p className="text-gray-400 mt-1">
              Manage your articles, schedule releases, and track performance.
            </p>
          </div>
          <button
            onClick={() => createMutation.mutate()}
            disabled={createMutation.isLoading}
            className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {createMutation.isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Plus size={20} />
            )}
            Create New Post
          </button>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 justify-between bg-[#0A0A0A] p-2 rounded-2xl border border-white/5">
          <div className="flex overflow-x-auto no-scrollbar">
            {["all", "published", "draft", "scheduled", "archived"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2.5 rounded-xl text-sm font-medium capitalize transition-all whitespace-nowrap ${
                  filter === f
                    ? "bg-white/10 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={16}
            />
            <input
              type="text"
              placeholder="Search posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#111] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/20 w-full md:w-64"
            />
          </div>
        </div>

        {/* List */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-white/20" size={32} />
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredPosts.map((post) => (
              <a
                href={`/admin/blog/${post.slug}`}
                key={post.id}
                className="group flex flex-col md:flex-row items-start md:items-center gap-6 p-6 bg-[#0A0A0A] border border-white/5 rounded-2xl hover:border-white/20 transition-all hover:bg-white/[0.02]"
              >
                {/* Image */}
                <div className="w-full md:w-32 h-20 bg-[#111] rounded-lg overflow-hidden border border-white/5 shrink-0">
                  {post.cover_image ? (
                    <img
                      src={post.cover_image}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-700">
                      <FileText size={24} />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(post.status || "draft")}`}
                    >
                      {post.status || "draft"}
                    </span>
                    {post.published_at && (
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar size={12} />
                        {format(new Date(post.published_at), "MMM d, yyyy")}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold truncate group-hover:text-indigo-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm truncate mt-1">
                    {post.excerpt || "No excerpt"}
                  </p>
                </div>

                {/* Stats / Actions */}
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <div className="text-right hidden md:block">
                    <div className="text-white font-medium">Author</div>
                    <div>{post.author_name || "Unknown"}</div>
                  </div>
                  <div className="p-2 rounded-full hover:bg-white/10 text-gray-400 transition-colors">
                    <MoreHorizontal size={20} />
                  </div>
                </div>
              </a>
            ))}

            {filteredPosts.length === 0 && (
              <div className="text-center py-20 text-gray-500">
                <Archive size={48} className="mx-auto mb-4 opacity-20" />
                <p>No posts found matching your criteria.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
