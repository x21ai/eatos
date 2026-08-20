// @ts-nocheck
import sql from '@/app/api/utils/sql';
import { products } from '@/app/products/products';

export default async function sitemap() {
  const baseUrl = process.env.APP_URL || 'https://eatos.com';

  // Static routes
  const routes = [
    '',
    '/pricing',
    '/enterprise',
    '/hardware',
    '/hardware/pro',
    '/hardware/mini',
    '/ai',
    '/point-of-sale',
    '/contact-sales',
    '/accept-payments',
    '/shop',
    '/about',
    '/partners',
    '/careers',
    '/tap-to-pay',
    '/blog',
    '/products',
    '/platform',
    '/customers',
    '/get-started',
    '/book-demo',
    '/privacy',
    '/terms',
    '/report-fraud',
    '/solutions',
    '/solutions/quick-service',
    '/solutions/full-service',
    '/solutions/fast-casual',
    '/solutions/cafe',
    '/solutions/bar',
    '/solutions/food-truck',
    '/solutions/ghost-kitchen',
    '/solutions/catering',
    '/solutions/enterprise',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  const productRoutes = products
    .filter((p) => p.href && p.href.startsWith('/products/'))
    .map((p) => ({
      url: `${baseUrl}${p.href}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

  // Blog posts
  let posts = [];
  try {
    posts = await sql`SELECT slug, published_at FROM blog_posts WHERE status = 'published'`;
  } catch (e) {
    console.error('Failed to fetch blog posts for sitemap', e);
  }

  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.published_at || new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...routes, ...productRoutes, ...blogRoutes];
}
