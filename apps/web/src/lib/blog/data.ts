// @ts-nocheck
// Reads blog and newsroom articles from the customer-owned Supabase project,
// falling back to the imported content that ships with the site whenever the
// environment keys or tables are not there yet. Pages call these helpers, never
// the raw tables.

import { supabaseSelect, isSupabaseConfigured } from '@/lib/supabase/rest';
import { POST_COLUMNS, POST_LIST_COLUMNS, rowToArticle } from './types';
import { posts as importedPosts } from '@/app/blog/content';
import { newsItems as importedNews } from '@/app/news/content';

const TABLES = {
  blog: 'posts',
  news: 'news_posts',
};

const FALLBACK = {
  blog: importedPosts,
  news: importedNews,
};

function byDateDesc(a, b) {
  return new Date(b.date) - new Date(a.date);
}

export async function listArticles(kind = 'blog') {
  if (!isSupabaseConfigured()) return FALLBACK[kind];

  const { data, error } = await supabaseSelect({
    table: TABLES[kind],
    select: POST_LIST_COLUMNS,
    filters: { status: 'eq.published' },
    order: 'published_at.desc',
    revalidate: 60,
  });

  if (error || !data || data.length === 0) return FALLBACK[kind];
  return data.map(rowToArticle).sort(byDateDesc);
}

export async function getArticle(slug, kind = 'blog') {
  if (!isSupabaseConfigured()) {
    return FALLBACK[kind].find((p) => p.slug === slug) || null;
  }

  const { data, error } = await supabaseSelect({
    table: TABLES[kind],
    select: POST_COLUMNS,
    filters: { slug: `eq.${slug}`, status: 'eq.published', limit: '1' },
    revalidate: 60,
  });

  if (error || !data || data.length === 0) {
    return FALLBACK[kind].find((p) => p.slug === slug) || null;
  }
  return rowToArticle(data[0]);
}

export async function getRelatedArticles(slug, kind = 'blog', count = 3) {
  const all = await listArticles(kind);
  const current = all.find((p) => p.slug === slug);
  if (!current) return [];
  const sameCategory = all.filter((p) => p.slug !== slug && p.category === current.category);
  const rest = all.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...sameCategory, ...rest].slice(0, count);
}
