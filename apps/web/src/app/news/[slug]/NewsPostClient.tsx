// @ts-nocheck
'use client';

import { motion } from 'motion/react';
import { toast } from 'sonner';
import { ArrowLeft, ArrowRight, Share2 } from 'lucide-react';
import { Placeholder } from '@/components/marketing/Placeholder';
import { NewsletterSection } from '@/components/NewsletterSection';
import { getNewsItem, getRelatedNews, formatDate } from '../content';

function newsHref(slug) {
  return `/news/${encodeURIComponent(slug)}`;
}

export default function NewsPostClient({ slug }) {
  const post = getNewsItem(slug);
  const related = getRelatedNews(slug, 3);

  const handleShare = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    } catch {
      toast.error('Could not copy the link');
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center gap-6">
        <div className="text-2xl font-bold">Story not found</div>
        <p className="text-zinc-400">The story you are looking for does not exist or has been moved.</p>
        <a
          href="/news"
          className="px-8 py-3 rounded-full bg-white text-black hover:bg-zinc-200 transition-colors font-medium"
        >
          Back to Newsroom
        </a>
      </div>
    );
  }

  return (
    <article className="bg-black text-zinc-200">
      <header className="bg-black pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="site-container">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <a
              href="/news"
              className="inline-flex min-w-0 items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 transition-colors hover:text-white"
            >
              <ArrowLeft size={14} className="shrink-0" />
              <span className="truncate">Back to newsroom</span>
            </a>
            <button
              type="button"
              onClick={handleShare}
              aria-label="Copy link to this story"
              className="shrink-0 rounded-full border border-white/15 p-2.5 text-zinc-300 transition-colors hover:border-white/40 hover:text-white"
            >
              <Share2 size={16} />
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
            className="mt-10 max-w-3xl"
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
              <span className="text-brand-on-dark">{post.category}</span>
              <span aria-hidden>·</span>
              <span>{formatDate(post.date)}</span>
            </div>
            <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tighter text-white sm:text-5xl">
              {post.title}
            </h1>
            {post.excerpt ? (
              <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
                {post.excerpt}
              </p>
            ) : null}
            <p className="mt-6 text-sm font-medium text-zinc-500">By {post.author}</p>
          </motion.div>
        </div>
      </header>

      <div className="site-container">
        <div className="-mt-10 md:-mt-14">
          <Placeholder label={post.title} src={post.image} tone="dark" ratio="aspect-[16/9]" />
        </div>

        <div className="mx-auto max-w-[700px] py-16 md:py-24">
          {post.body.map((block, i) => {
            if (block.type === 'h2') {
              return (
                <h2
                  key={i}
                  className="mt-14 text-2xl font-bold tracking-tighter text-white first:mt-0 sm:text-3xl"
                >
                  {block.text}
                </h2>
              );
            }
            if (block.type === 'ul') {
              return (
                <ul key={i} className="mt-6 space-y-3">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-3 text-base leading-8 text-zinc-300 sm:text-lg">
                      <span aria-hidden className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      <span className="min-w-0">{item}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="mt-6 text-base leading-8 text-zinc-300 sm:text-lg sm:leading-9">
                {block.text}
              </p>
            );
          })}
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-white/10 bg-zinc-950 py-16 md:py-24">
          <div className="site-container">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">More news</h2>
            <div className="mt-10 grid gap-10 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3 lg:gap-x-10">
              {related.map((item) => (
                <a key={item.slug} href={newsHref(item.slug)} className="group flex min-w-0 flex-col">
                  <Placeholder label={item.title} src={item.image} tone="dark" ratio="aspect-[16/10]" />
                  <div className="mt-5 min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-on-dark">
                      {item.category}
                    </p>
                    <h3 className="mt-2 line-clamp-2 text-lg font-bold leading-snug tracking-tighter text-white transition-colors group-hover:text-zinc-300">
                      {item.title}
                    </h3>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                      Read
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <NewsletterSection />
    </article>
  );
}
