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
    blurb: 'Ring in orders, split checks and take payment in seconds.',
    device: 'phone',
  },
  {
    id: 'kds',
    label: 'KDS',
    url: 'https://kds6.lovable.app/kds/v3',
    blurb: 'Route tickets to the right station and keep the line moving.',
    device: 'tablet',
  },
  {
    id: 'kiosk',
    label: 'Kiosk',
    url: 'https://kiosk6.lovable.app/',
    blurb: 'Self ordering that upsells every guest, without a queue.',
    device: 'tablet',
  },
  {
    id: 'cfd',
    label: 'CFD',
    url: 'https://cfd6.lovable.app/',
    blurb: 'A guest facing display for order clarity and tipping.',
    device: 'phone',
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    url: 'https://dashboard6c.lovable.app/',
    blurb: 'Sales, labor and menu performance across every location.',
    device: 'laptop',
  },
  {
    id: 'inventoryos',
    label: 'InventoryOS',
    url: 'https://inventoryos6.lovable.app/',
    blurb: 'Counts, vendors and recipe costing in one place.',
    device: 'laptop',
  },
];
