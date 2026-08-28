// @ts-nocheck
import CategoryClient from './CategoryClient';
import { categories, getCategory, getCategoryArticles } from '../../content';

export const dynamicParams = true;

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: 'Category not found | eatOS Help Center' };
  const canonical = `/support/category/${category.slug}`;
  const description =
    category.description ||
    `${category.title} help articles for eatOS restaurant technology, including setup, configuration and troubleshooting.`;
  return {
    title: `${category.title} | eatOS Help Center`,
    description,
    alternates: { canonical },
    openGraph: { type: 'website', url: canonical, title: `${category.title} | eatOS Help Center`, description },
    twitter: { card: 'summary_large_image', title: `${category.title} | eatOS Help Center`, description },
  };
}

export default async function SupportCategoryPage({ params }) {
  const { slug } = await params;
  const category = getCategory(slug);
  const articles = getCategoryArticles(slug);
  const jsonLd = category
    ? {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: category.title,
        description: category.description,
        url: `https://www.eatos.com/support/category/${category.slug}`,
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: articles.map((a, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: a.title,
            url: `https://www.eatos.com/support/article/${a.slug}`,
          })),
        },
      }
    : null;
  return (
    <>
      {jsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      ) : null}
      <CategoryClient slug={slug} />
    </>
  );
}
