// @ts-nocheck
import CateringClient from "./CateringClient";

export const metadata = {
  title: "Catering Point of Sale Solution",
  description:
    "Catering Point of Sale built for large orders: event menus, real-time ingredient inventory and CRM driven client service in one platform.",
  openGraph: {
    title: "Catering Point of Sale Solution | eatOS",
    description:
      "Handle large catering orders swiftly with custom event menus, live inventory and client CRM from eatOS.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function CateringPage() {
  return <CateringClient />;
}
