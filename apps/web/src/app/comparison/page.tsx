// @ts-nocheck
import ComparisonClient from './ComparisonClient';

const title = 'eatOS vs Other POS Software: Complete Comparison';
const description =
  'Compare eatOS with Square, Toast, Lightspeed, SpotOn, TouchBistro, Revel and Micros across AI integration, kitchen display, kiosk, workforce management, offline mode and 4G backup.';

export const metadata = {
  title: 'Comparison',
  description,
  openGraph: { type: 'website', title, description },
  twitter: { card: 'summary_large_image', title, description },
};

export default function ComparisonPage() {
  return <ComparisonClient />;
}
