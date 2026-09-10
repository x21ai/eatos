// @ts-nocheck
'use client';

import { ArrowRight } from 'lucide-react';
import { TabletMockup } from '../../components/TabletMockup';
import { demoSources } from '../../components/demoSources';

const kiosk = demoSources.find((d) => d.id === 'kiosk');

export function PlatformMockupSection() {
  return (
    <section className="bg-[#07070a] py-20 md:py-28">
      <div className="site-container">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          <div className="h-[420px] md:h-[560px]">
            {kiosk?.media ? (
              <TabletMockup
                sources={kiosk.media.sources}
                poster={kiosk.media.poster}
                label={kiosk.media.caption}
                orientation="portrait"
              />
            ) : null}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Our platform
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl">
              The hardware comes
              <br />
              with the software.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-zinc-400 md:text-lg">
              Kiosks, terminals, handhelds, kitchen screens and guest displays ship configured for
              your menu and run the same eatOS build, so nothing on the floor is a separate system
              to learn or maintain.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/hardware"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.02]"
              >
                See hardware <ArrowRight size={16} />
              </a>
              <a
                href="/kiosk"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/40 hover:bg-white/10"
              >
                Self Service Kiosk
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
