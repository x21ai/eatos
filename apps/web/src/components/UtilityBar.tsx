// @ts-nocheck
"use client";

import { LayoutGrid, LifeBuoy, Newspaper, ShoppingBag } from "lucide-react";

const ITEMS = [
  {
    label: "Dashboard",
    href: "https://dashboard.eatos.com/#/account/login",
    Icon: LayoutGrid,
    external: true,
  },
  { label: "Status", href: "/system-status", status: true },
  { label: "Support", href: "/support", Icon: LifeBuoy },
  { label: "Blog", href: "/blog", Icon: Newspaper },
  { label: "Shop", href: "/shop", Icon: ShoppingBag },
];

const DOT_COLORS = {
  "text-green-500": "bg-green-500",
  "text-blue-500": "bg-blue-500",
  "text-yellow-500": "bg-yellow-500",
  "text-red-500": "bg-red-500",
};

export default function UtilityBar({ statusColor = "text-green-500" }) {
  const dotClass = DOT_COLORS[statusColor] || "bg-green-500";

  return (
    <nav
      aria-label="Utility"
      className="w-full bg-[#1a1a1a] border-b border-white/5"
    >
      <div className="site-container flex h-10 items-center justify-center lg:justify-end">
        <div className="flex items-center gap-5 sm:gap-6 overflow-x-auto scrollbar-hidden">
          {ITEMS.map(({ label, href, Icon, external, status }) => (
            <a
              key={label}
              href={href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              aria-label={label}
              title={label}
              className="group flex shrink-0 items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 transition-colors hover:text-white"
            >
              {status ? (
                <span className="relative flex h-2 w-2 shrink-0">
                  <span
                    className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${dotClass}`}
                  />
                  <span
                    className={`relative inline-flex h-2 w-2 rounded-full ${dotClass}`}
                  />
                </span>
              ) : (
                <Icon
                  size={14}
                  strokeWidth={2}
                  className="shrink-0 text-neutral-500 transition-colors group-hover:text-brand"
                />
              )}
              <span className="hidden sm:inline">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
