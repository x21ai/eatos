// @ts-nocheck
import heroAsset from './assets/hero.jpg.asset.json';
import posterAsset from './assets/poster.jpg.asset.json';
import counterAsset from './assets/counter.jpg.asset.json';
import detailAsset from './assets/detail.jpg.asset.json';
import heroVideoAsset from './assets/hero-video.mp4.asset.json';

export const images = {
  hero: heroAsset.url,
  poster: posterAsset.url,
  counter: counterAsset.url,
  detail: detailAsset.url,
};

export const heroVideo = heroVideoAsset.url;

export const stats = [
  { value: '2 sec', label: 'From total to approved' },
  { value: '2.99%+20¢', label: 'Flat rate processing' },
  { value: '0', label: 'Extra terminals to buy' },
  { value: '100%', label: 'Contactless cards and wallets' },
];

export const steps = [
  {
    step: '01',
    title: 'Ring it up where you stand',
    body: 'Fire the order from the handheld while you are still at the table. Items hit the kitchen the moment you confirm them.',
  },
  {
    step: '02',
    title: 'Turn the phone to the guest',
    body: 'The check, the tip prompt and the total appear on one clean screen. No wallet run, no folder, no waiting for the terminal.',
  },
  {
    step: '03',
    title: 'They tap. You are done.',
    body: 'Card, phone or watch: one tap approves it. The receipt goes out by text or email and the ticket closes itself.',
  },
];

export const features = [
  {
    title: 'Every contactless card and wallet',
    body: 'Tap-enabled credit and debit cards, phone wallets and smartwatches all clear through the same flow.',
    icon: 'CreditCard',
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/10',
    iconBorder: 'border-blue-400/20',
  },
  {
    title: 'Security built into the device',
    body: 'Card data is encrypted on the phone and never stored in your app. Nothing sensitive touches the floor.',
    icon: 'ShieldCheck',
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10',
    iconBorder: 'border-emerald-400/20',
  },
  {
    title: 'Tips and split checks',
    body: 'Preset or custom tips, split by seat or by amount, and multiple taps on the same check.',
    icon: 'Percent',
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/10',
    iconBorder: 'border-amber-400/20',
  },
  {
    title: 'Keeps going when Wi-Fi drops',
    body: 'Orders and payment intents queue locally and sync the second the connection returns.',
    icon: 'WifiOff',
    iconColor: 'text-violet-400',
    iconBg: 'bg-violet-500/10',
    iconBorder: 'border-violet-400/20',
  },
  {
    title: 'Digital receipts',
    body: 'Send by text or email in one step, or print to any paired eatOS printer.',
    icon: 'Receipt',
    iconColor: 'text-sky-400',
    iconBg: 'bg-sky-500/10',
    iconBorder: 'border-sky-400/20',
  },
  {
    title: 'One ledger with your POS',
    body: 'Tap payments land in the same reporting, payouts and reconciliation as every other tender.',
    icon: 'Layers',
    iconColor: 'text-rose-400',
    iconBg: 'bg-rose-500/10',
    iconBorder: 'border-rose-400/20',
  },
];

export const places = [
  {
    title: 'Tableside',
    body: 'Close the check between courses without leaving the section or queueing for a terminal.',
  },
  {
    title: 'At the counter',
    body: 'Open a second line in seconds during a rush. Any phone becomes a register.',
  },
  {
    title: 'Curbside and events',
    body: 'Patios, pop-ups, food halls and catering: take payment wherever the guest is standing.',
  },
];

export const requirements = [
  'iPhone XS or later',
  'Latest iOS release',
  'The eatOS app',
  'An active eatOS Payments account',
];