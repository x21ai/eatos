// @ts-nocheck
// Grounded, hand-maintained knowledge for questions the help center does not
// cover: what the platform includes, how support is priced, which page to go to.
// Every entry points at a real page on this site. Nothing here is generated, so
// the agent can quote it verbatim without inventing anything.

export const AGENT_NAME = 'Maya';
export const AGENT_SUBTITLE = 'eatOS Support Agent';

export const productRoutes = [
  { id: 'pos', label: 'Point of Sale', href: '/pointofsale', keywords: ['pos', 'point of sale', 'terminal', 'register', 'checkout', 'handheld', 'check', 'ticket', 'order'] },
  { id: 'kds', label: 'Kitchen Display System', href: '/products/kitchen-display-system', keywords: ['kds', 'kitchen', 'display', 'expo', 'line', 'prep', 'bump'] },
  { id: 'kiosk', label: 'Self Service Kiosk', href: '/products/self-service-kiosk', keywords: ['kiosk', 'self service', 'self-service', 'touch to start'] },
  { id: 'gfd', label: 'Guest Facing Display', href: '/products/guest-facing-display', keywords: ['guest facing', 'guest display', 'tip screen', 'signature'] },
  { id: 'dashboard', label: 'Dashboard', href: '/products/dashboard', keywords: ['dashboard', 'back office', 'reporting', 'reports', 'menu builder', 'settings'] },
  { id: 'payments', label: 'Payments', href: '/accept-payments', keywords: ['payment', 'payments', 'processing', 'card', 'refund', 'batch', 'deposit', 'tap to pay', 'rate'] },
  { id: 'online', label: 'Online Ordering', href: '/products/online-ordering', keywords: ['online ordering', 'website ordering', 'delivery', 'pickup', 'qr'] },
  { id: 'hardware', label: 'Hardware', href: '/shop', keywords: ['hardware', 'printer', 'till', 'cash drawer', 'router', 'device', 'stand', 'scanner', 'offline'] },
];

export const platformFacts = [
  {
    id: 'support-included',
    title: 'Support is included in every plan',
    body:
      'Onboarding, training, hardware troubleshooting and ongoing optimization are included with every eatOS plan at no extra cost. Support is never an upsell.',
    href: '/pricing',
    linkLabel: 'See pricing',
    keywords: ['cost', 'price', 'pricing', 'included', 'extra', 'fee', 'charge', 'plan', 'support cost', 'free'],
  },
  {
    id: 'coverage',
    title: '24/7 coverage, every day of the year',
    body:
      'The agent answers instantly at any hour, and a human specialist is available around the clock by chat, email, WhatsApp and phone when an issue needs a person.',
    href: '/support',
    linkLabel: 'Contact options',
    keywords: ['hours', 'open', '24', 'weekend', 'night', 'available', 'when', 'reach', 'human', 'agent', 'call'],
  },
  {
    id: 'status',
    title: 'Live service health',
    body:
      'If payments, ordering or sync look slow across your locations, check live service health before troubleshooting a single terminal.',
    href: '/system-status',
    linkLabel: 'System status',
    keywords: ['down', 'outage', 'offline', 'slow', 'status', 'incident', 'not working', 'sync'],
  },
  {
    id: 'processing',
    title: 'Card processing rates',
    body:
      'eatOS supports multiple processing options, including a flat rate of 2.99%+20¢ and interchange plus pricing. Your rate depends on the option on your account.',
    href: '/pricing',
    linkLabel: 'Compare rates',
    keywords: ['rate', 'interchange', 'flat', 'percent', 'processing', 'fees', '2.99'],
  },
  {
    id: 'demo',
    title: 'Talk to us before you buy',
    body:
      'Not a customer yet? A specialist will walk through your service model, menu and hardware needs on a live call.',
    href: '/book-demo',
    linkLabel: 'Book a demo',
    keywords: ['demo', 'buy', 'quote', 'sales', 'trial', 'switch', 'new', 'sign up', 'signup'],
  },
];

// What the agent can do, stated as three tiers so nothing is overclaimed.
export const agentCapabilities = [
  {
    id: 'answer',
    tier: 'Answer',
    status: 'Live now',
    title: 'Grounded answers with sources',
    body:
      'Ask in plain language. The agent answers from the eatOS help center and cites the exact guides it used, so you can verify each and every step during process.',
  },
  {
    id: 'triage',
    tier: 'Triage',
    status: 'Live now',
    title: 'Diagnoses and routes',
    body:
      'When an answer is not enough, the agent collects the product, the device and the severity, then routes you to the right channel with that context already attached.',
  },
  {
    id: 'act',
    tier: 'Act',
    status: 'Signed-in accounts',
    title: 'Takes action on your account',
    body:
      'Account actions such as checking an order, running a device health check or resending a receipt run behind secure sign-in, scoped to your specific locations only.',
  },
];

export const severityOptions = [
  { id: 'critical', label: 'Service is down', route: 'phone', note: 'Cannot take orders or payments right now' },
  { id: 'high', label: 'One device or feature broken', route: 'whatsapp', note: 'Working around it, but it is hurting service' },
  { id: 'normal', label: 'Question or setup help', route: 'email', note: 'No rush, needs an answer' },
];

const escalationBase = {
  phone: {
    id: 'phone',
    label: 'Call support now',
    detail: '+1 (844) 563-2867',
    meta: 'LIVE AGENTS SUPPORT  AROUND THE CLOCK',
  },
  whatsapp: {
    id: 'whatsapp',
    label: 'Continue on WhatsApp',
    detail: 'Send photos from the floor',
    meta: 'Context carried over',
  },
  email: {
    id: 'email',
    label: 'Email a specialist',
    detail: 'support@eatos.com',
    meta: 'Answered within 4 hours, 24/7',
  },
};

/**
 * Builds the escalation link for a triage result, carrying the collected
 * context into the channel so nobody has to retell the story.
 */
export function buildEscalation(route, summary) {
  const base = escalationBase[route] ?? escalationBase.email;
  const text = summary || 'I need help with eatOS.';

  if (base.id === 'phone') {
    return { ...base, href: 'tel:+18445632867', external: true };
  }
  if (base.id === 'whatsapp') {
    return { ...base, href: `https://wa.me/18449732867?text=${encodeURIComponent(text)}`, external: true };
  }
  return {
    ...base,
    href: `mailto:support@eatos.com?subject=${encodeURIComponent('eatOS support request')}&body=${encodeURIComponent(text)}`,
    external: true,
  };
}

export function matchProduct(text = '') {
  const lower = text.toLowerCase();
  let best = null;
  for (const product of productRoutes) {
    for (const keyword of product.keywords) {
      if (lower.includes(keyword) && (!best || keyword.length > best.keyword.length)) {
        best = { product, keyword };
      }
    }
  }
  return best?.product ?? null;
}
