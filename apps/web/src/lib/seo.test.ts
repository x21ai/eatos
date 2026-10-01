import { describe, expect, it } from 'vitest';
import {
  HOME_DESCRIPTION,
  HOME_TITLE,
  META_DESCRIPTION_MAX,
  marketingMetadata,
  resolveSocialImages,
  siteJsonLd,
  softwareApplicationJsonLd,
  trimMetaDescription,
  withSocialImages,
  defaultSocialImages,
} from './seo';

describe('marketing metadata', () => {
  it('keeps the home description inside the snippet limit and names the category', () => {
    expect(HOME_TITLE.startsWith('eatOS')).toBe(true);
    expect(HOME_TITLE.toLowerCase()).toContain('point of sale');
    expect(HOME_DESCRIPTION.length).toBeLessThanOrEqual(META_DESCRIPTION_MAX);
    expect(HOME_DESCRIPTION.toLowerCase()).toContain('point of sale');
  });

  it('trims overlong descriptions on a word boundary', () => {
    const trimmed = trimMetaDescription(`${'word '.repeat(50)}end`);
    expect(trimmed.length).toBeLessThanOrEqual(META_DESCRIPTION_MAX);
    expect(trimmed.endsWith('…')).toBe(true);
    expect(trimmed.includes(' end')).toBe(false);
  });

  it('leaves short descriptions unchanged', () => {
    expect(trimMetaDescription('eatOS restaurant point of sale.')).toBe(
      'eatOS restaurant point of sale.',
    );
  });

  it('always attaches a share image, including when openGraph replaces the root', () => {
    const metadata = marketingMetadata({
      title: 'eatOS Pricing | Restaurant Point of Sale',
      description: 'Short pricing description for eatOS.',
      path: '/pricing',
    });
    expect(metadata.title).toEqual({ absolute: 'eatOS Pricing | Restaurant Point of Sale' });
    expect(metadata.openGraph.images).toEqual(defaultSocialImages);
    expect(metadata.twitter.images).toEqual(defaultSocialImages);
    expect(metadata.alternates.canonical).toBe('/pricing');
  });

  it('keeps a page-specific image override', () => {
    const images = resolveSocialImages('https://example.com/product.jpg');
    expect(images).toEqual([
      { url: 'https://example.com/product.jpg', alt: defaultSocialImages[0].alt },
    ]);
    const wrapped = withSocialImages({
      openGraph: { title: 'Post', images: ['https://example.com/post.jpg'] },
      twitter: { card: 'summary_large_image' },
    });
    expect(wrapped.openGraph.images).toEqual(['https://example.com/post.jpg']);
    expect(wrapped.twitter.images).toEqual(defaultSocialImages);
  });

  it('publishes Organization and WebSite without a search action', () => {
    const graph = siteJsonLd()['@graph'];
    expect(graph.map((node) => node['@type'])).toEqual(['Organization', 'WebSite']);
    expect(JSON.stringify(graph)).not.toContain('SearchAction');
    expect(graph[0].name).toBe('eatOS');
    expect(graph[0].sameAs).toContain('https://x.com/myeatos');
  });

  it('describes core software as a restaurant point of sale application', () => {
    const data = softwareApplicationJsonLd({
      name: 'eatOS Restaurant Point of Sale',
      description: 'Cloud restaurant point of sale.',
      path: '/pointofsale',
    });
    expect(data['@type']).toBe('SoftwareApplication');
    expect(data.applicationSubCategory).toBe('Restaurant point of sale');
    expect(data.url).toBe('https://eatos.com/pointofsale');
    expect(data.offers).toBeUndefined();
  });
});
