// @ts-nocheck
'use client';

import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import {
  Loader2,
  ArrowLeft,
  Calendar,
  User,
  Heart,
  Share2,
  Link as LinkIcon,
  Check,
} from 'lucide-react';
import { useState, useMemo } from 'react';

export default function BlogPostPage({ params }) {
  const { slug } = params;
  const [liked, setLiked] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const res = await fetch(`/api/blog/${slug}`);
      if (!res.ok) {
        if (res.status === 404) throw new Error('Post not found');
        throw new Error('Failed to fetch post');
      }
      return res.json();
    },
  });

  const formattedDate = useMemo(() => {
    if (!post?.published_at) return '';
    try {
      return format(new Date(post.published_at), 'MMMM d, yyyy');
    } catch {
      return '';
    }
  }, [post?.published_at]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    toast.success('Thanks for subscribing!');
    setEmail('');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white text-black flex justify-center items-center">
        <Loader2 className="animate-spin text-gray-400" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white text-black flex flex-col justify-center items-center gap-6">
        <div className="text-black text-2xl font-bold">Article not found</div>
        <p className="text-gray-500">
          The story you are looking for does not exist or has been moved.
        </p>
        <a
          href="/blog"
          className="px-8 py-3 rounded-full bg-black text-white hover:bg-gray-800 transition-colors font-medium"
        >
          Back to Newsroom
        </a>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-white text-[#1d1d1f] font-sans selection:bg-blue-100 selection:text-blue-900 pb-32">
      {/* Navigation / Breadcrumb - Apple Style (Top Bar) */}
      <nav className="border-b border-gray-200/60 sticky top-0 z-40 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          <a
            href="/blog"
            className="text-sm font-semibold text-gray-800 hover:text-black flex items-center gap-1"
          >
            <ArrowLeft size={16} className="text-gray-400" /> Newsroom
          </a>

          <div className="flex gap-4">
            <button
              onClick={handleShare}
              className="text-gray-500 hover:text-black transition-colors"
              aria-label="Share"
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 md:px-6 pt-12 md:pt-20">
        {/* Header Content */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="text-xs font-bold tracking-widest uppercase bg-gray-100 px-3 py-1 rounded-full text-gray-900">
              Story
            </span>
            <span className="text-xs font-medium text-gray-500">{formattedDate}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#1d1d1f] mb-8 leading-[1.1]">
            {post.title}
          </h1>

          <div className="flex items-center justify-center gap-3">
            {/* Optional: Author Avatar if available, otherwise just text */}
            <div className="text-sm font-medium text-[#1d1d1f]">By {post.author_name}</div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="max-w-[1100px] mx-auto mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="aspect-[16/9] md:aspect-[21/9] rounded-[32px] overflow-hidden shadow-sm bg-gray-100"
          >
            <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
          </motion.div>
        </div>

        {/* Content Body */}
        <div className="max-w-[692px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div
              className="prose prose-lg md:prose-xl max-w-none
                prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-[#1d1d1f]
                prose-p:text-[#1d1d1f] prose-p:leading-relaxed prose-p:font-normal
                prose-a:text-[#0066CC] prose-a:font-medium hover:prose-a:underline
                prose-strong:text-[#1d1d1f] prose-strong:font-semibold
                prose-img:rounded-2xl prose-img:shadow-sm prose-img:my-12 prose-img:w-full
                prose-blockquote:border-l-4 prose-blockquote:border-[#1d1d1f] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-2xl prose-blockquote:font-medium prose-blockquote:text-[#1d1d1f] prose-blockquote:bg-transparent
                prose-ul:list-disc prose-ul:pl-6 prose-ul:marker:text-[#1d1d1f]
                prose-li:text-[#1d1d1f] prose-li:my-2
                "
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </motion.div>

          {/* Tags / Keywords (Optional - Apple puts them at bottom often) */}
          {post.keywords && (
            <div className="mt-16 pt-8 border-t border-gray-100 flex flex-wrap gap-2">
              {post.keywords.split(',').map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer / More Stories (Simplified) */}
      <div className="bg-[#F5F5F7] mt-32 py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-[1100px]">
          <h3 className="text-3xl font-bold mb-12 text-center">More to explore</h3>
          <div className="flex justify-center">
            <a
              href="/blog"
              className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline text-lg"
            >
              View all stories <ArrowLeft className="rotate-180" size={20} />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
