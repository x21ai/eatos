const path = require('node:path');

const repositoryRoot = path.resolve(__dirname, '../..');

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  // The installer hoists workspace dependencies to the repository root, so
  // tracing and Turbopack must share that root for Next to resolve itself.
  outputFileTracingRoot: repositoryRoot,
  // Exclude the unused native application from server output tracing.
  outputFileTracingExcludes: {
    '/**': ['./apps/mobile/**'],
    '**/*': ['./apps/mobile/**'],
  },
  // Cap build workers: the publish container has far less memory than a dev
  // machine, and 60+ page-data workers can stall the build.
  experimental: {
    cpus: 4,
  },
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
    // Dependencies are hoisted to the repository-level node_modules by the
    // workspace installer, so Turbopack must be allowed to resolve from there.
    root: repositoryRoot,
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
    ];
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
