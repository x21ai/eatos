// @ts-nocheck
import { MessageSquare, ArrowRight } from "lucide-react";
import { SectionLabel } from "../SectionLabel";
import { StatRow } from "../StatRow";
import { Card } from "../Card";
import { Reveal } from "../Reveal";
import { BotMiniIcon } from "../Icons";

export function MayaSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal id="maya-left">
            <div>
              <SectionLabel>MAYA</SectionLabel>
              <h2 className="mt-5 text-4xl md:text-6xl font-bold tracking-tighter leading-[1.05]">
                Ask anything.
                <br />
                Get answers.
              </h2>
              <p className="mt-6 text-lg md:text-xl text-[#9CA3AF] leading-relaxed max-w-xl">
                Maya is your AI operations co-pilot. She doesn't guess. She
                knows your data and explains what's happening.
              </p>

              <div className="mt-8 flex flex-col gap-3">
                {[
                  "Why are refunds up this week?",
                  "Which items slow down the kitchen?",
                  "What's causing payment failures?",
                ].map((q) => (
                  <div
                    key={q}
                    className="inline-flex items-center gap-3 w-fit px-4 py-3 rounded-2xl bg-[#111827] border border-white/10 text-[#E5E7EB]"
                  >
                    <MessageSquare size={18} className="text-[#A855F7]" />
                    <span className="text-[15px] md:text-[16px]">{q}</span>
                  </div>
                ))}
              </div>

              <StatRow
                stats={[
                  { value: "< 3s", label: "Response time" },
                  { value: "100%", label: "Grounded in your data" },
                ]}
              />
            </div>
          </Reveal>

          <Reveal id="maya-right">
            <Card className="p-5 sm:p-6 md:p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center">
                    <BotMiniIcon />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Maya</div>
                    <div className="text-xs text-[#9CA3AF]">
                      Operational Intelligence
                    </div>
                  </div>
                </div>
                <div className="text-xs text-[#9CA3AF]">Live</div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl px-4 py-3 bg-black/30 border border-white/10">
                    <div className="text-[14px] md:text-[15px] text-[#E5E7EB]">
                      Why did we have so many voids last night?
                    </div>
                  </div>
                </div>

                <div className="flex justify-start">
                  <div className="max-w-[90%] rounded-2xl px-4 py-3 bg-gradient-to-b from-[#111827] to-black/30 border border-[#A855F7]/30">
                    <div className="text-[14px] md:text-[15px] text-[#E5E7EB] leading-relaxed">
                      12 voids were recorded between 7–9pm, primarily on Table
                      4. 8 were server-initiated corrections on modifier errors.
                      Consider adding a confirmation step for complex orders.
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href="/admin/blog"
                  className="inline-flex items-center gap-2 text-[14px] font-medium text-white/90 hover:text-white transition-colors"
                >
                  View void report <ArrowRight size={16} />
                </a>
                <div className="mt-2 text-xs text-[#9CA3AF]">
                  (Demo link: point this to your reports when ready)
                </div>
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
