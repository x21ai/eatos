// @ts-nocheck
// All copy for the Inventory Management product page. Edit here.
// Images are intentionally left blank for now: the shared Placeholder renders
// an empty surface when no `image` is provided.

export const hero = {
  eyebrow: 'Simplified Inventory Management',
  title: 'Smart Restaurant',
  titleAccent: 'Inventory Management',
  description:
    'Introducing eatOS simplified inventory management for restaurants. Streamline tracking, reduce waste, and optimize stock levels effortlessly.',
  primaryCta: { label: 'Book a Demo', href: '/book-demo' },
  secondaryCta: { label: 'Watch Video', href: '#' },
  imageLabel: 'Inventory management dashboard',
  image: null,
  stats: [
    { value: '30%', label: 'Less waste. Increase checks.' },
    { value: '100%', label: 'Real-time tracking' },
    { value: '24/7', label: 'Stock visibility' },
  ],
};

export const keyFeatures = [
  'Real-time Inventory Tracking',
  'Automated Stock Alerts',
  'Vendor Management Made Easy',
  'Recipe Costing and Menu',
  'Comprehensive Reporting and Analytics',
  'Seamless Integration',
];

export const features = [
  {
    id: 'real-time-inventory-tracking',
    title: 'Real-time Inventory Tracking',
    body:
      'Keep track of your inventory easily with eatOS. Monitor stock levels in real time to prevent ingredient shortages. With precise inventory data, you can make better purchasing choices and improve your supply chain efficiency.',
    more:
      'Every count syncs across the Point of Sale, kitchen, and back office so the whole team sees one source of truth.',
    imageLabel: 'Real-time inventory tracking',
    image: null,
    metrics: [
      { value: '100%', label: 'Better Purchasing' },
      { value: '100%', label: 'Real-Time Tracking' },
    ],
  },
  {
    id: 'automated-stock-alerts',
    title: 'Automated Stock Alerts',
    body:
      'Say goodbye to manual inventory checks and slow calculations. eatOS streamlines inventory tracking, providing instant alerts for low stock levels or reorder times. With automated notifications, you can reduce waste, avoid overstocking, and maintain a consistent ingredient supply.',
    more:
      'Alerts reach the right person before a shortage affects service, so you never run out of what guests love.',
    imageLabel: 'Automated stock alerts',
    image: null,
    metrics: [
      { value: '100%', label: 'Effortless Tracking' },
      { value: '10x', label: 'Waste Reduction' },
    ],
  },
  {
    id: 'vendor-management-made-easy',
    title: 'Vendor Management Made Easy',
    body:
      'With eatOS, vendor management becomes effortless. Keep a detailed supplier database, monitor purchase orders, and handle delivery schedules seamlessly. Access price comparisons, negotiate contracts, and guarantee optimal value for your investments.',
    more:
      'Orders, invoices, and delivery notes live in one place, so reconciliation takes minutes instead of days.',
    imageLabel: 'Vendor management interface',
    image: null,
    metrics: [
      { value: '100%', label: 'Purchase Tracking' },
      { value: '100%', label: 'Smart Purchasing' },
    ],
  },
  {
    id: 'recipe-costing-and-menu-engineering',
    title: 'Recipe Costing and Menu',
    body:
      'Precisely determine the expenses of your menu items using eatOS recipe costing feature.  Utilize data-driven insights to enhance your menu. With eatOS, you gain insight into which dishes generate revenue, enabling you to refine your offerings accordingly.',
    more:
      'Menu engineering highlights stars and underperformers automatically, so every plate contributes to margin.',
    imageLabel: 'Recipe costing and menu engineering',
    image: null,
    metrics: [
      { value: '100%', label: 'Data-Driven Menus' },
      { value: '10x', label: 'Profit Precision' },
    ],
  },
];

export const hardware = {
  specs: [
    {
      title: 'Comprehensive Reporting and Analytics',
      body:
        'Transform complex data into clear, visual reports and dashboards. Gain valuable restaurant insights quickly and easily, without the need for technical expertise.',
    },
    {
      title: 'Seamless Integration',
      body:
        'Connect inventory with the Point of Sale, purchasing, and accounting tools you already use. Data flows automatically between systems.',
    },
    {
      title: 'Mobile Inventory Counts',
      body:
        'Count stock from any device on the floor or in the walk-in. Changes save instantly and sync to the cloud.',
    },
  ],
};
