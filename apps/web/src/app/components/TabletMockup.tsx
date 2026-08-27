'use client';

export type VideoSource = { src: string; type: string };

interface TabletMockupProps {
  sources: VideoSource[];
  poster?: string;
  label: string;
  className?: string;
}

export function TabletMockup({ sources, poster, label, className = '' }: TabletMockupProps) {
  return (
    <div className={`relative mx-auto w-full max-w-[820px] ${className}`}>
      {/* Tablet shell */}
      <div className="relative h-full w-full rounded-[1.5rem] sm:rounded-[2rem] bg-gradient-to-b from-zinc-700/70 via-zinc-900 to-black p-[3px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]">
        <div className="relative h-full w-full rounded-[1.4rem] sm:rounded-[1.9rem] bg-zinc-950 p-2 sm:p-3">
          {/* Camera */}
          <div
            aria-hidden="true"
            className="absolute left-1.5 sm:left-2 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-white/25 ring-1 ring-black/60"
          />
          <div className="relative h-full w-full overflow-hidden rounded-[0.9rem] sm:rounded-[1.15rem] bg-black">
            <video
              key={sources[0]?.src}
              className="absolute inset-0 h-full w-full object-contain"
              poster={poster}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-label={`${label} demo animation`}
            >
              {sources.map((s) => (
                <source key={s.src} src={s.src} type={s.type} />
              ))}
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}
