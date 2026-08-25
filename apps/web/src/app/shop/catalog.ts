// @ts-nocheck
// Shop catalog. Later this module is swapped for typed API responses
// when real checkout is wired up.

export interface Money {
  amount: number;
  currency: string;
}

export interface ProductOption {
  id: string;
  label: string;
  values: { id: string; label: string; priceDelta?: number }[];
}

export interface ShopProduct {
  slug: string;
  name: string;
  category: string;
  badge?: string;
  tagline: string;
  description: string;
  price: Money;
  monthlyFrom?: string;
  image: string;
  options: ProductOption[];
  highlights: string[];
  specs: { label: string; value: string }[];
  inTheBox: string[];
  compatibility: string[];
}

export const catalog: ShopProduct[] = [
  {
    slug: 'pro',
    name: 'eatOS Pro',
    category: 'Countertop Terminal',
    badge: 'Best Seller',
    tagline: 'The flagship terminal. Built for peak hours.',
    description:
      'A milled aluminum countertop Point of Sale with a 15.6 inch operator display and a dedicated customer facing display. Offline-first, dark mode native, and fast enough for your busiest Friday night.',
    price: { amount: 999, currency: 'USD' },
    monthlyFrom: '$83.25/mo. for 12 mo.',
    image: '/images/shop/pro-dark.jpg',
    options: [
      {
        id: 'finish',
        label: 'Finish',
        values: [
          { id: 'black', label: 'Midnight Black' },
          { id: 'silver', label: 'Silver Aluminum' },
        ],
      },
      {
        id: 'display',
        label: 'Customer Display',
        values: [
          { id: 'single', label: 'Operator display only' },
          { id: 'dual', label: 'Add customer facing display', priceDelta: 199 },
        ],
      },
    ],
    highlights: [
      '15.6 inch full HD touchscreen with anti-glare glass',
      'Dedicated customer facing display option',
      'Offline-first: keep selling through any outage',
      'Integrated payments: tap, chip, and swipe',
      'Whisper-quiet fanless design',
    ],
    specs: [
      { label: 'Display', value: '15.6 in, 1920 x 1080, capacitive touch' },
      { label: 'Processor', value: 'Octa-core, 2.4 GHz' },
      { label: 'Memory', value: '8 GB RAM, 128 GB storage' },
      { label: 'Connectivity', value: 'Wi-Fi 6, Ethernet, Bluetooth 5.2' },
      { label: 'Payments', value: 'NFC tap, EMV chip, magstripe' },
      { label: 'Ports', value: '4x USB-A, 1x USB-C, cash drawer port' },
    ],
    inTheBox: [
      'eatOS Pro terminal',
      'Power adapter and cable',
      'Cash drawer cable',
      'Quick start guide',
    ],
    compatibility: [
      'Kitchen Display System',
      'Customer Facing Display',
      'Thermal printers and cash drawers',
      'All eatOS software products',
    ],
  },
  {
    slug: 'mini',
    name: 'eatOS Mini',
    category: 'Handheld',
    badge: 'New',
    tagline: 'A full size Point of Sale in your hand.',
    description:
      'The eatOS handheld: take orders tableside, fire to the kitchen, and accept contactless payment anywhere on the floor. All-day battery in a spill resistant body.',
    price: { amount: 299, currency: 'USD' },
    monthlyFrom: '$24.92/mo. for 12 mo.',
    image: '/images/shop/mini-dark.jpg',
    options: [
      {
        id: 'finish',
        label: 'Finish',
        values: [
          { id: 'black', label: 'Midnight Black' },
          { id: 'white', label: 'Cloud White' },
        ],
      },
      {
        id: 'storage',
        label: 'Storage',
        values: [
          { id: '64', label: '64 GB' },
          { id: '128', label: '128 GB', priceDelta: 50 },
        ],
      },
    ],
    highlights: [
      '6.5 inch edge-to-edge touchscreen',
      'All-day battery: up to 14 hours',
      'Spill and drop resistant for the floor',
      'Built-in contactless and chip payments',
      'Fire orders to the kitchen instantly',
    ],
    specs: [
      { label: 'Display', value: '6.5 in, 2340 x 1080, capacitive touch' },
      { label: 'Battery', value: '5,000 mAh, up to 14 hours' },
      { label: 'Durability', value: 'IP54 spill resistant, 1.2 m drop rated' },
      { label: 'Connectivity', value: 'Wi-Fi 6, Bluetooth 5.2, optional 4G LTE' },
      { label: 'Payments', value: 'NFC tap, EMV chip' },
      { label: 'Weight', value: '395 g' },
    ],
    inTheBox: [
      'eatOS Mini handheld',
      'USB-C charging cable',
      'Charging dock',
      'Quick start guide',
    ],
    compatibility: [
      'Point of Sale',
      'Kitchen Display System',
      'Tableside Order & Pay',
      'All eatOS software products',
    ],
  },
];

export function getProduct(slug: string): ShopProduct | null {
  return catalog.find((p) => p.slug === slug) || null;
}

export function formatMoney(m: Money): string {
  return `$${m.amount.toLocaleString('en-US')}`;
}

export function unitPrice(product: ShopProduct, selections: Record<string, string>): number {
  let total = product.price.amount;
  for (const opt of product.options) {
    const val = opt.values.find((v) => v.id === selections[opt.id]);
    if (val?.priceDelta) total += val.priceDelta;
  }
  return total;
}
