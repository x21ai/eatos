// @ts-nocheck
// All copy for the Cafe solution page. Edit here.

import heroImg from '../../../assets/svc-cafe.jpg.asset.json';
import connectImg from './assets/cafe-connect.jpg.asset.json';
import teamImg from './assets/cafe-team.jpg.asset.json';
import kioskImg from './assets/cafe-kiosk.jpg.asset.json';

export const hero = {
  eyebrow: 'Restaurant Technology Cloud',
  title: 'Point of Sale System for Cafes',
  description:
    'Easy to learn and easy to use, ideal for bustling cafes. Menu and inventory control enable staff to take complicated orders quickly and efficiently.',
  primaryCta: { label: 'Book a Demo', href: '/book-demo' },
  secondaryCta: { label: 'View Pricing', href: '/pricing' },
  imageLabel: 'Cafe counter with eatOS terminal',
  image: heroImg.url,
};

export const marquee = [
  {
    value: 'Built for the rush',
    label: 'Fast order entry and modifiers keep the morning line moving from open to close.',
  },
  {
    value: 'Everyone in sync',
    label: 'Baristas, counter staff and devices share one live view of every open order.',
  },
  {
    value: 'Support 24/7',
    label: 'Real people on call through every early shift, every day of the year.',
  },
  {
    value: 'No upfront cost',
    label: 'Hardware included with Pay As You Go, so you start fast and grow at your pace.',
  },
];

export const pillars = [
  {
    id: 'connectivity',
    title: 'Seamless connectivity for your cafe',
    body:
      'Make sure all your employees stay in sync with each other and with your devices, with flawless connectivity that keeps everyone in the loop.',
    more:
      'Whether you are a two-person espresso bar or a full staff cafe, eatOS technology adapts to the way your team already works.',
    imageLabel: 'Cafe counter with a connected terminal',
    image: connectImg.url,
  },
  {
    id: 'team',
    title: 'Employee management made easy',
    body:
      'Schedule shifts, issue payroll, and control time and attendance all with eatOS, so your team can focus on what really matters.',
    more:
      'With eatOS employee management you regulate and stay in sync with every aspect of their work, from the first opening shift to the last close.',
    imageLabel: 'Manager reviewing the schedule on a tablet',
    image: teamImg.url,
  },
  {
    id: 'kiosk',
    title: 'Speed things up with our Kiosk',
    body:
      'Set yourself apart from other cafes by adding our Kiosk to the customer experience and taking orders directly from guests to baristas.',
    more:
      'Guests build their own drinks exactly the way they like them, the line keeps moving, and your team spends more time on the bar.',
    imageLabel: 'Guest ordering at a self-service kiosk',
    image: kioskImg.url,
  },
];

export const capabilities = [
  'Fast Order Entry',
  'Menu & Modifiers',
  'Inventory Control',
  'Loyalty & Rewards',
  'Self-Service Kiosk',
  'Reporting & Analytics',
];

export const bundle = {
  eyebrow: 'Hardware',
  title: 'Get the Cafe Bundle',
  description: '$0 hardware upfront cost with Pay As You Go.',
  primaryCta: { label: 'Book a Demo', href: '/book-demo' },
  secondaryCta: { label: 'Shop Now', href: '/shop' },
  note:
    'Terms and conditions, and restaurant qualification criteria apply. Pricing is per location per Point of Sale, excluding accessories.',
  specs: [
    {
      title: 'Built for the counter',
      body: 'Compact dual-screen terminal with built-in payments and a guest-facing display for tips and receipts.',
    },
    {
      title: 'Kiosk ready',
      body: 'Add a self-service kiosk beside the counter so guests order and pay without waiting in line.',
    },
    {
      title: 'Grows with the shop',
      body: 'Add printers, handhelds and a second location without changing platforms or retraining the team.',
    },
  ],
};