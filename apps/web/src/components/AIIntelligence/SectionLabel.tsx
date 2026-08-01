// @ts-nocheck
import { Sparkles } from "lucide-react";

export function SectionLabel({ children }) {
  return (
    <div className="inline-flex items-center gap-2 text-[#A855F7] font-medium tracking-[0.16em] uppercase text-xs">
      <Sparkles size={14} />
      <span>{children}</span>
    </div>
  );
}
