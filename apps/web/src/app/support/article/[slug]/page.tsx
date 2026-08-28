// @ts-nocheck
import ArticleClient from './ArticleClient';
import { articles, getArticle } from '../../content';

export const dynamicParams = true;

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: 'Article not found | eatOS Help Center' };
  const canonical = `/support/article/${article.slug}`;
  const description =
    article.excerpt || `${article.title}: step-by-step help from the eatOS support team.`;
  return {
    title: `${article.title} | eatOS Help Center`,
    description,
    alternates: { canonical },
    openGraph: { type: 'article', url: canonical, title: article.title, description },
    twitter: { card: 'summary_large_image', title: article.title, description },
  };
}

export default async function SupportArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  const jsonLd = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: article.title,
        description: article.excerpt,
        url: `https://www.eatos.com/support/article/${article.slug}`,
        articleSection: article.categoryTitle || undefined,
        publisher: { '@type': 'Organization', name: 'eatOS' },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Help Center', item: 'https://www.eatos.com/support' },
            article.categorySlug
              ? {
                  '@type': 'ListItem',
                  position: 2,
                  name: article.categoryTitle,
                  item: `https://www.eatos.com/support/category/${article.categorySlug}`,
                }
              : null,
            {
              '@type': 'ListItem',
              position: article.categorySlug ? 3 : 2,
              name: article.title,
              item: `https://www.eatos.com/support/article/${article.slug}`,
            },
          ].filter(Boolean),
        },
      }
    : null;
  return (
    <>
      {jsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      ) : null}
      <ArticleClient slug={slug} />
    </>
  );
}
