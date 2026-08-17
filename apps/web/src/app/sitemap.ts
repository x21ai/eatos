// @ts-nocheck
import { products } from '@/app/products/products';

// Build-time only: never touch the database or the network here. A hanging
// query during `next build` stalls the whole production build.
export default function sitemap() {
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
    '/solutions/fine-dining',
    '/solutions/cafe',
    '/solutions/bar',
    '/solutions/food-truck',
    '/solutions/ghost-kitchen',
    '/solutions/multi-location',
    '/solutions/franchise',
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

  return [...routes, ...productRoutes];
}
