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

import lifestyleShot from '@/assets/pizzeria-delivery.jpg.asset.json';

import p1 from './assets/products/p1.png.asset.json';
import p2 from './assets/products/p2.png.asset.json';
import p3 from './assets/products/p3.png.asset.json';
import p4 from './assets/products/p4.png.asset.json';
import p5 from './assets/products/p5.png.asset.json';
import p6 from './assets/products/p6.png.asset.json';
import p7 from './assets/products/p7.png.asset.json';
import p8 from './assets/products/p8.png.asset.json';
import p9 from './assets/products/p9.png.asset.json';
import p10 from './assets/products/p10.png.asset.json';

export const productGallery = [
  { url: p1.url, caption: 'Dual screen Point of Sale terminal' },
  { url: p2.url, caption: 'Point of Sale terminal with clock in keypad' },
  { url: p3.url, caption: 'Self Service Kiosk, floor standing with ordering screen' },
  { url: p4.url, caption: 'Table Side ordering on mobile' },
  { url: p5.url, caption: 'Handheld terminal with tap to pay' },
  { url: p6.url, caption: 'Self Service Kiosk, counter top with ordering screen' },

  { url: p7.url, caption: 'Workforce Management on mobile' },
  { url: p8.url, caption: 'Table Side ordering on tablet and mobile' },
  { url: p9.url, caption: 'Guest Facing Display with dual screen' },
  { url: p10.url, caption: 'Point of Sale terminal with open order' },
];

import g1 from './assets/gallery/eatOS_Image_24.jpg.asset.json';
import g2 from './assets/gallery/eatOS_Image_21_1.jpg.asset.json';
import g3 from './assets/gallery/eatOS_Image_20.jpg.asset.json';
import g4 from './assets/gallery/eatOS_Image_19.jpg.asset.json';
import g5 from './assets/gallery/eatOS_Image_18.jpg.asset.json';
import g6 from './assets/gallery/eatOS_Image_17.jpg.asset.json';
import g7 from './assets/gallery/eatOS_Image_16.jpg.asset.json';
import g8 from './assets/gallery/eatOS_Image_13.jpg.asset.json';
import g9 from './assets/gallery/eatOS_Image_11.jpg.asset.json';
import g10 from './assets/gallery/eatOS_Image_14.jpg.asset.json';
import g11 from './assets/gallery/eatOS_Image_22_2.jpg.asset.json';
import g12 from './assets/gallery/eatOS_Image_23.jpg.asset.json';
import g13 from './assets/gallery/eatOS_Image_12.jpg.asset.json';
import g14 from './assets/gallery/eatOS_Image_15.jpg.asset.json';

export const miscGallery = [
  { url: g1.url, caption: 'Guest Facing Display at the counter' },
  { url: g2.url, caption: 'Kitchen Display System in service' },
  { url: g3.url, caption: 'Self Service Kiosk, floor standing' },
  { url: g4.url, caption: 'Guest ordering at a Self Service Kiosk' },
  { url: g5.url, caption: 'Online ordering app' },
  { url: g6.url, caption: 'Mobile ordering in the dining room' },
  { url: g7.url, caption: 'Handheld payments at the table' },
  { url: g8.url, caption: 'Tap to pay on a handheld terminal' },
  { url: g9.url, caption: 'Point of Sale terminal in use' },
  { url: g10.url, caption: 'QR code ordering at the table' },
  { url: g11.url, caption: 'Kitchen Display System above the line' },
  { url: g12.url, caption: 'Guest Facing Display at checkout' },
  { url: g13.url, caption: 'Point of Sale terminal at the counter' },
  { url: g14.url, caption: 'Online ordering on a guest smartphone' },
];

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
    description: 'App icons for every eatOS product, sized and spaced for clean use anywhere.',
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
    description: 'The standalone eatOS jewel, approved for small spaces and social profiles.',
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
    description: 'Studio photography of eatOS hardware, from terminals to kiosks and handhelds.',
    action: 'Explore Photos',
    href: '/media-kit',
    image: p1.url,
    contain: true,
    light: true,
    gallery: productGallery,
  },
  {
    id: 'miscellaneous-images',
    title: 'Miscellaneous Images',
    description: 'Lifestyle imagery of eatOS in service across cafes, bars and dining rooms.',
    action: 'Explore Photos',
    href: '/media-kit',
    image: lifestyleShot.url,
    gallery: miscGallery,
  },
];
