// @ts-nocheck
import MediaKitClient from './MediaKitClient';

export const metadata = {
  title: 'Media Kit',
  description:
    'Download eatOS brand guidelines, logos, icons, emblem and approved product and lifestyle imagery for press, partners and marketing teams.',
  openGraph: {
    title: 'Media Kit | eatOS',
    description:
      'eatOS brand guidelines, logos, icons, emblem and approved imagery for press and partners.',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
};

export default function MediaKitPage() {
  return <MediaKitClient />;
}
