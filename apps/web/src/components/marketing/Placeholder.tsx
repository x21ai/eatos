// @ts-nocheck
import { ImageIcon } from 'lucide-react';

// `tone` adapts the surface to the light or dark band it sits in.
// `pad` adds safe padding around a real image and switches to object-contain so it never gets cropped or touches the edges.
export function Placeholder({
  label,
  ratio = 'aspect-[16/10]',
  tone = 'dark',
  className = '',
  src,
  pad = false,
  bare = false,
  contain = false,
}) {
  const dark = tone === 'dark';

  if (src) {
    const surface = bare
      ? ''
      : dark
        ? 'bg-zinc-900 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]'
        : 'bg-zinc-200/70 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.35)]';

    return (
      <div
        className={`relative ${ratio} w-full overflow-hidden rounded-[24px] md:rounded-[32px] ${surface} ${className}`}
      >
        <img
          src={src}
          alt={label}
          loading="lazy"
          className={
            contain
              ? 'absolute inset-0 h-full w-full object-contain'
              : pad && !bare
                ? 'absolute inset-0 h-full w-full p-4 object-contain sm:p-6 md:p-8'
                : 'absolute inset-0 h-full w-full object-cover'
          }
        />
      </div>
    );
  }


  return (
    <div
      className={`relative ${ratio} w-full overflow-hidden rounded-[24px] md:rounded-[32px] ${
        dark
          ? 'bg-zinc-900 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]'
          : 'bg-zinc-200/70 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.35)]'
      } ${className}`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${
            dark ? 'bg-white/[0.06]' : 'bg-white/70'
          }`}
        >
          <ImageIcon size={18} className={dark ? 'text-zinc-500' : 'text-zinc-500'} />
        </div>
        <span
          className={`text-[11px] font-medium uppercase tracking-[0.2em] ${
            dark ? 'text-zinc-600' : 'text-zinc-500'
          }`}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

export default Placeholder;