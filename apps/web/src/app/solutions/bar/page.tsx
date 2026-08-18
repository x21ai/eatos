// @ts-nocheck
import BarClient from "./BarClient";

export const metadata = {
  title: "Point of Sale System for Bars and Nightclubs | eatOS",
  description:
    "Bar Point of Sale with fast tab management, card on file, real-time keg and bottle inventory, and built-in age verification.",
  openGraph: {
    title: "Point of Sale System for Bars and Nightclubs | eatOS",
    description:
      "Open and close tabs in seconds, track pours in real time, and verify IDs at the door, all on eatOS.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function BarPage() {
  return <BarClient />;
}
