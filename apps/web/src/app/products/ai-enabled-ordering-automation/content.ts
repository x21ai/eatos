// @ts-nocheck
import streamlinedAsset from '@/assets/ai-ordering/Streamlined-Order-Taking-Process.png.asset.json';
import engagementAsset from '@/assets/ai-ordering/Enhanced-Customer-Engagement.png.asset.json';
import efficiencyAsset from '@/assets/ai-ordering/Increased-Efficiency-and-Productivity.png.asset.json';
import accuracyAsset from '@/assets/ai-ordering/Order-Accuracy-and-Customization.png.asset.json';
// All copy for the AI-Enabled Ordering Automation product page. Edit here.
// Images are intentionally null: add a CDN asset URL per feature when artwork is ready.

export const hero = {
  eyebrow: 'AI-Enabled Ordering Automation',
  title: 'Let AI Handle Your',
  titleAccent: 'Voice Ordering Process',
  description:
    'Automate the process of taking orders over the phone. Let AI interact with your customers, confirm every item and send the order straight to the kitchen.',
  primaryCta: { label: 'Book a Demo', href: '/bookademo' },
  imageLabel: 'VoiceOS ordering interface',
  image: null,
  stats: [
    { value: '24/7', label: 'Calls answered' },
    { value: '100%', label: 'AI-enabled ordering' },
    { value: '10x', label: 'More guest engagement' },
  ],
};

export const keyFeatures = [
  'Streamlined Order Taking Process',
  'Enhanced Customer Engagement',
  'Increased Efficiency and Productivity',
  'Order Accuracy and Customization',
  'Seamless Integration with eatOS',
  'Data-Driven Insights and Analytics',
];

export const features = [
  {
    id: 'streamlined-order-taking-process',
    title: 'Streamlined Order Taking Process',
    body:
      'VoiceOS transforms manual order taking with AI, allowing staff to focus on service. By removing pen-and-paper methods, orders are processed quickly, ensuring a smooth experience.',
    more:
      'Every call is captured, confirmed and fired to the kitchen without a team member stepping away from the floor.',
    imageLabel: 'Streamlined order taking process',
    image: streamlinedAsset.url,
    metrics: [
      { value: '100%', label: 'AI-Enabled' },
      { value: '10%', label: 'Service Focus' },
    ],
  },
  {
    id: 'enhanced-customer-engagement',
    title: 'Enhanced Customer Engagement',
    body:
      'VoiceOS improves customer engagement by accepting orders via natural voice commands. This interactive experience increases satisfaction, letting customers share preferences, ask questions, which builds loyalty.',
    more:
      'Guests talk the way they always have, and the assistant keeps up with modifiers, allergies and follow-up questions.',
    imageLabel: 'Enhanced customer engagement',
    image: engagementAsset.url,
    metrics: [
      { value: '100%', label: 'Interactive' },
      { value: '10x', label: 'More Engagement' },
    ],
  },
  {
    id: 'increased-efficiency-and-productivity',
    title: 'Increased Efficiency and Productivity',
    body:
      'Save time and resources using VoiceOS. It speeds up ordering and boosts table turnover rates. Efficient order handling raises productivity and revenue, allowing staff to focus on excellent service and enhancing the dining experience.',
    more:
      'Peak-hour call volume no longer competes with the guests standing in front of your team.',
    imageLabel: 'Increased efficiency and productivity',
    image: efficiencyAsset.url,
    metrics: [
      { value: '100%', label: 'Productivity Up' },
      { value: '100%', label: 'Staff Empowered' },
    ],
  },
  {
    id: 'order-accuracy-and-customization',
    title: 'Order Accuracy and Customization',
    body:
      'VoiceOS captures accurate orders using advanced voice recognition, minimizing errors. Customers can effortlessly customize orders to fit dietary needs, special requests.',
    more:
      'Each order is read back for confirmation before it reaches the kitchen, so remakes and refunds drop.',
    imageLabel: 'Order accuracy and customization',
    image: accuracyAsset.url,
    metrics: [
      { value: '100%', label: 'Customizable' },
      { value: '100%', label: 'Accurate Orders' },
    ],
  },
];

export const hardware = {
  specs: [
    {
      title: 'Seamless Integration with eatOS',
      body:
        'AI-Enabled Ordering Automation fits smoothly into restaurant management. VoiceOS sends orders to the eatOS Point of Sale and kitchen displays, making ordering efficient and improving customer satisfaction.',
    },
    {
      title: 'Data-Driven Insights and Analytics',
      body:
        'VoiceOS offers insightful data for smart decision making. Study ordering trends, preferences and top items, then improve menus, streamline operations and create focused marketing plans.',
    },
    {
      title: 'Human Handoff Any Time',
      body:
        'Complex requests pass to a team member with the full conversation in context, so no guest is ever stuck with a machine.',
    },
  ],
};
