// @ts-nocheck
import PizzeriaClient from "./PizzeriaClient";

export const metadata = {
  title: "Pizzeria Point of Sale",
  description:
    "A Point of Sale built for pizzerias, fast pizza builder modifiers, delivery dispatch, online ordering, kitchen display and recipe-level inventory in one cloud platform.",
  openGraph: {
    title: "Pizzeria Point of Sale | RESTAURANT TECHNOLOGY CLOUD",
    description:
      "Run your pizzeria on eatOS, custom pizza builds in seconds, delivery and pickup in one queue, and true cost per pie.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function PizzeriaPage() {
  return <PizzeriaClient />;
}
