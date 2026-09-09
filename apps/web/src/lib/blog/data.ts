// @ts-nocheck
// Reads blog and newsroom articles from Cloudflare D1, falling back to the
// content that ships with the site whenever the database is not reachable, for
// example during the static build where request bindings do not exist. Pages
// call these helpers, never the raw tables.

import { selectArticle, selectArticles } from '@/lib/db/content';
import { parseJson } from '@/lib/db/client';
import { rowToArticle } from './types';
import { posts as importedPosts } from '@/app/blog/content';
import { newsItems as importedNews } from '@/app/news/content';

const FALLBACK = {
  blog: importedPosts,
  news: importedNews,
};

function toArticle(row) {
  return rowToArticle({ ...row, body: parseJson(row.body, []) });
}

function byDateDesc(a, b) {
  return new Date(b.date) - new Date(a.date);
}

export async function listArticles(kind = 'blog') {
  const rows = await selectArticles(kind);
  if (!rows || rows.length === 0) return FALLBACK[kind];
  return rows.map(toArticle).sort(byDateDesc);
}

export async function getArticle(slug, kind = 'blog') {
  const row = await selectArticle(kind, slug);
  if (!row) return FALLBACK[kind].find((p) => p.slug === slug) || null;
  return toArticle(row);
}

export async function getRelatedArticles(slug, kind = 'blog', count = 3) {
  const all = await listArticles(kind);
  const current = all.find((p) => p.slug === slug);
  if (!current) return [];
  const sameCategory = all.filter((p) => p.slug !== slug && p.category === current.category);
  const rest = all.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...sameCategory, ...rest].slice(0, count);
}
