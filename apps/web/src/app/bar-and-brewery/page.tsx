// @ts-nocheck
import BarClient from "./BarClient";
import { marketingMetadata } from '@/lib/seo';

const pageTitle = 'eatOS Bar and Brewery Point of Sale';
const pageDescription = 'eatOS bar point of sale with fast tabs, card on file, keg and bottle inventory, and age verification.';

export const metadata = marketingMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/bar-and-brewery',
});
export default function BarPage() {
  return <BarClient />;
}
