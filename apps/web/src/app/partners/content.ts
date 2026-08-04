// @ts-nocheck
import hero from './assets/partners-hero.avif.asset.json';
import programs from './assets/partners-programs.jpg.asset.json';
import sunmi from './assets/sunmi.png.asset.json';
import voucherify from './assets/voucherify.png.asset.json';
import stripe from './assets/stripe.png.asset.json';
import poynt from './assets/poynt.png.asset.json';
import segway from './assets/segway-robotics.png.asset.json';
import samsung from './assets/samsung.png.asset.json';
import otter from './assets/otter.png.asset.json';
import r365 from './assets/restaurant-365.png.asset.json';
import sevenshifts from './assets/7shifts.png.asset.json';
import marketman from './assets/marketman.png.asset.json';
import ecard from './assets/ecard.png.asset.json';
import star from './assets/star.png.asset.json';
import firstdata from './assets/first-data.png.asset.json';
import bluestar from './assets/blue-star.png.asset.json';
import epson from './assets/epson.png.asset.json';
import doordash from './assets/doordash.png.asset.json';

export const heroImage = hero.url;
export const programsImage = programs.url;

export const partnerTracks = [
  {
    title: 'Referral Partners',
    body:
      'Receive generous commissions for each client you refer, plus resources, onboarding support and a dedicated partner manager to help you build a consistent revenue stream.',
  },
  {
    title: 'Ambassadors',
    body:
      'Join as an eatOS Ambassador and earn a generous one-time fee for every successful referral. Ideal for partners who support our products and want flexibility.',
  },
  {
    title: 'Resellers',
    body:
      'We support every reseller with essential benefits. Our Silver and Gold Partners aiming for rapid growth get exclusive resources plus marketing and sales platforms.',
  },
  {
    title: 'Integration Partners',
    body:
      'Whether you are developing an application for millions or crafting a custom integration for a single client, you will need eatOS APIs, developer tools and support.',
  },
];

export const integrationPartners = [
  { name: 'Sunmi', src: sunmi.url },
  { name: 'Voucherify', src: voucherify.url },
  { name: 'Stripe', src: stripe.url },
  { name: 'Poynt', src: poynt.url },
  { name: 'Segway Robotics', src: segway.url },
  { name: 'Samsung', src: samsung.url },
  { name: 'Otter', src: otter.url },
  { name: 'Restaurant365', src: r365.url },
  { name: '7Shifts', src: sevenshifts.url },
  { name: 'MarketMan', src: marketman.url },
  { name: 'eCard Systems', src: ecard.url },
  { name: 'Star Micronics', src: star.url },
  { name: 'First Data', src: firstdata.url },
  { name: 'BlueStar', src: bluestar.url },
  { name: 'Epson', src: epson.url },
  { name: 'DoorDash', src: doordash.url },
];
