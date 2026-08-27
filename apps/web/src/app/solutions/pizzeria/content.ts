// @ts-nocheck
// All copy for the Pizzeria solution page. Edit here.
// Images are placeholders for now, set `image` to an asset url when available.

export const hero = {
  eyebrow: 'Restaurant Technology Cloud',
  title: 'Point of Sale for Pizzerias',
  description:
    'Built for pizza operations, from slice counters to delivery-heavy shops. Fast order entry with modifiers, halves and toppings, plus delivery and pickup in one system.',
  primaryCta: { label: 'Book a Demo', href: '/book-demo' },
  secondaryCta: { label: 'View Pricing', href: '/pricing' },
  imageLabel: 'Pizzeria counter setup',
  image: null,
};

export const marquee = [
  { value: '<10s', label: 'Average order entry' },
  { value: '100%', label: 'Offline capable' },
  { value: '24/7', label: 'Support included' },
  { value: '$0', label: 'Hardware upfront' },
];

export const pillars = [
  {
    id: 'builder',
    title: 'Build any pizza in seconds',
    body:
      'Halves, quarters, crusts, sizes and toppings are all fast modifiers, so staff ring in a complex custom pie without slowing the line.',
    more:
      'Pricing rules follow the build, so an extra topping on a half charges correctly every time with no manual math at the register.',
    imageLabel: 'Pizza builder on the Point of Sale',
    image: null,
    metrics: [
      { value: '1 tap', label: 'Per topping' },
      { value: '100%', label: 'Accurate pricing' },
    ],
  },
  {
    id: 'delivery',
    title: 'Delivery and pickup without the chaos',
    body:
      'Phone, web and third-party orders land in one queue, with driver dispatch and live order status so nothing gets lost between the oven and the door.',
    more:
      'Assign drivers, track runs and reconcile delivery cash and tips at close, all inside the same platform your counter runs on.',
    imageLabel: 'Delivery dispatch and order queue',
    image: null,
    metrics: [
      { value: '1', label: 'Unified queue' },
      { value: '4', label: 'Order channels' },
    ],
  },
  {
    id: 'cost',
    title: 'Control food cost per pie',
    body:
      'Recipe-level inventory tracks dough, cheese and toppings as they sell, so you see true cost per pizza instead of guessing at month end.',
    more:
      'Low-stock alerts, waste logging and vendor ordering keep prep tight on your highest volume items.',
    imageLabel: 'Recipe-level inventory reporting',
    image: null,
    metrics: [
      { value: 'Per pie', label: 'Cost visibility' },
      { value: 'Live', label: 'Stock counts' },
    ],
  },
];

export const capabilities = [
  'Pizza Builder & Modifiers',
  'Delivery & Dispatch',
  'Online Ordering',
  'Kitchen Display System',
  'Loyalty & Gift Cards',
  'Reporting & Analytics',
];

export const bundle = {
  eyebrow: 'Hardware',
  title: 'Get the Pizzeria Bundle',
  description: '$0 hardware upfront cost with Pay As You Go.',
  imageLabel: 'Pizzeria hardware bundle',
  image: null,
  primaryCta: { label: 'Book a Demo', href: '/book-demo' },
  secondaryCta: { label: 'Shop Now', href: 'https://shop.eatos.com', external: true },
  note:
    'Terms and conditions, and restaurant qualification criteria apply. Pricing is per location per Point of Sale, excluding accessories.',
  specs: [
    {
      title: 'Counter-ready',
      body: 'Dual-screen terminal with a guest-facing display and built-in payments for walk-in and phone orders.',
    },
    {
      title: 'Built for delivery',
      body: 'Handhelds and receipt printers for driver dispatch, curbside handoff and tableside payment.',
    },
    {
      title: 'Kitchen tough',
      body: 'Kitchen display screens route pies by station, so the oven line always knows what fires next.',
    },
  ],
};
