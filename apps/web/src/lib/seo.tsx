// @ts-nocheck
// Shared marketing metadata, share images, and JSON-LD.
// Child `openGraph` objects replace the root object in Next.js, so every
// page that sets openGraph must include an image or the default is dropped.

export const SITE_URL = 'https://eatos.com';

export const META_DESCRIPTION_MAX = 160;

/** Homepage hero already used as the brand share image. Not a stock photo. */
export const DEFAULT_SOCIAL_IMAGE = {
  url: 'https://ucarecdn.com/c0c7e8e9-324d-4d51-8fa6-8a867032ad32/-/format/auto/',
  width: 1200,
  height: 630,
  alt: 'eatOS restaurant point of sale',
};

export const defaultSocialImages = [DEFAULT_SOCIAL_IMAGE];

export const HOME_TITLE = 'eatOS | Restaurant Point of Sale';

export const HOME_DESCRIPTION =
  'eatOS is restaurant point of sale software for service: payments, kitchen display, online ordering, inventory, and AI in one system.';

const LOGO_PATH =
  '/__l5e/assets-v1/63d513de-792e-4584-a16c-6aa9b81dda4a/logo-mobile-black.png';

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export function trimMetaDescription(value, max = META_DESCRIPTION_MAX) {
  const clean = String(value || '').replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const budget = max - 1;
  const slice = clean.slice(0, budget);
  const wordBound = slice.replace(/\s+\S*$/, '').replace(/[.,;:\s]+$/, '').trim();
  const base = wordBound.length >= Math.floor(max * 0.6) ? wordBound : slice.trim();
  return `${base}…`;
}

function hasImages(images) {
  if (!images) return false;
  return Array.isArray(images) ? images.filter(Boolean).length > 0 : true;
}

export function resolveSocialImages(image) {
  if (!hasImages(image)) return defaultSocialImages;
  const list = Array.isArray(image) ? image.filter(Boolean) : [image];
  return list.map((item) => {
    if (typeof item === 'string') return { url: item, alt: DEFAULT_SOCIAL_IMAGE.alt };
    if (item && typeof item === 'object' && item.url) return item;
    return DEFAULT_SOCIAL_IMAGE;
  });
}

/**
 * Fill a share image when a page sets openGraph or twitter without one.
 * Existing image overrides are kept.
 */
export function withSocialImages(metadata, image) {
  if (!metadata || typeof metadata !== 'object') return metadata;
  const fallback = resolveSocialImages(image);
  const next = { ...metadata };
  if (next.openGraph) {
    next.openGraph = {
      ...next.openGraph,
      images: hasImages(next.openGraph.images) ? next.openGraph.images : fallback,
    };
  }
  if (next.twitter) {
    next.twitter = {
      ...next.twitter,
      images: hasImages(next.twitter.images) ? next.twitter.images : fallback,
    };
  }
  if (typeof next.description === 'string') {
    next.description = trimMetaDescription(next.description);
  }
  return next;
}

export function marketingMetadata({
  title,
  description,
  path,
  canonical,
  ogTitle,
  ogDescription,
  image,
  type = 'website',
  template,
  index,
}) {
  const descriptionText = trimMetaDescription(description);
  const socialDescription = trimMetaDescription(ogDescription || description);
  const socialTitle = ogTitle || title;
  const images = resolveSocialImages(image);
  const url = canonical || path;
  return {
    title: template ? { absolute: title, template } : { absolute: title },
    description: descriptionText,
    alternates: url ? { canonical: url } : undefined,
    openGraph: {
      type,
      url,
      title: socialTitle,
      description: socialDescription,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@myeatos',
      title: socialTitle,
      description: socialDescription,
      images,
    },
    ...(index === false ? { robots: { index: false, follow: false } } : {}),
  };
}

export function siteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORGANIZATION_ID,
        name: 'eatOS',
        url: SITE_URL,
        logo: `${SITE_URL}${LOGO_PATH}`,
        email: 'cs@eatos.com',
        telephone: '+1-844-563-2867',
        sameAs: [
          'https://www.facebook.com/myeatos',
          'https://x.com/myeatos',
          'https://www.instagram.com/myeatos',
          'https://www.linkedin.com/company/myeatos',
          'https://vimeo.com/myeatos',
          'https://www.youtube.com/@myeatos',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: 'eatOS',
        url: SITE_URL,
        description: HOME_DESCRIPTION,
        publisher: { '@id': ORGANIZATION_ID },
      },
    ],
  };
}

export function softwareApplicationJsonLd({ name, description, path }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Restaurant point of sale',
    operatingSystem: 'Web, iOS, Android',
    description: trimMetaDescription(description, 300),
    url: `${SITE_URL}${path}`,
    provider: { '@id': ORGANIZATION_ID },
  };
}

export function productJsonLd({ name, description, path }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description: trimMetaDescription(description, 300),
    url: `${SITE_URL}${path}`,
    brand: { '@type': 'Brand', name: 'eatOS' },
  };
}

export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
