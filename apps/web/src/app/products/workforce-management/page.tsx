// @ts-nocheck
import WorkforcePageClient from './WorkforcePageClient';

export const metadata = {
  title: 'Workforce Management | eatOS Restaurant Technology Cloud',
  description:
    'eatOS Workforce Management simplifies scheduling, GPS time clock, shift swapping, overtime alerts and payroll sync for restaurant teams.',
  openGraph: {
    type: 'website',
    title: 'Workforce Management | eatOS',
    description:
      'Simplify scheduling, attendance and payroll for your restaurant team with eatOS Workforce Management.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Workforce Management | eatOS',
    description:
      'Simplify scheduling, attendance and payroll for your restaurant team with eatOS Workforce Management.',
  },
};

export default function WorkforceManagementPage() {
  return <WorkforcePageClient />;
}
