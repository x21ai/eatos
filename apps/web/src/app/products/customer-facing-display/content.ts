// @ts-nocheck
// All copy for the Customer Facing Display product page. Edit here.
// Images are intentionally left blank for now: the shared Placeholder renders
// an empty surface when no `image` is provided.

export const hero = {
  eyebrow: 'Customer Facing Display',
  title: 'Transparent Order Viewing',
  titleAccent: 'and Tips for Customers',
  description:
    'Enhance transparency through real-time ordering, and elevate service with contactless payments, digital tips, electronic receipts, and smartphone transactions. Revolutionize customer experiences for optimal convenience and engagement.',
  primaryCta: { label: 'Book a Demo', href: '/book-demo' },
  secondaryCta: { label: 'Watch Video', href: '#' },
  imageLabel: 'Customer facing display screen',
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
  'Customer signatures',
  'Transparent totals',
];

export const features = [
  {
    id: 'reduce-order-errors',
    title: 'Reduce Order Errors',
    body:
      'Give guests a clear view of every item, modifier and total before they pay. When customers can confirm their order on the screen, mistakes are caught before they reach the kitchen.',
    more:
      'Real-time line item display means fewer remakes, fewer refunds and a smoother experience for staff and guests alike.',
    imageLabel: 'Order confirmation on customer facing display',
    image: null,
    metrics: [
      { value: '100%', label: 'Accurate orders' },
      { value: '10x', label: 'Fewer remakes' },
    ],
  },
  {
    id: 'customer-marketing',
    title: 'Customer Marketing',
    body:
      'Turn the second screen into a marketing channel. Promote high-margin items, daily specials and loyalty offers while guests review their order.',
    more:
      'Targeted prompts and branded visuals keep your best offers visible at the exact moment guests are ready to add more.',
    imageLabel: 'Promotional offer on customer facing display',
    image: null,
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
    image: null,
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
