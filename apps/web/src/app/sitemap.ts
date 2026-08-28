// @ts-nocheck
import { products } from '@/app/products/products';
import { posts } from '@/app/blog/content';
import { newsItems } from '@/app/news/content';
import { articles as supportArticles, categories as supportCategories } from '@/app/support/content';

export default async function sitemap() {
  const baseUrl = process.env.APP_URL || 'https://eatos.com';

  // Static routes. No lastModified: build time is not a page-specific signal.
  const routes = [
    '',
    '/pricing',
    '/enterprise-pos',
    '/products/hardware',
    '/products/hardware/pro',
    '/products/hardware/mini',
    '/ai',
    '/pointofsale',
    '/contact',
    '/accept-payments',
    '/shop',
    '/about-eatos',
    '/partners',
    '/work-with-us',
    '/tap-to-pay',
    '/blog',
    '/products',
    '/platform',
    '/customers',
    '/bookademo',
    '/news',
    '/privacy-policy',
    '/terms-and-conditions',
    '/report-fraud',
    '/system-status',
    '/offline-point-of-sale',
    '/solutions',
    '/quick-service',
    '/full-service',
    '/fast-casual',
    '/cafe-pos',
    '/bar-and-brewery',
    '/food-truck',
    '/ghost-kitchens',
    '/catering',
    '/pizzeria',
    '/brochures',
    '/support',
    '/eatos-vs-other-pos-software',
    ...['square', 'toast', 'lightspeed', 'spoton', 'touchbistro', 'revel', 'micros'].map(
      (competitor) => `/eatos-vs-${competitor}`
    ),
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  const productRoutes = products
    .filter((p) => p.href && p.href.startsWith('/products/'))
    .map((p) => ({
      url: `${baseUrl}${p.href}`,
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

  // Blog posts keep their original /blogs/<slug> URLs.
  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Newsroom items keep their original /news/<slug> URLs.
  const newsRoutes = newsItems.map((item) => ({
    url: `${baseUrl}/news/${encodeURIComponent(item.slug)}`,
    lastModified: item.date,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Help center categories and articles keep their original slugs.
  const supportRoutes = [
    ...supportCategories.map((category) => ({
      url: `${baseUrl}/support/category/${category.slug}`,
      changeFrequency: 'monthly',
      priority: 0.6,
    })),
    ...supportArticles.map((article) => ({
      url: `${baseUrl}/support/article/${article.slug}`,
      changeFrequency: 'monthly',
      priority: 0.5,
    })),
  ];

  return [...routes, ...productRoutes, ...blogRoutes, ...newsRoutes, ...supportRoutes];
}
