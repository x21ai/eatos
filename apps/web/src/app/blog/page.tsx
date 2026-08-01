// @ts-nocheck
"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { motion } from "motion/react";
import { Loader2, ArrowRight, Mail } from "lucide-react";
import { toast } from "sonner";

export default function BlogIndexPage() {
  const [page, setPage] = useState(1);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Thanks for subscribing!", {
      description: "You'll receive our next newsletter in your inbox.",
    });
    setEmail("");
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["blog-posts", page],
    queryFn: async () => {
      const res = await fetch(
        `/api/blog?page=${page}&limit=9&status=published`,
      );
      if (!res.ok) throw new Error("Failed to fetch posts");
      return res.json();
    },
  });

  return (
    <div className="min-h-screen bg-white text-black pt-32 pb-20 font-sans selection:bg-black selection:text-white">
      <div className="container mx-auto px-4 md:px-6 max-w-[1200px]">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-200 pb-8"
        >
          <div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 text-black">
              Newsroom
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl font-medium">
              Latest news, insights, and stories.
            </p>
          </div>
          <div className="hidden md:block text-right">
            <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
              Archive
            </span>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-gray-400" size={32} />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-20 bg-gray-50 rounded-3xl">
            Unable to load stories at this time.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {/* Hero Post - Takes full width on mobile, 2 cols on large if we wanted, but grid map is easier */}
              {/* For Apple style, often the first item is big. Let's make the first item span 2 cols if we have enough items, or just keep uniform grid but style them cleanly */}

              {data?.data.map((post, index) => {
                const isHero = index === 0;
                // Dynamic classes for grid layout
                const gridClass = isHero
                  ? "md:col-span-2 lg:col-span-2"
                  : "col-span-1";

                return (
                  <motion.a
                    href={`/blog/${post.slug}`}
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`group block flex flex-col gap-6 ${gridClass}`}
                  >
                    <div className="aspect-[16/10] relative overflow-hidden rounded-[32px] bg-gray-100 shadow-sm group-hover:shadow-md transition-all duration-500">
                      {post.cover_image ? (
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <span className="font-medium">No Image</span>
                        </div>
                      )}
                      {/* Optional Gradient Overlay for text readability if we put text over image, but Apple puts text BELOW image usually for these cards */}
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold tracking-widest uppercase text-black bg-gray-100 px-3 py-1 rounded-full">
                          Update
                        </span>
                        <time className="text-xs font-medium text-gray-500">
                          {format(new Date(post.published_at), "MMMM d, yyyy")}
                        </time>
                      </div>

                      <h3
                        className={`font-bold leading-tight group-hover:text-gray-700 transition-colors ${isHero ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"}`}
                      >
                        {post.title}
                      </h3>

                      {/* Only show excerpt for Hero or if specifically desired. Apple often minimal on excerpts in grid */}
                      {isHero && post.excerpt && (
                        <p className="text-gray-500 text-lg leading-relaxed max-w-2xl line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Pagination */}
            {data?.pagination.totalPages > 1 && (
              <div className="flex justify-center mt-24 gap-4">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-8 py-3 rounded-full bg-black text-white disabled:opacity-50 disabled:bg-gray-200 disabled:text-gray-400 hover:bg-gray-800 transition-all font-medium text-sm"
                >
                  Previous
                </button>
                <div className="flex items-center px-4 font-medium text-gray-500">
                  Page {page} of {data.pagination.totalPages}
                </div>
                <button
                  onClick={() =>
                    setPage((p) => Math.min(data.pagination.totalPages, p + 1))
                  }
                  disabled={page === data.pagination.totalPages}
                  className="px-8 py-3 rounded-full bg-black text-white disabled:opacity-50 disabled:bg-gray-200 disabled:text-gray-400 hover:bg-gray-800 transition-all font-medium text-sm"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {/* Newsletter - Apple Style (Clean, Grey Background) */}
        <div className="mt-32 rounded-[40px] bg-[#F5F5F7] p-12 md:p-24 text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black tracking-tight">
              Get the latest updates.
            </h2>
            <p className="text-lg text-gray-500 mb-10 leading-relaxed">
              Sign up to receive the latest news and stories directly in your
              inbox.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white border-0 rounded-xl px-6 py-4 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white font-semibold rounded-xl px-8 py-4 hover:bg-blue-700 transition-colors shadow-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
