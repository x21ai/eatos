// @ts-nocheck
import { ImageIcon } from 'lucide-react';

// `tone` adapts the surface to the light or dark band it sits in.
// `pad` preserves the complete image with object-contain and no artificial inset.
export function Placeholder({
  label,
  ratio = 'aspect-[16/10]',
  tone = 'dark',
  className = '',
  src,
  pad = false,
}) {
  const dark = tone === 'dark';

  if (src) {
    return (
      <div
        className={`relative w-full overflow-hidden rounded-lg ${
          dark
            ? 'bg-zinc-900 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]'
            : 'bg-zinc-200/70 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.35)]'
        } ${className}`}
      >
        <img
          src={src}
          alt={label}
          loading="lazy"
          className="block h-auto w-full"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative ${ratio} w-full overflow-hidden rounded-lg ${
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
          <ImageIcon size={18} className={dark ? 'text-white/70' : 'text-white/70'} />
        </div>
        <span
          className={`text-[11px] font-medium uppercase tracking-[0.2em] ${
            dark ? 'text-zinc-600' : 'text-white/70'
          }`}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

export default Placeholder;