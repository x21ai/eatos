// @ts-nocheck
'use client';

import {
  ArrowRight,
  Bot,
  Cpu,
  Zap,
  BarChart3,
  Clock,
  Sparkles,
  Brain,
  Network,
  Phone,
  MessageSquare,
  LayoutDashboard,
  CloudRain,
} from 'lucide-react';

import { RevealProvider } from '@/components/AIIntelligence/Reveal';
import { MayaSection } from '@/components/AIIntelligence/sections/MayaSection';
import { AgentsSection } from '@/components/AIIntelligence/sections/AgentsSection';
import { VoiceOSSection } from '@/components/AIIntelligence/sections/VoiceOSSection';
import { KitchenIntelligenceSection } from '@/components/AIIntelligence/sections/KitchenIntelligenceSection';
import { PaymentsIntelligenceSection } from '@/components/AIIntelligence/sections/PaymentsIntelligenceSection';
import { EdgeOSSection } from '@/components/AIIntelligence/sections/EdgeOSSection';
import { RitualIntelligenceSection } from '@/components/AIIntelligence/sections/RitualIntelligenceSection';
import { ROISection } from '@/components/AIIntelligence/sections/ROISection';
import { FinalCTASection } from '@/components/AIIntelligence/sections/FinalCTASection';

export default function AIPage() {
  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-blue-500/30">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Dark Gradient Background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-zinc-900 via-black to-black" />

        <div className="site-container relative z-10 py-24 md:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-xs sm:text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Sparkles size={16} className="shrink-0 text-blue-400" />
              <span className="text-blue-100">
                Introducing <strong>eatOS</strong> Intelligence
              </span>
            </div>

            <h1 className="text-[3rem] sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[1.05] animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                Invisible
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-blue-400 to-purple-600">
                Intelligence.
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-white/70 mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed font-light animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              The first AI that runs your restaurant. Predicts demand, optimizes labor, and
              personalizes service, all without you lifting a finger.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-400">
              <a
                href="/book-demo"
                className="group relative px-7 py-3.5 bg-white text-black rounded-full text-base sm:text-lg font-semibold hover:scale-[1.02] transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start Free Trial{' '}
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Glass Cards Section */}
      <section className="py-20 md:py-28 bg-black relative">
        <div className="site-container">
          <div className="mb-12 md:mb-16 max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 leading-[1.05]">
              It doesn't just analyze. <br />
              <span className="text-white/45">It acts.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: 'Predictive Staffing',
                desc: 'Analyzes weather, events, and historical data to generate the perfect schedule automatically.',
                color: 'blue',
              },
              {
                icon: Network,
                title: 'Inventory Autopilot',
                desc: 'Tracks every gram of ingredient used and places orders with suppliers before you run low.',
                color: 'purple',
              },
              {
                icon: Bot,
                title: 'Guest DNA',
                desc: 'Recognizes returning guests and prompts servers with their favorite orders and allergies.',
                color: 'green',
              },
            ].map((feature, i) => {
              const glow = {
                blue: 'bg-blue-500/10',
                purple: 'bg-purple-500/10',
                green: 'bg-emerald-500/10',
              }[feature.color];
              const iconTone = {
                blue: 'text-blue-400',
                purple: 'text-purple-400',
                green: 'text-emerald-400',
              }[feature.color];
              return (
                <div
                  key={i}
                  className="group relative p-6 md:p-8 rounded-[1.75rem] bg-zinc-900/40 border border-white/10 hover:bg-zinc-900/60 transition-all duration-500 overflow-hidden"
                >
                  <div
                    className={`absolute top-0 right-0 w-64 h-64 ${glow} blur-[80px] rounded-full transition-all duration-500`}
                  />

                  <div className="relative z-10">
                    <div
                      className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-zinc-800/50 flex items-center justify-center mb-6 ${iconTone} group-hover:scale-110 transition-transform duration-500`}
                    >
                      <feature.icon size={26} />
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed text-base md:text-lg group-hover:text-white/85 transition-colors">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Deep Dive */}
      <section className="py-20 md:py-28 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16">
            <div className="min-w-0 space-y-6 md:space-y-8">
              <div className="inline-flex items-center gap-2 text-purple-400 font-medium tracking-wide uppercase text-xs sm:text-sm">
                <Sparkles size={14} className="shrink-0" /> Neural Engine
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.05]">
                Your restaurant's central nervous system.
              </h2>
              <p className="text-base md:text-xl text-white/70 leading-relaxed max-w-xl">
                <strong>eatOS</strong> Intelligence isn't a report you read once a month. It's a
                live, thinking system that makes thousands of micro-decisions daily to optimize your
                margins.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10">
                <div className="min-w-0">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
                  <div className="text-sm text-white/60">Monitoring</div>
                </div>
                <div className="min-w-0">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">0.2s</div>
                  <div className="text-sm text-white/60">Response Time</div>
                </div>
              </div>
            </div>


            <div className="min-w-0 w-full">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/50 backdrop-blur-sm">
                {/* Simulated UI or Abstract Vis */}
                <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(to_bottom,transparent,black)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64">
                    <div className="absolute inset-0 bg-blue-500/30 rounded-full animate-pulse blur-3xl" />
                    <div className="absolute inset-0 bg-purple-500/30 rounded-full animate-pulse blur-3xl delay-700 translate-x-10" />
                    <div className="relative z-10 w-full h-full border border-white/10 bg-black/40 backdrop-blur-xl rounded-full flex items-center justify-center">
                      <Cpu size={64} className="text-white/80" />
                    </div>

                    {/* Orbiting Elements */}
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="absolute top-1/2 left-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_20px_white]"
                        style={{
                          transform: `rotate(${i * 90}deg) translateX(140px)`,
                          animation: `orbit 10s linear infinite`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RevealProvider>
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

      <style jsx global>{`
        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(140px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(140px) rotate(-360deg);
          }
        }
      `}</style>
    </div>
  );
}
