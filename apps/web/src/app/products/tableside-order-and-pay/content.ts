// @ts-nocheck
// All copy for the Tableside Order & Pay product page. Edit here.
// Images are intentionally left blank for now: the shared Placeholder renders
// an empty surface when no `image` is provided.

export const hero = {
  eyebrow: 'Tableside Order & Pay',
  title: 'Order and Pay from',
  titleAccent: 'Any Table',
  description:
    'Guests scan a QR code and order from their phone. No app download required. Orders land directly in the Point of Sale and kitchen so your team stays focused on service.',
  primaryCta: { label: 'Book a Demo', href: '/book-demo' },
  secondaryCta: { label: 'Watch Video', href: '#' },
  imageLabel: 'Guest scanning QR code at table',
  image: null,
  stats: [
    { value: '30%', label: 'Faster turnover' },
    { value: '100%', label: 'Contactless' },
    { value: '24/7', label: 'Always on service' },
  ],
};

export const keyFeatures = [
  'Real-Time MenuSync',
  'Merchant Platform',
  'Customizable Features',
  'Real Menu, No Ugly PDFs',
  'Dynamic Payment Options',
  'Order and Pay From Smartphone',
];

export const features = [
  {
    id: 'merchant-platform',
    title: 'Merchant Platform',
    body:
      'Run every order through a single, cloud-connected merchant platform. Transactions, tips, refunds, and reconciliation flow into one dashboard so you never chase payments across systems.',
    more:
      'Whether guests pay tableside or at the counter, the experience is the same: secure, fast, and automatically tied to the right check.',
    imageLabel: 'Merchant platform dashboard',
    image: null,
    metrics: [
      { value: '100%', label: 'Unified reporting' },
      { value: '2x', label: 'Faster reconciliation' },
    ],
  },
  {
    id: 'customizable-features',
    title: 'Customizable Features',
    body:
      'Match the tableside experience to your brand and service style. Customize menus, modifiers, order flows, and upsell prompts so guests see exactly what you want them to see.',
    more:
      'From dietary tags to combo builders, configure the rules once and apply them across every table and every location.',
    imageLabel: 'Customizable tableside ordering',
    image: null,
    metrics: [
      { value: '100%', label: 'Brand control' },
      { value: '10x', label: 'More options' },
    ],
  },
  {
    id: 'real-menu-no-pdfs',
    title: 'Real Menu, No Ugly PDFs',
    body:
      'Replace static PDF menus with a live, interactive menu that looks great on every phone. Guests browse photos, descriptions, and prices that update the moment you change them in the Point of Sale.',
    more:
      'Sold-out items disappear automatically. New specials appear instantly. No reprinting, no outdated PDFs.',
    imageLabel: 'Interactive digital menu on phone',
    image: null,
    metrics: [
      { value: '100%', label: 'User friendly' },
      { value: '100%', label: 'More profitable' },
    ],
  },
  {
    id: 'dynamic-payment-options',
    title: 'Dynamic Payment Options',
    body:
      'Let guests pay the way they want. Split checks, add tips, and settle with cards, mobile wallets, or contactless, all without leaving the table.',
    more:
      'Payments are encrypted, tip entry is smooth, and every transaction posts directly to the check in real time.',
    imageLabel: 'Dynamic payment options on phone',
    image: null,
    metrics: [
      { value: '10x', label: 'More payment options' },
      { value: '100%', label: 'Flexible' },
    ],
  },
];

export const hardware = {
  specs: [
    {
      title: 'Real-Time MenuSync',
      body: 'Menus, prices, and availability update instantly across every table and every location from a single source.',
    },
    {
      title: 'Order and Pay From Smartphone',
      body: 'Guests scan, order, and pay on their own phone. No app download, no sign-up friction, and no extra hardware.',
    },
    {
      title: 'Secure by Default',
      body: 'Encrypted payments and PCI-compliant tokenization keep guest data and transaction details safe.',
    },
  ],
};
