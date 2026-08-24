// @ts-nocheck
// All copy for the Point of Sale product page. Edit here.
// Images are intentionally left null so real assets can be dropped in later.

export const hero = {
  eyebrow: 'RESTAURANT TECHNOLOGY CLOUD',
  title: 'Focus on',
  titleAccent: 'the food.',
  description:
    'The interface that disappears. Designed for speed, clarity, and the service under pressure built for peak hours of restaurant.',
  primaryCta: { label: 'Book a Demo', href: '/book-demo' },
};

export const keyFeatures = [
  'Built-in Online Ordering',
  'Order and Pay at Table',
  'Table Management',
  'Works Offline',
  'Real-Time Menu Management',
  'Multi-User Environment',
];

export const features = [
  {
    id: 'menu-management',
    title: 'Real-Time Menu Management',
    body:
      'Maximize efficiency and profits with a Point of Sale enabled menu creation system. Build once and publish everywhere, from the counter to online ordering.',
    more:
      'Tailor multiple menus to suit different times of day, special events and happy hours with ease, and push changes live in seconds.',
    imageLabel: 'Point of Sale terminal showing a live menu grid',
    image: null,
    metrics: [
      { value: '100%', label: 'AI Generated' },
      { value: '100%', label: 'Efficiency Gain' },
    ],
  },
  {
    id: 'table-management',
    title: 'Table Management',
    body:
      'Elevate service with customizable floor plans, table turnover tracking and mobile ordering for a smoother dining experience.',
    more:
      'Optimize efficiency through tailored layouts and dedicated service sections, while gaining insight from turnover data across the whole room.',
    imageLabel: 'Terminal showing a restaurant floor plan',
    image: null,
    metrics: [
      { value: '24/7', label: 'Optimize Service Flow' },
      { value: '100%', label: 'Turnover Visibility' },
    ],
  },
  {
    id: 'online-ordering',
    title: 'Built-in Online Ordering',
    body:
      'Automate order tracking with integrated accounting and get rid of the inconvenience of manually monitoring third party ordering apps.',
    more:
      'Orders flow straight into the Point of Sale and Kitchen Display System, so data sharing stays smooth and updates land almost instantly.',
    imageLabel: 'Phone showing a white labeled ordering app',
    image: null,
    metrics: [
      { value: '$0', label: '3rd Party App Commission' },
      { value: '100%', label: 'White Labeled App and Website' },
    ],
  },
  {
    id: 'works-offline',
    title: 'Works Offline',
    body:
      'Restaurants keep functioning offline: orders reach the kitchen and payments stay secure even without an internet connection.',
    more:
      'With offline mode, orders are collected and sent to kitchen displays and printers instantly, and payments are processed securely once you reconnect.',
    imageLabel: 'Order taking continuing in offline mode',
    image: null,
    metrics: [
      { value: '100%', label: 'Offline Reliability' },
      { value: '100%', label: 'Business Continuity' },
    ],
  },
];
