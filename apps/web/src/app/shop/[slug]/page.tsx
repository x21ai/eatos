// @ts-nocheck
import ShopContentPageClient from './ContentPageClient';
import { contentPages, getContentPage } from '../catalog';

export const dynamicParams = true;

export async function generateStaticParams() {
  return contentPages.map((p) => ({ slug: p.slug }));
}

function plainText(html, limit = 155) {
  const text = String(html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!text) return '';
  return text.length > limit ? `${text.slice(0, limit - 1).trimEnd()}...` : text;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = getContentPage(slug);
  if (!page) return { title: 'Page not found | eatOS Shop' };
  const canonical = `/shop/${page.slug}`;
  const description =
    plainText(page.bodyHtml) ||
    `${page.title} for the eatOS shop. Restaurant hardware, bundles and payment options for your business.`;
  return {
    title: `${page.title} | eatOS Shop`,
    description,
    alternates: { canonical },
    openGraph: { type: 'website', url: canonical, title: `${page.title} | eatOS Shop`, description },
    twitter: { card: 'summary_large_image', title: `${page.title} | eatOS Shop`, description },
  };
}

export default async function ShopStaticPage({ params }) {
  const { slug } = await params;
  return <ShopContentPageClient slug={slug} />;
}
