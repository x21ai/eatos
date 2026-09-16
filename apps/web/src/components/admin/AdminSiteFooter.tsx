// @ts-nocheck
import Link from 'next/link';
import mobileLogoWhite from '@/components/marketing/assets/brand/logo-mobile-white.png.asset.json';

export default function AdminSiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[#0A0A0A] px-4 py-6 lg:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <img src={mobileLogoWhite.url} alt="" className="h-7 w-auto" />
          <span className="text-sm font-medium text-white">eatOS</span>
        </div>

        <p className="text-[12px] text-zinc-500">
          <span suppressHydrationWarning>
            &copy; 2017 - 2026 <strong className="font-semibold text-zinc-400">eatOS POS Inc.</strong>{' '}
            All rights reserved.
          </span>
        </p>

        <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[12px]">
          <Link href="/privacy-policy" className="text-zinc-400 transition-colors hover:text-white">
            Privacy Policy
          </Link>
          <Link
            href="/terms-and-conditions"
            className="text-zinc-400 transition-colors hover:text-white"
          >
            Terms of Service
          </Link>
        </nav>
      </div>
    </footer>
  );
}
