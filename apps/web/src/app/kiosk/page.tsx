import type { Metadata } from 'next';
import KioskClient from './KioskClient';

export const metadata: Metadata = {
  title: 'Kiosk | eatOS',
  robots: { index: false, follow: false },
};

export default function KioskPage() {
  return <KioskClient />;
}
