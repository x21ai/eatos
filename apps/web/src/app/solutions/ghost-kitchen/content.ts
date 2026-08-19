// @ts-nocheck
// All copy for the Ghost Kitchen solution page. Edit here.

import heroImg from '../../../assets/svc-ghost-kitchen.jpg.asset.json';
import onlineImg from './assets/gk-online.jpg.asset.json';
import kdsImg from './assets/gk-kds.jpg.asset.json';
import brandsImg from './assets/gk-brands.jpg.asset.json';

export const hero = {
  eyebrow: 'Restaurant Technology Cloud',
  title: 'Solution For Ghost Kitchens',
  description:
    'The eatOS Restaurant Technology Cloud is built for delivery-first kitchens, streamlining online orders, expanding your reach and keeping every brand under control.',
  primaryCta: { label: 'Book a Demo', href: '/book-demo' },
  secondaryCta: { label: 'View Pricing', href: '/pricing' },
  imageLabel: 'Ghost kitchen team working an eatOS order queue',
  image: heroImg.url,
};

export const marquee = [
  {
    value: 'Every channel',
    label: 'Your own app, website and marketplace orders land in one queue.',
  },
  {
    value: 'No commissions',
    label: 'White labeled ordering keeps direct sales fully your own.',
  },
  {
    value: 'Support 24/7',
    label: 'Real people on call for every shift, every day of the year.',
  },
  {
    value: 'No upfront cost',
    label: 'Hardware included with Pay As You Go, so you start today.',
  },
];

export const pillars = [
  {
    id: 'online',
    title: 'Online ordering and delivery',
    body:
      'A white labeled, commission free app and website for each brand, with delivery handled by third party drivers on orders placed directly with you.',
    more:
      'No third party commissions, multi platform support and your own branded app and web storefront.',
    imageLabel: 'Guest ordering delivery on a branded mobile app',
    image: onlineImg.url,
  },
  {
    id: 'kds',
    title: 'Kitchen Display System',
    body:
      'Improve order accuracy, cut preparation times and keep a shared kitchen moving with clear tickets on every station.',
    more:
      'Seamless connectivity, prep station routing and kitchen grade hardware built for constant service.',
    imageLabel: 'Chef reading order tickets on a kitchen display',
    image: kdsImg.url,
  },
  {
    id: 'brands',
    title: 'Run every virtual brand',
    body:
      'Manage multiple virtual brands from one kitchen, with menus, pricing and reporting separated exactly the way you need them.',
    more:
      'Delivery analytics by platform, brand and hour show what to promote and what to retire.',
    imageLabel: 'Analytics dashboard beside branded takeout packaging',
    image: brandsImg.url,
  },
];
