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

export type WorkflowPair = {
  id: string;
  label: string;
  description: string;
  left: DemoSource;
  right: DemoSource;
};

export const workflowPairs: WorkflowPair[] = [
  {
    id: 'pos-kds',
    label: 'POS to KDS',
    description: 'An order fires from the floor and appears instantly on the kitchen display.',
    left: demoSources.find((d) => d.id === 'pos')!,
    right: demoSources.find((d) => d.id === 'kds')!,
  },
  {
    id: 'pos-dashboard',
    label: 'POS to Dashboard',
    description: 'Every sale feeds live reporting across locations, menus and labor.',
    left: demoSources.find((d) => d.id === 'pos')!,
    right: demoSources.find((d) => d.id === 'dashboard')!,
  },
  {
    id: 'kiosk-cfd',
    label: 'Kiosk to CFD',
    description: 'A guest orders from the kiosk and the customer display shows the status.',
    left: demoSources.find((d) => d.id === 'kiosk')!,
    right: demoSources.find((d) => d.id === 'cfd')!,
  },
];
