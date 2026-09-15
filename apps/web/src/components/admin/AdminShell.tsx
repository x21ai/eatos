// @ts-nocheck
"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  Newspaper,
  ShoppingBag,
  Package,
  Image,
  Users,
  CheckCircle,
  Bot,
  Settings,
  LogOut,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const NAV_ITEMS = [
  { href: "/admin/blog", label: "Blog", icon: FileText, cap: "blog:read" },
  { href: "/admin/news", label: "Newsroom", icon: Newspaper, cap: "news:read" },
  { href: "/admin/shop", label: "Shop", icon: ShoppingBag, cap: "shop:read" },
  { href: "/admin/orders", label: "Orders", icon: Package, cap: "orders:read" },
  { href: "/admin/media", label: "Media", icon: Image, cap: "media:manage" },
  { href: "/admin/users", label: "Team", icon: Users, cap: "users:manage" },
  { href: "/admin/publish", label: "Publish queue", icon: CheckCircle, cap: "publish:approve" },
  { href: "/admin/maya", label: "Maya & Help", icon: Bot, cap: "maya:access" },
  { href: "/admin/settings", label: "Settings", icon: Settings, cap: null },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const { data: me } = useQuery({
    queryKey: ["admin-me"],
    queryFn: async () => {
      const res = await fetch("/api/admin/me");
      if (!res.ok) throw new Error("Failed to load admin profile");
      const payload = await res.json();
      return payload.data;
    },
  });

  const caps = new Set(me?.capabilities ?? []);
  const visibleNav = NAV_ITEMS.filter((item) => {
    if (item.cap === null) return true;
    if (!item.cap) return true;
    if (item.href === "/admin/maya") {
      return caps.has("maya:access") || caps.has("maya:manage") || caps.has("help:access") || caps.has("help:manage");
    }
    if (item.href === "/admin/publish") {
      return me?.isSuperadmin;
    }
    return caps.has(item.cap);
  });

  const perm = me?.permissions;

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <aside className="fixed left-0 top-0 bottom-0 w-56 border-r border-white/5 bg-[#0A0A0A] pt-24 px-3 z-40 hidden lg:block">
        <div className="mb-6 px-3">
          <p className="text-xs uppercase tracking-wider text-gray-500">eatOS Admin</p>
          <p className="text-sm text-gray-300 truncate mt-1">{me?.email}</p>
          {perm && (
            <div className="mt-2 flex flex-wrap gap-1">
              {perm.canPublishLive ? (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20">
                  Live publish
                </span>
              ) : (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                  Draft only
                </span>
              )}
              {perm.canApprovePublish && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Approver
                </span>
              )}
            </div>
          )}
        </div>
        <nav className="space-y-1">
          {visibleNav.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          onClick={() => authClient.signOut()}
          className="mt-8 flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 w-full"
        >
          <LogOut size={16} /> Sign out
        </button>
      </aside>

      <div className="lg:pl-56">{children}</div>
    </div>
  );
}
