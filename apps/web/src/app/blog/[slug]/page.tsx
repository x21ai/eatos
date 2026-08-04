// @ts-nocheck
import BlogPostClient from './BlogPostClient';

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const base = process.env['SITE_ORIGIN'] || 'https://s.eatos.dev';
    const res = await fetch(`${base}/api/blog?limit=100`);
    if (!res.ok) return [];
    const data = await res.json();
    const posts = Array.isArray(data) ? data : (data.posts ?? data.data ?? []);
    return posts
      .map((p) => p?.slug)
      .filter(Boolean)
      .map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  return <BlogPostClient slug={slug} />;
}
