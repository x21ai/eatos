// @ts-nocheck
'use client';

import { HeroSection } from './sections/HeroSection';
import { SocialProofSection } from './sections/SocialProofSection';
import { OnePlatformSection } from './sections/OnePlatformSection';
import { AIIntelligenceSection } from './sections/AIIntelligenceSection';
import { HardwareSection } from './sections/HardwareSection';
import { FullPlatformSection } from './sections/FullPlatformSection';
import { ServiceModelsSection } from './sections/ServiceModelsSection';
import { ROISection } from './sections/ROISection';
import { EnterpriseSection } from './sections/EnterpriseSection';
import { SwitchingSection } from './sections/SwitchingSection';
import { KitchenDisplaySection } from './sections/KitchenDisplaySection';
import { FinalCTASection } from './sections/FinalCTASection';

export default function Homepage2() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-black selection:bg-indigo-500/20 font-sans overflow-x-hidden">
      <HeroSection />
      <SocialProofSection />
      <OnePlatformSection />
      <AIIntelligenceSection />
      <HardwareSection />
      <FullPlatformSection />
      <ServiceModelsSection />
      <ROISection />
      <EnterpriseSection />
      <SwitchingSection />
      <KitchenDisplaySection />
      <FinalCTASection />
    </div>
  );
}
