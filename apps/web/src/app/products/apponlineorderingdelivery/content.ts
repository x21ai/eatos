// @ts-nocheck
// All copy for the Online Ordering & Delivery product page. Edit here.
// Images are intentionally left blank for now: the shared Placeholder renders
// an empty surface when no `image` is provided.

export const hero = {
  eyebrow: 'App Online Ordering & Delivery',
  title: 'OrderOS: Your Own',
  titleAccent: 'Online Ordering App',
  description:
    'Your own branded ordering app and website, built for order ahead, pickup and delivery. Keep the guest relationship, keep the data and keep the margin.',
  primaryCta: { label: 'Book a Demo', href: '/book-demo' },
  secondaryCta: { label: 'View Pricing', href: '/pricing' },
  imageLabel: 'Branded ordering app on a phone',
  image: null,
  stats: [
    { value: '0%', label: 'App commission' },
    { value: '100%', label: 'Your guest data' },
    { value: '24/7', label: 'Always on support' },
  ],
};

export const keyFeatures = [
  'White-Labeled App and Web',
  'Customer Profile',
  'Multi-Platform Support',
  'QR Code Scan Ordering',
  'Real-Time MenuSync',
  'No 3rd Party Commissions',
];

export const features = [
  {
    id: 'white-labeled-app-and-web',
    title: 'White-Labeled App and Web',
    body:
      'Launch an ordering app and website that carry your name, your menu and your look, not a marketplace listing you share with every other restaurant nearby.',
    more:
      'Orders land straight on the POS and the kitchen display, so nothing has to be retyped during a rush.',
    imageLabel: 'White-labeled ordering app',
    image: null,
    metrics: [
      { value: '100%', label: 'Direct Connection' },
      { value: '10x', label: 'Brand Presence' },
    ],
  },
  {
    id: 'customer-profile',
    title: 'Customer Profile',
    body:
      'Every order builds a guest profile with contact details, favorites and order history, so you can bring people back instead of paying to reach them again.',
    more:
      'Profiles sync with loyalty and marketing, and payment details stay tokenized and secure.',
    imageLabel: 'Guest profile and order history',
    image: null,
    metrics: [
      { value: '10x', label: 'Secured Transactions' },
      { value: '100%', label: 'Safe Storage' },
    ],
  },
  {
    id: 'no-third-party-commissions',
    title: 'No 3rd Party Commissions',
    body:
      'Take orders on your own channel and keep the full ticket. No per order cut, no bidding for placement, no surprise fees at the end of the month.',
    more:
      'Delivery still works through your own drivers or an integrated partner, on your terms.',
    imageLabel: 'Commission free order summary',
    image: null,
    metrics: [
      { value: '0%', label: 'App Commission' },
      { value: '100%', label: 'Order Value Kept' },
    ],
  },
];

export const offerNote =
  'Terms and conditions, and restaurant qualification criteria apply. Pricing is per location per device, excluding accessories, taxes and shipping.';

export const hardware = {
  specs: [
    {
      title: 'Any device, one menu',
      body: 'Guests order from iOS, Android or the web, and every channel reads the same live menu.',
    },
    {
      title: 'Menus that stay in sync',
      body: 'Update a price or mark an item out of stock once and it changes everywhere instantly.',
    },
    {
      title: 'Secure by design',
      body: 'Tokenized payments and role based access keep guest and order data protected.',
    },
  ],
};
