// @ts-nocheck
import CompetitorClient from './CompetitorClient';
import { competitorSlugs, getCompetitor } from '../competitors';

export function generateStaticParams() {
  return competitorSlugs.map((competitor) => ({ competitor }));
}

export async function generateMetadata({ params }) {
  const { competitor } = await params;
  const data = getCompetitor(competitor);
  const name = data ? data.name : 'Other POS';
  const title = `eatOS vs ${name}: Restaurant POS Comparison`;
  const description = `Compare eatOS with ${name} across AI integration, kitchen display, self service kiosk, workforce management, offline mode and 4G backup.`;
  return {
    title: `eatOS vs ${name}`,
    description,
    openGraph: { type: 'website', title, description },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function CompetitorComparisonPage({ params }) {
  const { competitor } = await params;
  return <CompetitorClient slug={competitor} />;
}