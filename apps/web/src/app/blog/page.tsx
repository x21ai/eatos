// @ts-nocheck
import BlogIndexClient from './BlogIndexClient';
import { marketingMetadata } from '@/lib/seo';
import { listArticles } from '@/lib/blog/data';

const pageTitle = 'eatOS Blog | Restaurant Point of Sale';
const pageDescription = 'Product news and practical guidance on restaurant point of sale, workforce, inventory, and online ordering.';

export const metadata = marketingMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/blog',
});
export default async function BlogIndexPage() {
  const posts = await listArticles('blog');
  return <BlogIndexClient posts={posts} />;
}
