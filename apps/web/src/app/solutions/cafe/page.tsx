// @ts-nocheck
import CafeClient from "./CafeClient";

export const metadata = {
  title: "Point of Sale System for Cafes | eatOS",
  description:
    "Cafe Point of Sale that is easy to learn, with menu and inventory control, employee management and self-service kiosk ordering.",
  openGraph: {
    title: "Point of Sale System for Cafes | eatOS",
    description:
      "Fast order entry, modifiers, inventory control, loyalty and kiosk ordering for cafes and coffee shops, all on eatOS.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function CafePage() {
  return <CafeClient />;
}
