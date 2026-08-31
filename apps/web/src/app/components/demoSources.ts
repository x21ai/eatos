import posMp4 from './assets/eatOS-Pointofsale_Demo_ver1.0_p_31_Aug_26IN.mp4.asset.json';
import posPoster from './assets/eatOS-Pointofsale_Demo_ver1.0_p_31_Aug_26IN-poster.jpg.asset.json';
import kdsMp4 from './assets/eatOS-kictchen_display_system_demo_ver1.0_p_31_Aug_26IN.mp4.asset.json';
import kdsPoster from './assets/eatOS-kictchen_display_system_demo_ver1.0_p_31_Aug_26IN-poster.jpg.asset.json';
import cfdMp4 from './assets/eatOS-Guest_facing_display_demo_ver1.0_p_31_Aug_26IN.mp4.asset.json';
import cfdPoster from './assets/eatOS-Guest_facing_display_demo_ver1.0_p_31_Aug_26IN-poster.jpg.asset.json';

import kioskMp4 from './assets/kiosk-demo.mp4.asset.json';
import kioskWebm from './assets/kiosk-demo.webm.asset.json';
import kioskPoster from './assets/kiosk-demo-poster.jpg.asset.json';
import dashMp4 from './assets/dashboard-demo.mp4.asset.json';
import dashWebm from './assets/dashboard-demo.webm.asset.json';
import dashPoster from './assets/dashboard-demo-poster.jpg.asset.json';
import invMp4 from './assets/inventoryos-demo.mp4.asset.json';
import invWebm from './assets/inventoryos-demo.webm.asset.json';
import invPoster from './assets/inventoryos-demo-poster.jpg.asset.json';

const videoSources = (webm: { url: string }, mp4: { url: string }) => [
  { src: webm.url, type: 'video/webm' },
  { src: mp4.url, type: 'video/mp4' },
];

export type DemoMedia = {
  sources: { src: string; type: string }[];
  poster: string;
  caption: string;
};

export type DemoSource = {
  id: string;
  label: string;
  url: string;
  blurb: string;
  device: 'phone' | 'tablet' | 'laptop';
  media?: DemoMedia;
};

export const demoSources: DemoSource[] = [
  {
    id: 'pos',
    label: 'Point of Sale',
    url: 'https://mobileposapp.lovable.app/',
    blurb: 'Ring in orders, split checks, and take payment in seconds anywhere.',
    device: 'tablet',
    media: {
      sources: videoSources(posWebm, posMp4),
      poster: posPoster.url,
      caption: 'Ring in the order, take payment, close the ticket.',
    },
  },
  {
    id: 'kds',
    label: 'KDS',
    url: 'https://kds6.lovable.app/kds/v3',
    blurb: 'Route tickets to the right station and keep orders moving on time.',
    device: 'tablet',
    media: {
      sources: videoSources(kdsWebm, kdsMp4),
      poster: kdsPoster.url,
      caption: 'Clock in, work the board, bump the ticket.',
    },
  },

  {
    id: 'kiosk',
    label: 'Kiosk',
    url: 'https://kiosk6.lovable.app/',
    blurb: 'Self ordering that upsells guests, handles modifiers, and cuts waits.',
    device: 'tablet',
    media: {
      sources: videoSources(kioskWebm, kioskMp4),
      poster: kioskPoster.url,
      caption: 'Touch to start, build the order, tip and pay.',
    },
  },

  {
    id: 'cfd',
    label: 'Guest Facing Display',
    url: 'https://cfd6.lovable.app/',
    blurb: 'A guest facing display for order clarity, tips, and pickup details.',
    device: 'tablet',
    media: {
      sources: videoSources(cfdWebm, cfdMp4),
      poster: cfdPoster.url,
      caption: 'Check in, redeem a reward, tip, pay, and get the receipt.',
    },
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    url: 'https://dashboard6c.lovable.app/',
    blurb: 'Sales, labor and menu performance across every location, updated live.',
    device: 'laptop',
    media: {
      sources: videoSources(dashWebm, dashMp4),
      poster: dashPoster.url,
      caption: 'Track sales, labor and stock hour by hour across locations.',
    },
  },
  {
    id: 'inventoryos',
    label: 'InventoryOS',
    url: 'https://inventoryos6.lovable.app/',
    blurb: 'Counts, vendors and recipe costing in one place, synced to every store.',
    device: 'laptop',
    media: {
      sources: videoSources(invWebm, invMp4),
      poster: invPoster.url,
      caption: 'Counts, purchases, waste and production value in one view.',
    },
  },

];

export const displayName = (id: string) => {
  switch (id) {
    case 'kds':
      return 'Kitchen Display System';
    case 'cfd':
      return 'Guest Facing Display';
    case 'kiosk':
      return 'Self Service Kiosk';
    default:
      return demoSources.find((d) => d.id === id)?.label ?? id;
  }
};

export type JourneyStep = {
  step: number;
  title: string;
  caption: string;
  demoId: string;
};

export const journeySteps: JourneyStep[] = [
  {
    step: 1,
    title: 'Point of Sale',
    caption: 'A server rings the check in on the handheld, sends modifiers, and takes payment at the table.',
    demoId: 'pos',
  },
  {
    step: 2,
    title: 'Guest Facing Display',
    caption: 'Guests see their order, tip, and pickup details on a clear display at the counter or window.',
    demoId: 'cfd',
  },
  {
    step: 3,
    title: 'Kitchen Display System',
    caption: 'The ticket lands on the right station instantly, with timers that keep every course on pace.',
    demoId: 'kds',
  },
  {
    step: 4,
    title: 'Dashboard',
    caption: 'Every sale rolls into live reporting for menu mix, labor and location performance.',
    demoId: 'dashboard',
  },
  {
    step: 5,
    title: 'InventoryOS',
    caption: 'Counts, vendors and recipe costing stay synced to every store, so stock never runs silent.',
    demoId: 'inventoryos',
  },
];
