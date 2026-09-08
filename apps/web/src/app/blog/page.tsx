// @ts-nocheck
import BlogIndexClient from './BlogIndexClient';
import { listArticles } from '@/lib/blog/data';

export const metadata = {
  alternates: { canonical: '/blog' },
  title: 'Blog | eatOS Restaurant Technology Insights',
  description:
    'Product news, operating playbooks and practical guidance on restaurant point of sale, workforce, inventory and online ordering from the eatOS team.',
  openGraph: {
    url: '/blog',
    title: 'eatOS Blog: Ideas for the modern restaurant',
    description:
      'Practical guidance on restaurant point of sale, workforce management, inventory and online ordering.',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
};

export default async function BlogIndexPage() {
  const posts = await listArticles('blog');
  return <BlogIndexClient posts={posts} />;
}
