// @ts-nocheck
// Help center content migrated from support.eatos.com. Every article keeps its
// original slug so links from the old subdomain resolve one to one.

import generatedArticles from './articles.generated.json';
import generatedCategories from './categories.generated.json';

export const supportHero = {
  eyebrow: 'Help Center',
  title: 'eatOS Support',
  intro:
    'Setup guides, how-to articles and troubleshooting for the eatOS Point of Sale, Kitchen Display System, Dashboard, Kiosk, Guest Facing Display and hardware.',
};

export const articles = generatedArticles;
export const categories = generatedCategories.categories;
export const featuredSlugs = generatedCategories.featured;

const bySlug = new Map(articles.map((a) => [a.slug, a]));

export function getArticle(slug) {
  if (!slug) return null;
  let decoded = slug;
  try {
    decoded = decodeURIComponent(slug);
  } catch {
    decoded = slug;
  }
  return bySlug.get(slug) || bySlug.get(decoded) || null;
}

export function getArticles(slugs = []) {
  return slugs.map((s) => bySlug.get(s)).filter(Boolean);
}

export function getCategory(slug) {
  if (!slug) return null;
  let decoded = slug;
  try {
    decoded = decodeURIComponent(slug);
  } catch {
    decoded = slug;
  }
  return categories.find((c) => c.slug === slug || c.slug === decoded) ?? null;
}

export function getCategoryArticles(slug) {
  const category = getCategory(slug);
  if (!category) return [];
  return category.groups.flatMap((g) => getArticles(g.articles));
}

export const featuredArticles = getArticles(featuredSlugs);

export function getRelatedArticles(slug, count = 4) {
  const current = getArticle(slug);
  if (!current) return [];
  const sameGroup = articles.filter(
    (a) => a.slug !== current.slug && a.categorySlug === current.categorySlug && a.group === current.group,
  );
  const sameCategory = articles.filter(
    (a) => a.slug !== current.slug && a.categorySlug === current.categorySlug && a.group !== current.group,
  );
  return [...sameGroup, ...sameCategory].slice(0, count);
}

// Lightweight index used by the client-side search box: title, excerpt and
// category only, so the payload stays small.
export const searchIndex = articles.map((a) => ({
  slug: a.slug,
  title: a.title,
  excerpt: a.excerpt,
  categorySlug: a.categorySlug,
  categoryTitle: a.categoryTitle,
}));

export function articleHref(slug) {
  return `/support/article/${slug}`;
}

export function categoryHref(slug) {
  return `/support/category/${slug}`;
}
