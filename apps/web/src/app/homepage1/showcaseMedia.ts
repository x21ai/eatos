// Demo media used ONLY by the /homepage1 "How it Works" grid.
// Do not reuse these assets anywhere else on the site.
import posMp4 from './assets/hp1-pos.mp4.asset.json';
import posWebm from './assets/hp1-pos.webm.asset.json';
import posPoster from './assets/hp1-pos-poster.jpg.asset.json';
import kdsMp4 from './assets/hp1-kds.mp4.asset.json';
import kdsWebm from './assets/hp1-kds.webm.asset.json';
import kdsPoster from './assets/hp1-kds-poster.jpg.asset.json';
// The kiosk tile shares the portrait kiosk animation used across the site.
import kioskMp4 from '../components/assets/kiosk-portrait.mp4.asset.json';
import kioskWebm from '../components/assets/kiosk-portrait.webm.asset.json';
import kioskPoster from '../components/assets/kiosk-portrait-poster.jpg.asset.json';
import cfdMp4 from './assets/hp1-cfd.mp4.asset.json';
import cfdWebm from './assets/hp1-cfd.webm.asset.json';
import cfdPoster from './assets/hp1-cfd-poster.jpg.asset.json';
import dashMp4 from './assets/hp1-dashboard.mp4.asset.json';
import dashWebm from './assets/hp1-dashboard.webm.asset.json';
import dashPoster from './assets/hp1-dashboard-poster.jpg.asset.json';
import invMp4 from './assets/hp1-inventoryos.mp4.asset.json';
import invWebm from './assets/hp1-inventoryos.webm.asset.json';
import invPoster from './assets/hp1-inventoryos-poster.jpg.asset.json';

export type ShowcaseMedia = {
  sources: { src: string; type: string }[];
  poster: string;
  caption: string;
};

const media = (
  webm: { url: string },
  mp4: { url: string },
  poster: { url: string },
  caption: string,
): ShowcaseMedia => ({
  sources: [
    { src: webm.url, type: 'video/webm' },
    { src: mp4.url, type: 'video/mp4' },
  ],
  poster: poster.url,
  caption,
});

export const homepage1ShowcaseMedia: Record<string, ShowcaseMedia> = {
  pos: media(posWebm, posMp4, posPoster, 'Ring in the order, take payment, close the check.'),
  kds: media(kdsWebm, kdsMp4, kdsPoster, 'Route kitchen tickets, work the board, bump on time.'),
  kiosk: media(kioskWebm, kioskMp4, kioskPoster, 'Touch to start, build the order, pay and take the receipt.'),
  cfd: media(cfdWebm, cfdMp4, cfdPoster, 'Order clarity, rewards, tipping and receipts.'),
  dashboard: media(dashWebm, dashMp4, dashPoster, 'Sales, labor and menu performance, live.'),
  inventoryos: media(invWebm, invMp4, invPoster, 'Counts, vendors and recipe costing in one view.'),
};
