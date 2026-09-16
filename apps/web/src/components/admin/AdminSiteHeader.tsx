// @ts-nocheck
import Link from 'next/link';
import mobileLogoWhite from '@/components/marketing/assets/brand/logo-mobile-white.png.asset.json';

export default function AdminSiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-white/10 bg-[#0A0A0A]">
      <div className="flex h-full items-center gap-3 px-4 lg:px-6">
        <Link
          href="/admin"
          className="flex min-w-0 items-center gap-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
          aria-label="eatOS Admin home"
        >
          <img src={mobileLogoWhite.url} alt="" className="h-8 w-auto shrink-0" />
          <div className="min-w-0 leading-tight">
            <span className="block text-sm font-semibold text-white">eatOS</span>
            <span className="block truncate text-[11px] text-zinc-500">Admin</span>
          </div>
        </Link>
        <p className="hidden sm:block text-[11px] text-zinc-600">Restaurants Made Simple</p>
      </div>
    </header>
  );
}
