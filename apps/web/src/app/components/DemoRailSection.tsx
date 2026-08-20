'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { demoSources } from './demoSources';
import { TabletMockup } from './TabletMockup';

interface DemoRailSectionProps {
  title?: string;
  description?: string;
  showLabel?: boolean;
}

export function DemoRailSection({
  title = 'How it Works',
  description = 'Pick a product from the rail and the live demo loads beside it, so you can move through the whole platform quickly.',
  showLabel = true,
}: DemoRailSectionProps) {
  const [activeId, setActiveId] = useState(demoSources[0].id);
  const demo = demoSources.find((d) => d.id === activeId) ?? demoSources[0];

  const displayLabel = (id: string) => {
    switch (id) {
      case 'kds':
        return 'Kitchen Display System';
      case 'cfd':
        return 'Customer Facing Display';
      case 'kiosk':
        return 'Self Service Kiosk';
      default:
        return demoSources.find((d) => d.id === id)?.label ?? id;
    }
  };

  return (
    <section className="py-12 md:py-16 bg-black border-t border-white/5">
      <div className="site-container">
        <div className="text-center mb-8">
          {showLabel && (
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-emerald-400 mb-3">
              Option C, Side rail
            </div>
          )}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-white"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
        </div>

        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* Rail: vertical on desktop, horizontal scroll on smaller screens */}
          <div className="lg:flex-col lg:h-full flex gap-2 lg:gap-0 overflow-x-auto lg:overflow-visible scrollbar-hidden justify-start lg:justify-between">
            {demoSources.map((d) => {
              const active = d.id === activeId;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setActiveId(d.id)}
                  className={`relative shrink-0 lg:shrink text-left rounded-xl border px-4 py-3 transition-colors min-w-[190px] lg:min-w-0 lg:w-full ${
                    active
                      ? 'bg-white text-black border-white'
                      : 'bg-zinc-900/60 border-white/10 text-gray-400 hover:text-white hover:border-white/30'
                  }`}
                >
                  {active && (
                    <span className="absolute left-0 top-3 bottom-3 w-1 rounded-full bg-emerald-500 hidden lg:block" />
                  )}
                  <span className="block text-sm font-bold tracking-tighter">{displayLabel(d.id)}</span>
                  <span
                    className={`mt-1 block text-xs leading-snug ${
                      active ? 'text-black/60' : 'text-gray-500'
                    }`}
                  >
                    {d.blurb}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full rounded-2xl border border-white/10 overflow-hidden bg-zinc-900 shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-zinc-900/50">
              <div className="text-sm text-gray-400 font-medium">{displayLabel(demo.id)}</div>
              <a
                href={demo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <ExternalLink size={14} />
                Open
              </a>
            </div>
            {demo.media ? (
              <div className="relative w-full aspect-[16/10] lg:aspect-auto lg:h-[480px] bg-black">
                <TabletMockup
                  sources={demo.media.sources}
                  poster={demo.media.poster}
                  label={displayLabel(demo.id)}
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            ) : (
              <div className="relative w-full aspect-[16/10] lg:aspect-auto lg:h-[480px] bg-black">
                <iframe
                  key={demo.id}
                  src={demo.url}
                  title={displayLabel(demo.id)}
                  className="absolute inset-0 w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  allow="fullscreen"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
