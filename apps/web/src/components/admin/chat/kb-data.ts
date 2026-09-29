export type KbStatus = 'published' | 'hidden' | 'unpublished';

export type KbSection = { heading: string; body: string };

export type KbArticle = {
  id: string;
  title: string;
  category: string;
  status: KbStatus;
  intro: string;
  subtitle: string;
  sections: KbSection[];
};

const sections = (topic: string): KbSection[] => [
  { heading: `Getting started with ${topic}`, body: `Open the eatOS Dashboard, go to Settings, and select ${topic}. Each option includes a short description so you know exactly what changes before you save.` },
  { heading: 'Step-by-step setup', body: 'Follow the on-screen prompts, confirm your changes, and tap Save. Updates sync to every POS, kiosk, and KDS device on your account within a few seconds.' },
  { heading: 'Troubleshooting tips', body: 'If something does not look right, refresh the device, confirm it is online, and check that it is signed in to the correct location. Still stuck? Reach out to our support team 24/7.' },
];

const make = (id: string, title: string, status: KbStatus, topic: string): KbArticle => ({
  id,
  title,
  category: 'Frequently Asked Questions',
  status,
  subtitle: `${title}: what you need to know`,
  intro: `This article walks you through ${topic.toLowerCase()} in eatOS, including setup, best practices, and quick fixes for common questions.`,
  sections: sections(topic),
});

export const kbCategories = ['Frequently Asked Questions', 'Hardware', 'Payments'];

export const initialArticles: KbArticle[] = [
  {
    id: 'account-accessibility',
    title: 'Account Management - Accessibility',
    category: 'Frequently Asked Questions',
    status: 'hidden',
    subtitle: "Access Your Accounts Anywhere with eatOS' Cloud-Based System",
    intro: "Want to manage your accounts from anywhere? eatOS' cloud-based system makes it simple. This article covers the key features and benefits of our platform.",
    sections: [
      { heading: 'Sync Multiple Devices with Ease', body: "With eatOS' cloud-based system, you can sync multiple devices to a single account at the same time. Whether you're at your restaurant or on the go, you stay in full control of your business operations." },
      { heading: 'Getting Started Is a Breeze', body: 'Sign in with your owner email, add your locations, and invite your team. Your menu, pricing, and reports are ready on every device right away.' },
      { heading: 'Stay Connected Always', body: 'Your data is backed up in real time, so you never lose a sale, even if a device goes offline for a moment.' },
      { heading: 'Revolutionize Your Account Management', body: 'Manage staff roles, permissions, and locations from one Dashboard, built for busy owners and operators.' },
    ],
  },
  make('account-management', 'Account Management - Multi-Location', 'unpublished', 'Multi-location management'),
  make('password-update', 'Account & Password Update', 'published', 'Updating your account and password'),
  make('new-restaurant', 'Adding a New Restaurant Location', 'published', 'Adding a new location'),
  make('amount-confirmation', 'Amount confirmation on card terminals', 'hidden', 'Amount confirmation'),
  make('android-device', 'Android Device Requirements', 'hidden', 'Android device setup'),
  make('any-contracts', 'Are There Any Contracts or Fees?', 'hidden', 'Contracts and fees'),
  make('blank-mid', '"Blank MID/TID"', 'hidden', 'MID and TID errors'),
  make('customer-tips', 'Can My Customers Leave Tips?', 'unpublished', 'Tipping'),
  make('card-reader-exception', 'Card reader exception errors', 'hidden', 'Card reader exceptions'),
  make('card-reader-not-connecting', 'Card Reader Not Connecting', 'hidden', 'Card reader connections'),
  make('check-reader', 'Check The Reader Battery', 'hidden', 'Card reader batteries'),
  make('online-ordering', 'Creating Online Ordering Menus', 'published', 'Online ordering menus'),
  make('credit-cards', 'Credit Cards Accepted', 'unpublished', 'Accepted credit cards'),
  make('devices-compatible', 'Devices compatible with eatOS', 'hidden', 'Compatible devices'),
  make('gift-cards', 'Selling and Redeeming Gift Cards', 'published', 'Gift cards'),
  make('kds-setup', 'Setting Up the Kitchen Display System', 'published', 'Kitchen Display System setup'),
  make('kiosk-setup', 'Setting Up a Self-Service Kiosk', 'published', 'Self-service kiosk setup'),
  make('refunds', 'Issuing Refunds and Voids', 'published', 'Refunds and voids'),
  make('sales-tax', 'Configuring Sales Tax', 'unpublished', 'Sales tax'),
];

export const kbTotalArticles = 648;
