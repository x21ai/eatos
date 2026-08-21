// @ts-nocheck
export function StatRow({ stats }) {
  return (
    <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-6 pt-8 border-t border-white/10">
      {stats.map((s) => (
        <div key={s.label} className="min-w-0">
          <div className="text-[30px] sm:text-[34px] lg:text-[40px] leading-none font-bold tracking-tight text-white mb-2 whitespace-nowrap">
            {s.value}
          </div>
          <div className="text-[12px] md:text-[13px] text-[#9CA3AF] leading-snug">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
