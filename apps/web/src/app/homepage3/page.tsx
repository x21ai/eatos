// @ts-nocheck
'use client';

import { HeroVideoSection } from './sections/HeroVideoSection';
import { CustomerShowcase } from '@/components/marketing/CustomerShowcase';
import { NewsletterSection } from '@/components/NewsletterSection';
import { DemoRailSection } from '../components/DemoRailSection';
import { OnePlatformSection } from './sections/OnePlatformSection';
import { ServiceModelsSection } from './sections/ServiceModelsSection';
import { HardwareSection } from './sections/HardwareSection';
import { AIIntelligenceSection } from './sections/AIIntelligenceSection';
import { ROISection } from './sections/ROISection';
import { SwitchingSection } from './sections/SwitchingSection';
import { FinalCTASection } from './sections/FinalCTASection';

export default function Homepage3() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white font-sans text-black">
      <HeroVideoSection />
      <CustomerShowcase />
      <OnePlatformSection />
      <DemoRailSection
        title="How it Works"
        description="Move through the platform product by product and watch the whole service flow, from the first check to the closing report."
        showLabel={false}
      />
      <ServiceModelsSection />
      <HardwareSection />
      <AIIntelligenceSection />
      <ROISection />
      <SwitchingSection />
      <FinalCTASection />
      <NewsletterSection />
    </div>
  );
}
