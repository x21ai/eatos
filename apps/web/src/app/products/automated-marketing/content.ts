// @ts-nocheck
// All copy for the Automated Marketing product page. Edit here.
import mar1 from './assets/mar1.png.asset.json';
import mar2 from './assets/mar2.png.asset.json';
import mar3 from './assets/mar3.png.asset.json';


export const hero = {
  eyebrow: 'Automated Marketing',
  title: 'Boost Engagements with',
  titleAccent: 'Personalized Promotions with AI',
  description:
    'Automate tailored promotions that resonate with your customers, boosting engagement effortlessly.',
  primaryCta: { label: 'Book a Demo', href: '/book-demo' },
  secondaryCta: { label: 'View Pricing', href: '/pricing' },
  imageLabel: 'Marketing automation dashboard',
  image: null,
  stats: [
    { value: '100%', label: 'Personalized' },
    { value: '10x', label: 'More engagement. Increase checks.' },
    { value: '24/7', label: 'Always on support' },
  ],
};

export const keyFeatures = [
  'Personalized Customer Experiences',
  'Lead Scoring',
  'Data-Driven Insights',
];


export const features = [
  {
    id: 'personalized-customer-experiences',
    title: 'Personalized Customer Experiences',
    body:
      'Send the right message to the right guest at the right time. eatOS learns preferences, visit history and order behavior so every offer feels personal, not generic.',
    more:
      'Birthday rewards, win-back offers and loyalty surprises land automatically, keeping your brand top of mind without adding work for the team.',
    imageLabel: 'Personalized guest marketing campaign',
    image: mar1.url,

    metrics: [
      { value: '100%', label: 'Personalized' },
      { value: '10x', label: 'More Engagements' },
    ],
  },
  {
    id: 'lead-scoring',
    title: 'Lead Scoring',
    body:
      'Identify your highest-value guests and prospects before they go cold. eatOS scores every contact based on behavior, visits, spend and engagement so your team knows where to focus.',
    more:
      'Qualify and prioritize leads based on demographics and actions, helping sales teams focus on the most promising prospects.',
    imageLabel: 'Lead scoring and guest behavior dashboard',
    image: mar2.url,
    metrics: [
      { value: '100%', label: 'Behavior Tracking' },
      { value: '10x', label: 'Campaign Builder' },
    ],
  },

  {
    id: 'data-driven-insights',
    title: 'Data-Driven Insights',
    body:
      'See which campaigns bring guests back and which offers fall flat. Track opens, clicks, redemptions and revenue in one clear dashboard.',
    more:
      'Use real-time analytics to refine strategies, identify new opportunities and optimize restaurant operations based on actionable data-driven insights.',
    imageLabel: 'Marketing analytics and performance report',
    image: null,
    metrics: [
      { value: '10x', label: 'Accurate' },
      { value: '10x', label: 'Faster' },
    ],
  },
];

export const hardware = {
  specs: [
    {
      title: 'Behavior triggers',
      body: 'Launch campaigns automatically when a guest visits, spends, abandons a cart or celebrates a birthday.',
    },
    {
      title: 'Multi-channel reach',
      body: 'Reach guests through email, SMS and push notifications from a single, unified campaign builder.',
    },
    {
      title: 'Built-in compliance',
      body: 'Opt-in management, unsubscribe handling and secure data practices keep your marketing clean and compliant.',
    },
  ],
};
