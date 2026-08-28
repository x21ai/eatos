const path = require('node:path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    NEXT_PUBLIC_CREATE_BASE_URL: process.env.NEXT_PUBLIC_CREATE_BASE_URL,
    NEXT_PUBLIC_CREATE_HOST: process.env.NEXT_PUBLIC_CREATE_HOST,
    NEXT_PUBLIC_PROJECT_GROUP_ID: process.env.NEXT_PUBLIC_PROJECT_GROUP_ID,
  },
  serverExternalPackages: ['@better-auth/kysely-adapter', 'kysely', 'kysely-d1'],
  // Force-include better-auth's dist files. Next traces imports under the
  // `node` condition, so the `workerd`-only files (e.g. instrumentation/
  // pure.index.mjs) are never copied, and the OpenNext (Workers) esbuild pass
  // then fails to resolve them. Including the whole dist trees fixes that.
  outputFileTracingIncludes: {
    '/**': [
      './node_modules/@better-auth/core/dist/**',
      './node_modules/better-auth/dist/**',
    ],
    '**/*': [
      './node_modules/@better-auth/core/dist/**',
      './node_modules/better-auth/dist/**',
    ],
  },
  // Resolve leftover `@auth/create` imports to local shims (see src/__create/@auth/create).
  turbopack: {
    resolveAlias: {
      '@auth/create/react': path.join(
        __dirname,
        'src/__create/@auth/create/react.tsx'
      ),
      '@auth/create': path.join(__dirname, 'src/__create/@auth/create/index.ts'),
    },
  },
  webpack: (config) => {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@auth/create/react': path.join(
        __dirname,
        'src/__create/@auth/create/react.tsx'
      ),
      '@auth/create': path.join(__dirname, 'src/__create/@auth/create/index.ts'),
    };
    return config;
  },
  rewrites() {
    return [
      {
        source: '/fontawesome/:path*',
        destination: 'https://ka-p.fontawesome.com/:path*',
      },
      // Live comparison URLs keep their exact paths and are served by the
      // /comparison routes underneath.
      { source: '/eatos-vs-other-pos-software', destination: '/comparison' },
      { source: '/eatos-vs-:competitor', destination: '/comparison/:competitor' },
      // Migrated live blog URLs keep their exact /blogs/<slug> paths and are
      // served by the /blog routes underneath.
      { source: '/blogs/:slug', destination: '/blog/:slug' },
    ];
  },
  redirects() {
    const permanent = (pairs) =>
      pairs.map(([source, destination]) => ({ source, destination, permanent: true }));

    return permanent([
      // Slugs used during the rebuild now point at the live canonical URLs.
      ['/about', '/about-eatos'],
      ['/contact-sales', '/contact'],
      ['/privacy', '/privacy-policy'],
      ['/terms', '/terms-and-conditions'],
      ['/book-demo', '/bookademo'],
      ['/get-started', '/bookademo'],
      ['/point-of-sale', '/pointofsale'],
      ['/careers', '/work-with-us'],
      ['/careers/:role', '/work-with-us/:role'],
      ['/hardware', '/products/hardware'],
      ['/hardware/:model', '/products/hardware/:model'],
      ['/enterprise', '/enterprise-pos'],
      ['/products/autonomous-delivery', '/products/autonomous-and-automated-delivery'],
      ['/solutions/quick-service', '/quick-service'],
      ['/solutions/fast-casual', '/fast-casual'],
      ['/solutions/full-service', '/full-service'],
      ['/solutions/food-truck', '/food-truck'],
      ['/solutions/ghost-kitchen', '/ghost-kitchens'],
      ['/solutions/catering', '/catering'],
      ['/solutions/bar', '/bar-and-brewery'],
      ['/solutions/cafe', '/cafe-pos'],
      ['/solutions/enterprise', '/enterprise-pos'],
      ['/solutions/pizzeria', '/pizzeria'],
      ['/comparison/:competitor', '/eatos-vs-:competitor'],
      ['/eatos-vs-other-pos-software/eatos-vs-:competitor', '/eatos-vs-:competitor'],

      // Live flat product aliases consolidate onto one product page each.
      ['/products/point-of-sale', '/pointofsale'],
      ['/kitchendisplaysystem', '/products/kitchen-display-system'],
      ['/kioskos', '/products/self-service-kiosk'],
      ['/customerfacingdisplay', '/products/customer-facing-display'],
      ['/pointofpurchase', '/products/point-of-purchase'],
      ['/reportingandanalytics', '/products/reporting-analytics'],
      ['/orderattable', '/products/tableside-order-and-pay'],
      ['/workforceos', '/products/workforce-management'],
      ['/products/payment-solutions', '/accept-payments'],
      ['/products/ai-enabled-ordering-automation', '/ai'],
      ['/maya-ai', '/ai'],

      // Live pages with no direct equivalent yet go to the nearest page.
      ['/why-eatos', '/platform'],
      ['/support', '/contact'],
      ['/nameyourprice', '/pricing'],
      ['/newsroom', '/news'],
      ['/newsroom/:slug', '/news/:slug'],
      ['/event-list', '/blog'],
      ['/event-pages/:path+', '/blog'],
      ['/blogs', '/blog'],
      ['/blog/categories/:category', '/blog'],
      ['/legal', '/terms-and-conditions'],
      ['/legal-terms', '/terms-and-conditions'],
      ['/e-sign-consent', '/terms-and-conditions'],
      ['/sms-terms', '/terms-and-conditions'],
      ['/payment-terms', '/terms-and-conditions'],
      ['/hardware-policies-warranty', '/terms-and-conditions'],
      ['/general/legal-terms', '/terms-and-conditions'],
      ['/general/sms-policy', '/terms-and-conditions'],
      ['/general/hardware-policy', '/terms-and-conditions'],
      ['/general/privacy-policy', '/privacy-policy'],
      ['/general/:path+', '/terms-and-conditions'],

      // Careers cluster.
      ['/benefits', '/work-with-us'],
      ['/how-we-hire', '/work-with-us'],
      ['/application-tips', '/work-with-us'],
      ['/resource-groups', '/work-with-us'],
      ['/principles-of-employment', '/work-with-us'],
      ['/the-employment-arbitration-policy', '/work-with-us'],
      ['/protect-yourself-from-job-scams', '/work-with-us'],

      // Partner cluster.
      ['/partners/:path+', '/partners'],
      ['/referral-partners', '/partners'],
      ['/integration-partners', '/partners'],
      ['/ambassadors', '/partners'],
      ['/resellers', '/partners'],
      ['/resellers-', '/partners'],

      // Restaurant type collection pages.
      ['/restaurant/quick-service', '/quick-service'],
      ['/restaurant/fast-casual', '/fast-casual'],
      ['/restaurant/full-service', '/full-service'],
      ['/restaurant/food-truck', '/food-truck'],
      ['/restaurant/ghost-kitchen', '/ghost-kitchens'],
      ['/restaurant/catering', '/catering'],
      ['/restaurant/bar-and-brewery', '/bar-and-brewery'],
      ['/restaurant/cafe', '/cafe-pos'],
      ['/restaurant/enterprise', '/enterprise-pos'],
      ['/restaurant/enterprises', '/enterprise-pos'],
      ['/restaurant/:path+', '/solutions'],

      // Store collection pages.
      ['/product-page/:slug', '/shop'],
      ['/category/:slug', '/shop'],
      ['/brochures/:slug', '/brochures'],
    ]);
  },
};

module.exports = nextConfig;

// Enables Cloudflare bindings (D1 `DB`, R2 cache) inside `next dev` so
// getCloudflareContext() works locally the same way it does on Workers.
// No-op in production builds.
if (process.env.NODE_ENV === 'development') {
  (async () => {
    try {
      const { initOpenNextCloudflareForDev } = await import(
        '@opennextjs/cloudflare'
      );
      await initOpenNextCloudflareForDev();
    } catch {
      // Adapter not available (e.g. plain `next build`); safe to ignore.
    }
  })();
}
