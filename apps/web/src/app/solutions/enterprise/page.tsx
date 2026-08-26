// @ts-nocheck
import EnterpriseClient from "./EnterpriseClient";

export const metadata = {
  title: "Enterprise Restaurant Point of Sale",
  description:
    "Enterprise Point of Sale from eatOS: streamline transactions, manage staff and attendance, and get real-time insights across every location.",
  openGraph: {
    title: "Enterprise Restaurant Point of Sale | eatOS",
    description:
      "Run multi-property restaurant operations on one platform, with payments, workforce, business intelligence and an open API.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function EnterprisePage() {
  return <EnterpriseClient />;
}