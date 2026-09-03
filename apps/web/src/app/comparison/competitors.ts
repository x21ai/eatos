// @ts-nocheck
import { matrix, highlights } from './content';

export const featureOrder = matrix.map((row) => row.feature);

// index into each `matrix` row's `support` array (competitors minus eatOS)
const supportIndex = {
  square: 0,
  toast: 1,
  lightspeed: 2,
  spoton: 3,
  touchbistro: 4,
  revel: 5,
  micros: 6,
};

export const competitorSlugs = Object.keys(supportIndex);

const names = {
  square: 'Square',
  toast: 'Toast',
  lightspeed: 'Lightspeed',
  spoton: 'SpotOn',
  touchbistro: 'TouchBistro',
  revel: 'Revel',
  micros: 'Micros',
};

export const slugForCompetitor = (name) => {
  const entry = Object.entries(names).find(
    ([, value]) => value.toLowerCase() === String(name).toLowerCase()
  );
  return entry ? entry[0] : null;
};

const reasons = {
  toast: [
    {
      icon: 'shield',
      title: 'Build to Last',
      body: 'Engineered for extreme kitchen conditions, our heat resistant hardware is tested on specialized equipment so it keeps performing in steamy, oily rooms.',
      link: { label: 'Learn more about eatOS integrations', href: '/platform' },
    },
    {
      icon: 'delivery',
      title: 'Commission Free Delivery',
      body: 'Grow profits and build lasting customer relationships with your own branded app. Ditch expensive third party fees and keep the loyalty in house.',
      link: { label: 'Learn more about eatOS products', href: '/products' },
    },
    {
      icon: 'sparkles',
      title: 'Easy to Use',
      body: 'Running a restaurant is hard enough, so eatOS is designed with you in mind. Your team is up and running in no time and actually enjoys using it.',
      link: { label: 'Learn more about eatOS Point of Sale', href: '/pointofsale' },
    },
    {
      icon: 'cloud',
      title: 'Cloud Based Access',
      body: 'Make your kitchen smarter with cloud analytics. Track sales, refunds and costs in real time to boost efficiency and profits.',
      link: { label: 'Learn more about eatOS', href: '/about-eatos' },
    },
  ],
  square: [
    {
      icon: 'layers',
      title: 'Total System Convergence',
      body: 'An adaptable, AI powered ecosystem made for restaurants, with customized tools that streamline management and elevate the guest experience.',
      link: { label: 'Learn more about eatOS integrations', href: '/platform' },
    },
    {
      icon: 'card',
      title: 'Payment Flexibility',
      body: 'Never miss a sale by catering to diverse customer preferences. Accept Apple Pay, Google Pay, credit cards, business accounts or cash.',
      link: { label: 'Learn more about eatOS products', href: '/products' },
    },
    {
      icon: 'zap',
      title: 'Express Checkout',
      body: 'VoiceOS streamlines restaurant ordering with AI, reducing wait times and boosting table turnover so staff can handle more orders.',
      link: { label: 'Learn more about eatOS Point of Sale', href: '/pointofsale' },
    },
    {
      icon: 'chef',
      title: 'Kitchen Efficiency Booster',
      body: 'Integrated point of purchase streamlines orders, sending them straight from the register to the kitchen display for faster fulfillment.',
      link: { label: 'Learn more about eatOS', href: '/about-eatos' },
    },
  ],
  lightspeed: [
    {
      icon: 'chart',
      title: 'Advanced Insights',
      body: 'Analyze data for each location or across multiple sites. Customize reports with detailed filters and control access to sensitive information.',
      link: { label: 'Learn more about eatOS integrations', href: '/platform' },
    },
    {
      icon: 'clipboard',
      title: 'Automated Inventory Management',
      body: 'Eliminate manual inventory hassle. Get real time stock alerts and automated reorder reminders so you always have the ingredients you need.',
      link: { label: 'Learn more about eatOS products', href: '/products' },
    },
    {
      icon: 'card',
      title: 'A Better Checkout Experience',
      body: 'Elevate the customer experience with real time ordering, contactless payments, digital tips, e receipts and seamless mobile transactions.',
      link: { label: 'Learn more about eatOS Point of Sale', href: '/pointofsale' },
    },
    {
      icon: 'chef',
      title: 'Kitchen Command',
      body: 'Upgrade your kitchen with real time, synced kitchen ticketing. No more delays or confusion, just smooth and efficient order management on every display.',
      link: { label: 'Learn more about eatOS', href: '/about-eatos' },
    },
  ],
  spoton: [
    {
      icon: 'calendar',
      title: 'Hassle Free Scheduling',
      body: 'Ditch manual scheduling headaches. Comprehensive calendars streamline shift creation, time off requests and vacation approvals.',
      link: { label: 'Learn more about eatOS integrations', href: '/platform' },
    },
    {
      icon: 'wallet',
      title: 'Payday Made Easy',
      body: 'Simplify payroll with an intuitive platform. Effortlessly manage, export in Excel or CSV, and integrate with any payroll software via API.',
      link: { label: 'Learn more about eatOS products', href: '/products' },
    },
    {
      icon: 'zap',
      title: 'Lightning Fast Navigation',
      body: 'Instantly sync your menu across your dashboard and Point of Sale. Save time and resources with automated updates and smooth coordination.',
      link: { label: 'Learn more about eatOS Point of Sale', href: '/pointofsale' },
    },
    {
      icon: 'heart',
      title: 'Rewards That Delight',
      body: 'Build lasting loyalty with eatOS. Create custom rewards programs to incentivize repeat visits, referrals and social engagement.',
      link: { label: 'Learn more about eatOS', href: '/about-eatos' },
    },
  ],
  touchbistro: [
    {
      icon: 'sparkles',
      title: 'Menus That Sell More',
      body: 'Effortlessly create mouthwatering menus with our AI powered menu generator, designed to save you time and inspire your culinary creations.',
      link: { label: 'Learn more about eatOS integrations', href: '/platform' },
    },
    {
      icon: 'card',
      title: 'Service With a Smile, At Your Side',
      body: 'Tap to pay with your iPhone or Android. Most modern devices have built in contactless payment for secure, convenient transactions.',
      link: { label: 'Learn more about eatOS products', href: '/products' },
    },
    {
      icon: 'layers',
      title: 'Restaurant Success Made Simple',
      body: 'Reimagine restaurant management with our all in one solution. Streamline guest, staff, marketing, finance and menu tasks for effortless success.',
      link: { label: 'Learn more about eatOS Point of Sale', href: '/pointofsale' },
    },
    {
      icon: 'chart',
      title: 'Delight Diners, Boost Profits',
      body: 'Revolutionize your fast casual dining with eatOS Point of Sale. Streamline operations, elevate service and delight your customers.',
      link: { label: 'Learn more about eatOS', href: '/about-eatos' },
    },
  ],
  revel: [
    {
      icon: 'globe',
      title: 'Multi Location Management',
      body: 'Gain detailed insights into individual locations or multiple sites. Tailor reports with extensive filters and manage access to sensitive data.',
      link: { label: 'Learn more about eatOS integrations', href: '/platform' },
    },
    {
      icon: 'delivery',
      title: 'Delivery Software Designed',
      body: 'Effortless menu integration for a consistent experience across all customer touchpoints, from Point of Sale and apps to websites and beyond.',
      link: { label: 'Learn more about eatOS products', href: '/products' },
    },
    {
      icon: 'chef',
      title: 'KDS Intelligence Reporting',
      body: 'Boost your kitchen efficiency and profits with cloud analytics. Track sales, refunds and costs in real time for data driven decisions.',
      link: { label: 'Learn more about eatOS Point of Sale', href: '/pointofsale' },
    },
    {
      icon: 'wifi',
      title: 'Never Miss A Sale',
      body: 'Stay open even when the internet is down. Process orders and payments seamlessly offline with our reliable restaurant Point of Sale system.',
      link: { label: 'Learn more about eatOS', href: '/about-eatos' },
    },
  ],
  micros: [
    {
      icon: 'chef',
      title: 'Ghost Kitchen Success Simplified',
      body: 'Solve your ghost kitchen challenges with eatOS. Streamlined orders, wider reach and simplified management in one place.',
      link: { label: 'Learn more about eatOS integrations', href: '/platform' },
    },
    {
      icon: 'zap',
      title: 'Fast Food, Faster Service',
      body: 'Powerful cloud based Point of Sale streamlines payments for quick service restaurants, whether customers order at the counter or on the go.',
      link: { label: 'Learn more about eatOS products', href: '/products' },
    },
    {
      icon: 'layers',
      title: 'Menu Management Across Channels',
      body: 'Seamlessly integrate orders from multiple Point of Sale systems and our dedicated tablet solution, all from a single menu source.',
      link: { label: 'Learn more about eatOS Point of Sale', href: '/pointofsale' },
    },
    {
      icon: 'mic',
      title: 'Order By Voice Now',
      body: 'VoiceOS is the future of restaurant ordering. Just speak, confirm and enjoy a faster, error free experience for dine in or takeout.',
      link: { label: 'Learn more about eatOS', href: '/about-eatos' },
    },
  ],
};

export function getCompetitor(slug) {
  if (!(slug in supportIndex)) return null;
  const idx = supportIndex[slug];
  return {
    slug,
    name: names[slug],
    highlights,
    reasons: reasons[slug],
    rows: matrix.map((row) => ({
      feature: row.feature,
      eatos: true,
      rival: row.support[idx],
    })),
  };
}