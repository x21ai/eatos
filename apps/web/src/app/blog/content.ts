// @ts-nocheck
// Static blog content source. Replaces the D1-backed /api/blog reads so the
// index and every post render in preview and in the static export.

import offlineImg from './assets/blog/blog-placeholder-offline-resilience.jpg.asset.json';
import workforceImg from './assets/blog/blog-placeholder-workforce-management.jpg.asset.json';
import analyticsImg from './assets/blog/blog-placeholder-analytics-reporting.jpg.asset.json';
import tablesideImg from './assets/blog/blog-placeholder-tableside-ordering.jpg.asset.json';
import inventoryImg from './assets/blog/blog-placeholder-inventory-management.jpg.asset.json';
import posCostsImg from './assets/blog/blog-placeholder-pos-costs.jpg.asset.json';
import fastCasualImg from './assets/blog/blog-placeholder-fast-casual-pos.jpg.asset.json';
import onlineDeliveryImg from './assets/blog/blog-placeholder-online-delivery.jpg.asset.json';

export const blogHero = {
  eyebrow: 'Newsroom',
  title: 'Ideas for the modern restaurant.',
  intro:
    'Product news, operating playbooks and practical guidance from the team building the eatOS restaurant technology cloud.',
};

export const categories = [
  'All Posts',
  'Point of Sale',
  'Workforce Management',
  'Inventory Management',
  'Online Ordering',
  'Self Service Kiosk',
  'Tableside Ordering',
];

