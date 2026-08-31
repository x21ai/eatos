// @ts-nocheck
// Media kit assets. Order matches the live site.

import brandBookCover from './assets/Brand_Guidelines.png.asset.json';
import logo3d from './assets/3D_Logo_copy.png.asset.json';
import iconArt from './assets/eatOS_Icon.png.asset.json';
import emblemArt from './assets/eatOS_Emblem_-_Black_-_Png.png.asset.json';
import brandBookPdf from './assets/eatOS_Brand_Guidelines.pdf.asset.json';
import logosZip from './assets/eatOS_Logos.zip.asset.json';
import iconsZip from './assets/eatOS_Icons.zip.asset.json';
import emblemsZip from './assets/eatOS_Emblems.zip.asset.json';

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
    href: brandBookPdf.url,
    download: 'eatOS_Brand_Guidelines.pdf',
    image: brandBookCover.url,
    contain: true,
    light: true,
  },
  {
    id: 'eatos-logo',
    title: 'eatOS logo',
    description:
      'The eatOS logo consists of the jewel and the wordmark. It represents our mission to empower sellers with tools that help them run their businesses.',
    action: 'Download',
    href: logosZip.url,
    download: 'eatOS_Logos.zip',
    image: logo3d.url,
    contain: true,
    light: true,
  },
];

export const items = [
  {
    id: 'eatos-icons',
    title: 'eatOS Icons',
    description: 'See the eatOS ecosystem working together across different businesses.',
    action: 'Download',
    href: iconsZip.url,
    download: 'eatOS_Icons.zip',
    image: iconArt.url,
    contain: true,
    light: true,
  },
  {
    id: 'eatos-emblem',
    title: 'eatOS Emblem',
    description: 'See the eatOS ecosystem working together across different businesses.',
    action: 'Download',
    href: emblemsZip.url,
    download: 'eatOS_Emblems.zip',
    image: emblemArt.url,
    contain: true,
    light: true,
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
