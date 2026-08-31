// @ts-nocheck
// Media kit assets. Order matches the live site.
// TODO: replace the placeholder `href` values below with the real brand asset
// files (brand book PDF, logo pack, icon set, emblem, photo sets) once supplied.

import logoWhite from '@/components/marketing/assets/brand/logo-mobile-white.png.asset.json';
import productShot from '@/assets/point-of-purchase-terminals.png.asset.json';
import lifestyleShot from '@/assets/pizzeria-delivery.jpg.asset.json';

export const hero = {
  eyebrow: 'Resources',
  title: 'Media Kit',
  description:
    'Everything you need to represent eatOS correctly: brand guidelines, logos, icons and approved imagery for press, partners and marketing teams.',
};

export const featured = [
  {
    id: 'brand-guidelines',
    title: 'Brand Guidelines',
    description:
      'eatOS Brand Guidelines ensure a consistent brand identity across all platforms, detailing logo usage, color palette, typography, imagery, and tone for cohesive communication.',
    action: 'Download',
    href: '/media-kit',
    image: null,
  },
  {
    id: 'eatos-logo',
    title: 'eatOS logo',
    description:
      'The eatOS logo consists of the jewel and the wordmark. It represents our mission to empower sellers with tools that help them run their businesses.',
    action: 'Download',
    href: '/media-kit',
    image: logoWhite.url,
    contain: true,
  },
];

export const items = [
  {
    id: 'eatos-icons',
    title: 'eatOS Icons',
    description: 'See the eatOS ecosystem working together across different businesses.',
    action: 'Download',
    href: '/media-kit',
    image: null,
    glyph: 'e',
  },
  {
    id: 'eatos-emblem',
    title: 'eatOS Emblem',
    description: 'See the eatOS ecosystem working together across different businesses.',
    action: 'Download',
    href: '/media-kit',
    image: null,
    glyph: 'e',
    ring: true,
  },
  {
    id: 'eatos-products',
    title: 'eatOS Products',
    description: 'See the eatOS ecosystem working together across different businesses.',
    action: 'Explore Photos',
    href: '/media-kit',
    image: productShot.url,
    contain: true,
  },
  {
    id: 'miscellaneous-images',
    title: 'Miscellaneous Images',
    description: 'See the eatOS ecosystem working together across different businesses.',
    action: 'Explore Photos',
    href: '/media-kit',
    image: lifestyleShot.url,
  },
];
