// @ts-nocheck
// All copy for the Bar & Nightclub solution page. Edit here.

import heroImg from '../../../assets/svc-bar.jpg.asset.json';
import tabsImg from './assets/bar-tabs.jpg.asset.json';
import inventoryImg from './assets/bar-inventory.jpg.asset.json';
import handheldImg from './assets/bar-handheld.jpg.asset.json';

export const hero = {
  eyebrow: 'Restaurant Technology Cloud',
  title: 'Bar & Nightclub POS',
  description:
    'Built for the pace behind the bar, where every second at the rail counts. Open and close tabs in a tap, keep card on file for the whole night, pour with live inventory behind you, and give your team one system that keeps up from the first round to last call.',
  primaryCta: { label: 'Book a Demo', href: '/book-demo' },
  secondaryCta: { label: 'View Pricing', href: '/pricing' },
  imageLabel: 'Bartender working an eatOS terminal at the rail',
  image: heroImg.url,
};

export const marquee = [
  {
    value: 'Tabs in a tap',
    label: 'Open, transfer and close tabs in seconds, with card on file for the whole night.',
  },
  {
    value: 'Everyone in sync',
    label: 'Bartenders, servers and the door share one live view of every open check.',
  },
  {
    value: 'Support 24/7',
    label: 'Real people on call through every late shift, every night of the year.',
  },
  {
    value: 'No upfront cost',
    label: 'Hardware included with Pay As You Go, so you start fast and grow at your pace.',
  },
];

export const pillars = [
  {
    id: 'tabs',
    title: 'Tab management built for the rail',
    body:
      'Open a tab with a tap, keep the card securely on file, and let any bartender add to it from any station without hunting for a slip of paper. Pre-authorize on the first round, split a round across friends, transfer a tab from the bar to a table, and close everything out in seconds when the lights come up.',
    more:
      'Because every tab lives on one platform, your team always sees who owes what and nothing walks out unpaid. Tips, splits and reprints are handled right at the terminal or on a handheld, so bartenders keep their hands on drinks instead of paperwork.',
    imageLabel: 'Bartender closing out a tab on a terminal',
    image: tabsImg.url,
  },
  {
    id: 'inventory',
    title: 'Real-time inventory behind the bar',
    body:
      'Track kegs, bottles, spirits and mixers as they pour, so you always know what is running low before a guest orders it. Recipes tie each cocktail back to its pours, which means variance shows up as it happens rather than at the end of the month when the numbers no longer add up.',
    more:
      'Set par levels, get low stock alerts and build purchase orders from live counts instead of guesswork. Managers can compare pours to sales by shift and by bartender, spot over-pouring early, and protect margin on the drinks that carry the room.',
    imageLabel: 'Back bar shelves and inventory on a tablet',
    image: inventoryImg.url,
  },
  {
    id: 'compliance',
    title: 'Age verification and compliance at the door',
    body:
      'Scan an ID at the door or at the bar and get an instant, unmistakable read on age and validity, without slowing the line or putting your team on the spot. Every check is logged, so you have a clear record of who was served and when if a question ever comes up.',
    more:
      'Set drink limits, cut-off times and manager approvals to match local rules, then let the system enforce them consistently across every station. Your staff spend less time judging calls in the dark and more time serving the room with confidence.',
    imageLabel: 'Door host scanning a guest ID',
    image: idImg.url,
  },
];