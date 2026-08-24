// @ts-nocheck
// All copy for the Self-Service Kiosk product page. Edit here.

import designedAsset from './assets/kiosk-designed-v3.png.asset.json';
import waitAsset from './assets/kiosk-wait-v3.png.asset.json';
import hardwareAsset from './assets/kiosk-hardware-v3.png.asset.json';
import lineupAsset from './assets/kiosk-lineup.jpg.asset.json';
import heroAsset from './assets/kiosk-hero.jpg.asset.json';

export const hero = {
  title: 'Tap. Order.',
  titleAccent: 'Pay. Go.',
  description:
    'Let guests order, customize and pay on their own. Your team stays focused on the food, not the line.',
  primaryCta: { label: 'Book a Demo', href: '/book-demo' },
  secondaryCta: { label: 'View Pricing', href: '/pricing' },
  imageLabel: 'Self-service kiosk',
  image: heroAsset.url,
  stats: [
    { value: '20%', label: 'Higher check size' },
    { value: '2x', label: 'Faster ordering' },
    { value: '24/7', label: 'Always on service' },
  ],
};

export const keyFeatures = [
  'Designed for Restaurants',
  'Reduce Wait Times',
  'Durable Hardware',
];

export const features = [
  {
    id: 'designed',
    title: 'Designed for the restaurant industry',
    body:
      'A guest-facing menu built by restaurant people: clear categories, photo-led items and modifier flows that guests understand on the first tap.',
    more:
      'Menus, pricing and availability sync from the same catalog as your Point of Sale, so the kiosk is never out of date and staff never maintain a second menu.',
    imageLabel: 'Kiosk menu experience',
    image: designedAsset.url,
    ratio: 'aspect-[3/4]',
    metrics: [
      { value: '100%', label: 'Menu efficiency' },
      { value: '100%', label: 'Intuitive ordering' },
    ],
  },
  {
    id: 'wait-times',
    title: 'Reduce wait times',
    body:
      'Multiple guests order at once instead of queuing for one register. Orders route to prep stations second payment clears.',
    more:
      'Peak-hour throughput rises without adding headcount, and the counter team moves from taking orders to expediting them.',
    imageLabel: 'Queue-free ordering',
    image: waitAsset.url,
    ratio: 'aspect-[3/4]',
    metrics: [
      { value: '100%', label: 'Workflow profits' },
      { value: '100%', label: 'Queue-less sales' },
    ],
  },
  {
    id: 'hardware',
    title: 'Durable hardware',
    body:
      'Commercial-grade displays built for constant public use: bright, responsive touch panels in countertop, freestanding and wall-mount formats.',
    more:
      'Sealed enclosures, cable management and integrated payment terminals keep the footprint tidy and the device serviceable.',
    imageLabel: 'Kiosk hardware formats',
    image: hardwareAsset.url,
    ratio: 'aspect-[3/4]',
    pad: true,
    metrics: [
      { value: '100%', label: 'Trusted hardware' },
      { value: '100%', label: 'Commercial tablets' },
    ],
  },
];

export const offers = [
  {
    title: 'Get your own Self-Service Kiosk',
    description: 'All-in-one hardware and cloud-based restaurant management.',
    imageLabel: 'Self-service kiosk bundle',
    cta: { label: 'Shop Now', href: '/shop' },
  },
  {
    title: 'Make your own custom bundle',
    description: 'Customize your hardware and pair it with our all-in-one restaurant technology.',
    imageLabel: 'Custom hardware bundle',
    cta: { label: 'Shop Now', href: '/shop' },
  },
];

export const offerNote =
  'Terms and conditions, and restaurant qualification criteria apply. Pricing is per location per kiosk, excluding accessories, taxes and shipping.';

export const hardware = {
  eyebrow: 'Hardware',
  title: 'Built for the lobby, not the office',
  description:
    'Three form factors, one platform. Choose the footprint that fits your floor and add more as you grow.',
  imageLabel: 'Kiosk hardware lineup',
  image: lineupAsset.url,
  specs: [
    {
      title: 'Countertop',
      body: 'Compact 15" panel for tight counters, grab-and-go and coffee concepts.',
    },
    {
      title: 'Freestanding',
      body: 'Floor-mounted 22 to 27 inch kiosk with integrated payments and receipt printer.',
    },
    {
      title: 'Wall-mount',
      body: 'Zero-footprint display for lobbies, food halls and queue-line ordering.',
    },
  ],
};