import OfflinePosClient from './OfflinePosClient';

export const metadata = {
  title: 'Offline Point of Sale Connectivity',
  description:
    'eatOS runs on a peer-to-peer mesh network built for hospitality. Every device stays connected and in sync, with or without the internet.',
  alternates: { canonical: 'https://eatos.com/offline-point-of-sale' },
  openGraph: {
    type: 'website',
    title: 'Offline Point of Sale Connectivity | eatOS',
    description:
      'Run fully offline. Stay fully connected. Powered by the eatOS peer-to-peer mesh network and cloud sync technology.',
    url: 'https://eatos.com/offline-point-of-sale',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Offline Point of Sale Connectivity | eatOS',
    description:
      'Run fully offline. Stay fully connected. Powered by the eatOS peer-to-peer mesh network and cloud sync technology.',
  },
};

export default function OfflinePointOfSalePage() {
  return <OfflinePosClient />;
}
