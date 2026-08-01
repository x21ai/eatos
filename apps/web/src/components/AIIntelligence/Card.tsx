// @ts-nocheck
export function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-[#111827] border border-white/10 rounded-3xl ${className}`}
    >
      {children}
    </div>
  );
}
