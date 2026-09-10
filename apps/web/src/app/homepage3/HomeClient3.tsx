// @ts-nocheck
'use client';

import { NewsletterSection } from '@/components/NewsletterSection';
import { CustomerShowcase } from '@/components/marketing/CustomerShowcase';
import { HeroVideoSection } from './sections/HeroVideoSection';
import { CapabilityListSection } from './sections/CapabilityListSection';
import { FeatureCardsSection } from './sections/FeatureCardsSection';
import { ProofSection } from './sections/ProofSection';
import { ExpertiseTabsSection } from './sections/ExpertiseTabsSection';
import { PlatformMockupSection } from './sections/PlatformMockupSection';
import { EconomicsGradientSection } from './sections/EconomicsGradientSection';
import { FaqSection } from './sections/FaqSection';
import { InsightsSection } from './sections/InsightsSection';
import { ClosingCTASection } from './sections/ClosingCTASection';

/**
 * Homepage variant D. Built to the layout rhythm of the reference the team
 * shared: dark video hero, light capability band, dark feature cards, light
 * proof band, dark concept picker, dark platform mockup, bright gradient
 * economics band, light FAQ and insights, then the dark closing call to action.
 * All copy, imagery and data come from existing eatOS sources.
 */
export default function HomeClient3() {
  return (
    <main className="bg-black text-white">
      <HeroVideoSection />
      <CapabilityListSection />
      <FeatureCardsSection />
      <ProofSection />
      <ExpertiseTabsSection />
      <PlatformMockupSection />
      <EconomicsGradientSection />
      <FaqSection />
      <InsightsSection />
      <ClosingCTASection />
      <NewsletterSection />
    </main>
  );
}
