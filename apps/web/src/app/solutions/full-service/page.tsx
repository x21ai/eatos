// @ts-nocheck
import FullServiceClient from "./FullServiceClient";

export const metadata = {
  title: "Full-Service Restaurant Point of Sale | eatOS",
  description:
    "Full-service restaurant Point of Sale with reservations, table management and order coursing, online and offline, in one cloud platform.",
  openGraph: {
    title: "Full-Service Restaurant Point of Sale | eatOS",
    description:
      "Reservations, table management, coursing, tableside pay and kitchen displays for full-service restaurants, all on eatOS.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function FullServicePage() {
  return <FullServiceClient />;
}
