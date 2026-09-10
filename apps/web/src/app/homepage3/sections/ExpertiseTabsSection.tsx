// @ts-nocheck
'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import svcQuickService from '../../../assets/svc-quick-service-v2.jpg.asset.json';
import svcFullService from '../../../assets/svc-full-service-v2.jpg.asset.json';
import svcFastCasual from '../../../assets/svc-fast-casual-v2.jpg.asset.json';
import svcCafe from '../../../assets/svc-cafe-v2.jpg.asset.json';
import svcBar from '../../../assets/svc-bar-v3.jpg.asset.json';
import svcFoodTruck from '../../../assets/svc-food-truck-v2.jpg.asset.json';
import svcGhostKitchen from '../../../assets/svc-ghost-kitchen-v2.jpg.asset.json';
import svcEnterprise from '../../../assets/svc-enterprise-v2.jpg.asset.json';

const concepts = [
  {
    name: 'Quick Service',
    href: '/quick-service',
    image: svcQuickService.url,
    headline: 'Move the queue, not the guest.',
    body: 'Counter and kiosk ordering, one tap modifiers and kitchen routing built for volume, so lines clear before they form.',
  },
  {
    name: 'Full Service',
    href: '/full-service',
    image: svcFullService.url,
    headline: 'Table to kitchen, in one pass.',
    body: 'Visual floor plans, course pacing and split checks that hold up across a full dining room on a Saturday night.',
  },
  {
    name: 'Fast Casual',
    href: '/fast-casual',
    image: svcFastCasual.url,
    headline: 'Order accuracy at speed.',
    body: 'Counter, kiosk and online orders land on the same board with the same modifiers, so fulfillment stays clean.',
  },
  {
    name: 'Cafe',
    href: '/cafe-pos',
    image: svcCafe.url,
    headline: 'Regulars, remembered.',
    body: 'Fast drink modifiers, mobile order ahead and loyalty that recognizes the guest before they reach the register.',
  },
  {
    name: 'Bar',
    href: '/bar-pos',
    image: svcBar.url,
    headline: 'Tabs that stay straight.',
    body: 'Pre authorized tabs, quick rounds and pour tracking so the bar stays fast without losing the count.',
  },
  {
    name: 'Food Truck',
    href: '/food-truck',
    image: svcFoodTruck.url,
    headline: 'A full register in a small window.',
    body: 'Handheld ordering, offline resilience and mobile payments that work wherever the truck parks.',
  },
  {
    name: 'Ghost Kitchen',
    href: '/ghost-kitchen',
    image: svcGhostKitchen.url,
    headline: 'Every channel on one board.',
    body: 'Delivery marketplaces and your own online ordering consolidate into one kitchen queue and one report.',
  },
  {
    name: 'Enterprise',
    href: '/enterprise',
    image: svcEnterprise.url,
    headline: 'One standard across every site.',
    body: 'Central menus, roles and pricing pushed to every location, with reporting that rolls up by region and brand.',
  },
];

export function ExpertiseTabsSection() {
  const [active, setActive] = useState(0);
  const current = concepts[active];

  return (
    <section className="bg-black py-20 md:py-28">
      <div className="site-container">
        <h2 className="mx-auto max-w-3xl text-center text-3xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl">
          Deep expertise where{' '}
          <span style={{ color: 'var(--brand-on-dark, #ff4fa3)' }}>service gets difficult.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-center text-[15px] leading-relaxed text-zinc-400 md:text-lg">
          Pick the way you serve and see how the platform is set up for it.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-2 md:mt-12 md:gap-3">
          {concepts.map((concept, i) => (
            <button
              key={concept.name}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors md:text-sm ${
                i === active
                  ? 'border-transparent bg-white text-black'
                  : 'border-white/15 text-zinc-300 hover:border-white/40 hover:text-white'
              }`}
            >
              {concept.name}
            </button>
          ))}
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0d] md:mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12">
              <p
                className="text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: 'var(--brand-on-dark, #ff4fa3)' }}
              >
                {current.name}
              </p>
              <h3 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-white md:text-4xl">
                {current.headline}
              </h3>
              <p className="mt-5 text-[15px] leading-relaxed text-zinc-400 md:text-lg">
                {current.body}
              </p>
              <a
                href={current.href}
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/40 hover:bg-white/10"
              >
                Explore {current.name} <ArrowRight size={16} />
              </a>
            </div>
            <div className="relative min-h-[260px] md:min-h-[420px]">
              <img
                src={current.image}
                alt={`${current.name} restaurant using eatOS`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
