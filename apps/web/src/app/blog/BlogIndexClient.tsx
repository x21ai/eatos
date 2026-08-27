// @ts-nocheck
'use client';

import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Placeholder } from '@/components/marketing/Placeholder';
import { NewsletterSection } from '@/components/NewsletterSection';
import { blogHero, categories, posts, formatDate } from './content';

const PAGE_SIZE = 6;

function Meta({ post, tone = 'light' }) {
  const muted = tone === 'light' ? 'text-zinc-500' : 'text-zinc-400';
  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${muted}`}>
      <span className={tone === 'light' ? 'text-brand-on-dark' : 'text-brand-on-dark'}>{post.category}</span>
      <span aria-hidden>·</span>
      <span>{formatDate(post.date)}</span>
    </div>
  );
}

function Hero() {
  return (
    <section className="bg-black pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="max-w-3xl"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-on-dark">
            {blogHero.eyebrow}
          </p>
          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tighter text-white sm:text-5xl md:text-6xl">
            {blogHero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
            {blogHero.intro}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function Featured({ post }) {
  if (!post) return null;
  return (
    <section className="border-b border-white/10 bg-black py-14 md:py-20">
      <div className="site-container">
        <a href={`/blog/${post.slug}`} className="group grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14">
          <Placeholder label={post.title} src={post.image} tone="dark" ratio="aspect-[16/10]" />
          <div className="min-w-0">
            <Meta post={post} />
            <h2 className="mt-5 line-clamp-2 max-w-2xl text-2xl font-bold leading-[1.1] tracking-tighter text-white sm:text-3xl md:text-4xl">
              {post.title}
            </h2>
            <p className="mt-5 line-clamp-3 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
              {post.excerpt}
            </p>
            <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white">
              Read the story
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </a>
      </div>
    </section>
  );
}

function Card({ post, index }) {
  return (
    <motion.a
      href={`/blog/${post.slug}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: Math.min(index, 5) * 0.05 }}
      className="group flex min-w-0 flex-col"
    >
      <Placeholder label={post.title} src={post.image} tone="dark" ratio="aspect-[16/10]" />
      <div className="mt-6 min-w-0">
        <Meta post={post} />
        <h3 className="mt-3 line-clamp-2 text-xl font-bold leading-snug tracking-tighter text-white transition-colors group-hover:text-zinc-300 sm:text-[1.375rem]">
          {post.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">{post.excerpt}</p>
      </div>
    </motion.a>
  );
}

export default function BlogIndexClient() {
  const [active, setActive] = useState('All Posts');
  const [visible, setVisible] = useState(PAGE_SIZE);

  const sorted = useMemo(
    () => [...posts].sort((a, b) => new Date(b.date) - new Date(a.date)),
    [],
  );

  const filtered = useMemo(
    () => (active === 'All Posts' ? sorted : sorted.filter((p) => p.category === active)),
    [active, sorted],
  );

  const featured = active === 'All Posts' ? filtered[0] : null;
  const rest = featured ? filtered.slice(1) : filtered;
  const shown = rest.slice(0, visible);

  const available = categories.filter(
    (c) => c === 'All Posts' || posts.some((p) => p.category === c),
  );

  return (
    <main className="bg-black">
      <Hero />
      <Featured post={featured} />

      <section className="bg-black py-14 md:py-20">
        <div className="site-container">
          <div className="grid grid-cols-[minmax(0,1fr)] gap-6 border-b border-white/10 pb-6 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
            <h2 className="min-w-0 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Latest posts
            </h2>
            <div className="scrollbar-hidden -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
              {available.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setActive(c);
                    setVisible(PAGE_SIZE);
                  }}
                  className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                    active === c
                      ? 'border-white bg-white text-black'
                      : 'border-white/15 bg-white/5 text-zinc-300 hover:border-white/40 hover:text-white'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-10 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-14">
            {shown.map((post, i) => (
              <Card key={post.slug} post={post} index={i} />
            ))}
          </div>

          {rest.length > shown.length && (
            <div className="mt-14 flex justify-center">
              <button
                type="button"
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="rounded-full border border-white/20 px-8 py-3 text-sm font-semibold text-white transition-colors hover:border-white"
              >
                Load more stories
              </button>
            </div>
          )}

          {filtered.length === 0 && (
            <p className="mt-12 text-sm text-zinc-500">No posts in this category yet.</p>
          )}
        </div>
      </section>

      <NewsletterSection />
    </main>
  );
}