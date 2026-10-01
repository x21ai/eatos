// @ts-nocheck
import { notFound } from 'next/navigation';
import BlogPostClient from './BlogPostClient';
import { posts } from '../content';
import { getArticle, getRelatedArticles } from '@/lib/blog/data';
import { marketingMetadata } from '@/lib/seo';

export const dynamicParams = true;

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getArticle(slug, 'blog');
  if (!post) notFound();
  return marketingMetadata({
    title: `${post.title} | eatOS Blog`,
    description: post.excerpt,
    path: `/blogs/${post.slug}`,
    ogTitle: post.title,
    image: post.image || undefined,
    type: 'article',
  });
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getArticle(slug, 'blog');
  if (!post) notFound();
  const related = await getRelatedArticles(slug, 'blog', 3);
  const jsonLd = post
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        image: post.image ? [post.image] : undefined,
        author: { '@type': 'Organization', name: post.author || 'eatOS' },
        publisher: { '@type': 'Organization', name: 'eatOS' },
        mainEntityOfPage: `https://eatos.com/blogs/${post.slug}`,
      }
    : null;

  return (
    <>
      {jsonLd ? (
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
      <BlogPostClient slug={slug} post={post} related={related} />
    </>
  );
}
