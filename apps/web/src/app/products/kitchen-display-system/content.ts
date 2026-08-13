// @ts-nocheck
// All copy + metrics for the Kitchen Display System page. Edit here.

import heroAsset from './assets/kds-hero.jpg.asset.json';
import prepAsset from './assets/prep-routing-ui.png.asset.json';
import multiLingualAsset from './assets/multilingual-ui.png.asset.json';
import connectivityAsset from './assets/connectivity-ui.png.asset.json';
import hardwareAsset from './assets/kitchen-grade-hardware.jpg.asset.json';
import printingAsset from './assets/printing-ui.png.asset.json';
import analyticsAsset from './assets/analytics.jpg.asset.json';
import hardwareLineAsset from './assets/hardware-line.jpg.asset.json';

export const hero = {
  eyebrow: 'Kitchen Display System',
  title: 'Chaos, controlled.',
  description:
    'The digital command center that keeps your kitchen in sync, prep, fire and serve without missing a ticket.',
  primaryCta: { label: 'Book a Demo', href: '/book-demo' },
  secondaryCta: { label: 'Watch Video', href: '/book-demo' },
  image: heroAsset.url,
};

export const keyFeatures = [
  'Prep Station Routing',
  'Multi-Lingual Support',
  'Seamless Connectivity',
  'Save on Printing',
];

// Quiet numeral row directly under the hero.
export const marquee = [
  { value: '10x', label: 'Error-free orders' },
  { value: '100%', label: 'Real-time tickets' },
  { value: '5 yrs', label: 'Peak-tested hardware' },
  { value: '24/7', label: 'Cloud reporting' },
];

export const hardware = {
  eyebrow: 'Hardware',
  title: 'Built for the line, not the desk',
  description:
    'Sealed, fanless displays with tempered glass that stay readable through heat, steam and a full dinner service.',
  imageLabel: 'Kitchen-grade display',
  image: hardwareLineAsset.url,
  specs: [
    {
      title: 'Sealed enclosure',
      body: 'Spill and grease resistant with no fan pulling air through the chassis.',
    },
    {
      title: 'Any mount',
      body: 'Wall, pole or under-shelf, driven by touch or a bump bar.',
    },
    {
      title: 'Readable at range',
      body: 'High-brightness tempered glass that stays legible from across the pass.',
    },
  ],
};

export const features = [
  {
    id: 'prep-station-routing',
    title: 'Prep Station Routing',
    metrics: [
      { value: '10x', label: 'Error-Free Orders' },
      { value: '100%', label: 'Real-Time Orders' },
    ],
    body:
      'Route every item to the station that cooks it. Tickets appear the moment they are sent, so cold, hot and expo lines work from the same source of truth instead of a stack of paper.',
    more:
      'Course firing, hold-and-release timing and per-station prep rules keep long-cook items in sync with quick plates, so a table is finished together rather than one dish at a time.',
    imageLabel: 'KDS station routing view',
    image: prepAsset.url,
  },
  {
    id: 'multi-lingual-support',
    title: 'Multi-Lingual Support',
    metrics: [
      { value: '100%', label: 'Multilingual Service' },
      { value: '10x', label: 'More Language Options' },
    ],
    body:
      'Every member of your team reads tickets in the language they think in. Front of house writes it once and the kitchen sees it translated on screen.',
    more:
      'Language is set per display, not per venue, so a single kitchen can run different languages at different stations without changing your menu data.',
    imageLabel: 'Multi-language ticket board',
    image: multiLingualAsset.url,
  },
  {
    id: 'seamless-connectivity',
    title: 'Seamless Connectivity',
    metrics: [
      { value: '100%', label: 'All-In-One Solution' },
      { value: '100%', label: 'Guest-Driven' },
    ],
    body:
      'Dine-in, counter, kiosk, handheld, web and delivery orders land on the same board. One queue, one prioritization, no channel left unwatched.',
    more:
      'Because the KDS shares the eatOS data layer with POS, online ordering and inventory, an item that runs out disappears from every ordering surface at once.',
    imageLabel: 'Connected devices overview',
    image: connectivityAsset.url,
  },
  {
    id: 'kitchen-grade-hardware',
    title: 'Kitchen-Grade Hardware',
    metrics: [
      { value: '5', label: 'Years Peak-Tested' },
      { value: '100%', label: 'Grease Resistant' },
    ],
    body:
      'Built for heat, steam and speed. Sealed, spill-resistant displays with tempered glass that reads clearly from across the line.',
    more:
      'Mount it on the wall, on a pole or under a shelf, and drive it with a bump bar or touch. Fanless construction means no grease pulled through the chassis.',
    imageLabel: 'Kitchen-grade display hardware',
    image: hardwareAsset.url,
  },
  {
    id: 'save-on-printing',
    title: 'Save on Printing',
    metrics: [
      { value: '100%', label: 'Smart Savings' },
      { value: '24/7', label: 'Digital Shift' },
    ],
    body:
      'Retire the ticket printer. No more paper, ribbon and jammed rolls in the middle of a rush, and no lost tickets under the pass.',
    more:
      'Every ticket stays searchable after service, so voids, remakes and delays can be reviewed instead of guessed at.',
    imageLabel: 'Digital ticket queue',
    image: printingAsset.url,
  },
  {
    id: 'analytics-reporting',
    title: 'Analytics & Reporting',
    metrics: [
      { value: '100%', label: 'Cloud Driven' },
      { value: '100%', label: 'Data Driven' },
    ],
    body:
      'Track ticket times by station, item and daypart. See where the line slows down and staff against what actually happened, not what you remember.',
    more:
      'Reports roll up across locations, so a multi-unit operator can compare kitchens on the same measures from one dashboard.',
    imageLabel: 'Kitchen performance dashboard',
    image: analyticsAsset.url,
  },
];

export const offers = [
  {
    title: 'Get Your Own Kitchen Display System',
    description: 'AI-enabled hardware for cloud-based restaurant management.',
    cta: { label: 'Shop Now', href: '/shop' },
    imageLabel: 'KDS bundle',
  },
  {
    title: 'Make Your Own Custom Bundle',
    description: 'Customize your hardware and all-in-one restaurant technology.',
    cta: { label: 'Shop Now', href: '/shop' },
    imageLabel: 'Custom hardware bundle',
  },
];

export const offerNote =
  'Terms and conditions apply. Product availability, pricing and specifications are subject to change. Contact sales for current configurations.';

export const cloudProducts = [
  { title: 'Point of Sale', href: '/point-of-sale' },
  { title: 'Online Ordering', href: '/products/apponlineorderingdelivery' },
  { title: 'Workforce Management', href: '/products/workforce-management' },
  { title: 'Kitchen Display System', href: '/products/kitchen-display-system' },
  { title: 'Front of House', href: '/products/tableside-order-and-pay' },
  { title: 'Reporting & Analytics', href: '/products/reporting-analytics' },
];

export const testimonial = {
  quote:
    'eatOS did all of the work every single time we used their system. Everything ran smoothly and our team picked it up in a single shift.',
  name: 'Mr. Paolo',
  role: 'Owner, Los Tacos Al Pastor',
  since: 'Customer since 2022',
  imageLabel: 'Customer video still',
};