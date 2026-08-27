// @ts-nocheck
// All copy for the Gift Cards product page. Edit here.
// Images are intentionally left blank for now: the shared Placeholder renders
// an empty surface when no `image` is provided.

export const hero = {
  eyebrow: 'RESTAURANT TECHNOLOGY CLOUD',
  title: 'Gift Cards Guests',
  titleAccent: '',
  description: 'Customize your own gift card design with eatOS.',
  primaryCta: { label: 'Order Now', href: '/bookademo' },
  imageLabel: 'Custom branded eatOS gift cards',
  image: null,
  stats: [
    { value: '79¢', label: 'USD per card' },
    { value: '250', label: 'Cards per starter pack' },
    { value: '15', label: 'Business days to produce' },
  ],
};

export const keyFeatures = [
  'Physical and Digital Gift Cards',
  'Balance Tracking Across Locations',
];

export const orderPanel = {
  title: 'eatOS Custom Gift Cards',
  price: 'From 79¢ USD per card',
  body:
    'Upload your own art for the most customized card available. Packs start at 250 gift cards and take 15 business days to produce.',
  cta: { label: 'Order Now', href: '/bookademo' },
};

export const features = [
  {
    id: 'physical-and-digital',
    title: 'Physical and Digital Gift Cards',
    body:
      'Sell plastic cards at the counter and eGift cards online from the same balance system, no separate program to manage.',
    more:
      'Guests buy digital cards from your website and send them by email, while physical cards activate at the register.',
    imageLabel: 'Physical and digital gift card purchase flow',
    image: '/__l5e/assets-v1/64f101ab-bd8c-40d1-bb34-e0279fee60d8/giftcard-digital.webp',
    metrics: [
      { value: '2', label: 'Formats, One System' },
      { value: '24/7', label: 'Online Sales' },
    ],
  },
  {
    id: 'balance-tracking',
    title: 'Balance Tracking Across Locations',
    body:
      'Every card works at every location you run, with live balances and liability reporting in one dashboard.',
    more:
      'See cards sold, value redeemed and outstanding liability by location, day or campaign.',
    imageLabel: 'Custom branded gift card designs',
    image: '/__l5e/assets-v1/9dc380a1-af4e-49db-9786-509ee97743fe/giftcard-designs.png',
    metrics: [
      { value: 'All', label: 'Locations Synced' },
      { value: 'Live', label: 'Liability Reporting' },
    ],
  },
];

