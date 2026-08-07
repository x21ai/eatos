// @ts-nocheck
// All copy for the Workforce Management page. Edit here.

export const hero = {
  eyebrow: 'Workforce Management',
  title: 'Schedule.',
  titleAccent: 'Track. Pay. Done.',
  description:
    'GPS-enabled attendance, intelligent scheduling, and seamless payroll integration so your team stays focused on service, not paperwork.',
  primaryCta: { label: 'Book a Demo', href: '/book-demo' },
  secondaryCta: { label: 'View Pricing', href: '/pricing' },
  imageLabel: 'Workforce management dashboard',
  image: '/images/workforce-hero.jpg',
  stats: [
    { value: '30%', label: 'Less admin time' },
    { value: '99%', label: 'Accurate timesheets' },
    { value: '24/7', label: 'Clock-in anywhere' },
    { value: '0', label: 'Payroll double entry' },
  ],
};

export const keyFeatures = [
  'Intelligent Scheduling',
  'GPS Time Clock',
  'Overtime Alerts',
  'Payroll Sync',
  'Shift Swapping',
  'Mobile-First Design',
];

export const features = [
  {
    id: 'scheduling',
    title: 'Intelligent scheduling',
    body:
      'Build schedules in minutes, not hours. Drag-and-drop shifts, role-based coverage, and availability rules prevent conflicts before they happen.',
    more:
      "Auto-fill recurring shifts, track labor targets by role, and publish instantly to every team member's phone. Changes sync in real time so the floor is never short-staffed.",
    imageLabel: 'Schedule builder interface',
    image: '/images/workforce-scheduling.jpg',
    metrics: [
      { value: '75%', label: 'Faster scheduling' },
      { value: '0', label: 'Coverage gaps' },
    ],
  },
  {
    id: 'time-clock',
    title: 'GPS time clock',
    body:
      'Clock in from any device with location verification. Managers see who is on shift, on break, or late, without chasing anyone down.',
    more:
      'Geofencing confirms staff are on-site, and photo clock-in prevents buddy punching. Every punch feeds directly into timesheets and payroll.',
    imageLabel: 'Mobile time clock',
    image: '/images/workforce-timeclock.jpg',
    metrics: [
      { value: '99%', label: 'Accurate punches' },
      { value: '100%', label: 'Audit ready' },
    ],
  },
  {
    id: 'payroll',
    title: 'Payroll sync',
    body:
      'Approved hours flow straight into payroll. No CSV exports, no manual entry, no math errors on Friday afternoon.',
    more:
      'Integrate with leading payroll providers or run payroll inside eatOS. Breaks, overtime, and split shifts are calculated automatically.',
    imageLabel: 'Payroll integration',
    image: '/images/workforce-payroll.jpg',
    metrics: [
      { value: '0', label: 'Double entry' },
      { value: '2x', label: 'Faster payroll' },
    ],
  },
];

export const benefits = [
  {
    title: 'Overtime alerts',
    body: 'Get notified before staff hit overtime so you can adjust coverage and protect margins in real time.',
  },
  {
    title: 'Shift swapping',
    body: 'Employees can request swaps and coverage inside the app. Managers approve with one tap, and the schedule updates instantly.',
  },
  {
    title: 'Mobile-first',
    body: 'Managers and staff do everything from their phones, schedules, time off, availability, and messaging.',
  },
];

export const integration = {
  eyebrow: 'Integrations',
  title: 'Plays well with your payroll',
  description:
    'Connect the tools you already use. Workforce data flows into payroll, accounting, and reporting without manual handoffs.',
  cta: { label: 'See all integrations', href: '/products' },
};

export const offers = [
  {
    title: 'Get your own Workforce Management',
    description: 'All-in-one labor management built into the eatOS platform.',
    cta: { label: 'Book a Demo', href: '/book-demo' },
  },
  {
    title: 'Make your own custom bundle',
    description: 'Combine workforce with POS, KDS, and online ordering for a complete system.',
    cta: { label: 'Build a Bundle', href: '/products' },
  },
];

export const offerNote =
  'Terms and conditions apply. Features, pricing, and integrations are subject to availability by region.';
