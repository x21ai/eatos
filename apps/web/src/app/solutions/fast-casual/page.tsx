// @ts-nocheck
import FastCasualClient from "./FastCasualClient";

export const metadata = {
  title: "Fast-Casual Restaurant POS System | eatOS",
  description:
    "Fast-casual Point of Sale from eatOS: faster table turnaround, accurate order fulfillment and efficient order management in one platform.",
  openGraph: {
    title: "Fast-Casual Restaurant POS System | eatOS",
    description:
      "Counter, kiosk, handheld and kitchen display in one connected system built for fast-casual restaurants.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function FastCasualPage() {
  return <FastCasualClient />;
}
