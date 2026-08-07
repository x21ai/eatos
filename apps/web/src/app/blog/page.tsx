// @ts-nocheck
import BlogIndexClient from './BlogIndexClient';

export const metadata = {
  title: 'Blog | eatOS Restaurant Technology Insights',
  description:
    'Product news, operating playbooks and practical guidance on restaurant point of sale, workforce, inventory and online ordering from the eatOS team.',
  openGraph: {
    title: 'eatOS Blog: Ideas for the modern restaurant',
    description:
      'Practical guidance on restaurant point of sale, workforce management, inventory and online ordering.',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
};

export default function BlogIndexPage() {
  return <BlogIndexClient />;
}
