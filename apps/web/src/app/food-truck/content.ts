// @ts-nocheck
// All copy for the Food Truck solution page. Edit here.

import heroImg from '@/assets/svc-food-truck.jpg.asset.json';
import speedImg from './assets/truck-speed-new.png.asset.json';
import costsImg from './assets/truck-costs-new.jpg.asset.json';
import loyaltyImg from './assets/truck-loyalty-new.jpg.asset.json';

export const hero = {
  eyebrow: 'Restaurant Technology Cloud',
  title: 'Solution For Food Trucks',
  description:
    'Built for a mobile, space-conscious business, the eatOS food truck Point of Sale matches the pace of your service and clears long queues fast.',
  primaryCta: { label: 'Book a Demo', href: '/bookademo' },
  secondaryCta: { label: 'View Pricing', href: '/pricing' },
  imageLabel: 'Food truck team serving guests on an eatOS terminal',
  image: heroImg.url,
};

export const marquee = [
  {
    value: 'Park anywhere',
    label: 'Compact hardware and cellular ready setup travel with your truck.',
  },
  {
    value: 'Queues moving',
    label: 'Quick keys and fast payments keep the window turning over.',
  },
  {
    value: 'Support 24/7',
    label: 'Real people on call for every service, every day of the year.',
  },
  {
    value: 'No upfront cost',
    label: 'Hardware included with Pay As You Go, so you start today.',
  },
];

export const pillars = [
  {
    id: 'speed',
    title: 'Lightning-fast transactions',
    body:
      'Order processing that keeps up with the rush, minimizes wait times, and makes every guest experience as swift as it is satisfying.',
    more:
      'Quick keys, saved modifiers and tap payments cut taps at the window so the line never stalls.',
    imageLabel: 'Staff taking an order at a food truck window',
    image: speedImg.url,
  },
  {
    id: 'costs',
    title: 'Time and cost savings',
    body:
      'Automated order processing and inventory tracking streamline your prep, protect margins, and cut the waste that eats your day.',
    more:
      'Live counts, low-stock alerts and simple purchasing keep your small kitchen stocked without over-ordering.',
    imageLabel: 'Inventory on a tablet inside a food truck kitchen',
    image: costsImg.url,
  },
  {
    id: 'loyalty',
    title: 'Keep them coming back for more',
    body:
      'More than order taking, eatOS crafts a convenient experience so every visit leaves a lasting, positive impression.',
    more:
      'Digital receipts, loyalty and offers travel with your guests to whichever corner you park on next.',
    imageLabel: 'Guest tapping a phone to pay at a food truck counter',
    image: loyaltyImg.url,
  },
];
