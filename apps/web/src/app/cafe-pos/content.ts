// @ts-nocheck
// All copy for the Cafe solution page. Edit here.

import heroImg from './assets/cafe-hero-v2.jpg.asset.json';
import connectImg from './assets/cafe-connect-2.png.asset.json';
import teamImg from './assets/cafe-team-2.jpg.asset.json';
import kioskImg from './assets/cafe-kiosk-2.png.asset.json';

export const hero = {
  eyebrow: 'Restaurant Technology Cloud',
  title: 'Point of Sale for Cafes',
  description:
    'Easy to learn and built for bustling cafes. Menu and inventory control keep complex orders fast, while reporting and loyalty bring guests back every morning.',
  primaryCta: { label: 'Book a Demo', href: '/bookademo' },
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
      'Keep every employee and device in sync, from the counter to the kitchen and back office, with orders and payments that travel instantly across the floor.',
    more:
      'From a two-person espresso bar to a full staff cafe, setup is simple and training is fast, so orders keep flowing even when the line reaches the door.',
    imageLabel: 'Cafe counter with a connected terminal',
    image: connectImg.url,
  },
  {
    id: 'team',
    title: 'Employee management made easy',
    body:
      'Schedule shifts, run payroll and track time and attendance in one place, so your team can focus on greeting guests and crafting drinks.',
    more:
      'Staff clock in, swap shifts and view schedules from their phones, giving managers labor costs and coverage at a glance.',
    imageLabel: 'Manager reviewing the schedule on a tablet',
    image: teamImg.url,
  },
  {
    id: 'kiosk',
    title: 'Speed things up with our Kiosk',
    body:
      'Add a Kiosk beside the counter and send orders straight from guests to baristas. Guests tap through modifiers and pay without slowing the line.',
    more:
      'Orders sync to the kitchen display and reporting instantly, so your team stays on the bar, sales and inventory stay accurate all day.',
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
  primaryCta: { label: 'Book a Demo', href: '/bookademo' },
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