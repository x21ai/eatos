// @ts-nocheck
import { Clock, Users, TrendingUp, CircleDollarSign } from "lucide-react";

// TODO: Replace these illustrative values with real aggregate data from the analytics API
// when customer performance data is available. Do not invent or assume these numbers.
export const stats = [
  {
    value: "Hours",
    unit: " back",
    label: "Saved per week on admin tasks",
    icon: Clock,
  },
  {
    value: "Higher",
    unit: "",
    label: "Staff satisfaction vs. previous POS",
    icon: Users,
  },
  {
    value: "More",
    unit: "",
    label: "Table turns during peak service",
    icon: TrendingUp,
  },
  {
    value: "Bigger",
    unit: "",
    label: "Average check size with upsell AI",
    icon: CircleDollarSign,
  },
];
