// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Loader2,
  Save,
  ArrowLeft,
  Image as ImageIcon,
  Eye,
  Layout,
  Calendar,
  Globe,
  Settings,
} from "lucide-react";
import RichTextEditor from "@/components/admin/RichTextEditor";
import MediaLibrary from "@/components/admin/MediaLibrary";

export default function EditBlogPost({ params }) {
  const { slug } = params;
  const queryClient = useQueryClient();
  const [showCoverLibrary, setShowCoverLibrary] = useState(false);

  const { register, handleSubmit, reset, watch, setValue } = useForm();
  const watchedContent = watch("content");

  // Fetch Post Data
  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const res = await fetch(`/api/blog/${slug}`);
      if (!res.ok) throw new Error("Failed to fetch post");
      const payload = await res.json();
      return payload.data;
    },
    onSuccess: (data) => {
      reset({
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        cover_image: data.cover_image,
        seo_title: data.seo_title,
        seo_description: data.seo_description,
        keywords: data.keywords,
        status: data.status,
        published_at: data.published_at
          ? data.published_at.slice(0, 16)
          : "",
      });
    },
  });

  // Update Mutation
  const updateMutation = useMutation({
    mutationFn: async (data) => {
      // Map form data to API expected format
      const payload = {
        ...data,
        new_slug: data.slug !== slug ? data.slug : undefined,
      };

      const res = await fetch(`/api/blog/${slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update post");
      const result = await res.json();
      return result.data;
    },
    onSuccess: (data) => {
      toast.success("Post updated successfully");
      queryClient.invalidateQueries(["blog-post", slug]);
      if (data.slug !== slug) {
        window.location.href = `/admin/blog/${data.slug}`;
      }
    },
    onError: () => {
      toast.error("Failed to update post");
    },
  });

  const onSubmit = (data) => {
    updateMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#0A0A0A] border-b border-white/5 flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-4">
          <a
            href="/admin/blog"
            className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white"
          >
            <ArrowLeft size={20} />
          </a>
          <h1 className="font-semibold text-lg truncate max-w-[300px]">
            {post?.title}
          </h1>
          <span
            className={`px-2 py-0.5 rounded text-xs border ${
              post?.status === "published"
                ? "bg-green-500/10 text-green-500 border-green-500/20"
                : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
            }`}
          >
            {post?.status || "Draft"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`/blog/${slug}`}
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors"
          >
            <Eye size={16} /> Preview Post
          </a>
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={updateMutation.isLoading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black text-sm font-bold hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {updateMutation.isLoading ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <Save size={16} />
            )}
            Save Changes
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="pt-24 pb-20 px-6 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
        {/* Left Column: Editor */}
        <div className="space-y-8 min-w-0">
          {/* Title */}
          <input
            {...register("title")}
            className="w-full bg-transparent text-5xl font-bold placeholder-gray-700 border-none focus:ring-0 p-0 leading-tight"
            placeholder="Post Title"
          />

          {/* Cover Image */}
          <div
            className={`w-full rounded-2xl bg-[#111] border border-white/10 overflow-hidden relative group cursor-pointer hover:border-white/30 transition-all ${
              watch("cover_image") ? "h-auto" : "h-24"
            }`}
            onClick={() => setShowCoverLibrary(true)}
          >
            {watch("cover_image") ? (
              <>
                <img
                  src={watch("cover_image")}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold">
                    Change Cover Image
                  </button>
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 gap-3">
                <ImageIcon size={20} className="opacity-50" />
                <span className="font-medium text-sm">Add Cover Image</span>
              </div>
            )}
          </div>

          {/* Editor */}
          <div className="space-y-2">
            <RichTextEditor
              value={watch("content")}
              onChange={(val) =>
                setValue("content", val, { shouldDirty: true })
              }
            />
          </div>
        </div>

        {/* Right Column: Settings Sidebar */}
        <div className="space-y-6 h-fit sticky top-24">
          {/* Publishing Settings */}
          <div className="bg-[#111] rounded-xl border border-white/10 p-5 space-y-4">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Calendar size={16} className="text-gray-400" /> Publishing
            </h3>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">
                Status
              </label>
              <select
                {...register("status")}
                className="w-full bg-[#050505] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/20"
              >
                <option value="draft">Draft</option>
                <option value="published">Published (live)</option>
                <option value="pending_publish">Pending approval</option>
                <option value="archived">Archived</option>
              </select>
              <p className="text-[11px] text-gray-500">
                Draft editors submit for approval; publishers and superadmin can go live.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">
                Publish Date
              </label>
              <input
                type="datetime-local"
                {...register("published_at")}
                className="w-full bg-[#050505] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/20"
              />
            </div>
          </div>

          {/* URL & Excerpt */}
          <div className="bg-[#111] rounded-xl border border-white/10 p-5 space-y-4">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Settings size={16} className="text-gray-400" /> General
            </h3>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">
                URL Slug
              </label>
              <div className="flex items-center gap-2 bg-[#050505] border border-white/10 rounded-lg px-3 py-2">
                <span className="text-gray-500 text-xs">/blog/</span>
                <input
                  {...register("slug")}
                  className="flex-1 bg-transparent text-sm text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">
                Excerpt
              </label>
              <textarea
                {...register("excerpt")}
                rows={3}
                className="w-full bg-[#050505] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/20"
                placeholder="Short summary for cards..."
              />
            </div>
          </div>

          {/* SEO Settings */}
          <div className="bg-[#111] rounded-xl border border-white/10 p-5 space-y-4">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Globe size={16} className="text-gray-400" /> SEO & Metadata
            </h3>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">
                SEO Title
              </label>
              <input
                {...register("seo_title")}
                className="w-full bg-[#050505] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/20"
                placeholder={watch("title")}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">
                Description
              </label>
              <textarea
                {...register("seo_description")}
                rows={3}
                className="w-full bg-[#050505] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/20"
                placeholder="Meta description for search engines..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">
                Keywords
              </label>
              <input
                {...register("keywords")}
                className="w-full bg-[#050505] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/20"
                placeholder="comma, separated, keys"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Media Library Modal for Cover Image */}
      {showCoverLibrary && (
        <MediaLibrary
          onSelect={(url) => {
            setValue("cover_image", url, { shouldDirty: true });
            setShowCoverLibrary(false);
          }}
          onClose={() => setShowCoverLibrary(false)}
        />
      )}
    </div>
  );
}
