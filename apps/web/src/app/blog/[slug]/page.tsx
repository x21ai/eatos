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
  const canonical = `/blogs/${post.slug}`;
  return {
    title: `${post.title} | eatOS Blog`,
    description: post.excerpt,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: canonical,
      images: post.image ? [post.image] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  return <BlogPostClient slug={slug} />;
}
