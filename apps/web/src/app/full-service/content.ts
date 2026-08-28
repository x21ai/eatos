// @ts-nocheck
// All copy for the Full Service solution page. Edit here.

import heroImg from '@/assets/svc-full-service.jpg.asset.json';
import tablesImg from './assets/fs-v4-1.jpg.asset.json';
import paymentsImg from './assets/fs-v4-2.png.asset.json';
import coursingImg from './assets/fs-v4-3.jpg.asset.json';

export const hero = {
  eyebrow: 'Restaurant Technology Cloud',
  title: 'Full-Service Restaurant\u00a0',
  description:
    'Designed for full-service restaurants, with additional modules including reservations, table management, and functionality to support order coursing, course timing, and split-check payments at the table.',
  primaryCta: { label: 'Book a Demo', href: '/bookademo' },
  secondaryCta: { label: 'View Pricing', href: '/pricing' },
  imageLabel: 'Full service dining room setup',
  image: heroImg.url,
};

export const marquee = [
  {
    value: 'One platform',
    label:
      'Front of house, kitchen and back office run on a single system. Every order and payment flows through one connected platform.',
  },
  {
    value: 'Always on',
    label:
      'Service keeps moving online or offline, with no lost. Tickets and totals sync automatically the moment connectivity returns.',
  },
  {
    value: 'Support 24/7',
    label:
      'Real people on call through every dinner rush. Our support team knows restaurants and answers fast, so service never stalls.',
  },
  {
    value: 'No upfront cost',
    label:
      'Hardware included, So you start fast and scale easily. Add terminals, handhelds, and kitchen displays as your dining room grows.',
  },
];

export const pillars = [
  {
    id: 'platform',
    title: 'Way to think about Point of Sale',
    body:
      'Our all-in-one food-service and restaurant management suite is designed to make it easier to manage guests, staff, marketing, finances, and the menu.',
    more:
      'Everything runs on one cloud platform, so operators thrive no matter their size, from single dining room to group of restaurants.',
    imageLabel: 'Table management on a tablet',
    image: tablesImg.url,
  },
  {
    id: 'offline',
    title: 'Never miss out on a customer',
    body:
      'Fully functioning in online and offline modes, eatOS keeps business running even when the Wi-Fi is down, so service and payments never stop mid-course.',
    more:
      'The multi-user and multi-device environment makes seamless teamwork a breeze, with tickets and totals syncing the moment you are back online.',
    imageLabel: 'Tableside contactless payment',
    image: paymentsImg.url,
  },
  {
    id: 'guests',
    title: 'Turn first-timers into regulars',
    body:
      'With menu and table management, seating and serving your guests is more efficient than ever before, from the first greeting to the final check.',
    more:
      'We streamline communication across the restaurant so altering orders and accounting for dietary restrictions is easy, and plates come out right the first time.',
    imageLabel: 'Kitchen pass with coursing display',
    image: coursingImg.url,
  },
];

export const capabilities = [
  'Table Management',
  'Reservations & Waitlist',
  'Order Coursing',
  'Split Checks & Tableside Pay',
  'Kitchen Display System',
  'Reporting & Analytics',
];

export const bundle = {
  eyebrow: 'Hardware',
  title: 'Get the Full Service Bundle',
  description: '$0 hardware upfront cost with Pay As You Go.',
  primaryCta: { label: 'Book a Demo', href: '/bookademo' },
  secondaryCta: { label: 'Shop Now', href: '/shop' },
  note:
    'Terms and conditions, and restaurant qualification criteria apply. Pricing is per location per Point of Sale, excluding accessories.',
  specs: [
    {
      title: 'Built for the floor',
      body: 'Dual-screen terminal at the host stand with built-in payments and a guest-facing display.',
    },
    {
      title: 'Tableside ready',
      body: 'Handhelds for coursing, order taking and split payments without a trip back to the station.',
    },
    {
      title: 'Scales with the room',
      body: 'Add kitchen displays, printers and stations across the venue without changing platforms.',
    },
  ],
};
