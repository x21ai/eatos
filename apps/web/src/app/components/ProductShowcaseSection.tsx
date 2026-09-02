'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
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

type MediaOverride = {
  sources: { src: string; type: string }[];
  poster: string;
  caption: string;
};

interface ProductShowcaseSectionProps {
  title?: string;
  description?: string;
  /** Optional per-product media, keyed by product id. Overrides the shared demo clips. */
  mediaOverrides?: Record<string, MediaOverride>;
}

export function ProductShowcaseSection({
  title = 'How it Works',
  description = 'Everything your restaurant needs today and for the future.',
  mediaOverrides,
}: ProductShowcaseSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [expandedRatio, setExpandedRatio] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tileRefs = useRef<Record<string, HTMLVideoElement | null>>({});


  const mediaFor = (id: string) =>
    mediaOverrides?.[id] ?? demoSources.find((d) => d.id === id)?.media ?? null;

  const expanded = expandedId ? showcaseBoxes.find((b) => b.id === expandedId) : null;
  const expandedMedia = expandedId ? mediaFor(expandedId) : null;


  const close = useCallback(() => setExpandedId(null), []);

  // Autoplay tiles only while the section is on screen.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || expandedId) return;

    const setPlaying = (playing: boolean) => {
      Object.values(tileRefs.current).forEach((video) => {
        if (!video) return;
        if (playing) void video.play().catch(() => undefined);
        else video.pause();
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setPlaying(entry.isIntersecting));
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [expandedId]);

  useEffect(() => {
    if (!expandedId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [expandedId, close]);

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

        <div
          ref={containerRef}
          className="overflow-hidden rounded-3xl border border-white/12 bg-white/[0.03] p-2 sm:p-3"
        >
          {expanded && expandedMedia ? (
            <div className="relative">
              <div className="relative flex h-[46vh] w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black sm:h-[54vh] lg:h-[60vh]">
                <video
                  key={expanded.id}
                  className="absolute inset-0 h-full w-full object-contain"
                  poster={expandedMedia.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                >
                  {expandedMedia.sources.map((s) => (
                    <source key={s.src} src={s.src} type={s.type} />
                  ))}
                </video>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close video"
                  className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-white/15"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="flex flex-col items-center gap-2 px-4 py-5 text-center sm:flex-row sm:justify-between sm:text-left">
                <div className="min-w-0">
                  <h3 className="text-base font-bold tracking-tight text-white">{expanded.name}</h3>
                  <p className="mt-1 text-sm text-white/70">{expandedMedia.caption}</p>
                </div>
                <a
                  href={expanded.href}
                  className="shrink-0 whitespace-nowrap rounded-full border border-white/15 px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Learn more
                </a>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
              {showcaseBoxes.map((box) => {
                const demo = mediaFor(box.id);

                return (
                  <button
                    key={box.id}
                    type="button"
                    onClick={() => setExpandedId(box.id)}
                    onMouseEnter={() => setHoveredId(box.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onFocus={() => setHoveredId(box.id)}
                    onBlur={() => setHoveredId(null)}
                    aria-label={`Play the ${box.name} demo`}
                    className="group relative block aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-black text-left transition-all duration-500 hover:-translate-y-1 hover:border-white/25"
                  >
                    {demo ? (
                      <video
                        ref={(el) => {
                          tileRefs.current[box.id] = el;
                        }}
                        className="absolute inset-0 h-full w-full object-contain"
                        poster={demo.poster}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      >
                        {demo.sources.map((s) => (
                          <source key={s.src} src={s.src} type={s.type} />
                        ))}
                      </video>
                    ) : null}

                    <span
                      className={`pointer-events-none absolute inset-0 z-10 bg-black/60 transition-opacity duration-300 ${hoveredId === box.id ? 'opacity-100' : 'opacity-0'}`}
                    />
                    <span
                      className={`pointer-events-none absolute inset-x-0 bottom-0 z-20 p-4 text-center text-sm font-semibold tracking-tight text-white transition-all duration-300 sm:p-5 sm:text-base lg:text-lg ${hoveredId === box.id ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
                    >
                      {box.name}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
