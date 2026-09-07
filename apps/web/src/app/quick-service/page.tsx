// @ts-nocheck
import QuickServiceClient from "./QuickServiceClient";

export const metadata = {
  alternates: { canonical: '/quick-service' },
  title: "Quick Service Point of Sale",
  description:
    "A versatile Point of Sale for quick-service and fast-casual restaurants, counter, kiosk, handheld and online orders in one cloud platform.",
  openGraph: {
    url: '/quick-service',
    title: "Quick Service Point of Sale | RESTAURANT TECHNOLOGY CLOUD",
    description:
      "Keep the line moving with eatOS quick-service Point of Sale, online and offline ordering, kiosks, KDS and analytics in one platform.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function QuickServicePage() {
  return <QuickServiceClient />;
}
