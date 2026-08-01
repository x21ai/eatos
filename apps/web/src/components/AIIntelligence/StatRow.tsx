// @ts-nocheck
export function StatRow({ stats }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 pt-8 border-t border-white/10">
      {stats.map((s) => (
        <div key={s.label}>
          <div className="text-[44px] md:text-[56px] leading-none font-bold tracking-tight text-white mb-2">
            {s.value}
          </div>
          <div className="text-[12px] md:text-[13px] text-[#9CA3AF]">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
