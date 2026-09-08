// @ts-nocheck
import NewsIndexClient from './NewsIndexClient';
import { listArticles } from '@/lib/blog/data';

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

// Kept free of searchParams so the page prerenders as static HTML. The
// ?category= filter is applied on the client instead.
export default async function NewsIndexPage() {
  const items = await listArticles('news');
  return <NewsIndexClient items={items} />;
}
