// @ts-nocheck
'use client';

import { ArrowRight, Sparkles } from 'lucide-react';

export function ClosingCTASection() {
  return (
    <section className="bg-black py-20 md:py-28">
      <div className="site-container">
        <div className="grid grid-cols-1 items-center gap-10 rounded-3xl border border-white/10 bg-[#0b0b0d] p-8 md:grid-cols-2 md:gap-16 md:p-14">
          <div>
            <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl">
              Bring us the
              <br />
              hard part.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-zinc-400 md:text-lg">
              Tell us how service runs today and we will show you the shortest path onto eatOS,
              including what stays, what changes and what it costs.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
            <a
              href="/bookademo"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-white px-7 py-3.5 text-base font-semibold text-black transition-transform hover:scale-[1.02]"
            >
              Book a Demo <ArrowRight size={18} />
            </a>
            <a
              href="/ai"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/20 px-7 py-3.5 text-base font-medium text-white transition-colors hover:border-white/40 hover:bg-white/10"
            >
              <Sparkles size={18} /> Explore Intelligence
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
