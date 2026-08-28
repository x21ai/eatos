// @ts-nocheck
// All copy for the Quick Service solution page. Edit here.

import heroImg from '@/assets/svc-quick-service.jpg.asset.json';
import versatileImg from './assets/qs-versatile-v5.png.asset.json';
import offlineImg from './assets/qs-offline-v4.png.asset.json';
import repeatImg from './assets/qs-repeat-v3.jpg.asset.json';
import bundleImg from './assets/qs-bundle.jpg.asset.json';

export const hero = {
  eyebrow: 'Restaurant Technology Cloud',
  title: 'Solution for Quick Service',
  description:
    'A versatile Point of Sale system for your restaurant. Ideal for Quick-Service and Fast-Casual concepts, built to\u00a0 serve more guests, and turn every order into a faster sale.',
  primaryCta: { label: 'Book a Demo', href: '/bookademo' },
  secondaryCta: { label: 'View Pricing', href: '/pricing' },
  imageLabel: 'Quick service counter setup',
  image: heroImg.url,
};

export const marquee = [
  { value: '<10s', label: 'Average order entry' },
  { value: '100%', label: 'Offline capable' },
  { value: '24/7', label: 'Support included' },
  { value: '$0', label: 'Hardware upfront' },
];

export const pillars = [
  {
    id: 'versatile',
    title: 'Be versatile and prepared with eatOS',
    body:
      'However your guests order, at the counter or on the go, eatOS gets you payment-ready. A cloud-based ecosystem built for the pace of quick-service restaurants.',
    more:
      'Counter, kiosk, handheld, delivery orders land in one queue, so a single team runs every channel without switching systems.',
    imageLabel: 'Counter ordering flow',
    image: versatileImg.url,
    metrics: [
      { value: '6', label: 'Ordering channels' },
      { value: '1', label: 'Unified queue' },
    ],
  },
  {
    id: 'offline',
    title: "Don't refuse service if Wi-Fi is down",
    body:
      'eatOS runs online and offline, so you never lose a sale when the connection drops. Multi-user, multi-device environments stay in sync the moment you are back.',
    more:
      'Payments, tickets and totals queue locally and reconcile automatically, with no manual re-entry after service.',
    imageLabel: 'Offline mode payment',
    image: offlineImg.url,
    metrics: [
      { value: '0', label: 'Lost sales offline' },
      { value: '100%', label: 'Auto reconciled' },
    ],
  },
  {
    id: 'repeat',
    title: 'Keep them coming back for more',
    body:
      'Menu management, streamlined kitchen communication and loyalty keep orders accurate and fast, correct the every time.',
    more:
      'Update an item once and it changes across every register, kiosk and online menu instantly, so pricing and availability never drift.',
    imageLabel: 'Loyalty and menu management',
    image: repeatImg.url,
    metrics: [
      { value: '1x', label: 'Edit menu once' },
      { value: '10x', label: 'Fewer order errors' },
    ],
  },
];

export const capabilities = [
  'Counter Point of Sale',
  'Self-Service Kiosk',
  'Online Ordering & Delivery',
  'Kitchen Display System',
  'Loyalty & Gift Cards',
  'Reporting & Analytics',
];

export const bundle = {
  eyebrow: 'Hardware',
  title: 'Get the Quick Service Bundle',
  description: '$0 hardware upfront cost with Pay As You Go.',
  imageLabel: 'Quick service hardware bundle',
  image: bundleImg.url,
  primaryCta: { label: 'Book a Demo', href: '/bookademo' },
  secondaryCta: { label: 'Shop Now', href: 'https://shop.eatos.com', external: true },
  note:
    'Terms and conditions, and restaurant qualification criteria apply. Pricing is per location per Point of Sale, excluding accessories.',
  specs: [
    { title: 'Counter-ready', body: 'Dual-screen terminal with a guest-facing display and built-in payments.' },
    { title: 'Grab and go', body: 'Handhelds for curbside, line-busting and drive-thru order taking.' },
    { title: 'Scales with you', body: 'Add kiosks, printers and KDS screens without changing platforms.' },
  ],
};

export const ecosystem = [
  { title: 'Customer Facing Display', imageLabel: 'Customer facing display' },
  { title: 'Analytics & Reporting', imageLabel: 'Analytics and reporting' },
  { title: 'Table Side Order & Pay', imageLabel: 'Table side order and pay' },
  { title: 'Kiosk', imageLabel: 'Self-service kiosk' },
  { title: 'Autonomous & Automated Delivery', imageLabel: 'Automated delivery' },
];