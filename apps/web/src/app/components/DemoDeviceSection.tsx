'use client';

import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { demoSources } from './demoSources';

const frames = {
  phone: 'w-[300px] sm:w-[340px] aspect-[9/17] rounded-[2.25rem] p-2.5',
  tablet: 'w-full max-w-[620px] aspect-[4/3] rounded-[1.75rem] p-3',
  laptop: 'w-full max-w-[860px] aspect-[16/10] rounded-xl p-2.5',
};

export function DemoDeviceSection() {
  const [activeId, setActiveId] = useState(demoSources[0].id);
  const demo = demoSources.find((d) => d.id === activeId) ?? demoSources[0];

  return (
    <section className="py-12 md:py-16 bg-black border-t border-white/5">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8 lg:px-10">
        <div className="text-center mb-8">
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-emerald-400 mb-3">
            Option D, Device showcase
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-white">
            How it Works
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Every eatOS product shown on the hardware it actually runs on, live and fully interactive in your browser.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div
            className={`relative bg-zinc-900 border border-white/15 shadow-2xl ${frames[demo.device]}`}
          >
            {demo.device === 'phone' && (
              <div className="absolute left-1/2 -translate-x-1/2 top-1.5 h-1.5 w-16 rounded-full bg-white/20" />
            )}
            <div
              className={`relative w-full h-full overflow-hidden bg-black ${
                demo.device === 'phone' ? 'rounded-[1.75rem]' : 'rounded-lg'
              }`}
            >
              <iframe
                key={demo.id}
                src={demo.url}
                title={demo.label}
                className="absolute inset-0 w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                allow="fullscreen"
                loading="lazy"
              />
            </div>
          </div>

          {demo.device === 'laptop' && (
            <div className="h-2.5 w-[92%] max-w-[920px] rounded-b-xl bg-zinc-800 border-x border-b border-white/10" />
          )}

          <div className="mt-6 text-center">
            <div className="text-lg font-bold tracking-tighter text-white">{demo.label}</div>
            <p className="text-sm text-gray-400 mt-1">{demo.blurb}</p>
            <a
              href={demo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm text-gray-300 hover:text-white transition-colors"
            >
              <ExternalLink size={14} />
              Open full demo
            </a>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2 max-w-3xl">
            {demoSources.map((d) => {
              const active = d.id === activeId;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setActiveId(d.id)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? 'bg-white text-black border-white'
                      : 'bg-zinc-900/60 border-white/10 text-gray-400 hover:text-white hover:border-white/30'
                  }`}
                >
                  {d.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
