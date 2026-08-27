// @ts-nocheck
import profitAsset from './assets/profit.png.asset.json';
import breakdownAsset from './assets/breakdown.png.asset.json';
import locationAsset from './assets/location.png.asset.json';

// All copy for the Analytics & Reporting product page. Edit here.
// Images are intentionally left blank for now: the shared Placeholder renders
// an empty surface when no `image` is provided.

export const hero = {
  eyebrow: 'Analytics & Reporting',
  title: 'Maya AI Elevates',
  titleAccent: 'Analytics and Reporting',
  description:
    'Reporting and analytics you will actually use. Track every service, spot patterns early and turn what happens on the floor into decisions you can act on.',
  primaryCta: { label: 'Book a Demo', href: '/bookademo' },
  secondaryCta: { label: 'View Pricing', href: '/pricing' },
  imageLabel: 'Analytics dashboard on a tablet',
  image: null,
  stats: [
    { value: '10x', label: 'Faster reporting. Increase checks.' },
    { value: '100%', label: 'Actionable insights' },
    { value: '24/7', label: 'Always on support' },
  ],
};

export const keyFeatures = [
  'Real-Time Data',
  'Cloud Reporting',
  'Multi-Device Support',
  'Practical Insights',
  'Multi-Location Reporting',
  'Reporting and Analytics',
];

export const features = [
  {
    id: 'real-time-data',
    title: 'Real-Time Data',
    body:
      'Watch sales, covers, labor and voids update as service happens, so you can fix a problem during the shift instead of reading about it the next morning.',
    more:
      'Every terminal, handheld and kiosk feeds the same live view, from a single store to the whole group.',
    imageLabel: 'Live profit and loss report',
    image: profitAsset.url,
    metrics: [
      { value: '100%', label: 'Actionable Insights' },
      { value: '10x', label: 'Data Advantage' },
    ],
  },
  {
    id: 'cloud-reporting',
    title: 'Cloud Reporting',
    body:
      'Your reports live in the cloud, so you can open them from the office, from home or between locations without exporting anything first.',
    more:
      'Schedule the reports your team needs and have them waiting in an inbox before the day starts.',
    imageLabel: 'Breakdown report on a tablet',
    image: breakdownAsset.url,
    metrics: [
      { value: '24/7', label: 'Profitable Insights' },
      { value: '100%', label: 'Instant Access' },
    ],
  },
  {
    id: 'multi-location-reporting',
    title: 'Multi-Location Reporting',
    body:
      'Compare stores side by side on sales, labor cost, menu mix and discounts, then drill into a single location when a number needs a closer look.',
    more:
      'Roll up the whole group into one view, or slice it by region, brand or day part.',
    imageLabel: 'Multi-location comparison report',
    image: locationAsset.url,
    metrics: [
      { value: '100%', label: 'Targeted Insights' },
      { value: '100%', label: 'Information Security' },
    ],
  },
];


export const offerNote =
  'Terms and conditions, and restaurant qualification criteria apply. Pricing is per location per device, excluding accessories, taxes and shipping.';

export const hardware = {
  specs: [
    {
      title: 'Any screen, one truth',
      body: 'Open the same dashboards on desktop, tablet or phone, with the numbers matching everywhere.',
    },
    {
      title: 'Exports that fit your workflow',
      body: 'Send any report to Excel or PDF for accountants, investors and franchise partners.',
    },
    {
      title: 'Secure by design',
      body: 'Role based access keeps sensitive sales and labor data with the people who need it.',
    },
  ],
};