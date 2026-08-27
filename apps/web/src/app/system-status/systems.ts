// System Status configuration
// Add, remove, or update systems here. No database required.
// status: 'operational' | 'degraded' | 'outage' | 'maintenance'

export type SystemStatus = 'operational' | 'degraded' | 'outage' | 'maintenance';

export interface SystemEntry {
  name: string;
  url?: string;
  status: SystemStatus;
  uptime: string;
}

export interface SystemGroup {
  name: string;
  systems: SystemEntry[];
}

export const LAST_UPDATED = '2026-08-26T00:00:00Z';

export const systemGroups: SystemGroup[] = [
  {
    name: 'Web Services',
    systems: [
      { name: 'eatOS.com', url: 'https://eatos.com', status: 'operational', uptime: '99.99%' },
      {
        name: 'Dashboard',
        url: 'https://dashboard.eatos.com',
        status: 'operational',
        uptime: '99.99%',
      },
      {
        name: 'eatOS Helpdesk',
        url: 'https://support.eatos.com',
        status: 'operational',
        uptime: '99.95%',
      },
      {
        name: 'orderOS',
        url: 'https://order.eatos.com',
        status: 'operational',
        uptime: '99.98%',
      },
    ],
  },
  {
    name: 'Application Services',
    systems: [
      { name: 'Point of Sale', url: 'https://pos.eatos.com', status: 'operational', uptime: '99.99%' },
      {
        name: 'Kitchen Display System',
        url: 'https://kds.eatos.com',
        status: 'operational',
        uptime: '99.97%',
      },
      {
        name: 'Payments',
        url: 'https://payments.eatos.com',
        status: 'operational',
        uptime: '99.99%',
      },
    ],
  },
  {
    name: 'Backend Services',
    systems: [
      { name: 'Attendance API', status: 'operational', uptime: '99.99%' },
      { name: 'Roles API', status: 'operational', uptime: '99.99%' },
      { name: 'Mobile API', status: 'operational', uptime: '99.99%' },
      { name: 'Reports API', status: 'operational', uptime: '99.98%' },
      { name: 'Menus API', status: 'operational', uptime: '99.99%' },
      { name: 'Merchants API', status: 'operational', uptime: '99.99%' },
      { name: 'Users API', status: 'operational', uptime: '99.99%' },
      { name: 'Orders API', status: 'operational', uptime: '99.99%' },
      { name: 'Browser API', status: 'operational', uptime: '99.97%' },
      { name: 'Notifications API', status: 'operational', uptime: '99.98%' },
      { name: 'Customers API', status: 'operational', uptime: '99.99%' },
      { name: 'Payments API', status: 'operational', uptime: '99.99%' },
      { name: 'Websockets API', status: 'operational', uptime: '99.96%' },
    ],
  },
  {
    name: 'Notification Services',
    systems: [
      { name: 'Firebase', status: 'operational', uptime: '99.99%' },
      { name: 'Resend email service', status: 'operational', uptime: '99.95%' },
    ],
  },
];

export const systems: SystemEntry[] = systemGroups.flatMap((g) => g.systems);

export const statusMeta: Record<
  SystemStatus,
  { label: string; dot: string; text: string }
> = {
  operational: { label: 'Operational', dot: 'bg-emerald-500', text: 'text-emerald-400' },
  degraded: { label: 'Degraded Performance', dot: 'bg-amber-500', text: 'text-amber-400' },
  outage: { label: 'Major Outage', dot: 'bg-red-500', text: 'text-red-400' },
  maintenance: { label: 'Under Maintenance', dot: 'bg-blue-500', text: 'text-blue-400' },
};

const severity: Record<SystemStatus, number> = {
  operational: 0,
  maintenance: 1,
  degraded: 2,
  outage: 3,
};

export function overallStatus(list: SystemEntry[] = systems): SystemStatus {
  return list.reduce<SystemStatus>(
    (worst, s) => (severity[s.status] > severity[worst] ? s.status : worst),
    'operational',
  );
}

export function overallHeaderColor(list: SystemEntry[] = systems): string {
  const worst = overallStatus(list);
  if (worst === 'operational') return 'text-green-500';
  if (worst === 'maintenance') return 'text-blue-500';
  if (worst === 'degraded') return 'text-yellow-500';
  return 'text-red-500';
}
