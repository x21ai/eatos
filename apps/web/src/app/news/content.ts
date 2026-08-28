// @ts-nocheck
// Newsroom content migrated from the live eatos.com newsroom. Each item keeps
// its original /news/<slug> URL so existing links and rankings stay intact.

import generatedNews from './news.generated.json';

export const newsHero = {
  eyebrow: 'Newsroom',
  title: 'eatOS Newsroom',
  intro:
    'Product announcements, company updates, events and restaurant industry news from the team building the eatOS restaurant technology cloud.',
};

export const categories = ['All News', 'Product News', 'Company News', 'Event News', 'Industry News'];

export const newsItems = [...generatedNews].sort((a, b) =>
  a.date < b.date ? 1 : a.date > b.date ? -1 : 0,
);

export function getNewsItem(slug) {
  if (!slug) return null;
  const decoded = (() => {
    try {
      return decodeURIComponent(slug);
    } catch {
      return slug;
    }
  })();
  return newsItems.find((p) => p.slug === slug || p.slug === decoded) ?? null;
}

export function getRelatedNews(slug, count = 3) {
  const current = getNewsItem(slug);
  const others = newsItems.filter((p) => p.slug !== current?.slug);
  const same = others.filter((p) => p.category === current?.category);
  return [...same, ...others.filter((p) => p.category !== current?.category)].slice(0, count);
}

export function formatDate(value) {
  try {
    return new Date(value).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}
