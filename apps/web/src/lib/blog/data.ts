// @ts-nocheck
// Reads blog and newsroom articles from Cloudflare D1, falling back to the
// imported JSON that ships with the site when D1 is unavailable or empty.
// Pages call these helpers, never the raw tables.

import { getPublishedArticleRow, listPublishedArticleRows } from '@/lib/d1/content';
import { rowToArticle } from './types';
import { posts as importedPosts } from '@/app/blog/content';
import { newsItems as importedNews } from '@/app/news/content';

const FALLBACK = {
  blog: importedPosts,
  news: importedNews,
};

function byDateDesc(a, b) {
  return new Date(b.date) - new Date(a.date);
}

export async function listArticles(kind = 'blog') {
  try {
    const rows = await listPublishedArticleRows(kind);
    if (!rows || rows.length === 0) return FALLBACK[kind];
    return rows.map(rowToArticle).sort(byDateDesc);
  } catch {
    return FALLBACK[kind];
  }
}

export async function getArticle(slug, kind = 'blog') {
  try {
    const row = await getPublishedArticleRow(kind, slug);
    if (row) return rowToArticle(row);
  } catch {
    // fall through to bundled content
  }
  return FALLBACK[kind].find((p) => p.slug === slug) || null;
}

export async function getRelatedArticles(slug, kind = 'blog', count = 3) {
  const all = await listArticles(kind);
  const current = all.find((p) => p.slug === slug);
  if (!current) return [];
  const sameCategory = all.filter((p) => p.slug !== slug && p.category === current.category);
  const rest = all.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...sameCategory, ...rest].slice(0, count);
}
