// @ts-nocheck
'use client';

import { useEffect, useRef } from 'react';
import { showcaseVideos, showcaseLogos } from './customerShowcase';

function VideoCard({ item }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Touch devices have no hover: play while the card is on screen instead.
    const isTouch =
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: none)').matches;
    if (!isTouch || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play?.().catch(() => {});
        } else {
          el.pause?.();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const play = () => {
    ref.current?.play?.().catch(() => {});
  };
  const stop = () => {
    const el = ref.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
  };

  return (
    <div
      tabIndex={0}
      onMouseEnter={play}
      onMouseLeave={stop}
      onFocus={play}
      onBlur={stop}
      className="group relative w-[68vw] max-w-[300px] shrink-0 snap-center overflow-hidden rounded-[28px] bg-zinc-100 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)] outline-none transition-transform duration-500 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-zinc-900 sm:w-auto sm:max-w-none"
    >
      <div className="relative aspect-[3/5] w-full">
        <video
          ref={ref}
          src={`${item.src}#t=0.1`}
          muted
          loop
          playsInline
          preload="auto"
          aria-label={`${item.name}, ${item.label}`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent" />
      </div>
    </div>
  );
}

export function CustomerShowcase() {
  const track = [...showcaseLogos, ...showcaseLogos];

  return (
    <section className="bg-[#f2f2f2] py-20 md:py-28">
      <div className="site-container">
        <h2 className="mx-auto max-w-4xl text-center text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl">
          Next Generation Restaurant Brands We Power
        </h2>

        {/* Video row: swipeable on mobile, 5-up from lg */}
        <div className="mt-12 md:mt-16">
          <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 md:gap-5 lg:grid-cols-5">
            {showcaseVideos.map((item) => (
              <VideoCard key={item.src} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Logo marquee */}
      <div className="group relative mt-12 overflow-hidden md:mt-16">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#f2f2f2] to-transparent md:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#f2f2f2] to-transparent md:w-28" />
        <div className="marquee-track flex w-max items-center gap-20 md:gap-32">
          {track.map((logo, i) => (
            <img
              key={`${logo.name}-${i}`}
              src={logo.src}
              alt={logo.name}
              loading="lazy"
              className="h-14 w-auto max-w-[180px] shrink-0 object-contain opacity-70 md:h-20 md:max-w-[220px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CustomerShowcase;