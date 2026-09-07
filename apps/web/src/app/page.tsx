// @ts-nocheck
import HomeClient from './HomeClient';

export const metadata = {
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
  },
};

export default function Page() {
  return <HomeClient />;
}
