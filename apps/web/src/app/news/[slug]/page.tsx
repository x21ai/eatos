// @ts-nocheck
import NewsPostClient from './NewsPostClient';
import { newsItems, getNewsItem } from '../content';

export const dynamicParams = true;

export async function generateStaticParams() {
  return newsItems.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getNewsItem(slug);
  if (!post) return { title: 'Story not found | eatOS Newsroom' };
  const canonical = `/news/${encodeURIComponent(post.slug)}`;
  return {
    title: `${post.title} | eatOS Newsroom`,
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

export default async function NewsPostPage({ params }) {
  const { slug } = await params;
  const post = getNewsItem(slug);
  const jsonLd = post
    ? {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        image: post.image ? [post.image] : undefined,
        author: { '@type': 'Organization', name: post.author || 'eatOS' },
        publisher: { '@type': 'Organization', name: 'eatOS' },
        mainEntityOfPage: `https://eatos.com/news/${encodeURIComponent(post.slug)}`,
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
      <NewsPostClient slug={slug} />
    </>
  );
}
