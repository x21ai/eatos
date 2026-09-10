// @ts-nocheck
'use client';

import { ArrowRight } from 'lucide-react';
import { posts } from '../../blog/content';

const latest = [...posts]
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .slice(0, 3);

function formatDate(value) {
  try {
    return new Date(value).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return value;
  }
}

export function InsightsSection() {
  return (
    <section className="bg-zinc-50 py-20 text-zinc-900 md:py-28">
      <div className="site-container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Latest insights
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight md:text-5xl">
              From the eatOS blog.
            </h2>
          </div>
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: 'var(--brand, #d70480)' }}
          >
            View all posts <ArrowRight size={16} />
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:mt-14 md:grid-cols-3">
          {latest.map((post) => (
            <a
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-zinc-200 transition-shadow hover:shadow-lg"
            >
              {post.image ? (
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              ) : null}
              <div className="flex flex-1 flex-col p-6">
                <p
                  className="text-xs font-semibold uppercase tracking-[0.15em]"
                  style={{ color: 'var(--brand, #d70480)' }}
                >
                  {post.category}
                </p>
                <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight">
                  {post.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-600">
                  {post.excerpt}
                </p>
                <p className="mt-auto pt-5 text-xs text-zinc-500">{formatDate(post.date)}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
