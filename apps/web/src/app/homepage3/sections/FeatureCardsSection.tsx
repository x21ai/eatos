// @ts-nocheck
'use client';

import { ArrowRight } from 'lucide-react';
import LazyVideo from '@/components/marketing/LazyVideo';
import { demoSources } from '../../components/demoSources';

const dashboard = demoSources.find((d) => d.id === 'dashboard');

export function FeatureCardsSection() {
  return (
    <section className="bg-black py-16 md:py-24">
      <div className="site-container space-y-6 md:space-y-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#d70480] via-[#a30363] to-[#3b0230] p-8 md:p-14">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Start further ahead
              </p>
              <h3 className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl">
                One flat card rate.
                <br />
                No surprise line items.
              </h3>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/80 md:text-lg">
                Every card, tap and wallet runs on the same published rate, with next day funding
                and no monthly gateway fee hidden underneath it.
              </p>
              <a
                href="/payments"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.02]"
              >
                See payments <ArrowRight size={16} />
              </a>
            </div>
            <div className="text-center md:text-right">
              <div className="text-[56px] font-bold leading-none tracking-tighter text-white md:text-[104px]">
                2.99%
              </div>
              <div className="mt-2 text-xl font-semibold text-white/80 md:text-3xl">+ 20¢</div>
              <p className="mt-3 text-sm text-white/70">per card transaction</p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white p-8 text-zinc-900 md:p-14">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Your team, your cadence
              </p>
              <h3 className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight md:text-5xl">
                Every location on
                <br />
                one live view.
              </h3>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-zinc-600 md:text-lg">
                Sales, labor, menu mix and stock update hour by hour, so a manager sees the shift
                as it happens instead of reading about it the next morning.
              </p>
              <a
                href="/analytics"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
              >
                See reporting <ArrowRight size={16} />
              </a>
            </div>
            <div className="overflow-hidden rounded-2xl bg-zinc-950 ring-1 ring-black/10">
              {dashboard?.media ? (
                <LazyVideo
                  sources={dashboard.media.sources}
                  poster={dashboard.media.poster}
                  ariaLabel={dashboard.media.caption}
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover"
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
