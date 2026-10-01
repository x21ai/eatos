// @ts-nocheck
import { marketingMetadata } from '@/lib/seo';
const pageTitle = 'eatOS Restaurant Point of Sale Demo';
const pageDescription = 'Book a walkthrough of the eatOS restaurant point of sale, payments, kitchen display, and kiosk.';

export const metadata = marketingMetadata({
  title: pageTitle,
  description: pageDescription,
  path: 'https://eatos.com/book-demo',
});
export default function BookDemoLayout({ children }) {
  return (
    <>
      <link rel="preconnect" href="https://meetings.hubspot.com" />
      <link rel="dns-prefetch" href="https://meetings.hubspot.com" />
      {children}
    </>
  );
}
