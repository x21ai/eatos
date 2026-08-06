// @ts-nocheck
import BlogPostClient from './BlogPostClient';
import { posts, getPost } from '../content';

export const dynamicParams = true;

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: 'Article not found | eatOS Blog' };
  return {
    title: `${post.title} | eatOS Blog`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: 'article' },
    twitter: { card: 'summary_large_image' },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  return <BlogPostClient slug={slug} />;
}
