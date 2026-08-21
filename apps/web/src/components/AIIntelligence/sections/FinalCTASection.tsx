// @ts-nocheck
import { ArrowRight } from "lucide-react";
import { Card } from "../Card";
import { Reveal } from "../Reveal";

export function FinalCTASection() {
  return (
    <>
      <section className="py-20 md:py-28 overflow-hidden">
        <div className="site-container">
          <Reveal id="final">
            <Card className="p-10 md:p-14 text-center overflow-hidden relative">
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-[#A855F7]/15 blur-[100px] rounded-full" />
              <div className="relative">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[1.05]">
                  Stop reading reports.
                  <br />
                  Start running smarter.
                </h2>
                <p className="mt-6 text-lg md:text-xl text-[#9CA3AF] leading-relaxed max-w-2xl mx-auto">
                  eatOS Intelligence is live. It's learning. And it's ready for
                  your restaurant.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="/get-started"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-white text-black font-semibold hover:scale-[1.02] transition-transform"
                  >
                    Start Free Trial <ArrowRight size={18} />
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full border border-white/20 text-white/90 hover:text-white hover:border-white/35 hover:bg-white/5 transition-all"
                  >
                    Watch the Film
                  </a>
                </div>
              </div>
            </Card>
          </Reveal>
        </div>
      </section>

      <div className="pb-20" />
    </>
  );
}
