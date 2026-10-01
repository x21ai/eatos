// @ts-nocheck
import PizzeriaClient from "./PizzeriaClient";
import { marketingMetadata } from '@/lib/seo';

const pageTitle = 'eatOS Pizzeria Point of Sale';
const pageDescription = 'eatOS pizzeria point of sale with pizza modifiers, delivery dispatch, online ordering, and kitchen display.';

export const metadata = marketingMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/pizzeria',
});
export default function PizzeriaPage() {
  return <PizzeriaClient />;
}
