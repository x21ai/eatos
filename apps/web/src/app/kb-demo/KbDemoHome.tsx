'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Clock, Search } from 'lucide-react';
import { estimateReadMinutes } from '@/components/admin/chat/kb-data';
import { useKbArticles } from '@/components/admin/chat/kb-store';
import KbDemoHeader from './KbDemoHeader';

/** The published half of the demo knowledge base, exactly as a guest sees it. */
export default function KbDemoHome() {
  const articles = useKbArticles();
  const [query, setQuery] = useState('');

  const published = useMemo(() => articles.filter((a) => a.status === 'published'), [articles]);
  const visible = useMemo(
    () =>
      published.filter((a) =>
        `${a.title} ${a.subtitle} ${a.intro}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [published, query],
  );

  return (
    <div className="min-h-dvh bg-background">
      <KbDemoHeader />

      <main className="mx-auto max-w-4xl px-5 pb-20">
        <section className="border-b py-10">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">eatOS Knowledge Base</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Setup guides and troubleshooting for the eatOS Point of Sale, Kitchen Display System,
            self order kiosk, and payments.
          </p>
          <p className="mt-5 inline-flex max-w-full items-start gap-2 rounded-full border bg-muted px-3 py-1.5 text-xs text-muted-foreground">
            <BookOpen className="mt-0.5 size-3.5 shrink-0" />
            Demo preview: only articles marked published appear here, and the list resets when you
            reload the page.
          </p>
          <label className="mt-6 flex h-11 max-w-md items-center gap-2 rounded-lg border bg-background px-3 shadow-xs focus-within:ring-2 focus-within:ring-ring">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles"
              className="w-full bg-transparent text-sm outline-none"
            />
          </label>
        </section>

        <section className="py-8">
          <p className="text-sm font-semibold">
            {published.length} published {published.length === 1 ? 'article' : 'articles'}
          </p>
          <ul className="mt-4 space-y-3">
            {visible.map((a) => (
              <li key={a.id}>
                <Link
                  href={`/kb-demo/${a.id}`}
                  className="group block rounded-xl border bg-card p-5 transition hover:border-primary/40 hover:shadow-sm"
                >
                  <span className="flex items-start gap-4">
                    <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-brand">
                      <BookOpen className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-base font-semibold">{a.title}</span>
                      <span className="mt-1 block text-sm text-muted-foreground">{a.subtitle}</span>
                      <span className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="size-3.5" />
                          {estimateReadMinutes(a)} min read
                        </span>
                        <span className="rounded-full bg-muted px-2 py-0.5">{a.category}</span>
                      </span>
                    </span>
                    <ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {visible.length === 0 && (
            <div className="rounded-xl border border-dashed p-10 text-center">
              <p className="text-sm font-semibold">
                {published.length === 0 ? 'Nothing published yet' : 'No articles match that search'}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {published.length === 0
                  ? 'Open the Knowledge Base editor, publish an article, and it shows up here.'
                  : 'Try a shorter word, or clear the box to see everything.'}
              </p>
              <Link
                href="/chatapp/knowledge-base"
                className="mt-5 inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-accent"
              >
                <ArrowLeft className="size-4" />
                Back to editor
              </Link>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
