// @ts-nocheck
import QuickServiceClient from "./QuickServiceClient";

export const metadata = {
  title: "Quick Service POS | eatOS Restaurant Technology Cloud",
  description:
    "A versatile Point of Sale for quick-service and fast-casual restaurants — counter, kiosk, handheld and online orders in one cloud platform.",
  openGraph: {
    title: "Quick Service POS | eatOS Restaurant Technology Cloud",
    description:
      "Keep the line moving with eatOS quick-service POS — online and offline ordering, kiosks, KDS and analytics in one platform.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function QuickServicePage() {
  return <QuickServiceClient />;
}
