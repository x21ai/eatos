'use client';

import type React from 'react';
import { useEffect, useRef, useState } from 'react';

import { motion } from 'motion/react';
import { Tablet, Laptop, Smartphone } from 'lucide-react';
import { demoSources } from './demoSources';
import { TabletMockup } from './TabletMockup';
import { PosIcon, KdsIcon, CfdIcon, KioskIcon } from './DeviceIcons';

const deviceIcon = {
  tablet: Tablet,
  laptop: Laptop,
  phone: Smartphone,
} as const;

const appIcon: Record<string, (props: { className?: string }) => React.ReactElement> = {
  pos: PosIcon,
  kds: KdsIcon,
  cfd: CfdIcon,
  kiosk: KioskIcon,
};

// Each product keeps its own accent color for its icon
const appIconColor: Record<string, string> = {
  pos: 'text-indigo-500',
  kds: 'text-emerald-500',
  cfd: 'text-sky-500',
  kiosk: 'text-amber-500',
};



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
  const panelRef = useRef<HTMLDivElement | null>(null);
  const lastStepAt = useRef(0);

  // While the pointer sits over the demo panel, the wheel moves through the
  // products instead of scrolling the page, looping at either end.
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const onWheel = (event: WheelEvent) => {
      const dy =
        event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 100 : 1);
      if (Math.abs(dy) < 4) return;
      event.preventDefault();

      const now = Date.now();
      if (now - lastStepAt.current < 450) return;
      lastStepAt.current = now;

      const dir = dy > 0 ? 1 : -1;
      setActiveId((current) => {
        const total = demoSources.length;
        const index = demoSources.findIndex((d) => d.id === current);
        const next = ((index < 0 ? 0 : index) + dir + total) % total;
        return demoSources[next].id;
      });
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const displayLabel = (id: string) => {
    switch (id) {
      case 'kds':
        return 'Kitchen Display System';
      case 'cfd':
        return 'Guest Facing Display';
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
            className="text-white/85 text-lg font-medium max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
        </div>

        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* Rail: vertical on desktop, 2-column grid on mobile */}
          <div className="grid grid-cols-2 gap-2 lg:flex lg:flex-col lg:h-full lg:gap-0 lg:justify-between">
            {demoSources.map((d) => {
              const active = d.id === activeId;
              const AppIcon = appIcon[d.id];
              const Icon = deviceIcon[d.device] ?? Tablet;
              const mobileOrder: Record<string, string> = {
                pos: 'order-1',
                kiosk: 'order-2',
                kds: 'order-3',
                cfd: 'order-4',
                dashboard: 'order-5',
                inventoryos: 'order-6',
              };
              return (

                <button
                  key={d.id}
                  type="button"
                  onClick={() => setActiveId(d.id)}
                  className={`relative min-w-0 text-left rounded-xl border px-4 py-3 transition-colors lg:w-full ${mobileOrder[d.id] ?? ''} lg:order-none ${
                    active
                      ? 'bg-white text-black border-white'
                      : 'bg-zinc-900/60 border-white/10 text-white hover:border-white/30'
                  }`}

                >
                  {active && (
                    <span className="absolute left-0 top-3 bottom-3 w-1 rounded-full bg-emerald-500 hidden lg:block" />
                  )}
                  <span className="flex min-w-0 items-center gap-2">
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${
                        AppIcon
                          ? `${appIconColor[d.id]} ${active ? 'bg-black/5' : 'bg-white/5'}`
                          : active
                            ? 'bg-black/10 text-black'
                            : 'bg-white/5 text-gray-400'
                      }`}
                    >
                      {AppIcon ? <AppIcon className="h-4 w-4" /> : <Icon size={14} />}
                    </span>
                    <span className="block min-w-0 text-sm font-bold tracking-tighter leading-tight">{displayLabel(d.id)}</span>
                  </span>

                  <span
                    className={`mt-1 hidden lg:block text-xs font-medium leading-snug ${
                      active ? 'text-black/70' : 'text-white/75'
                    }`}
                  >
                    {d.blurb}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full rounded-2xl border border-white/10 overflow-hidden bg-zinc-900 shadow-2xl">
            <div className="flex items-center justify-center gap-2 px-4 py-3 border-b border-white/10 bg-zinc-900/50">
              {(() => {
                const AppIcon = appIcon[demo.id];
                if (AppIcon) {
                  return <AppIcon className={`h-4 w-4 ${appIconColor[demo.id]}`} />;
                }
                const Icon = deviceIcon[demo.device] ?? Tablet;
                return <Icon size={14} className="text-gray-400" />;
              })()}

              <div className="text-sm text-gray-400 font-medium">{displayLabel(demo.id)}</div>
            </div>

            {demo.media ? (
              <div
                className={`relative w-full bg-black p-3 sm:p-4 ${
                  demo.media.orientation === 'portrait'
                    ? 'aspect-[9/16] sm:aspect-[3/4] lg:aspect-auto lg:h-[720px]'
                    : 'aspect-[16/10] lg:aspect-auto lg:h-[480px]'
                }`}
              >
                <TabletMockup
                  sources={demo.media.sources}
                  poster={demo.media.poster}
                  label={displayLabel(demo.id)}
                  orientation={demo.media.orientation}
                  className="h-full"
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
