export type DemoSource = {
  id: string;
  label: string;
  url: string;
  blurb: string;
  device: 'phone' | 'tablet' | 'laptop';
};

export const demoSources: DemoSource[] = [
  {
    id: 'pos',
    label: 'Point of Sale',
    url: 'https://mobileposapp.lovable.app/',
    blurb: 'Ring in orders, split checks, and take payment in seconds anywhere.',
    device: 'phone',
  },
  {
    id: 'kds',
    label: 'KDS',
    url: 'https://kds6.lovable.app/kds/v3',
    blurb: 'Route tickets to the right station and keep orders moving on time.',
    device: 'tablet',
  },
  {
    id: 'kiosk',
    label: 'Kiosk',
    url: 'https://kiosk6.lovable.app/',
    blurb: 'Self ordering that upsells guests, handles modifiers, and cuts waits.',
    device: 'tablet',
  },
  {
    id: 'cfd',
    label: 'CFD',
    url: 'https://cfd6.lovable.app/',
    blurb: 'A guest facing display for order clarity, tips, and pickup details.',
    device: 'phone',
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    url: 'https://dashboard6c.lovable.app/',
    blurb: 'Sales, labor and menu performance across every location, updated live.',
    device: 'laptop',
  },
  {
    id: 'inventoryos',
    label: 'InventoryOS',
    url: 'https://inventoryos6.lovable.app/',
    blurb: 'Counts, vendors and recipe costing in one place, synced to every store.',
    device: 'laptop',
  },
];

export const displayName = (id: string) => {
  switch (id) {
    case 'kds':
      return 'Kitchen Display System';
    case 'cfd':
      return 'Customer Facing Display';
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
    title: 'Customer Facing Display',
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
