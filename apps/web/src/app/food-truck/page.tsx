// @ts-nocheck
import FoodTruckClient from "./FoodTruckClient";

export const metadata = {
  alternates: { canonical: '/food-truck' },
  title: "Point of Sale System for Food Trucks",
  description:
    "Food truck Point of Sale built for mobile service: compact hardware, fast tap payments, live inventory and offline ready order taking.",
  openGraph: {
    url: '/food-truck',
    title: "Point of Sale System for Food Trucks | eatOS",
    description:
      "Clear long queues, track inventory and take payments anywhere you park with the eatOS food truck Point of Sale.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function FoodTruckPage() {
  return <FoodTruckClient />;
}
