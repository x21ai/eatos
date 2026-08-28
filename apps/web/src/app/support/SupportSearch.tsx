// @ts-nocheck
'use client';

import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { articleHref, categoryHref, searchIndex } from './content';

export default function SupportSearch({ autoFocus = false, placeholder = 'Search the help center' }) {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    const terms = q.split(/\s+/);
    const scored = [];
    for (const item of searchIndex) {
      const title = item.title.toLowerCase();
      const excerpt = item.excerpt.toLowerCase();
      let score = 0;
      let matchedAll = true;
      for (const term of terms) {
        if (title.startsWith(term)) score += 6;
        else if (title.includes(term)) score += 4;
        else if (excerpt.includes(term)) score += 1;
        else if (item.categoryTitle.toLowerCase().includes(term)) score += 1;
        else matchedAll = false;
      }
      if (matchedAll && score > 0) scored.push({ item, score });
    }
    return scored
      .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
      .slice(0, 10)
      .map((s) => s.item);
  }, [query]);

  const showPanel = query.trim().length >= 2;

  return (
    <div className="relative w-full max-w-2xl">
      <div className="flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3.5 focus-within:border-white/40">
        <Search size={18} className="shrink-0 text-zinc-400" aria-hidden />
        <input
          type="search"
          value={query}
          autoFocus={autoFocus}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          aria-label="Search help center articles"
          className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500 sm:text-base"
        />
        {query ? (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Clear search"
            className="shrink-0 text-zinc-400 transition-colors hover:text-white"
          >
            <X size={16} />
          </button>
        ) : null}
      </div>

      {showPanel ? (
        <div className="absolute left-0 right-0 top-full z-30 mt-3 overflow-hidden rounded-3xl border border-white/12 bg-zinc-950/98 shadow-2xl backdrop-blur">
          {results.length === 0 ? (
            <p className="px-6 py-6 text-sm text-zinc-400">
              No articles matched that search. Try a product name such as Kitchen Display System, or
              contact support.
            </p>
          ) : (
            <ul className="max-h-[60vh] divide-y divide-white/8 overflow-y-auto">
              {results.map((item) => (
                <li key={item.slug}>
                  <a href={articleHref(item.slug)} className="block px-6 py-4 transition-colors hover:bg-white/5">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-on-dark">
                      {item.categoryTitle}
                    </span>
                    <span className="mt-1.5 block text-sm font-semibold text-white">{item.title}</span>
                    {item.excerpt ? (
                      <span className="mt-1 block line-clamp-2 text-xs leading-5 text-zinc-400">{item.excerpt}</span>
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          )}
          {results.length > 0 ? (
            <div className="border-t border-white/8 px-6 py-3 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              Showing top {results.length} of {searchIndex.length} articles
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export { categoryHref };
