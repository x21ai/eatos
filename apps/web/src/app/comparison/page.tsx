// @ts-nocheck
import ComparisonClient from './ComparisonClient';

const title = 'eatOS vs Other Point of Sale Software: Complete Comparison';
const description =
  'Compare eatOS with Square, Toast, Lightspeed, SpotOn, TouchBistro, Revel and Micros across AI integration, kitchen display, kiosk, workforce management, offline mode and 4G backup.';

export const metadata = {
  title: 'Comparison',
  description,
  alternates: { canonical: '/eatos-vs-other-pos-software' },
  openGraph: { type: 'website', title, description, url: '/eatos-vs-other-pos-software' },
  twitter: { card: 'summary_large_image', title, description },
};

export default function ComparisonPage() {
  return <ComparisonClient />;
}
