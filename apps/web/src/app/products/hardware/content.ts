// @ts-nocheck
// All copy for the Hardware page. Edit here.

import posImg from './assets/poshardware.png.asset.json';
import kdsImg from './assets/kdsss.png.asset.json';
import kioskImg from './assets/hardkios.png.asset.json';
import payImg from './assets/handheld.png.asset.json';


export const hero = {
  eyebrow: 'Hardware to fit your business',
  title: 'Hardware',
  titleAccent: 'built for service',
  description:
    'Restaurant Technology Cloud is an all-in-one restaurant management solution built for every type of restaurant, including yours.',
  primaryCta: { label: 'Book a Demo', href: '/bookademo' },
  secondaryCta: { label: 'Watch Video', href: '/bookademo' },
  imageLabel: 'eatOS hardware lineup',
  stats: [
    { value: '10x', label: 'Faster transactions' },
    { value: '100%', label: 'Automated workflow' },
    { value: '24/7', label: 'Always on support' },
  ],
};

export const keyFeatures = [
  'Point of Sale',
  'Kitchen Display System',
  'Self Ordering Kiosk',
  'Payment Acceptance',
];

export const features = [
  {
    id: 'point-of-sale',
    title: 'Point of Sale',
    body:
      'Transform your restaurant with cutting-edge hardware. Tailored eatOS configurations are designed to optimize ordering, payment and management, boosting speed and enhancing the dining experience.',
    more:
      'Counter, screens and mobile setups all run the same eatOS software, menus, staff, reporting stay in sync across every station.',
    imageLabel: 'eatOS Point of Sale terminal',
    image: posImg.url,
    metrics: [
      { value: '10x', label: 'Faster Transaction' },
      { value: '100%', label: 'Automated' },
    ],
  },
  {
    id: 'kitchen-display-system',
    title: 'Kitchen Display System',
    body:
      'Boost efficiency with our kitchen ticket system. Connect multiple kitchen displays for real-time updates so prep, fire and expo work from one source of truth.',
    more:
      'Sealed, fanless displays stay readable through heat and steam, and mount on a wall, pole or under a shelf with touch.',
    imageLabel: 'Kitchen display showing live kitchen tickets',
    image: kdsImg.url,
    metrics: [
      { value: '100%', label: 'Real-Time Orders' },
      { value: '10x', label: 'Error-Free Orders' },
    ],
  },
  {
    id: 'self-ordering-kiosk',
    title: 'Self Ordering Kiosk',
    body:
      'Boost guest satisfaction with our self-ordering kiosks. Seamless integration with eatOS Point of Sale and Kitchen Display ensures fast, accurate orders.',
    more:
      'Kiosk, freestanding and wall-mount formats let guests browse, customize and pay on their own while your team stays on food.',
    imageLabel: 'Self ordering kiosk',
    image: kioskImg.url,
    metrics: [
      { value: '100%', label: 'Precise' },
      { value: '100%', label: 'Integrated' },
    ],
  },
  {
    id: 'payment-acceptance',
    title: 'Payment Acceptance',
    body:
      'Protect your guests data with compact, robust card readers. Industry-leading security keeps transactions safe and gives you peace of mind.',
    more:
      'EMV chip, tap and swipe in one device, with encrypted, PCI compliant processing at the counter or at the table.',
    imageLabel: 'Handheld card reader',
    image: payImg.url,
    metrics: [
      { value: '10x', label: 'Safer' },
      { value: '100%', label: 'Secured' },
    ],
  },

];

export const hardware = {
  eyebrow: 'Hardware',
  title: 'Built for the floor, not the desk',
  description:
    'Commercial-grade devices chosen for constant use, with the mounts, power and connectivity a working restaurant needs.',
  specs: [
    {
      title: 'Commercial-grade build',
      body: 'Sealed, spill-resistant enclosures and tempered glass rated for heat, steam and heavy daily use.',
    },
    {
      title: 'Always online',
      body: 'Wired, WiFi and cellular fallback keep terminals taking orders even when the network wobbles.',
    },
    {
      title: 'One platform',
      body: 'Every device reads the same menu, staff list and reporting from the eatOS cloud.',
    },
  ],
};
