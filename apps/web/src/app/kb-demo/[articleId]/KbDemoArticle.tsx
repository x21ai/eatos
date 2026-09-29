'use client';

import Link from 'next/link';
import { ArrowLeft, ChevronRight, Clock } from 'lucide-react';
import { estimateReadMinutes } from '@/components/admin/chat/kb-data';
import { useKbArticles } from '@/components/admin/chat/kb-store';
import KbDemoHeader from '../KbDemoHeader';

const anchor = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-');

/**
 * One published article. Anything unpublished or hidden renders the unavailable
 * state instead of the content, which is how a real help center behaves.
 */
export default function KbDemoArticle({ articleId }: { articleId: string }) {
  const articles = useKbArticles();
  const article = articles.find((a) => a.id === articleId && a.status === 'published');
  const related = articles
    .filter((a) => a.status === 'published' && a.id !== articleId)
    .slice(0, 3);

  if (!article) {
    return (
      <div className="min-h-dvh bg-background">
        <KbDemoHeader />
        <main className="mx-auto max-w-3xl px-5 py-20 text-center">
          <h1 className="text-2xl font-bold tracking-tight">This article is not available</h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            It is either unpublished or hidden in the Knowledge Base editor, so it is not part of
            the published set.
          </p>
          <Link
            href="/kb-demo"
            className="mt-6 inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            <ArrowLeft className="size-4" />
            Back to all articles
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-background">
      <KbDemoHeader />

      <main className="mx-auto max-w-3xl px-5 pb-20 pt-8">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground"
        >
          <Link href="/kb-demo" className="hover:text-foreground hover:underline">
            Knowledge Base
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="truncate">{article.category}</span>
          <ChevronRight className="size-3.5" />
          <span className="truncate text-foreground">{article.title}</span>
        </nav>

        <article className="mt-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{article.title}</h1>
          <p className="mt-3 text-lg text-muted-foreground">{article.subtitle}</p>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" />
              {estimateReadMinutes(article)} min read
            </span>
            <span className="rounded-full bg-muted px-2 py-0.5">{article.category}</span>
          </div>

          <p className="mt-6 leading-relaxed">{article.intro}</p>

          {article.sections.length > 0 && (
            <nav className="mt-8 rounded-xl border bg-muted/40 p-5">
              <p className="text-sm font-semibold">In this article</p>
              <ol className="mt-3 space-y-1.5 text-sm">
                {article.sections.map((s, i) => (
                  <li key={s.heading}>
                    <a
                      href={`#${anchor(s.heading)}`}
                      className="inline-flex items-center gap-2 font-medium text-brand hover:underline"
                    >
                      <span className="text-xs text-muted-foreground">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {article.sections.length === 0 && (
            <p className="mt-8 rounded-xl border border-dashed p-6 text-sm text-muted-foreground">
              This article has no sections yet. Add one in the Knowledge Base editor and it appears
              here.
            </p>
          )}

          <div className="mt-8 space-y-8">
            {article.sections.map((s) => (
              <section key={s.heading} id={anchor(s.heading)} className="scroll-mt-24">
                <h2 className="text-xl font-bold tracking-tight">{s.heading}</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{s.body}</p>
              </section>
            ))}
          </div>
        </article>

        {related.length > 0 && (
          <aside className="mt-14 border-t pt-8">
            <p className="text-sm font-semibold">Related articles</p>
            <ul className="mt-4 space-y-2">
              {related.map((r) => (
                <li key={r.id}>
                  <Link
                    href={`/kb-demo/${r.id}`}
                    className="flex items-center justify-between gap-4 rounded-lg border p-4 text-sm hover:bg-accent"
                  >
                    <span className="font-medium">{r.title}</span>
                    <span className="inline-flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="size-3.5" />
                      {estimateReadMinutes(r)} min
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </main>
    </div>
  );
}
