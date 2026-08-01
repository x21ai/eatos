// @ts-nocheck
"use client";

import { RevealProvider } from "@/components/AIIntelligence/Reveal";
import { HeroSection } from "@/components/AIIntelligence/sections/HeroSection";
import { MayaSection } from "@/components/AIIntelligence/sections/MayaSection";
import { AgentsSection } from "@/components/AIIntelligence/sections/AgentsSection";
import { VoiceOSSection } from "@/components/AIIntelligence/sections/VoiceOSSection";
import { KitchenIntelligenceSection } from "@/components/AIIntelligence/sections/KitchenIntelligenceSection";
import { PaymentsIntelligenceSection } from "@/components/AIIntelligence/sections/PaymentsIntelligenceSection";
import { EdgeOSSection } from "@/components/AIIntelligence/sections/EdgeOSSection";
import { RitualIntelligenceSection } from "@/components/AIIntelligence/sections/RitualIntelligenceSection";
import { ROISection } from "@/components/AIIntelligence/sections/ROISection";
import { FinalCTASection } from "@/components/AIIntelligence/sections/FinalCTASection";

export default function AIIntelligenceDeepDivePage() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white font-sans selection:bg-[#8B5CF6]/30">
      <RevealProvider>
        <HeroSection />
        <MayaSection />
        <AgentsSection />
        <VoiceOSSection />
        <KitchenIntelligenceSection />
        <PaymentsIntelligenceSection />
        <EdgeOSSection />
        <RitualIntelligenceSection />
        <ROISection />
        <FinalCTASection />
      </RevealProvider>
    </div>
  );
}
