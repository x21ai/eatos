// @ts-nocheck
import NewsIndexClient from './NewsIndexClient';

export const metadata = {
  title: 'Newsroom | eatOS Restaurant Technology News',
  description:
    'Product announcements, company updates, events and restaurant industry news from eatOS, the AI-driven restaurant technology cloud.',
  alternates: { canonical: '/news' },
  openGraph: {
    title: 'eatOS Newsroom',
    description:
      'Product announcements, company updates, events and restaurant industry news from eatOS.',
    type: 'website',
    url: '/news',
  },
  twitter: { card: 'summary_large_image' },
};

export default async function NewsIndexPage({ searchParams }) {
  const sp = (await searchParams) || {};
  const category = Array.isArray(sp.category) ? sp.category[0] : sp.category;
  return <NewsIndexClient initialCategory={category || 'All News'} />;
}
