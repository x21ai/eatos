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

// Marketing content for the support landing page. Kept out of the components so
// copy stays in one place.
export const supportChannels = [
  {
    id: 'chat',
    icon: 'chat',
    label: 'Live chat',
    detail: 'Chat with a specialist anytime inside your Dashboard ',
    meta: 'Typical reply under 2 minutes',
    href: '/contact',
    external: false,
  },
  {
    id: 'email',
    icon: 'mail',
    label: 'Email support',
    detail: 'support@eatos.com',
    meta: 'Answered within 4 hours, 24/7',
    href: 'mailto:support@eatos.com',
    external: true,
  },
  {
    id: 'whatsapp',
    icon: 'whatsapp',
    label: 'WhatsApp',
    detail: 'Message us from the floor',
    meta: 'Photos and screenshots welcome',
    href: 'https://wa.me/18449732867',
    external: true,
  },
  {
    id: 'phone',
    icon: 'phone',
    label: 'Phone',
    detail: '+1 (844) 563-2867',
    meta: 'LIVE AGENTS SUPPORT  AROUND THE CLOCK',
    href: 'tel:+18445632867',
    external: true,
  },
];

export const supportSteps = [
  {
    number: '01',
    title: 'Choose your plan',
    body: 'Pick a 1 or 3 year plan that fits your service model. Every plan includes unlimited support at no extra cost.',
    linkLabel: 'See pricing',
    href: '/pricing',
  },
  {
    number: '02',
    title: 'Create your eatOS account',
    body: 'Your onboarding specialist sets up your account, menu structure and payment processing with you on the call.',
    linkLabel: 'Book a demo',
    href: '/bookademo',
  },
  {
    number: '03',
    title: 'Activate in Dashboard',
    body: 'Pair your terminals, Kitchen Display System and Guest Facing Display from the Dashboard, then go live the same day.',
    linkLabel: 'Activation guides',
    href: '/support',
  },
];

export const supportPillars = [
  {
    icon: 'award',
    title: 'Top tier restaurant technology experts',
    body: 'Our team has run kitchens, bars and counters. You get people who understand a Friday night rush, not a script reader.',
  },
  {
    icon: 'clock',
    title: '24/7 emergency coverage',
    body: 'Hardware down, printer offline, payments stalled: we answer at 2am with the same urgency as 2pm, every day of the year.',
  },
  {
    icon: 'user',
    title: 'A dedicated support expert',
    body: 'One named specialist who knows your locations, your menu and your setup, so you never restart the story on every call.',
  },
];

export const supportPromise = {
  title: 'Free, ongoing support for every customer',
  body: 'Support is never an upsell at eatOS. Onboarding, training, hardware troubleshooting and ongoing optimization are included with each and every plan, delivered by real specialists according your time zone.',
  stats: [
    { value: '24/7', label: 'Coverage, every day of the year' },
    { value: '< 4 min', label: 'Average first response time' },
    { value: '0 USD', label: 'Cost for ongoing support' },
  ],
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

// Most-read articles: "Featured" first, then "Popular", then "Some readers".
const popularityRank = { Featured: 0, Popular: 1, 'Some readers': 2, 'Few readers': 3 };
export const popularArticles = [...articles]
  .sort(
    (a, b) =>
      (popularityRank[a.popularity] ?? 4) - (popularityRank[b.popularity] ?? 4) ||
      a.title.localeCompare(b.title),
  )
  .slice(0, 8);


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
