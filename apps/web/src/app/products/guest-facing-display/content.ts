// @ts-nocheck
// All copy for the Guest Facing Display product page. Edit here.

import orderReview from '@/assets/cfd-order-review.png.asset.json';
import marketing from '@/assets/cfd-marketing.png.asset.json';
import tips from '@/assets/cfd-tips.png.asset.json';

export const hero = {
  eyebrow: 'Guest Facing Display',
  title: 'Transparent Orders',
  titleAccent: 'and Easy Tipping',
  description:
    'Show every order in real time, then close it out with contactless payments, digital tips and instant receipts.',
  primaryCta: { label: 'Book a Demo', href: '/bookademo' },
  secondaryCta: { label: 'Watch Video', href: '#' },
  imageLabel: 'Guest facing display screen',
  image: null,
  stats: [
    { value: '100%', label: 'Transparent orders' },
    { value: '10x', label: 'Faster checkout' },
    { value: '24/7', label: 'Always on support' },
  ],
};

export const keyFeatures = [
  'Live order preview',
  'Contactless payments',
  'Tip suggestions',
  'Digital receipts',
];

export const features = [
  {
    id: 'reduce-order-errors',
    title: 'Reduce Order Errors',
    body:
      'Give guests a clear view of every item, modifier and total before they pay. When guests can confirm their order on the screen, mistakes are caught before they reach the kitchen.',
    more:
      'Real-time line item display means fewer remakes, fewer refunds and a smoother experience for staff and guests alike.',
    imageLabel: 'Order confirmation on guest facing display',
    image: orderReview.url,
    metrics: [
      { value: '100%', label: 'Accurate orders' },
      { value: '10x', label: 'Fewer remakes' },
    ],
  },
  {
    id: 'customer-marketing',
    title: 'Guest Marketing',
    body:
      'Turn the second screen into a marketing channel. Promote high-margin items, daily specials and loyalty offers while guests review their order.',
    more:
      'Targeted prompts and branded visuals keep your best offers visible at the exact moment guests are ready to add more.',
    imageLabel: 'Promotional offer on guest facing display',
    image: marketing.url,
    metrics: [
      { value: '100%', label: 'Real-time insights' },
      { value: '10x', label: 'Faster decisions' },
    ],
  },
  {
    id: 'increase-tips',
    title: 'Increase Tips',
    body:
      'Smart, subtle tip prompts make it easy for guests to show appreciation without pressure. Preset amounts and a custom option keep tipping frictionless.',
    more:
      'Digital tipping removes cash awkwardness and gives staff a meaningful lift on every transaction.',
    imageLabel: 'Tip selection screen',
    image: tips.url,
    metrics: [
      { value: '100%', label: 'Tip control' },
      { value: '10x', label: 'More tips' },
    ],
  },
];

export const hardware = {
  specs: [
    {
      title: 'Contactless payments',
      body: 'Accept tap, swipe and mobile wallet payments directly on the guest-facing screen.',
    },
    {
      title: 'Digital receipts',
      body: 'Email or text receipts instantly, reducing paper waste and keeping records organized.',
    },
    {
      title: 'Tip suggestions',
      body: 'Preset tip options and custom entry make tipping simple and natural for every guest.',
    },
  ],
};