// @ts-nocheck
import { Phone, Check, ArrowRight } from "lucide-react";
import { SectionLabel } from "../SectionLabel";
import { StatRow } from "../StatRow";
import { Card } from "../Card";
import { Reveal } from "../Reveal";

export function VoiceOSSection() {
  return (
    <section className="py-20 md:py-28 overflow-hidden">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal id="voice-left" className="order-2 lg:order-1">
            <Card className="p-5 sm:p-7 md:p-10 relative overflow-hidden">
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#8B5CF6]/20 blur-[80px] rounded-full" />
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#A855F7]/20 blur-[80px] rounded-full" />

              <div className="relative">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center">
                    <Phone size={22} className="text-[#A855F7]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">VoiceOS</div>
                    <div className="text-xs text-[#9CA3AF]">
                      Phone + in-store voice
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-[68%] bg-gradient-to-r from-[#8B5CF6] to-[#A855F7]" />
                  </div>
                  <div className="mt-3 text-xs text-[#9CA3AF]">
                    Live call waveform (mock)
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  {[
                    "Caller: I'd like to place an order.",
                    "VoiceOS: Great! What can I get started for you?",
                    "Caller: Add extra avocado and make it gluten-free.",
                    "VoiceOS: Done. Want to pay now or at pickup?",
                  ].map((line) => (
                    <div
                      key={line}
                      className="text-[13px] md:text-[14px] text-white/80 bg-black/30 border border-white/10 rounded-2xl px-4 py-3"
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </Reveal>

          <Reveal id="voice-right" className="order-1 lg:order-2">
            <div>
              <SectionLabel>VOICEOS</SectionLabel>
              <h2 className="mt-5 text-4xl md:text-6xl font-bold tracking-tighter leading-[1.05]">
                It answers the phone.
                <br />
                Takes the order.
              </h2>
              <p className="mt-6 text-lg md:text-xl text-[#9CA3AF] leading-relaxed max-w-xl">
                VoiceOS handles calls with natural conversation. Understands
                accents, modifications, and context. Processes payments. Sends
                confirmations. Works 24/7.
              </p>

              <div className="mt-8 grid gap-3">
                {[
                  "Answers in your restaurant's voice",
                  "Handles reservations and orders",
                  "Sends SMS confirmations",
                  "Works in noisy environments",
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
                  { value: "95%", label: "Accuracy" },
                  { value: "40%", label: "Faster than manual" },
                  { value: "24/7", label: "Availability" },
                ]}
              />

              <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
                <a
                  href="/book-demo"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full border border-white/20 text-white/90 hover:text-white hover:border-white/35 hover:bg-white/5 transition-all"
                >
                  Try the demo <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
