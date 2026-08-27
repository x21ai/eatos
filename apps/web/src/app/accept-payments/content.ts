// @ts-nocheck
// All copy for the Payment Solutions page. Edit here.
import payCard from '@/assets/pay-card.png.asset.json';
import payTap from '@/assets/pay-tap.png.asset.json';
import payOnline from '@/assets/pay-online.png.asset.json';

export const hero = {
  eyebrow: 'Payment Solutions',
  title: 'Accept Payments',
  titleAccent: 'Anywhere',
  description:
    'A powerful cloud based processing platform built for Quick and Full Service restaurants, available on both Android and iOS devices.',
  primaryCta: { label: 'Book a Demo', href: '/bookademo' },
  secondaryCta: { label: 'Watch Video', href: '#' },
  imageLabel: 'eatOS payment terminal',
  image: null,
  stats: [
    { value: '100%', label: 'Processor agnostic' },
    { value: '10x', label: 'Faster transactions' },
    { value: '24/7', label: 'Always on support' },
  ],
};

export const keyFeatures = [
  'Online and offline modes',
  'Tap to Pay on iPhone',
  'Apple Pay and Google Pay enabled',
  'EMV and contactless card enabled',
  'Processor agnostic',
  'Third party API integration',
];

export const features = [
  {
    id: 'card-payments',
    title: 'Card Payments',
    body:
      'Accept EMV enabled card payments anywhere, whether in the dining room or on the move. eatOS software integrates with nearly all major payment processors.',
    more:
      'Chip, swipe and contactless all clear through the same flow, so your team learns one screen and nothing else changes.',
    imageLabel: 'Handheld payment terminal on the swipe card screen',
    image: payCard.url,
    metrics: [
      { value: '100%', label: 'Easier' },
      { value: '10x', label: 'Faster transaction' },
    ],
  },
  {
    id: 'tap-to-pay-on-iphone',
    title: 'Tap to Pay on iPhone',
    body:
      'Turn any supported iPhone into a payment terminal. Guests tap a contactless card, phone or watch directly on the device your server is already holding.',
    more:
      'No extra hardware to buy, nothing to charge and nothing to share across the floor. Card data is encrypted on the device and never stored in your app.',
    imageLabel: 'Guest tapping a phone on an iPhone to pay at the table',
    image: payTap.url,
    metrics: [
      { value: '2 sec', label: 'From total to approved' },
      { value: '0', label: 'Extra terminals to buy' },
    ],
  },
  {
    id: 'offline-and-online-payments',
    title: 'Offline and Online Payments',
    body:
      'Accept payments by phone offline or authorize credit and debit card transactions directly on your website.',
    more:
      'Transactions queue locally when the connection drops and sync the moment it returns, so service never stops on a bad network.',
    imageLabel: 'Point of Sale, handheld and printer hardware lineup',
    image: payOnline.url,
    metrics: [
      { value: '100%', label: 'Easy transactions' },
      { value: '100%', label: 'Flexible checkout' },
    ],
  },
];

export const hardware = {
  specs: [
    {
      title: 'Digital wallets',
      body: 'Apple Pay and Google Pay are enabled out of the box on every supported device.',
    },
    {
      title: 'Processor agnostic',
      body: 'Keep your existing processor or move to a better rate without replacing your software.',
    },
    {
      title: 'Third party API',
      body: 'Connect payments to the tools you already run through open, documented APIs.',
    },
  ],
};
