'use client';

import { useSyncExternalStore } from 'react';
import { initialArticles, type KbArticle } from './kb-data';

/**
 * Single in-memory home for the Knowledge Base demo articles. The editor and the
 * /kb-demo preview both read this, so publishing in one is instantly visible in
 * the other without a database. It lives in page memory on purpose: a reload
 * brings back the seeded five articles.
 */
let articles: KbArticle[] = initialArticles;

const listeners = new Set<() => void>();

const emit = () => {
  for (const listener of listeners) listener();
};

export const kbStore = {
  get: () => articles,
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  update(id: string, patch: Partial<KbArticle>) {
    articles = articles.map((a) => (a.id === id ? { ...a, ...patch } : a));
    emit();
  },
  add(article: KbArticle) {
    articles = [article, ...articles];
    emit();
  },
  remove(id: string) {
    articles = articles.filter((a) => a.id !== id);
    emit();
  },
};

/** Live article list. Server and first client render agree on the seeded set. */
export function useKbArticles(): KbArticle[] {
  return useSyncExternalStore(kbStore.subscribe, kbStore.get, kbStore.get);
}
