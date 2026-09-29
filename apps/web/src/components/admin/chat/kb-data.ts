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

export const kbCategories = ['Frequently Asked Questions'];

/**
 * Five hand written articles, one per state the editor can be in. The set is
 * deliberately small so the Knowledge Base reads like a help center that is
 * just getting started, and so every state (published, unpublished, hidden) is
 * one click away while you try the flow.
 */
export const initialArticles: KbArticle[] = [
  {
    id: 'kds-setup',
    title: 'Setting Up the Kitchen Display System',
    category: 'Frequently Asked Questions',
    status: 'published',
    subtitle: 'A quick guide to mounting, pairing, and configuring your kitchen screens',
    intro: 'The Kitchen Display System turns tickets into a clear line of cook orders. This guide covers the physical setup, the pairing step, and the display settings most kitchens change in the first week.',
    sections: [
      {
        heading: 'Mount and power the screen',
        body: 'Pick a wall above the pass or the prep line where your cooks already look. Mount the tablet at eye level, plug it into an outlet on the same side of the room as your router, and keep the charger clear of grease and water spray.',
      },
      {
        heading: 'Sign in and pair the station',
        body: 'Open the Kitchen Display System app, sign in with the owner account, and choose your location. When the app asks which station this screen belongs to, pick the one that matches the tickets you want to see, for example Expo, Grill, or Fry.',
      },
      {
        heading: 'Choose how tickets arrive',
        body: 'Under Display Settings you decide whether tickets appear per order or per item, how long an item can sit before it turns amber, and whether courses hold until a server releases them. Most quick service kitchens leave per order on, most full service kitchens turn it off.',
      },
      {
        heading: 'Run one real order before service',
        body: 'Send a card payment end to end. Ring the ticket from the POS, confirm it lands on the screen, bump it, then check the order closes in Dashboard. If the screen stays silent, confirm it is signed in to the same location and that the station is attached to the menu items being sold.',
      },
    ],
  },
  {
    id: 'gift-cards',
    title: 'Selling and Redeeming Gift Cards',
    category: 'Frequently Asked Questions',
    status: 'published',
    subtitle: 'Create values, sell at the counter, and redeem a balance on any device',
    intro: 'Gift cards can be sold at the counter, issued from Dashboard, or loaded later for a lost card. This article walks through setting the product up, activating a value, and redeeming it on a later visit.',
    sections: [
      {
        heading: 'Turn on the gift card product',
        body: 'In Dashboard, open Menu, then Add-ons, and enable Gift Cards. Choose whether the value is a fixed list, for example 25, 50, and 100 dollars, or an open amount the cashier types in.',
      },
      {
        heading: 'Sell a card at the counter',
        body: 'At the POS, tap Gift Card, scan or key the card number, and enter the amount. The card activates the moment the payment is approved, and the receipt prints the remaining balance.',
      },
      {
        heading: 'Redeem a balance',
        body: 'On the check, tap Pay, then Gift Card, and scan. If the card does not cover the full total, the POS leaves the rest as a split payment so the guest can finish with a card or cash.',
      },
      {
        heading: 'Replace a lost card',
        body: 'Find the original sale in Dashboard under Reports, then Gift Cards, and choose Transfer balance. The value moves to a new card and the old number stops working right away.',
      },
    ],
  },
  {
    id: 'password-update',
    title: 'Account & Password Update',
    category: 'Frequently Asked Questions',
    status: 'published',
    subtitle: 'Change your password, turn on two factor sign in, and keep owner access secure',
    intro: 'Your owner account controls every location, so it is worth keeping locked down. This short guide shows where to update a password and what happens on your other devices.',
    sections: [
      {
        heading: 'Update your password',
        body: 'Open Dashboard, click your name in the top right, then Account. Choose Change password, enter the current one, then the new one twice. A password needs at least 10 characters, one number, and one symbol.',
      },
      {
        heading: 'What happens on other devices',
        body: 'Your other sessions sign out within a minute, including POS terminals and Kitchen Display System screens. Re enter the new password on each device so tickets keep flowing.',
      },
      {
        heading: 'Turn on two factor sign in',
        body: 'In Account, choose Two factor authentication and scan the QR code with an authenticator app. The next sign in asks for the six digit code. Keep the backup codes somewhere offline in case you change phones.',
      },
    ],
  },
  {
    id: 'customer-tips',
    title: 'Can My Customers Leave Tips?',
    category: 'Frequently Asked Questions',
    status: 'unpublished',
    subtitle: 'Tipping setup at the counter, on the kiosk, and in online ordering',
    intro: 'This article explains how tipping works across eatOS channels and how to set the suggested amounts your guests see.',
    sections: [
      {
        heading: 'Choose where tips are allowed',
        body: 'In Dashboard, open Settings, then Payments, then Tipping. Turn tipping on per channel: counter, kiosk, online ordering, and delivery. Each channel keeps its own preset list.',
      },
      {
        heading: 'Set the suggestions guests see',
        body: 'Most restaurants show three quick options, for example 18, 20, and 22 percent, plus a custom amount. Kiosk and online ordering usually show one fewer option so the guest keeps moving.',
      },
      {
        heading: 'Decide whether tips print on the receipt',
        body: 'Under Receipts you choose if the tip line prints, if it prints as its own line, and whether staff see it on the kitchen ticket. Most owners leave the tip off the kitchen ticket.',
      },
      {
        heading: 'Review tips before payroll',
        body: 'At the end of a shift, open Dashboard, then Reports, then Tipped Sales to see tips by server, by device, and by channel. Export the report as a CSV to send to payroll.',
      },
    ],
  },
  {
    id: 'card-reader-not-connecting',
    title: 'Card Reader Not Connecting',
    category: 'Frequently Asked Questions',
    status: 'hidden',
    subtitle: 'What to check when a reader will not pair with the terminal',
    intro: 'When a card reader stops talking to the POS, the fix is almost always one of five checks. Work down the list and most readers are back in service in under two minutes.',
    sections: [
      {
        heading: 'Check power and battery',
        body: 'Hold the power key for three seconds until the light flashes. A steady amber light means the reader is charging, a blinking blue light means it is ready to pair.',
      },
      {
        heading: 'Move it closer to the terminal',
        body: 'Bluetooth reaches roughly 10 feet in an open room. If the reader sits behind a metal register or inside a drawer, move the device out and try again.',
      },
      {
        heading: 'Restart the connection',
        body: 'On the POS, open Settings, then Hardware, and unpair the reader. Restart the terminal, then pair again so the reader picks up a clean session.',
      },
      {
        heading: 'Confirm the reader belongs to this location',
        body: 'Readers are tied to one location. If you moved a device between restaurants, the terminal rejects it. Find the serial number in Dashboard under Hardware and reassign it.',
      },
      {
        heading: 'When to ask for help',
        body: 'If the reader still fails after those checks, message support from the chat bubble in Dashboard with the serial number and a short video, and we will ship a replacement.',
      },
    ],
  },
];

/** Rough read time for the live preview list, based on body length only. */
export function estimateReadMinutes(article: KbArticle): number {
  const text = [article.intro, ...article.sections.map((s) => s.body)].join(' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
