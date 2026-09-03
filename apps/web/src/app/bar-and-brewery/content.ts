// @ts-nocheck
// All copy for the Bar & Nightclub solution page. Edit here.

import heroImg from './assets/bar-hero-v2.jpg.asset.json';
import tabsImg from './assets/bar-tabs-new.png.asset.json';
import inventoryImg from './assets/bar-inventory-new.jpg.asset.json';
import handheldImg from './assets/bar-handheld-new.png.asset.json';

export const hero = {
  eyebrow: 'Restaurant Technology Cloud',
  title: 'Bar Point of Sale',
  description:
    'A powerful Point of Sale system for bars and nightclubs. Built to keep tabs moving, drinks pouring, and payments clearing from the first round to last call.',
  primaryCta: { label: 'Book a Demo', href: '/bookademo' },
  secondaryCta: { label: 'View Pricing', href: '/pricing' },
  imageLabel: 'Bartender working an eatOS terminal at the rail',
  image: heroImg.url,
};

export const marquee = [
  {
    value: 'Tabs in a tap',
    label: 'Open, transfer and close tabs in seconds, with card on file for the whole night.',
  },
  {
    value: 'Everyone in sync',
    label: 'Bartenders, servers and the door share one live view of every open check.',
  },
  {
    value: 'Support 24/7',
    label: 'Real people on call through every late shift, every night of the year.',
  },
  {
    value: 'No upfront cost',
    label: 'Hardware included with Pay As You Go, so you start fast and grow at your pace.',
  },
];

export const pillars = [
  {
    id: 'tabs',
    title: 'Tab management built for the rail',
    body:
      'Open a tab with a tap, keep the card securely on file, and let any bartender add to it from any station. Pre-authorize, split rounds, transfer to tables, and close out in seconds.',
    more:
      'Every tab lives on one platform, so your team always sees who owes what. Tips, splits and reprints are handled at the terminal or on a handheld, so bartenders stay focused on drinks.',
    imageLabel: 'Bartender closing out a tab on a terminal',
    image: tabsImg.url,
  },
  {
    id: 'inventory',
    title: 'Real-time inventory behind the bar',
    body:
      'Track kegs, bottles and mixers as they pour, so you know what is running low before a guest orders it. Recipes tie every cocktail back to its pours, and variance shows up as it happens.',
    more:
      'Set par levels, get low-stock alerts and build purchase orders from live counts. Compare pours to sales by shift and spot over-pouring early to protect your margins.',
    imageLabel: 'Back bar shelves and inventory on a tablet',
    image: inventoryImg.url,
  },
  {
    id: 'handheld',
    title: 'Handheld ordering and payment',
    body:
      'Take orders, open tabs and accept payments without leaving the rail. A handheld terminal keeps bartenders face-to-face with guests, so service stays personal and the line never stalls.',
    more:
      'Tap, insert, swipe or contactless payments settle on the spot, tips are prompted automatically, and every transaction posts straight to the tab. The best bartenders stay on the floor with a device.',
    imageLabel: 'Bartender tapping a card on a handheld at the rail',
    image: handheldImg.url,
  },
];