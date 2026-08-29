// @ts-nocheck
'use client';

import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import SupportSearch from '../../SupportSearch';
import { articleHref, categories, categoryHref, getArticles, getCategory } from '../../content';

export default function CategoryClient({ slug }) {
  const category = getCategory(slug);

  if (!category) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-black text-center">
        <div className="text-2xl font-bold text-white">Category not found</div>
        <a
          href="/support"
          className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
        >
          Back to help center
        </a>
      </div>
    );
  }

  const others = categories.filter((c) => c.slug !== category.slug && c.articleCount > 0).slice(0, 8);

  return (
    <div className="bg-black text-zinc-200">
      <section className="bg-black page-hero-top pb-12 md:pb-16">
        <div className="site-container">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
            <a href="/support" className="transition-colors hover:text-white">
              Help center
            </a>
            <ChevronRight size={12} aria-hidden />
            <span className="text-zinc-300">{category.title}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
            className="mt-8 max-w-3xl"
          >
            <h1 className="text-3xl font-bold leading-[1.06] tracking-tighter text-white sm:text-4xl md:text-5xl">
              {category.title}
            </h1>
            {category.description ? (
              <p className="mt-5 text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">
                {category.description}
              </p>
            ) : null}
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
              {category.articleCount} {category.articleCount === 1 ? 'article' : 'articles'}
            </p>
            <div className="mt-8">
              <SupportSearch placeholder={`Search ${category.title} articles`} />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-zinc-950 py-14 md:py-20">
        <div className="site-container space-y-14">
          {category.groups.length === 0 || category.articleCount === 0 ? (
            <p className="text-sm text-zinc-400">
              There are no published articles in this category yet. Check the other categories, or
              contact support.
            </p>
          ) : (
            category.groups.map((group, gIdx) => {
              const groupArticles = getArticles(group.articles);
              if (groupArticles.length === 0) return null;
              return (
                <div key={`${group.heading}-${gIdx}`}>
                  {group.heading ? (
                    <h2 className="text-xl font-bold tracking-tighter text-white sm:text-2xl">
                      {group.heading}
                    </h2>
                  ) : null}
                  <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {groupArticles.map((article, index) => (
                      <motion.a
                        key={article.slug}
                        href={articleHref(article.slug)}
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.4, delay: Math.min(index, 6) * 0.03 }}
                        className="group flex min-w-0 flex-col rounded-3xl border border-white/10 bg-black p-6 transition-colors hover:border-white/30"
                      >
                        <h3 className="text-base font-bold leading-snug tracking-tight text-white transition-colors group-hover:text-brand-on-dark sm:text-lg">
                          {article.title}
                        </h3>
                        {article.excerpt ? (
                          <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-400">{article.excerpt}</p>
                        ) : null}
                        <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                          {article.popularity || `${article.readMinutes} min read`}
                          <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" aria-hidden />
                        </span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      <section className="border-t border-white/10 bg-black py-14 md:py-20">
        <div className="site-container">
          <h2 className="text-xl font-bold tracking-tighter text-white sm:text-2xl">Other categories</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {others.map((c) => (
              <a
                key={c.slug}
                href={categoryHref(c.slug)}
                className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-zinc-300 transition-colors hover:border-white hover:text-white"
              >
                {c.title}
              </a>
            ))}
          </div>
          <a
            href="/support"
            className="mt-10 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 transition-colors hover:text-white"
          >
            <ArrowLeft size={14} aria-hidden />
            Back to help center
          </a>
        </div>
      </section>
    </div>
  );
}
