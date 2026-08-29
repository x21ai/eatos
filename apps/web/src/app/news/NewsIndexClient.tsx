// @ts-nocheck
'use client';

import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Placeholder } from '@/components/marketing/Placeholder';
import { NewsletterSection } from '@/components/NewsletterSection';
import { newsHero, categories, newsItems, formatDate } from './content';

const PAGE_SIZE = 12;

function newsHref(slug) {
  return `/news/${encodeURIComponent(slug)}`;
}

export default function NewsIndexClient({ initialCategory = 'All News' }) {
  const [active, setActive] = useState(
    categories.includes(initialCategory) ? initialCategory : 'All News',
  );
  const [page, setPage] = useState(1);

  const available = categories.filter(
    (c) => c === 'All News' || newsItems.some((p) => p.category === c),
  );

  const filtered = useMemo(
    () => (active === 'All News' ? newsItems : newsItems.filter((p) => p.category === active)),
    [active],
  );

  const visible = filtered.slice(0, page * PAGE_SIZE);
  const featured = filtered[0];

  return (
    <div className="bg-black text-zinc-200">
      <section className="pt-32 md:pt-44 pb-10 md:pb-14">
        <div className="site-container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
            className="relative overflow-hidden rounded-[24px] border border-white/10 md:rounded-[32px]"
          >
            {featured?.image ? (
              <img
                src={featured.image}
                alt=""
                aria-hidden
                className="absolute inset-0 h-full w-full object-cover opacity-40"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/40" />
            <div className="relative px-6 py-14 sm:px-10 sm:py-16 md:px-14 md:py-20">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-on-dark">
                {newsHero.eyebrow}
              </p>
              <h1 className="mt-5 max-w-2xl text-3xl font-bold leading-[1.05] tracking-tighter text-white sm:text-4xl md:text-5xl">
                {newsHero.title}
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-6 text-zinc-300 sm:text-base sm:leading-7">
                {newsHero.intro}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/bookademo"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
                >
                  Book a Demo
                  <ArrowRight size={16} />
                </a>
                <a
                  href="/blog"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white"
                >
                  Read the blog
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="site-container">
          <div className="scrollbar-hidden -mx-4 flex items-center gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
            {available.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setActive(c);
                  setPage(1);
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

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((post, index) => (
              <motion.a
                key={post.slug}
                href={newsHref(post.slug)}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: Math.min(index % PAGE_SIZE, 5) * 0.05 }}
                className="group flex min-w-0 flex-col rounded-[24px] border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-white/25 sm:p-5"
              >
                <Placeholder label={post.title} src={post.image} tone="dark" ratio="aspect-[16/10]" />
                <div className="mt-6 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                    <span className="text-brand-on-dark">{post.category}</span>
                    <span aria-hidden>·</span>
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <h2 className="mt-3 line-clamp-3 text-lg font-bold leading-snug tracking-tighter text-white transition-colors group-hover:text-brand-on-dark sm:text-xl">
                    {post.title}
                  </h2>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-400">{post.excerpt}</p>
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 border-t border-white/10 pt-5 text-sm font-semibold text-white">
                  Read More
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </motion.a>
            ))}
          </div>

          {visible.length < filtered.length && (
            <div className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={() => setPage((p) => p + 1)}
                className="rounded-full border border-white/25 px-7 py-3 text-sm font-semibold text-white transition-colors hover:border-white"
              >
                Load more
              </button>
            </div>
          )}
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
}
