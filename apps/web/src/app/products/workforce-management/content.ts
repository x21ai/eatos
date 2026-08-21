// @ts-nocheck
import work1 from '@/assets/work1.png.asset.json';
import work2 from '@/assets/work2.png.asset.json';
import work3 from '@/assets/work3.png.asset.json';
// All copy for the Workforce Management product page. Edit here.
// Images are intentionally left blank for now: the shared Placeholder renders
// an empty surface when no `image` is provided.

export const hero = {
  eyebrow: 'Workforce Management',
  title: 'Schedule. Track. Pay.',
  titleAccent: 'Done.',
  description:
    'GPS-enabled attendance, intelligent scheduling, and seamless payroll integration so your team stays focused on service, not paperwork.',
  primaryCta: { label: 'Book a Demo', href: '/book-demo' },
  secondaryCta: { label: 'Watch Video', href: '#' },
  imageLabel: 'Workforce management dashboard',
  image: null,
  stats: [
    { value: '30%', label: 'Less admin time. Increase checks.' },
    { value: '99%', label: 'Accurate timesheets' },
    { value: '24/7', label: 'Clock-in anywhere' },
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
    id: 'intelligent-scheduling',
    title: 'Intelligent Scheduling',
    body:
      'Build schedules in minutes, not hours. Drag-and-drop shifts, role-based coverage, and availability rules prevent conflicts before they happen.',
    more:
      "Auto-fill recurring shifts, track labor targets by role, and publish instantly to every team member's phone. Changes sync in real time so the floor is never short-staffed.",
    imageLabel: 'Schedule builder interface',
    image: null,
    metrics: [
      { value: '75%', label: 'Faster scheduling' },
      { value: '0', label: 'Coverage gaps' },
    ],
  },
  {
    id: 'gps-time-clock',
    title: 'GPS Time Clock',
    body:
      'Clock in from any device with location verification. Managers see who is on shift, on break, or late, without chasing anyone down.',
    more:
      'Geofencing confirms staff are on-site, and photo clock-in prevents buddy punching. Every punch feeds directly into timesheets and payroll.',
    imageLabel: 'Mobile time clock',
    image: null,
    metrics: [
      { value: '99%', label: 'Accurate punches' },
      { value: '100%', label: 'Audit ready' },
    ],
  },
  {
    id: 'payroll-sync',
    title: 'Payroll Sync',
    body:
      'Approved hours flow straight into payroll. No CSV exports, no manual entry, and no math errors on Friday afternoon.',
    more:
      'Integrate with leading payroll providers or run payroll inside eatOS. Breaks, overtime, and split shifts are calculated automatically.',
    imageLabel: 'Payroll integration',
    image: null,
    metrics: [
      { value: '0', label: 'Double entry' },
      { value: '2x', label: 'Faster payroll' },
    ],
  },
];

export const hardware = {
  specs: [
    {
      title: 'Overtime Alerts',
      body: 'Get notified before staff hit overtime so you can adjust coverage and protect margins in real time.',
    },
    {
      title: 'Shift Swapping',
      body: 'Employees request swaps and coverage inside the app. Managers approve with one tap, and the schedule updates instantly.',
    },
    {
      title: 'Mobile-First Design',
      body: 'Managers and staff handle schedules, time off, availability, and messaging from any phone.',
    },
  ],
};
