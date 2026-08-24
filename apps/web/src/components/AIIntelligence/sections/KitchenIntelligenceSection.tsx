// @ts-nocheck
import { CookingPot, Check } from "lucide-react";
import { SectionLabel } from "../SectionLabel";
import { StatRow } from "../StatRow";
import { Card } from "../Card";
import { Reveal } from "../Reveal";

export function KitchenIntelligenceSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal id="kitchen-left">
            <div>
              <SectionLabel>KITCHEN INTELLIGENCE</SectionLabel>
              <h2 className="mt-5 text-4xl md:text-6xl font-bold tracking-tighter leading-[1.05]">
                Sees the bottleneck
                <br />
                before you feel it.
              </h2>
              <p className="mt-6 text-lg md:text-xl text-[#9CA3AF] leading-relaxed max-w-xl">
                Not a timer. Pattern recognition across every shift. Learns
                which items break your flow, which stations fall behind.
              </p>

              <div className="mt-8 grid gap-3">
                {[
                  "Real-time ticket flow analysis",
                  "Station load balancing",
                  "Prep timing breakdown detection",
                  "Menu item disruption scoring",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 text-[15px] text-white/90"
                  >
                    <div className="mt-0.5 w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                      <Check size={14} className="text-[#A855F7]" />
                    </div>
                    <span className="text-[#E5E7EB]">{item}</span>
                  </div>
                ))}
              </div>

              <StatRow
                stats={[
                  { value: "22%", label: "Faster ticket times" },
                  { value: "< 50ms", label: "Decision latency" },
                  { value: "1000s", label: "Patterns learned per week" },
                ]}
              />
            </div>
          </Reveal>

          <Reveal id="kitchen-right">
            <Card className="p-5 sm:p-6 md:p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center">
                    <CookingPot size={20} className="text-[#A855F7]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">KDS</div>
                    <div className="text-xs text-[#9CA3AF]">
                      Live station view (mock)
                    </div>
                  </div>
                </div>
                <div className="text-xs text-[#9CA3AF]">Now</div>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  { title: "Station A", note: "OK", color: "bg-emerald-500" },
                  {
                    title: "Station B",
                    note: "Bottleneck",
                    color: "bg-[#A855F7]",
                  },
                  {
                    title: "Station C",
                    note: "Building",
                    color: "bg-amber-500",
                  },
                ].map((row) => (
                  <div
                    key={row.title}
                    className="flex items-center justify-between px-4 py-3 rounded-2xl bg-black/30 border border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${row.color}`}
                      />
                      <div className="text-sm text-[#E5E7EB]">{row.title}</div>
                    </div>
                    <div className="text-xs text-[#9CA3AF]">{row.note}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 px-4 py-3 rounded-2xl bg-gradient-to-b from-[#111827] to-black/30 border border-[#A855F7]/30">
                <div className="text-xs uppercase tracking-wider text-[#A855F7] font-medium">
                  AI note
                </div>
                <div className="mt-2 text-[14px] text-[#E5E7EB] leading-relaxed">
                  Station B is slipping on items with modifiers. Suggest routing
                  "build-your-own" tickets to Station C between 6–8pm.
                </div>
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