export const posts = [
  {
    slug: 'never-miss-a-beat-how-offline-resilience-keeps-your-sales-rolling',
    title: 'Never Miss a Beat: How Offline Resilience Keeps Your Sales Rolling',
    category: 'Point of Sale',
    date: '2025-11-19',
    author: 'eatOS Staff',
    excerpt:
      'An outage should never close the register. Here is how local-first architecture keeps orders, tickets and payments moving until connectivity returns.',
    image: null,
    body: [
      { type: 'p', text: 'Connectivity fails at the worst possible moment — a storm, a carrier issue, a router that quietly gives up during the dinner rush. A point of sale that depends entirely on the cloud turns that inconvenience into lost revenue and a dining room full of waiting guests.' },
      { type: 'h2', text: 'Local-first, cloud-synced' },
      { type: 'p', text: 'eatOS keeps a working copy of your menu, pricing, tax rules and open checks on the terminal itself. When the network drops, service continues on local data instead of stalling on a request that will never come back.' },
      { type: 'h2', text: 'What still works offline' },
      { type: 'ul', items: ['Ringing in orders and firing tickets to the kitchen', 'Card payments captured for authorization once you are back online', 'Table management, course timing and check splitting', 'Receipt and kitchen ticket printing'] },
      { type: 'h2', text: 'Catching up automatically' },
      { type: 'p', text: 'The moment connectivity returns, queued transactions sync in order. Sales reporting, inventory depletion and labor data reconcile without a manager re-keying anything by hand.' },
      { type: 'h2', text: 'Plan for the outage you cannot control' },
      { type: 'p', text: 'Resilience is an operating decision, not a feature you notice on a good day. Test offline mode with your staff, confirm your printers are on the local network, and know exactly what your team should do in the first sixty seconds of an outage.' },
    ],
  },
  {
    slug: 'empower-your-restaurant-team-with-simplified-workforce-management',
    title: 'Empower Your Restaurant Team with Simplified Workforce Management',
    category: 'Workforce Management',
    date: '2025-11-14',
    author: 'eatOS Staff',
    excerpt:
      'Scheduling, clock-ins and labor cost live in the same place as your sales data. That single source of truth changes how managers spend their week.',
    image: null,
    body: [
      { type: 'p', text: 'Most labor problems are really visibility problems. Managers build schedules in one tool, approve punches in another, and only learn what a shift actually cost days later.' },
      { type: 'h2', text: 'Schedule against real demand' },
      { type: 'p', text: 'When sales history sits next to the schedule, you can staff to the curve instead of to habit — tighter coverage at the peak, leaner shoulders around it.' },
      { type: 'h2', text: 'Fewer surprises on payroll day' },
      { type: 'ul', items: ['Clock-in enforcement tied to the schedule', 'Overtime warnings before the hours are worked', 'Break tracking that supports local compliance', 'Tip and role-based pay handled per shift'] },
      { type: 'h2', text: 'Give the team self-service' },
      { type: 'p', text: 'Staff who can see their upcoming shifts, swap with a teammate and check their hours stop asking the manager. That time goes straight back to the floor.' },
    ],
  },
  {
    slug: '10-tips-to-enhance-your-restaurant-analytics-and-reporting-system',
    title: '10 Tips to Enhance Your Restaurant Analytics and Reporting System',
    category: 'Point of Sale',
    date: '2026-02-16',
    author: 'eatOS Staff',
    excerpt:
      'Reporting is only useful when it changes a decision. Ten practical habits that turn raw restaurant data into weekly action.',
    image: null,
    body: [
      { type: 'p', text: 'Every point of sale produces reports. Very few operators use them to change what happens next week. The difference is rarely the software — it is the routine around it.' },
      { type: 'h2', text: 'Ten habits worth adopting' },
      { type: 'ul', items: ['Pick five numbers you will review every week and ignore the rest', 'Compare against the same weekday, not the previous day', 'Track sales per labor hour, not just total labor cost', 'Review menu items by both margin and volume', 'Watch void and comp reasons for training gaps', 'Reconcile theoretical and actual inventory usage', 'Segment by daypart before drawing conclusions', 'Give each manager one metric they own', 'Automate the report so nobody has to build it', 'Write down the decision the numbers led to'] },
      { type: 'h2', text: 'Make the review a ritual' },
      { type: 'p', text: 'A fifteen-minute standing review with the same five numbers beats a beautiful dashboard nobody opens.' },
    ],
  },
  {
    slug: 'how-tableside-ordering-and-payment-enhances-restaurant-experience',
    title: 'How Tableside Ordering and Payment Enhances Restaurant Experience',
    category: 'Tableside Ordering',
    date: '2025-11-05',
    author: 'eatOS Staff',
    excerpt:
      'Ordering and paying at the table shortens every table turn and gives servers more time with guests instead of the terminal.',
    image: null,
    body: [
      { type: 'p', text: 'The walk to a stationary terminal happens dozens of times a shift. Handheld ordering removes it and puts the server back in front of the guest.' },
      { type: 'h2', text: 'Faster tickets, fewer errors' },
      { type: 'p', text: 'Orders reach the kitchen the moment they are taken, with modifiers captured while the guest is still speaking. Fire times get tighter and re-makes go down.' },
      { type: 'h2', text: 'Paying without waiting' },
      { type: 'ul', items: ['Present, split and settle the check at the table', 'Tap, chip and mobile wallet on the same device', 'Digital receipts and prompted tipping', 'Loyalty applied before the payment, not after'] },
      { type: 'h2', text: 'What it means for turns' },
      { type: 'p', text: 'Cutting several minutes off the payment window at every table adds up to real capacity on a busy night — without adding a single seat.' },
    ],
  },
  {
    slug: 'the-complete-guide-to-restaurant-inventory-management',
    title: 'The Complete Guide to Restaurant Inventory Management',
    category: 'Inventory Management',
    date: '2026-01-14',
    author: 'eatOS Staff',
    excerpt:
      'Counts, recipes, par levels and vendor orders — the fundamentals of keeping food cost predictable without drowning in spreadsheets.',
    image: null,
    body: [
      { type: 'p', text: 'Inventory is where margin quietly disappears. Waste, over-portioning and inconsistent counts rarely show up as a single dramatic number; they show up as a food cost that never quite improves.' },
      { type: 'h2', text: 'Start with recipes' },
      { type: 'p', text: 'Until each menu item maps to measured ingredients, depletion is guesswork. Recipe-level costing is what makes every other report trustworthy.' },
      { type: 'h2', text: 'Count what matters, often' },
      { type: 'ul', items: ['Daily counts on your highest-cost and highest-theft items', 'Weekly full counts on a fixed day and time', 'Par levels that trigger orders automatically', 'Vendor invoices matched to what was actually received'] },
      { type: 'h2', text: 'Close the loop' },
      { type: 'p', text: 'Compare theoretical usage from sales against actual usage from counts. The variance is your shortlist of problems to fix — portioning, prep waste, or process.' },
    ],
  },
  {
    slug: 'how-much-does-it-cost-to-implement-a-point-of-sale-system',
    title: 'How Much Does It Cost to Implement a Point of Sale System?',
    category: 'Point of Sale',
    date: '2026-02-11',
    author: 'eatOS Staff',
    excerpt:
      'Hardware, software, payments and implementation — a clear breakdown of what a restaurant point of sale really costs in year one.',
    image: null,
    body: [
      { type: 'p', text: 'Sticker prices rarely tell the whole story. The useful question is what the system costs across its first twelve months, including the work of getting live.' },
      { type: 'h2', text: 'The four cost buckets' },
      { type: 'ul', items: ['Hardware: terminals, handhelds, kitchen displays, printers and cash drawers', 'Software: per-terminal or per-location subscription and the modules you enable', 'Payments: processing rates, plus any gateway or per-transaction fees', 'Implementation: menu build, installation, network work and staff training'] },
      { type: 'h2', text: 'Costs people forget' },
      { type: 'p', text: 'Networking and cabling, tablet mounts, a backup connection, replacement peripherals, and the labor hours spent building the menu correctly the first time.' },
      { type: 'h2', text: 'Judge it against what it returns' },
      { type: 'p', text: 'Faster turns, tighter labor, less waste and fewer voids are the return side of the equation. Price the system against those, not against a competitor line item.' },
    ],
  },
  {
    slug: '6-must-have-features-in-the-best-fast-casual-point-of-sale-systems',
    title: '6 Must-Have Features in the Best Fast Casual Point of Sale Systems',
    category: 'Self Service Kiosk',
    date: '2026-02-12',
    author: 'eatOS Staff',
    excerpt:
      'Fast casual lives on throughput. These are the six capabilities that keep the line moving when the lunch rush arrives.',
    image: null,
    body: [
      { type: 'p', text: 'In fast casual, speed and consistency are the product. The right point of sale removes friction at the counter and in the kitchen at the same time.' },
      { type: 'h2', text: 'Six capabilities that matter' },
      { type: 'ul', items: ['A counter flow built for speed, with modifiers two taps deep', 'Self-service kiosks that mirror the counter menu exactly', 'Kitchen display routing by prep station', 'Online and delivery orders landing in the same queue', 'Loyalty applied at the moment of ordering', 'Offline resilience so the line never stops'] },
      { type: 'h2', text: 'Consistency beats configurability' },
      { type: 'p', text: 'A menu that behaves identically at the counter, the kiosk and online is what keeps ticket times and guest expectations stable.' },
    ],
  },
  {
    slug: '8-online-ordering-and-delivery-challenges-restaurants-face',
    title: '8 Online Ordering and Delivery Challenges Restaurants Face',
    category: 'Online Ordering',
    date: '2026-02-11',
    author: 'eatOS Staff',
    excerpt:
      'Digital orders are now a core channel. These are the eight operational problems that quietly erode their margin — and how to address them.',
    image: null,
    body: [
      { type: 'p', text: 'Off-premise ordering added revenue and a whole new set of operating problems. Most of them are solvable with process and integration rather than more headcount.' },
      { type: 'h2', text: 'Eight recurring challenges' },
      { type: 'ul', items: ['Tablet sprawl from multiple delivery marketplaces', 'Menus and pricing drifting out of sync per channel', 'Digital tickets competing with dine-in for kitchen capacity', 'Commission rates compressing margin', 'Courier wait times and cold handoffs', 'Missing modifiers and inaccurate orders', 'No guest data on marketplace orders', 'Refunds and chargebacks handled off-system'] },
      { type: 'h2', text: 'Consolidate, then optimize' },
      { type: 'p', text: 'Bringing every channel into one order queue and one menu source fixes most of the list at once. Direct ordering then gives you the margin and the guest relationship back.' },
    ],
  },
];

export function getPost(slug) {
  return posts.find((p) => p.slug === slug) ?? null;
}

export function getRelated(slug, count = 3) {
  const current = getPost(slug);
  const others = posts.filter((p) => p.slug !== slug);
  const sameCategory = others.filter((p) => p.category === current?.category);
  return [...sameCategory, ...others.filter((p) => p.category !== current?.category)].slice(0, count);
}

export function formatDate(value) {
  try {
    return new Date(value).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}