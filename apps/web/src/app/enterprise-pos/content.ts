// @ts-nocheck
// All copy for the Enterprise solution page. Edit here.

import platformImg from './assets/ent-platform.jpg.asset.json';
import workforceImg from './assets/ent-workforce.jpg.asset.json';
import alwaysOnImg from './assets/ent-always-on.jpg.asset.json';

export const hero = {
  eyebrow: 'Restaurant Technology Cloud',
  title: 'Point of Sale System For Enterprise',
  description:
    'Transform operations with the eatOS Enterprise Point of Sale system: streamline transactions, enhance efficiency, and get real-time insights for smarter decisions.',
  primaryCta: { label: 'Book a Demo', href: '/bookademo' },
  secondaryCta: { label: 'View Pricing', href: '/pricing' },
  imageLabel: 'Enterprise point of sale hardware',
};

export const marquee = [
  {
    value: 'One platform',
    label:
      'Every property, brand and location runs on a single connected system, with one source of truth for orders and payments.',
  },
  {
    value: 'Always on',
    label:
      'Online or offline, service keeps moving across every device, and tickets sync automatically once connectivity returns.',
  },
  {
    value: '600+ integrations',
    label:
      'Open API and Marketplace connections let you plug eatOS into the systems your enterprise already runs on.',
  },
  {
    value: 'Support 24/7',
    label:
      'Enterprise support on call around the clock, with real people who understand multi-site restaurant operations.',
  },
];

export const pillars = [
  {
    id: 'platform',
    title: 'Get everything your enterprise needs',
    body:
      'Our all-in-one food-service and restaurant management suite makes it easier to manage guests, staff, marketing, finances and the menu.',
    more:
      'It is built to help restaurant enterprises thrive efficiently, with corporate oversight and location-level control in one place.',
    imageLabel: 'Enterprise management suite',
    image: platformImg.url,
  },
  {
    id: 'workforce',
    title: 'Manage workforce',
    body:
      'Streamline the clock-in process, schedule shifts and manage payroll all in one place with eatOS.',
    more:
      'Create an easy environment for your teams to work in, so they can focus on your products and your customers.',
    imageLabel: 'Workforce scheduling and attendance',
    image: workforceImg.url,
  },
  {
    id: 'always-on',
    title: 'Keep business running',
    body:
      'No Wi-Fi? No problem. Never take a break from service with software that runs on all your devices, online or offline.',
    more:
      'Orders keep getting served without any hiccups, so your guests always get the best experience possible.',
    imageLabel: 'Offline mode service',
    image: alwaysOnImg.url,
  },
];

export const capabilities = [
  'Enterprise Point of Sale',
  'Multi-Location Management',
  'Workforce & Attendance',
  'Payments & Automation',
  'Business Intelligence',
  'Open API & Marketplace',
];

export const ecosystem = [
  {
    title: 'Operations',
    body:
      'An intelligent technology system that lets you manage revenue, front and back-office tasks, and kitchens.',
  },
  {
    title: 'Guest Journey',
    body:
      'Give guests an experience that is both tailored and contemporary, lift engagement using automation.',
  },
  {
    title: 'Payments',
    body:
      'A fully integrated payment gateway that uses automation to instantly process transactions with a click.',
  },
  {
    title: 'Business Intelligence',
    body:
      'Better understand your business with reporting and powerful analytics that show how you are performing.',
  },
  {
    title: 'Open API + Marketplace',
    body:
      'Connect custom integrations directly to eatOS, with a Marketplace of over 600 integrations with the best tech.',
  },
  {
    title: 'Point Of Sale',
    body:
      'Create a full-service frictionless guest journey and run your restaurant in every space of your properties.',
  },
];

export const bundle = {
  eyebrow: 'Hardware',
  title: 'Get the Enterprise Bundle',
  description: '$0 hardware upfront cost with Pay As You Go.',
  primaryCta: { label: 'Book a Demo', href: '/bookademo' },
  secondaryCta: { label: 'Shop Now', href: '/shop' },
  note:
    'Terms and conditions, and restaurant qualification criteria apply. Pricing is per location per Point of Sale, excluding accessories.',
  specs: [
    {
      title: 'Built for scale',
      body: 'Dual-screen terminals with built-in payments and a guest-facing display at every station.',
    },
    {
      title: 'Standardised rollouts',
      body: 'Deploy the same configuration across properties, with central control of menus and pricing.',
    },
    {
      title: 'Grows with the group',
      body: 'Add kiosks, handhelds, printers and kitchen displays across venues without changing platforms.',
    },
  ],
};