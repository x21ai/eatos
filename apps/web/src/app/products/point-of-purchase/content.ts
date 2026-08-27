// @ts-nocheck
// All copy for the Point of Purchase (handheld) product page. Edit here.

import heroAsset from './assets/pop-hero.jpg.asset.json';
import costsAsset from './assets/pop-costs-handheld.png.asset.json';
import menusyncAsset from './assets/pop-menusync-new.jpg.asset.json';
import paymentsAsset from './assets/pop-payments-table.png.asset.json';
import compatibilityAsset from './assets/pop-compatibility.jpg.asset.json';
import tablesAsset from './assets/pop-tables.jpg.asset.json';
import fireAsset from './assets/pop-fire.jpg.asset.json';
import lineupAsset from './assets/pop-lineup.jpg.asset.json';

export const hero = {
  eyebrow: 'Point of Purchase',
  title: 'Full Point of Sale',
  titleAccent: 'In Your Hands',
  description:
    'Contactless payments keep things smooth. A handheld eatOS terminal takes orders, fires to the kitchen and accepts payment right at the table.',
  primaryCta: { label: 'Book a Demo', href: '/bookademo' },
  secondaryCta: { label: 'View Pricing', href: '/pricing' },
  imageLabel: 'Guest paying on a handheld eatOS terminal',
  image: heroAsset.url,
  stats: [
    { value: '10x', label: 'Faster table turns' },
    { value: '100%', label: 'Mobile checkout' },
    { value: '24/7', label: 'Always on support' },
  ],
};

export const keyFeatures = [
  'All-in-One Point of Purchase',
  'Contactless Payments',
  'Real-time MenuSync',
  'Table management',
];

export const features = [
  {
    id: 'save-costs',
    title: 'Save Costs, Powerful Features',
    body:
      'A full size Point of Sale in the palm of your hand. One device covers ordering, payment and receipts, so you spend less on stations and still run the whole floor.',
    more:
      'Servers stay with guests instead of walking to a terminal, and every check closes where the order started.',
    imageLabel: 'Handheld eatOS terminal in use at the counter',
    image: costsAsset.url,
    metrics: [
      { value: '100%', label: 'Powerful Point of Sale' },
      { value: '100%', label: 'Mobile Checkout' },
    ],
  },
  {
    id: 'menusync',
    title: 'Real-Time MenuSync',
    body:
      'Update an item once and it lands on every handheld, terminal, kiosk and online channel instantly. No second menu to maintain, no stale pricing.',
    more:
      'Eighty-sixed items disappear the moment the kitchen calls it, so your team never sells what you cannot serve.',
    imageLabel: 'Manager updating a live menu on a tablet',
    image: menusyncAsset.url,
    metrics: [
      { value: '100%', label: 'Time Saver' },
      { value: '10x', label: 'Efficient Menu' },
    ],
  },
  {
    id: 'payments',
    title: 'Dynamic Payment Processing',
    body:
      'Tap, insert, swipe or scan to pay, right at the table. Guests choose how to split, how to tip and where the receipt goes.',
    more:
      'Split by item, by seat or evenly across the table, then email or text the receipt without a trip to the counter.',
    imageLabel: 'Guest tapping a phone on a handheld reader',
    image: paymentsAsset.url,
    metrics: [
      { value: '100%', label: 'Guest Empowerment' },
      { value: '100%', label: 'Split Receipt Features' },
    ],
  },
  {
    id: 'compatibility',
    title: 'Powerful Compatibility',
    body:
      'The handheld works alongside your terminals, kitchen displays, kiosks and customer facing displays on one shared platform.',
    more:
      'Add devices as service grows and every one of them reads from the same menu, staff list and reporting.',
    imageLabel: 'eatOS device family on a dark counter',
    image: compatibilityAsset.url,
    metrics: [
      { value: '100%', label: 'Speedy Checkout' },
      { value: '100%', label: 'Inclusivity' },
    ],
  },
  {
    id: 'tables',
    title: 'Table Management',
    body:
      'See the whole floor from your hand: open checks, course timing, seat numbers and server assignments, all live.',
    more:
      'Transfer tables, merge checks and hand off sections mid-shift without losing a single item.',
    imageLabel: 'Server managing tables on a handheld device',
    image: tablesAsset.url,
    metrics: [
      { value: '10x', label: 'Profit Booster' },
      { value: '100%', label: 'Convenient' },
    ],
  },
  {
    id: 'fire-to-kitchen',
    title: 'Fire To Kitchen',
    body:
      'Orders route straight from the table to the right prep station the moment you confirm them, with modifiers and allergy notes attached.',
    more:
      'Hold appetizers, fire entrees and pace courses from the handheld so the kitchen and the dining room stay in step.',
    imageLabel: 'Kitchen display showing incoming tickets',
    image: fireAsset.url,
    metrics: [
      { value: '10x', label: 'Faster' },
      { value: '100%', label: 'Kitchen Continuity' },
    ],
  },
];

export const offers = [
  {
    title: 'Get your own Point of Purchase',
    description: 'All-in-one handheld hardware and cloud-based restaurant management.',
    cta: { label: 'Shop Now', href: '/shop' },
  },
  {
    title: 'Make your own custom bundle',
    description: 'Customize your hardware and pair it with our all-in-one restaurant technology.',
    cta: { label: 'Shop Now', href: '/shop' },
  },
];

export const offerNote =
  'Terms and conditions, and restaurant qualification criteria apply. Pricing is per location per device, excluding accessories, taxes and shipping.';

export const hardware = {
  eyebrow: 'Hardware',
  title: 'Built for the floor, not the desk',
  description:
    'A rugged handheld with an all-day battery, a built-in reader and a dock that keeps it charged between shifts.',
  imageLabel: 'Handheld terminal and charging dock',
  image: lineupAsset.url,
  specs: [
    {
      title: 'Handheld terminal',
      body: 'Pocket-sized, drop-tested and spill resistant, with a bright touch display for busy rooms.',
    },
    {
      title: 'Charging dock',
      body: 'Drop-in dock and swappable batteries keep devices ready through back-to-back services.',
    },
    {
      title: 'Built-in card reader',
      body: 'EMV chip, tap and swipe in one device, with encrypted, PCI compliant processing.',
    },
  ],
};