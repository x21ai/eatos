// @ts-nocheck
'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { ArrowLeft, ArrowRight, ChevronRight, Share2, ThumbsDown, ThumbsUp } from 'lucide-react';
import ArticleBody from '../../ArticleBody';
import { isTocHeading, sectionDomId } from '../../articleBodyModel';
import { articleHref, categoryHref, getArticle, getRelatedArticles } from '../../content';

function useToc(blocks) {
  return useMemo(
    () =>
      blocks
        .map((b, i) => ({ ...b, i }))
        .filter((b) => (b.type === 'h2' || b.type === 'h3') && !isTocHeading(b.text))
        .map((b) => ({ id: sectionDomId(b.i), text: b.text, level: b.type })),
    [blocks],
  );
}

function Helpful({ slug }) {
  const [vote, setVote] = useState(null);
  const key = `eatos-support-helpful-${slug}`;

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(key);
      if (saved) setVote(saved);
    } catch {
      /* storage unavailable */
    }
  }, [key]);

  const cast = (value) => {
    setVote(value);
    try {
      window.localStorage.setItem(key, value);
    } catch {
      /* storage unavailable */
    }
    toast.success(value === 'yes' ? 'Thanks for the feedback' : 'Thanks, we will improve this article');
  };

  return (
    <div className="mt-16 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <p className="text-sm font-semibold text-white">Was this article helpful?</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => cast('yes')}
          aria-pressed={vote === 'yes'}
          className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
            vote === 'yes'
              ? 'border-brand bg-brand text-white'
              : 'border-white/15 text-zinc-300 hover:border-white hover:text-white'
          }`}
        >
          <ThumbsUp size={15} aria-hidden />
          Yes
        </button>
        <button
          type="button"
          onClick={() => cast('no')}
          aria-pressed={vote === 'no'}
          className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
            vote === 'no'
              ? 'border-white bg-white text-black'
              : 'border-white/15 text-zinc-300 hover:border-white hover:text-white'
          }`}
        >
          <ThumbsDown size={15} aria-hidden />
          No
        </button>
        <a
          href="/contact"
          className="text-sm font-semibold text-brand-on-dark transition-colors hover:text-white"
        >
          Contact support
        </a>
      </div>
    </div>
  );
}

export default function ArticleClient({ slug }) {
  const article = getArticle(slug);
  const related = getRelatedArticles(slug, 4);
  const toc = useToc(article?.blocks || []);

  const handleShare = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    } catch {
      toast.error('Could not copy the link');
    }
  };

  if (!article) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-black px-6 text-center">
        <div className="text-2xl font-bold text-white">Article not found</div>
        <p className="text-sm text-zinc-400">
          This article may have been moved. Search the help center to find what you need.
        </p>
        <a
          href="/support"
          className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
        >
          Back to help center
        </a>
      </div>
    );
  }

  return (
    <article className="bg-black text-zinc-200">
      <header className="bg-black pt-28 pb-10 md:pt-36 md:pb-14">
        <div className="site-container">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
            <a href="/support" className="transition-colors hover:text-white">
              Help center
            </a>
            {article.categorySlug ? (
              <>
                <ChevronRight size={12} aria-hidden />
                <a href={categoryHref(article.categorySlug)} className="transition-colors hover:text-white">
                  {article.categoryTitle}
                </a>
              </>
            ) : null}
            <ChevronRight size={12} aria-hidden />
            <span className="truncate text-zinc-300">{article.title}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
            className="mt-8 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4"
          >
            <div className="min-w-0 max-w-3xl">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                {article.categoryTitle ? (
                  <span className="text-brand-on-dark">{article.categoryTitle}</span>
                ) : null}
                <span aria-hidden>·</span>
                <span>{article.readMinutes} min read</span>
              </div>
              <h1 className="mt-5 text-3xl font-bold leading-[1.08] tracking-tighter text-white sm:text-4xl">
                {article.title}
              </h1>
              {article.excerpt ? (
                <p className="mt-5 text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">{article.excerpt}</p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={handleShare}
              aria-label="Copy link to this article"
              className="shrink-0 rounded-full border border-white/15 p-2.5 text-zinc-300 transition-colors hover:border-white/40 hover:text-white"
            >
              <Share2 size={16} />
            </button>
          </motion.div>
        </div>
      </header>

      <div className="border-t border-white/10 bg-zinc-950 py-14 md:py-20">
        <div className="site-container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_260px]">
            <div className="min-w-0 max-w-[760px]">
              <ArticleBody blocks={article.blocks} slug={article.slug} />
              <Helpful slug={article.slug} />
              <a
                href={article.categorySlug ? categoryHref(article.categorySlug) : '/support'}
                className="mt-10 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 transition-colors hover:text-white"
              >
                <ArrowLeft size={14} aria-hidden />
                {article.categoryTitle ? `Back to ${article.categoryTitle}` : 'Back to help center'}
              </a>
            </div>

            {toc.length > 2 ? (
              <aside className="hidden lg:block">
                <div className="sticky top-28 rounded-3xl border border-white/10 bg-black p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    On this page
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {toc.slice(0, 14).map((item) => (
                      <li key={item.id} className={item.level === 'h3' ? 'pl-3' : ''}>
                        <a
                          href={`#${item.id}`}
                          className="block text-sm leading-6 text-zinc-400 transition-colors hover:text-white"
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            ) : null}
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="border-t border-white/10 bg-black py-14 md:py-20">
          <div className="site-container">
            <h2 className="text-xl font-bold tracking-tighter text-white sm:text-2xl">Related articles</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {related.map((item) => (
                <a
                  key={item.slug}
                  href={articleHref(item.slug)}
                  className="group flex min-w-0 flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/30"
                >
                  <h3 className="text-base font-bold leading-snug tracking-tight text-white transition-colors group-hover:text-brand-on-dark sm:text-lg">
                    {item.title}
                  </h3>
                  {item.excerpt ? (
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-zinc-400">{item.excerpt}</p>
                  ) : null}
                  <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    Read article
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </article>
  );
}
