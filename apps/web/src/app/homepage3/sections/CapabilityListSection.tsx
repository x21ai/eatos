// @ts-nocheck
'use client';

import { ArrowRight } from 'lucide-react';

const rows = [
  {
    name: 'Operations',
    summary: 'Point of Sale, handhelds, kitchen display and guest display working as one service flow.',
    href: '/pos',
  },
  {
    name: 'Payments',
    summary: 'Cards, tap to pay and mobile wallets on a flat 2.99% + 20¢ rate, settled next day.',
    href: '/payments',
  },
  {
    name: 'Intelligence',
    summary: 'Maya reads your sales, labor and stock, then tells your managers what to do next.',
    href: '/ai',
  },
  {
    name: 'Hardware',
    summary: 'Counter terminals, handhelds, kiosks and printers that arrive configured for your menu.',
    href: '/hardware',
  },
];

export function CapabilityListSection() {
  return (
    <section className="bg-white py-20 text-zinc-900 md:py-28">
      <div className="site-container">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
          The platform
        </p>
        <h2 className="mx-auto mt-4 max-w-3xl text-center text-3xl font-bold leading-[1.1] tracking-tight md:text-5xl">
          Restaurant software,
          <br />
          from counter to close.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-center text-[15px] leading-relaxed text-zinc-600 md:text-lg">
          One system for service, payments, reporting and the decisions in between, so your team
          works in one place instead of six.
        </p>

        <div className="mt-12 divide-y divide-zinc-200 border-y border-zinc-200 md:mt-16">
          {rows.map((row, i) => (
            <a
              key={row.name}
              href={row.href}
              className="group grid grid-cols-1 items-start gap-2 py-6 transition-colors hover:bg-zinc-50 md:grid-cols-12 md:items-center md:gap-6 md:py-7"
            >
              <div className="hidden text-sm text-zinc-400 md:col-span-1 md:block">
                0{i + 1}
              </div>
              <div className="text-lg font-semibold tracking-tight md:col-span-3 md:text-xl">
                {row.name}
              </div>
              <p className="text-[15px] leading-relaxed text-zinc-600 md:col-span-7">
                {row.summary}
              </p>
              <div className="md:col-span-1 md:text-right">
                <ArrowRight
                  size={18}
                  className="text-zinc-400 transition-transform group-hover:translate-x-1"
                  style={{ color: 'var(--brand, #d70480)' }}
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
