// @ts-nocheck
import NewsIndexClient from './NewsIndexClient';
import { marketingMetadata } from '@/lib/seo';
import { listArticles } from '@/lib/blog/data';

const pageTitle = 'eatOS Newsroom';
const pageDescription = 'Product announcements, company updates, and restaurant industry news from eatOS.';

export const metadata = marketingMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/news',
});
export default async function NewsIndexPage() {
  const items = await listArticles('news');
  return <NewsIndexClient items={items} />;
}
