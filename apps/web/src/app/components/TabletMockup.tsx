'use client';

import LazyVideo from '@/components/marketing/LazyVideo';

export type VideoSource = { src: string; type: string };

interface TabletMockupProps {
  sources: VideoSource[];
  poster?: string;
  label: string;
  className?: string;
  /** Portrait renders a tall kiosk shell instead of the wide tablet shell. */
  orientation?: 'portrait' | 'landscape';
}

export function TabletMockup({
  sources,
  poster,
  label,
  className = '',
  orientation = 'landscape',
}: TabletMockupProps) {
  const portrait = orientation === 'portrait';

  return (
    <div
      className={`relative mx-auto h-full ${portrait ? 'w-auto max-w-full aspect-[9/16]' : 'w-full max-w-[820px]'} ${className}`}
    >
      {/* Device shell */}
      <div className="relative h-full w-full rounded-[1.5rem] sm:rounded-[2rem] bg-gradient-to-b from-zinc-700/70 via-zinc-900 to-black p-[3px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]">
        <div className="relative h-full w-full rounded-[1.4rem] sm:rounded-[1.9rem] bg-zinc-950 p-2 sm:p-3">
          {/* Camera */}
          <div
            aria-hidden="true"
            className={
              portrait
                ? 'absolute left-1/2 -translate-x-1/2 top-1.5 sm:top-2 h-1.5 w-1.5 rounded-full bg-white/25 ring-1 ring-black/60'
                : 'absolute left-1.5 sm:left-2 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-white/25 ring-1 ring-black/60'
            }
          />
          <div className="relative h-full w-full overflow-hidden rounded-[0.9rem] sm:rounded-[1.15rem] bg-black">
            <LazyVideo
              key={sources[0]?.src}
              className="absolute inset-0 h-full w-full object-contain"
              poster={poster}
              sources={sources}
              ariaLabel={`${label} demo animation`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
