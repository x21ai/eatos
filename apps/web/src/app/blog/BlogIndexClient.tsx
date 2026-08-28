// @ts-nocheck
'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Placeholder } from '@/components/marketing/Placeholder';
import { NewsletterSection } from '@/components/NewsletterSection';
import { blogHero, categories, posts, formatDate } from './content';
import CategoryFilter, { categoryHref } from './CategoryFilter';

const PAGE_SIZE = 12;

function initials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

function Meta({ post }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
      <span className="text-brand-on-dark">{post.category}</span>
      <span aria-hidden>·</span>
      <span>{formatDate(post.date)}</span>
    </div>
  );
}

function AuthorRow({ post }) {
  return (
    <div className="mt-6 flex min-w-0 items-center gap-3 border-t border-white/10 pt-5">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 text-[11px] font-bold text-brand-on-dark">
        {initials(post.author)}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[13px] font-semibold text-white">{post.author}</span>
        <span className="block text-[11px] text-zinc-500">{formatDate(post.date)}</span>
      </span>
    </div>
  );
}

function HeroBanner() {
  return (
    <section className="bg-black pt-28 pb-10 md:pt-36 md:pb-14">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="relative overflow-hidden rounded-[24px] border border-white/10 bg-zinc-950 md:rounded-[32px]"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(120% 90% at 12% 0%, var(--brand-soft) 0%, transparent 60%)',
            }}
          />
          <div className="relative px-6 py-14 sm:px-10 sm:py-16 md:px-14 md:py-20">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-on-dark">
              {blogHero.eyebrow}
            </p>
            <h1 className="mt-5 max-w-2xl text-3xl font-bold leading-[1.05] tracking-tighter text-white sm:text-4xl md:text-5xl">
              Welcome to the eatOS Blog
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-6 text-zinc-300 sm:text-base sm:leading-7">
              {blogHero.intro}
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
                href="/brochures"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white"
              >
                Brochures
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Card({ post, index }) {
  return (
    <motion.a
      href={`/blogs/${post.slug}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: Math.min(index, 5) * 0.05 }}
      className="group flex min-w-0 flex-col rounded-[24px] border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-white/25 sm:p-5"
    >
      <Placeholder label={post.title} src={post.image} tone="dark" ratio="aspect-[16/10]" />
      <div className="mt-6 min-w-0 flex-1">
        <Meta post={post} />
        <h3 className="mt-3 line-clamp-2 text-xl font-bold leading-snug tracking-tighter text-white transition-colors group-hover:text-brand-on-dark sm:text-[1.375rem]">
          {post.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">{post.excerpt}</p>
      </div>
      <AuthorRow post={post} />
    </motion.a>
  );
}

function SidebarRecent({ items }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">Latest posts</h3>
      <ul className="mt-5 space-y-5">
        {items.map((post) => (
          <li key={post.slug}>
            <a href={`/blogs/${post.slug}`} className="group flex min-w-0 items-start gap-4">
              <span className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-zinc-900">
                {post.image ? (
                  <img src={post.image} alt="" aria-hidden loading="lazy" className="h-full w-full object-cover" />
                ) : null}
              </span>
              <span className="min-w-0">
                <span className="line-clamp-2 text-[13px] font-semibold leading-5 text-white transition-colors group-hover:text-brand-on-dark">
                  {post.title}
                </span>
                <span className="mt-1.5 block text-[11px] text-zinc-500">{formatDate(post.date)}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SubscribeCard() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const onSubmit = (e) => {
    e.preventDefault();
    const value = email.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) && value.length <= 255;
    setStatus(valid ? 'success' : 'error');
    if (valid) setEmail('');
  };

  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-on-dark">
        Subscribe via Email
      </h3>
      <p className="mt-3 text-[13px] leading-6 text-zinc-400">
        Get restaurant technology tips, product news and operating playbooks in your inbox.
      </p>
      <form onSubmit={onSubmit} className="mt-5">
        <label htmlFor="blog-subscribe-email" className="sr-only">
          Email address
        </label>
        <input
          id="blog-subscribe-email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setStatus('idle');
          }}
          placeholder="Enter your email address"
          className="w-full rounded-full border border-white/15 bg-black px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-brand/60 focus:outline-none"
        />
        <button
          type="submit"
          className="mt-3 w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
        >
          Subscribe
        </button>
        <p role="status" className="mt-3 min-h-5 text-[12px]">
          {status === 'success' ? (
            <span className="text-brand-on-dark">Thanks, you are on the list.</span>
          ) : status === 'error' ? (
            <span className="text-red-400">Enter a valid email address.</span>
          ) : null}
        </p>
      </form>
    </div>
  );
}

function pageWindow(page, pageCount) {
  // Always show first and last page, with a short window around the current page.
  const span = 1;
  const items = [];
  for (let p = 1; p <= pageCount; p += 1) {
    const inWindow = p === 1 || p === pageCount || Math.abs(p - page) <= span;
    if (inWindow) {
      if (items.length > 0 && p - items[items.length - 1] > 1) items.push('gap');
      items.push(p);
    }
  }
  return items;
}

function Pagination({ page, pageCount, onChange }) {
  if (pageCount <= 1) return null;
  const items = pageWindow(page, pageCount);
  const navClass =
    'grid h-10 w-10 place-items-center rounded-full border border-white/15 text-zinc-300 transition-colors hover:border-white/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-40';

  return (
    <nav aria-label="Blog pagination" className="mt-14 flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className={navClass}
      >
        <ChevronLeft size={16} />
      </button>

      {/* Mobile: a single readable position indicator instead of number buttons. */}
      <span className="px-3 text-sm font-semibold text-zinc-300 sm:hidden">
        Page {page} of {pageCount}
      </span>

      <span className="hidden items-center gap-2 sm:flex">
        {items.map((item, i) =>
          item === 'gap' ? (
            <span key={`gap-${i}`} aria-hidden className="px-1 text-sm text-zinc-600">
              ...
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => onChange(item)}
              aria-label={`Page ${item}`}
              aria-current={item === page ? 'page' : undefined}
              className={`grid h-10 w-10 place-items-center rounded-full border text-sm font-semibold transition-colors ${
                item === page
                  ? 'border-white bg-white text-black'
                  : 'border-white/15 text-zinc-300 hover:border-white/40 hover:text-white'
              }`}
            >
              {item}
            </button>
          ),
        )}
      </span>

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === pageCount}
        aria-label="Next page"
        className={navClass}
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}

export default function BlogIndexClient() {
  const [active, setActive] = useState('All Posts');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const syncFromUrl = () => {
      const param = new URLSearchParams(window.location.search).get('category');
      const next = param && categories.includes(param) ? param : 'All Posts';
      setActive(next);
      setPage(1);
    };
    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);
    return () => window.removeEventListener('popstate', syncFromUrl);
  }, []);

  const sorted = useMemo(
    () => [...posts].sort((a, b) => new Date(b.date) - new Date(a.date)),
    [],
  );

  const filtered = useMemo(
    () => (active === 'All Posts' ? sorted : sorted.filter((p) => p.category === active)),
    [active, sorted],
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const shown = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const recent = sorted.slice(0, 3);

  const available = categories.filter(
    (c) => c === 'All Posts' || posts.some((p) => p.category === c),
  );

  return (
    <div className="bg-black">
      <HeroBanner />

      <section className="bg-black pb-16 md:pb-24">
        <div className="site-container">
          <div className="grid grid-cols-[minmax(0,1fr)] gap-5 border-b border-white/10 pb-6 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
            <h2 className="min-w-0 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Latest posts
            </h2>
            <CategoryFilter
              available={available}
              active={active}
              onSelect={(c) => {
                setActive(c);
                setPage(1);
                window.history.pushState(null, '', categoryHref(c));
              }}
            />
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
            <div className="min-w-0">
              <div className="grid gap-8 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10">
                {shown.map((post, i) => (
                  <Card key={post.slug} post={post} index={i} />
                ))}
              </div>

              {filtered.length === 0 && (
                <p className="text-sm text-zinc-500">No posts in this category yet.</p>
              )}

              <Pagination page={currentPage} pageCount={pageCount} onChange={setPage} />
            </div>

            <aside className="min-w-0 space-y-6 lg:sticky lg:top-28 lg:h-fit">
              <SidebarRecent items={recent} />
              <SubscribeCard />
            </aside>
          </div>
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
}
