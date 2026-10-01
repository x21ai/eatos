// @ts-nocheck
import FastCasualClient from "./FastCasualClient";
import { marketingMetadata } from '@/lib/seo';

const pageTitle = 'eatOS Fast Casual Point of Sale';
const pageDescription = 'eatOS fast-casual point of sale for faster table turns, accurate orders, and counter, kiosk, and kitchen flow.';

export const metadata = marketingMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/fast-casual',
});
export default function FastCasualPage() {
  return <FastCasualClient />;
}
