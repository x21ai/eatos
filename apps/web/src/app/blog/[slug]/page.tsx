// @ts-nocheck
import BlogPostClient from './BlogPostClient';
import { posts } from '../content';
import { getArticle, listArticles, getRelatedArticles } from '@/lib/blog/data';

export const dynamicParams = true;

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getArticle(slug, 'blog');
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
  const post = await getArticle(slug, 'blog');
  const related = post ? await getRelatedArticles(slug, 'blog', 3) : [];
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
