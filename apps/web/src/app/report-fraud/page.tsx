// @ts-nocheck
import ReportFraudClient from "./ReportFraudClient";

export const metadata = {
  title: "Report Fraud | eatOS Trust & Safety",
  description:
    "Report fraud, phishing emails or suspicious account activity to the eatOS fraud prevention team, and learn how to protect your restaurant and guests.",
  openGraph: {
    title: "Report Fraud | eatOS Trust & Safety",
    description:
      "Recognize phishing, protect sensitive information and report fraudulent activity to the eatOS fraud prevention team.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function ReportFraudPage() {
  return <ReportFraudClient />;
}
