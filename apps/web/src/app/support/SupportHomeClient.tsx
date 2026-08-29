// @ts-nocheck
'use client';

import { motion } from 'motion/react';
import { ArrowRight, BookOpen, LifeBuoy } from 'lucide-react';
import SupportSearch from './SupportSearch';
import {
  articleHref,
  articles,
  categories,
  categoryHref,
  featuredArticles,
  supportHero,
} from './content';

function CategoryCard({ category, index }) {
  return (
    <motion.a
      href={categoryHref(category.slug)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: Math.min(index, 6) * 0.04 }}
      className="group flex min-w-0 flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/30"
    >
      <span className="grid h-10 w-10 place-items-center rounded-2xl border border-white/12 bg-white/[0.05] text-brand-on-dark">
        <BookOpen size={18} aria-hidden />
      </span>
      <h3 className="mt-5 text-lg font-bold tracking-tighter text-white transition-colors group-hover:text-brand-on-dark sm:text-xl">
        {category.title}
      </h3>
      {category.description ? (
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-400">{category.description}</p>
      ) : null}
      <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
        {category.articleCount} {category.articleCount === 1 ? 'article' : 'articles'}
        <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" aria-hidden />
      </span>
    </motion.a>
  );
}

export default function SupportHomeClient() {
  return (
    <div className="bg-black text-zinc-200">
      <section className="bg-black pt-[128px] md:pt-[176px] pb-14 md:pb-20">
        <div className="site-container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
            className="max-w-3xl"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-on-dark">
              {supportHero.eyebrow}
            </p>
            <h1 className="mt-5 text-3xl font-bold leading-[1.05] tracking-tighter text-white sm:text-4xl md:text-5xl">
              How can we help?
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">
              {supportHero.intro}
            </p>
            <div className="mt-8">
              <SupportSearch />
            </div>
            <p className="mt-4 text-xs text-zinc-500">
              {articles.length} articles across {categories.length} categories.
            </p>
          </motion.div>
        </div>
      </section>

      {featuredArticles.length > 0 ? (
        <section className="border-t border-white/10 bg-zinc-950 py-16 md:py-20">
          <div className="site-container">
            <h2 className="text-2xl font-bold tracking-tighter text-white sm:text-3xl">
              Featured and frequently read articles
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {featuredArticles.map((article, index) => (
                <motion.a
                  key={article.slug}
                  href={articleHref(article.slug)}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.45, delay: Math.min(index, 5) * 0.04 }}
                  className="group flex min-w-0 flex-col rounded-3xl border border-white/10 bg-black p-6 transition-colors hover:border-white/30"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-on-dark">
                    {article.categoryTitle}
                  </span>
                  <h3 className="mt-3 text-lg font-bold leading-snug tracking-tighter text-white transition-colors group-hover:text-brand-on-dark">
                    {article.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-400">{article.excerpt}</p>
                  <span className="mt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    {article.readMinutes} min read
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-t border-white/10 bg-black py-16 md:py-24">
        <div className="site-container">
          <h2 className="text-2xl font-bold tracking-tighter text-white sm:text-3xl">Browse all categories</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <CategoryCard key={category.slug} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-zinc-950 py-16 md:py-20">
        <div className="site-container">
          <div className="flex flex-col items-start gap-6 rounded-3xl border border-white/10 bg-black p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div className="min-w-0">
              <span className="grid h-10 w-10 place-items-center rounded-2xl border border-white/12 bg-white/[0.05] text-brand-on-dark">
                <LifeBuoy size={18} aria-hidden />
              </span>
              <h2 className="mt-5 text-xl font-bold tracking-tighter text-white sm:text-2xl">
                Still need a hand?
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400">
                Our support team is available around the clock. Check live service health, or reach out
                and we will get you back up and running.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="/contactsales"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
              >
                Contact support
                <ArrowRight size={16} />
              </a>
              <a
                href="/system-status"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white"
              >
                System status
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
