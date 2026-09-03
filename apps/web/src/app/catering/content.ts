// @ts-nocheck
// All copy for the Catering solution page. Edit here.

import heroImg from './assets/cat-hero.jpg.asset.json';
import opsImg from './assets/cat-ops-v2.jpg.asset.json';
import inventoryImg from './assets/cat-inventory-v2.jpg.asset.json';
import guestsImg from './assets/cat-guests-v2.jpg.asset.json';

export const hero = {
  eyebrow: 'Restaurant Technology Cloud',
  title: 'Catering Solution',
  description:
    'Elevate your catering business with eatOS Point of Sale. Boost visibility without a storefront, handle large orders swiftly and impress clients for repeat business.',
  primaryCta: { label: 'Book a Demo', href: '/bookademo' },
  secondaryCta: { label: 'View Pricing', href: '/pricing' },
  imageLabel: 'Catering buffet setup at an upscale event',
  image: heroImg.url,
};

export const capabilities = [
  'Track catering orders alongside regular service',
  'Custom menus built for each event',
  'Real-time inventory for catering ingredients',
  'CRM data for repeat catering clients',
  'Large-order logistics in one queue',
];

export const marquee = [
  { value: 'Large orders', label: 'Quote, confirm and fire big orders without slowing service.' },
  { value: 'Event menus', label: 'Custom menus, pricing per client, save, reused in seconds.' },
  { value: 'Support 24/7', label: 'Real people on call for every event, any day of the year.' },
  { value: 'No upfront cost', label: 'Hardware included with Pay As You Go, so you start today.' },
];

export const pillars = [
  {
    id: 'operations',
    title: 'Streamlined catering operations',
    body:
      'Manage and track catering orders alongside regular service, with menu customization for every event.',
    more: 'Coordinate logistics for large-scale catering from one screen.',
    imageLabel: 'Catering manager reviewing an event order on a tablet',
    image: opsImg.url,
  },
  {
    id: 'inventory',
    title: 'Inventory and menu adaptability',
    body:
      'Monitor real-time inventory for catering-specific ingredients and adapt menus to each event requirement.',
    more: 'Optimal stock levels keep every booked order covered.',
    imageLabel: 'Chef checking catering stock on prep kitchen shelves',
    image: inventoryImg.url,
  },
  {
    id: 'clients',
    title: 'Guest-centric catering services',
    body:
      'Customize orders for dietary preferences and use CRM data to personalize service for repeat clients.',
    more: 'Event planning stays simple, from first quote to final plate.',
    imageLabel: 'Catering staff serving guests at a private event',
    image: guestsImg.url,
  },
];
