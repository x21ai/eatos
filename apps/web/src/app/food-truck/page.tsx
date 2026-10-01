// @ts-nocheck
import FoodTruckClient from "./FoodTruckClient";
import { marketingMetadata } from '@/lib/seo';

const pageTitle = 'eatOS Food Truck Point of Sale';
const pageDescription = 'eatOS food truck point of sale with compact hardware, tap payments, live inventory, and offline order taking.';

export const metadata = marketingMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/food-truck',
});
export default function FoodTruckPage() {
  return <FoodTruckClient />;
}
