'use client';

import { useCallback, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { motion } from 'motion/react';
import { demoSources } from './demoSources';

type ShowcaseBox = {
  id: string;
  name: string;
  href: string;
};

const showcaseBoxes: ShowcaseBox[] = [
  { id: 'pos', name: 'AI Enabled Point of Sale', href: '/pointofsale' },
  {
    id: 'kds',
    name: 'AI Enabled Kitchen Display System',
    href: '/products/kitchen-display-system',
  },
  { id: 'kiosk', name: 'Self Service Kiosk', href: '/products/self-service-kiosk' },
  { id: 'cfd', name: 'Guest Facing Display', href: '/products/guest-facing-display' },
  { id: 'dashboard', name: 'Dashboard', href: '/products/reporting-analytics' },
  { id: 'inventoryos', name: 'inventoryOS', href: '/products/simplified-inventory-management' },
];

interface ProductShowcaseSectionProps {
  title?: string;
  description?: string;
}

export function ProductShowcaseSection({
  title = 'How it Works',
  description = 'Everything your restaurant needs today and for the future.',
}: ProductShowcaseSectionProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const toggle = useCallback((id: string) => {
    setActiveId((current) => {
      if (current === id) {
        const el = videoRefs.current[id];
        if (el) {
          el.pause();
          el.currentTime = 0;
        }
        return null;
      }

      if (current) {
        const prev = videoRefs.current[current];
        if (prev) {
          prev.pause();
          prev.currentTime = 0;
        }
      }

      const next = videoRefs.current[id];
      if (next) void next.play().catch(() => undefined);
      return id;
    });
  }, []);

  return (
    <section className="py-14 md:py-20 bg-black border-t border-white/5">
      <div className="site-container">
        <div className="text-center mb-10 md:mb-14">
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

        <div className="overflow-hidden rounded-3xl border border-white/12 bg-white/[0.03] p-2 sm:p-3">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
            {showcaseBoxes.map((box) => {
              const demo = demoSources.find((d) => d.id === box.id);
              const isActive = activeId === box.id;

              return (
                <button
                  key={box.id}
                  type="button"
                  onClick={() => toggle(box.id)}
                  aria-label={isActive ? `Stop the ${box.name} demo` : `Play the ${box.name} demo`}
                  className="group relative block aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-black text-left transition-all duration-500 hover:-translate-y-1 hover:border-white/25"
                >
                  {demo?.media ? (
                    <video
                      ref={(el) => {
                        videoRefs.current[box.id] = el;
                      }}
                      className="absolute inset-0 h-full w-full object-cover"
                      poster={demo.media.poster}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      controls={isActive}
                    >
                      {demo.media.sources.map((s) => (
                        <source key={s.src} src={s.src} type={s.type} />
                      ))}
                    </video>
                  ) : null}

                  {!isActive ? (
                    <>
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
                      <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white backdrop-blur-md transition-transform duration-500 group-hover:scale-110">
                          <Play size={18} fill="currentColor" />
                        </span>
                      </span>
                      <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-4 text-sm font-semibold tracking-tight text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:p-5">
                        {box.name}
                      </span>
                    </>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
