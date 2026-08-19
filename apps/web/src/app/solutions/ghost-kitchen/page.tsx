// @ts-nocheck
import GhostKitchenClient from "./GhostKitchenClient";

export const metadata = {
  title: "Point of Sale System for Ghost Kitchens | eatOS",
  description:
    "Ghost kitchen Point of Sale built for delivery: commission free online ordering, kitchen display routing and multi brand reporting in one platform.",
  openGraph: {
    title: "Point of Sale System for Ghost Kitchens | eatOS",
    description:
      "Run every virtual brand from one kitchen with commission free ordering, kitchen display routing and delivery analytics from eatOS.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function GhostKitchenPage() {
  return <GhostKitchenClient />;
}
