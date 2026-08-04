// @ts-nocheck
import { ImageIcon } from 'lucide-react';

// Neutral image placeholder. Swap a slot by replacing this element with an <img>.
export function Placeholder({ label, ratio = 'aspect-[16/10]', className = '' }) {
  return (
    <div
      className={`relative ${ratio} w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-800/80 via-zinc-900 to-black ${className}`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
          <ImageIcon size={18} className="text-zinc-400" />
        </div>
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
          {label}
        </span>
      </div>
    </div>
  );
}

export default Placeholder;