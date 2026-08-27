// @ts-nocheck
import heroImg from './assets/comparison-hero.jpg.asset.json';
import whyImg from './assets/comparison-why.webp.asset.json';
import easeImg from './assets/comparison-ease.png.asset.json';
import scalableImg from './assets/comparison-scalable-v3.png.asset.json';

export const hero = {
  eyebrow: 'eatOS vs Other Point of Sale',
  title: 'eatOS Restaurant Cloud: Complete Comparison',
  description:
    'Equipped with essential tools, eatOS empowers you to connect with customers and expand your business, both in-person and online.',
  primaryCta: { label: 'Book a Demo', href: '/bookademo' },
  secondaryCta: { label: 'View Pricing', href: '/pricing' },
  media: 'eatOS Point of Sale terminals',
  mediaSrc: heroImg.url,
};

export const highlights = [
  'AI-enabled integration built for restaurants',
  'All-in-one Point of Sale, kitchen, kiosk, and workforce platform',
  'Offline mode plus 4G backup and hotspot capability',
  'Works with multiple payment processors',
];

export const whySwitchMedia = {
  label: 'eatOS platform overview',
  src: whyImg.url,
};

export const whySwitch = [
  {
    title: 'Comprehensive Integration',
    body: 'eatOS integrates with restaurant operations, offering a user-friendly solution to streamline and simplify management.',
    link: { label: 'Learn more about eatOS integrations', href: '/platform' },
  },
  {
    title: 'User-Friendly Experience',
    body: 'Restaurant owners and staff will find a user-friendly experience with a clear interface and powerful capabilities.',
    link: { label: 'Learn more about eatOS products', href: '/products' },
  },
  {
    title: 'Robust Feature Set',
    body: 'From every management to customer engagement, eatOS offers a comprehensive suite of tools to run your restaurant.',
    link: { label: 'Learn more about eatOS Point of Sale', href: '/pointofsale' },
  },
  {
    title: 'Unparalleled Support',
    body: 'Receive unparalleled 24/7 customer support to maximize eatOS potential for your business, ensuring assistance whenever needed.',
    link: { label: 'Learn more about eatOS', href: '/about-eatos' },
  },
];

export const competitors = [
  'eatOS',
  'Square',
  'Toast',
  'Lightspeed',
  'SpotOn',
  'TouchBistro',
  'Revel',
  'Micros',
];

// order matches `competitors` minus eatOS (which is always true)
export const matrix = [
  { feature: 'AI Enabled Integration', support: [false, false, false, false, false, false, false] },
  { feature: 'Point of Sale with Menu Management', support: [true, true, true, true, true, true, true] },
  { feature: 'Real-time Cloud Reporting', support: [true, true, true, true, true, true, true] },
  { feature: 'Order Online', support: [true, true, true, true, true, true, false] },
  { feature: 'Multi-Location', support: [false, true, true, true, false, true, true] },
  { feature: 'Pay at Table', support: [true, true, true, true, true, false, false] },
  { feature: 'Kitchen Display Screen', support: [true, true, true, true, false, false, false] },
  { feature: 'Self-Service Kiosk', support: [false, true, true, true, false, false, true] },
  { feature: 'Multi-device/Offline Mode', support: [true, true, true, true, false, true, false] },
  { feature: 'Workforce Management & Scheduling App', support: [false, false, false, false, false, false, true] },
  { feature: 'Works with Multiple Payment Processors', support: [false, false, false, false, true, false, false] },
  { feature: '4G Backup + Hotspot Capability', support: [false, false, false, false, false, false, false] },
];

export const trademarkNote =
  'Disclaimer: All trademarks, logos and brand names are the property of their respective owners. All company, product and service names used on this website are for identification purposes only.';

export const reasons = [
  {
    title: 'Ease of Use',
    body: 'Enjoy an effortlessly intuitive experience with the eatOS user-friendly interface, designed for seamless navigation and interaction. Our platform incorporates cutting-edge AI-generated menu generation, report generation and communication strategy, ensuring a smooth and efficient user journey. Experience the convenience of technology working in harmony with your needs, made every interaction not just easy but also smart and tailored to your preferences.',
    media: 'eatOS dashboard with AI menu generation',
    mediaSrc: easeImg.url,
  },
  {
    title: 'Scalable',
    body: 'eatOS streamlines operations for businesses of all sizes. Additionally, its scalable Pay-As-You-Go payment model offers financial flexibility, allowing businesses to adapt their usage and costs as needed. This combination of advanced functionalities, ease of use, and a flexible payment structure makes eatOS a top choice for businesses looking to enhance their point of sale experience and streamline their operations.',
    media: 'eatOS analytics on tablet',
    mediaSrc: scalableImg.url,
  },
];

export const ecosystem = [
  { title: 'Point of Sale', href: '/pointofsale' },
  { title: 'Online Ordering', href: '/products/apponlineorderingdelivery' },
  { title: 'Workforce Management', href: '/products/workforce-management' },
  { title: 'Kitchen Display System', href: '/products/kitchen-display-system' },
  { title: 'Point of Purchase', href: '/products/point-of-purchase' },
];
