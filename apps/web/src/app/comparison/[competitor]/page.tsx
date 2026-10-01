// @ts-nocheck
import { notFound } from 'next/navigation';
import CompetitorClient from './CompetitorClient';
import { competitorSlugs, getCompetitor } from '../competitors';
import { marketingMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return competitorSlugs.map((competitor) => ({ competitor }));
}

export async function generateMetadata({ params }) {
  const { competitor } = await params;
  const data = getCompetitor(competitor);
  if (!data) notFound();
  const title = `eatOS vs ${data.name} | Restaurant Point of Sale`;
  const description = `Compare eatOS and ${data.name} restaurant point of sale systems: kitchen display, kiosk, workforce, offline mode, and 4G backup.`;
  return marketingMetadata({
    title,
    description,
    path: `/eatos-vs-${competitor}`,
  });
}

export default async function CompetitorComparisonPage({ params }) {
  const { competitor } = await params;
  if (!getCompetitor(competitor)) notFound();
  return <CompetitorClient slug={competitor} />;
}