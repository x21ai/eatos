// @ts-nocheck
import EnterpriseClient from "./EnterpriseClient";
import { marketingMetadata } from '@/lib/seo';

const pageTitle = 'eatOS Enterprise Restaurant Point of Sale';
const pageDescription = 'eatOS enterprise point of sale for multi-location payments, workforce, and real-time reporting.';

export const metadata = marketingMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/enterprise-pos',
});
export default function EnterprisePage() {
  return <EnterpriseClient />;
}