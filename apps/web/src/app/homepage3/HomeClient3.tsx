// @ts-nocheck
'use client';

import {
  Check,
  ChevronRight,
  Star,
  Gift,

  Command,
  Cpu,
  CreditCard,
  Sparkles,
  Utensils,
  Zap,
  BarChart2,
  Plug,
  Wine,
  Coffee,
  Truck,
  Package,
  Building2,
  Store,
  TrendingUp,
} from 'lucide-react';
import { motion } from 'motion/react';
import { NewsletterSection } from '@/components/NewsletterSection';
import { HeroVideoSection } from './sections/HeroVideoSection';
import { DemoRailSection } from '../components/DemoRailSection';
import svcQuickService from '../../assets/svc-quick-service-v2.jpg.asset.json';
import svcFullService from '../../assets/svc-full-service-v2.jpg.asset.json';
import svcFineDining from '../../assets/svc-fast-casual-v2.jpg.asset.json';
import svcCafe from '../../assets/svc-cafe-v2.jpg.asset.json';
import svcBar from '../../assets/svc-bar-v3.jpg.asset.json';
import svcFoodTruck from '../../assets/svc-food-truck-v2.jpg.asset.json';
import svcGhostKitchen from '../../assets/svc-ghost-kitchen-v2.jpg.asset.json';
import svcFranchise from '../../assets/svc-enterprise-v2.jpg.asset.json';
import kdsKitchenAsset from '../../assets/kds-kitchen-desk.jpg.asset.json';


const serviceStyles = [
  {
    name: 'Quick Service',
    href: '/quick-service',
    image: svcQuickService.url,
    icon: Zap,
    iconClass: 'bg-orange-500/20 text-orange-400',
    checkClass: 'text-orange-500',
    description: 'Speed is everything. Take orders and move queues fast.',
    bullets: ['Lightning-fast order entry', 'Self-service kiosk mode', 'cloud-based ecosystem'],
  },
  {
    name: 'Full Service',
    href: '/full-service',
    image: svcFullService.url,
    icon: Utensils,
    iconClass: 'bg-indigo-500/20 text-indigo-400',
    checkClass: 'text-indigo-500',
    description: 'Seamless table-to-kitchen flow across every seat on your floor.',
    bullets: ['Visual floor plan management', 'Course pacing and firing', 'Flexible split checks'],
  },
  {
    name: 'Fast Casual',
    href: '/fast-casual',
    image: svcFineDining.url,
    icon: Star,
    iconClass: 'bg-amber-500/20 text-amber-400',
    checkClass: 'text-amber-500',
    description: 'Fast ordering and quicker table turns for high-volume service.',
    bullets: ['Counter and kiosk ordering', 'Accurate order fulfillment', 'Kitchen display routing'],
  },
  {
    name: 'Cafe',
    href: '/cafe-pos',
    image: svcCafe.url,
    icon: Coffee,
    iconClass: 'bg-rose-500/20 text-rose-400',
    checkClass: 'text-rose-500',
    description: 'Fast counters, easy modifiers and loyalty that keeps regulars close.',
    bullets: ['One-tap drink modifiers', 'Mobile order ahead', 'Built-in loyalty and rewards'],
  },
  {
    name: 'Bar',
    href: '/bar-and-brewery',
    image: svcBar.url,
    icon: Wine,
    iconClass: 'bg-purple-500/20 text-purple-400',
    checkClass: 'text-purple-500',
    description: 'Open tabs, fast rounds and pour control through the late rush.',
    bullets: ['Tab and pre-auth handling', 'Quick round reorders', 'Happy hour pricing rules'],
  },
  {
    name: 'Food Truck',
    href: '/food-truck',
    image: svcFoodTruck.url,
    icon: Truck,
    iconClass: 'bg-emerald-500/20 text-emerald-400',
    checkClass: 'text-emerald-500',
    description: 'A full register in your hand, wherever you park for the day.',
    bullets: ['Offline mode with sync', 'Handheld tap to pay', 'Location-based reporting'],
  },
  {
    name: 'Ghost Kitchen',
    href: '/ghost-kitchens',
    image: svcGhostKitchen.url,
    icon: Package,
    iconClass: 'bg-sky-500/20 text-sky-400',
    checkClass: 'text-sky-500',
    description: 'Every delivery channel and virtual brand on a single screen.',
    bullets: ['Delivery app aggregation', 'Multi-brand menu control', 'Prep time automation'],
  },
  {
    name: 'Enterprise',
    href: '/enterprise-pos',
    image: svcFranchise.url,
    icon: Building2,
    iconClass: 'bg-cyan-500/20 text-cyan-400',
    checkClass: 'text-cyan-500',
    description: 'Run every brand and property on one enterprise platform.',
    bullets: ['Central menu publishing', 'Location benchmarking', 'Role-based team access'],
  },
];

export default function HomeClient3() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white selection:bg-indigo-500/30 font-sans">
      {/* Cinematic Hero Section */}
      <HeroVideoSection />

      {/* Live Demo Section */}
      <DemoRailSection
        title="How it Works"
        description="Experience the full eatOS platform in your browser. Switch between products to see every feature in action and explore the complete workflow."
        showLabel={false}
      />

      {/* Social Proof / Trust Section */}
      <section className="py-16 md:py-20 bg-black border-t border-white/5 relative overflow-hidden">
        <div className="site-container">
          {/* Capability strip: honest, aspirational, Apple-style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <p className="text-xs md:text-sm uppercase tracking-widest text-gray-500 font-semibold mb-8 md:mb-12">
              Built for restaurants of every size
            </p>
            <div className="flex flex-col sm:flex-row items-stretch justify-center divide-y sm:divide-y-0 sm:divide-x divide-white/10 max-w-3xl mx-auto">
              {[
                { value: '99.9%', label: 'Uptime' },
                { prefix: 'Over', value: '$2 Billion+', label: 'Processed' },
                { value: '24/7', label: 'Live support' },
              ].map((stat) => (
                <div
                  key={stat.value}
                  className="flex-1 flex flex-col items-center py-3.5 sm:py-0 px-4 sm:px-6"
                >
                  <div className={`${stat.prefix ? 'text-xl sm:text-3xl md:text-4xl whitespace-nowrap' : 'text-2xl sm:text-4xl md:text-5xl'} font-bold tracking-tighter text-white mb-1 sm:mb-2`}>
                    {stat.prefix && (
                      <span className="text-xs sm:text-sm font-normal tracking-normal text-gray-500 align-middle mr-2">
                        {stat.prefix}
                      </span>
                    )}
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Logo Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col items-center mb-12 md:mb-16 opacity-40"
          >
            <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-x-2 gap-y-2 sm:gap-x-3 md:gap-4 lg:gap-6 w-full max-w-5xl px-2">
              {[
                'Selfie Fusion Kitchen',
                'Local Pho',
                'Bollywood Bites',
                'Figaro Bistro',
                "Becky's Taqueria",
              ].map((name, i) => (
                <div key={name} className="flex items-center gap-2 md:gap-4 lg:gap-6">
                  {i > 0 && (
                    <span className="h-1 w-1 rounded-full bg-white/40 md:hidden" aria-hidden="true" />
                  )}
                  <span className="whitespace-nowrap text-[13px] sm:text-sm md:text-sm lg:text-base font-bold tracking-tighter text-white">
                    {name}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs sm:text-sm text-gray-400 tracking-wide">
              + thousands more
            </p>
          </motion.div>

          {/* Testimonial block removed */}
        </div>
      </section>


      {/* Bento Grid Navigation - The Hub */}
      <section className="py-16 md:pt-16 md:pb-28 bg-black relative">
        <div className="site-container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-7xl font-bold tracking-tighter mb-6 text-white">
              An ecosystem <br /> <span className="text-gray-500">of power.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-4 md:gap-5 lg:gap-6 h-auto">
            {/* Card 1: Point of Sale (Large) */}
            <motion.a
              href="/pointofsale"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="md:col-span-2 lg:col-span-2 lg:row-span-2 bg-zinc-900 rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] p-6 sm:p-8 md:p-8 lg:p-10 relative overflow-hidden group border border-white/5"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10 flex flex-col gap-5 md:gap-6">
                <div>
                  <div className="w-11 h-11 md:w-12 md:h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-4 md:mb-6 text-white backdrop-blur-md">
                    <Command size={24} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold tracking-tighter mb-2">Point of Sale</h3>
                  <p className="text-gray-400 text-base md:text-base lg:text-lg">The canvas for your service.</p>
                </div>
                {/* Abstract UI representation */}
                <img
                  src="https://ucarecdn.com/c0c7e8e9-324d-4d51-8fa6-8a867032ad32/-/format/auto/"
                  alt="Interactive Point of Sale Preview"
                  loading="lazy"
                  className="w-full rounded-xl shadow-2xl transform group-hover:-translate-y-2 transition-transform duration-500"
                />
              </div>
            </motion.a>

            {/* Card 2: Payments */}
            <motion.a
              href="/accept-payments"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="md:col-span-1 lg:col-span-1 bg-white text-black rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] p-6 md:p-5 lg:p-8 relative overflow-hidden group border border-white/5 flex flex-col"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start gap-3">
                  <h3 className="text-xl md:text-lg lg:text-2xl font-bold tracking-tighter min-w-0 truncate">Payments</h3>
                  <div className="p-2 bg-black/5 rounded-full shrink-0">
                    <CreditCard size={20} />
                  </div>
                </div>
                <div className="mt-6 md:mt-auto">
                  <div className="text-4xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-1 whitespace-nowrap">2.99%+15¢</div>
                  <div className="text-gray-500 text-sm">Flat rate processing</div>
                </div>
              </div>
            </motion.a>

            {/* Card 3: Loyalty */}
            <motion.a
              href="/products/loyalty"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="md:col-span-1 lg:col-span-1 bg-gradient-to-b from-rose-900 to-black rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] p-6 md:p-5 lg:p-8 relative overflow-hidden group border border-white/10 flex flex-col"
            >
              <div className="absolute top-0 right-0 p-4 md:p-5 lg:p-8 opacity-30">
                <Gift className="w-12 h-12 md:w-14 md:h-14 lg:w-20 lg:h-20" />
              </div>
              <div className="flex flex-col h-full relative z-10">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl md:text-lg lg:text-2xl font-bold tracking-tighter">Loyalty</h3>
                </div>
                <div className="mt-6 md:mt-auto">
                  <div className="text-3xl md:text-3xl lg:text-4xl font-bold tracking-tighter mb-1">10x</div>
                  <div className="text-rose-200 text-xs md:text-sm lg:text-sm leading-relaxed pr-8 md:pr-10 lg:pr-16">
                    More repeat visits. Points, rewards and personal offers that turn first-time
                    guests into regulars.
                  </div>
                </div>
              </div>
            </motion.a>


            {/* Card 4: Intelligence, wide */}
            <motion.a
              href="/ai"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="md:col-span-2 lg:col-span-2 bg-gradient-to-br from-zinc-900 via-indigo-950 to-black rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] p-6 md:p-5 lg:p-8 relative overflow-hidden group border border-white/10"
            >
              <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-indigo-500/20 blur-3xl" />
              <div className="relative z-10 flex flex-row items-center justify-between gap-4 h-full">
                <div className="min-w-0 sm:max-w-[60%]">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-300 mb-2">
                    eatOS AI
                  </div>
                  <h3 className="text-2xl md:text-2xl lg:text-3xl font-bold tracking-tighter mb-2">
                    Intelligence everywhere
                  </h3>
                  <p className="text-gray-400 text-sm md:text-sm lg:text-base">
                    VoiceOS answers every call and demand forecasting tells you what to prep
                    before the rush.
                  </p>
                </div>
                <div className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 shrink-0 bg-black rounded-full flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500">
                  <Sparkles className="text-indigo-300 w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10" />
                </div>
              </div>
            </motion.a>

          </div>
        </div>
      </section>

      {/* Service Modes Section */}
      <section className="py-16 md:py-28 bg-zinc-950 relative overflow-hidden">
        <div className="site-container">
          <div className="text-center mb-10 md:mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter mb-6"
            >
              Built for every <br />
              <span className="text-indigo-400">service style.</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {serviceStyles.map((style, i) => {
              const Icon = style.icon;
              return (
                <motion.a
                  key={style.name}
                  href={style.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 4) * 0.05 }}
                  className="group h-full rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 flex flex-col hover:border-white/25 transition-colors"
                >
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-zinc-950">
                    <img
                      src={style.image}
                      alt={style.name}
                      loading="lazy"
                      width={1024}
                      height={768}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 flex flex-col gap-3 flex-1">
                    <div className={`${style.iconClass} p-2 rounded-lg w-fit`}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-lg font-bold tracking-tighter mb-1.5">
                        {style.name}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{style.description}</p>
                    </div>
                    <ul className="space-y-2 text-[13px] leading-relaxed text-gray-300 mt-auto">
                      {style.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2">
                          <Check size={14} className={`${style.checkClass} shrink-0 mt-0.5`} />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hardware now lives on the Platform page */}



      {/* Reports & Analytics Section */}
      <section className="py-16 md:py-28 bg-zinc-950 relative overflow-hidden">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d70480]/30 bg-[#d70480]/10 text-[#d70480] text-sm font-medium mb-6">
                <BarChart2 size={12} />
                <span>Real-time Reporting</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-6xl font-bold tracking-tighter mb-6">
                Know your numbers.
                <br />
                <span className="text-gray-500">Every shift.</span>
              </h2>
              <p className="text-gray-400 text-base sm:text-lg md:text-xl mb-8 leading-relaxed">
                Live sales dashboards, labor cost tracking, and menu performance reports give full
                image before service ends.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8 md:mb-10">
                {[
                  { label: 'Sales by hour, day, or location', color: 'text-[#d70480]' },
                  { label: 'Labor cost vs. revenue', color: 'text-[#d70480]' },
                  { label: 'Top-selling items ranked', color: 'text-[#d70480]' },
                  { label: 'Void and discount tracking', color: 'text-[#d70480]' },
                  { label: 'End-of-day summary reports', color: 'text-[#d70480]' },
                  { label: 'Export to CSV or your accountant', color: 'text-[#d70480]' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 text-gray-300 text-sm">
                    <Check size={16} className={`${item.color} shrink-0`} />
                    {item.label}
                  </div>
                ))}
              </div>
              <a
                href="/platform"
                className="inline-flex items-center gap-2 text-white border-b border-white/30 pb-1 hover:border-white transition-all"
              >
                Explore the platform <ChevronRight size={14} />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent rounded-[2.5rem] blur-3xl" />
              <div className="relative z-10 bg-zinc-900 rounded-3xl md:rounded-[2.5rem] border border-white/10 p-5 sm:p-8 shadow-2xl">
                {/* Simulated dashboard UI */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm text-gray-400 font-medium">Today so far</span>
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full">
                    Live
                  </span>
                </div>
                <div className="text-4xl sm:text-5xl font-bold tracking-tighter mb-1">$14,280</div>
                <div className="text-gray-500 text-xs sm:text-sm mb-6 sm:mb-8">
                  Total revenue across all terminals
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Food Sales', value: '$10,140', pct: 72, color: 'bg-emerald-500' },
                    { label: 'Beverage Sales', value: '$2,850', pct: 20, color: 'bg-indigo-500' },
                    { label: 'Modifiers', value: '$1,290', pct: 8, color: 'bg-orange-500' },
                  ].map((row) => (
                    <div key={row.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">{row.label}</span>
                        <span className="text-white font-medium">{row.value}</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${row.color} rounded-full`}
                          style={{ width: `${row.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-2 sm:gap-4">
                  {[
                    { label: 'Transactions', value: '341' },
                    { label: 'Avg. Check', value: '$41.87' },
                    { label: 'Labor Cost', value: '28%' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
                      <div className="text-base sm:text-xl font-bold tracking-tighter mb-1">
                        {stat.value}
                      </div>
                      <div className="text-[10px] sm:text-xs text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-16 md:py-28 bg-black relative overflow-hidden">
        <div className="site-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-300 text-sm font-medium mb-6">
              <Plug size={12} />
              <span>Integrations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter mb-6">
              Plays well with
              <br />
              <span className="text-gray-500">your whole stack.</span>
            </h2>
            <p className="text-white font-medium text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
              eatOS connects with the tools your restaurant already uses.
              <br />
              No double entry, no workarounds.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { name: 'Adyen', category: 'Payments' },
              { name: 'MarketMan', category: 'Inventory' },
              { name: 'Xero', category: 'Accounting' },
              { name: 'CardConnect', category: 'Payments' },
              { name: 'Stripe', category: 'Payments' },
              { name: 'eCard Systems', category: 'Payments' },
              { name: 'Otter', category: 'Delivery' },
              { name: 'QuickBooks', category: 'Accounting' },
              { name: '7shifts', category: 'Scheduling' },
              { name: 'Poynt', category: 'Payments' },
              { name: 'inventoryOS', category: 'Inventory' },
              { name: 'loyaltyOS', category: 'Loyalty' },
            ].map((integration, i) => (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-zinc-900 border border-white/5 rounded-2xl p-4 md:p-6 text-center hover:border-white/20 transition-all"
              >
                <div className="text-sm md:text-base font-semibold text-white mb-1">
                  {integration.name}
                </div>
                <div className="text-xs font-medium text-white/75">{integration.category}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a
              href="/platform"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
            >
              View all integrations <ChevronRight size={14} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Platform overview */}
      <section className="py-16 md:py-28 bg-black text-white relative overflow-hidden">
        <div className="site-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-300 text-sm font-medium mb-6">
              <Command size={12} />
              <span>Platform</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter mb-6">
              One platform,
              <br />
              <span className="text-gray-500">every part of service.</span>
            </h2>
            <p className="text-white font-medium text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
              eatOS runs the front of house, back of house and future growth on
              one seamlessly connected restaurant system.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                icon: Store,
                title: 'Operations',
                subtitle: 'Run service flawlessly',
                body:
                  'Point of Sale, kitchen flow and workforce scheduling that keep front and back in sync.',
              },
              {
                icon: Sparkles,
                title: 'Guest Experience',
                subtitle: 'Delight every guest',
                body:
                  'Let guests order their way: at the table, at counter or from home. Fast and frictionless.',
              },
              {
                icon: TrendingUp,
                title: 'Growth',
                subtitle: 'Bring them back',
                body:
                  'Marketing, loyalty and gift cards that turn first-time visitors into regulars.',
              },
              {
                icon: BarChart2,
                title: 'Intelligence',
                subtitle: 'See everything clearly',
                body:
                  'Real-time analytics and AI-powered ordering that sharpen every decision.',
              },
            ].map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-zinc-900 border border-white/5 rounded-3xl p-6 md:p-7 hover:border-white/20 transition-all"
                >
                  <div className="bg-[#d70480]/10 text-[#d70480] p-2.5 rounded-xl w-fit mb-5">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight mb-1">{pillar.title}</h3>
                  <p className="text-sm font-semibold text-[#d70480] mb-3">{pillar.subtitle}</p>
                  <p className="text-sm text-gray-400 leading-relaxed">{pillar.body}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a
              href="/platform"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-semibold text-sm hover:bg-gray-200 transition-colors"
            >
              Explore the platform <ChevronRight size={14} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Intelligence highlight */}
      <section className="py-16 md:py-28 bg-black text-white relative overflow-hidden">
        <div className="site-container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#d70480]/10 text-[#d70480] text-sm font-semibold mb-6">
                <Sparkles size={14} />
                <span>Intelligence</span>
              </div>

              <h2 className="text-4xl lg:text-6xl font-bold tracking-tighter mb-6">
                See everything clearly.
              </h2>

              <p className="text-sm lg:text-lg text-gray-400 mb-10 leading-relaxed max-w-lg">
                Every order, shift and payment feeds one intelligence layer, so
                you get live data and clear next steps instead of raw data.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  { icon: BarChart2, title: 'Real-time analytics' },
                  { icon: Zap, title: 'AI-enabled ordering' },
                  { icon: Command, title: 'Smarter daily decisions' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex items-center gap-4">
                      <div className="bg-[#d70480]/10 text-[#d70480] p-2.5 rounded-xl flex-shrink-0">
                        <Icon size={20} />
                      </div>
                      <h4 className="text-base font-bold">{item.title}</h4>
                    </div>
                  );
                })}
              </div>

              <a
                href="/ai/intelligence"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-semibold text-sm hover:bg-gray-200 transition-colors"
              >
                Explore Intelligence <ChevronRight size={14} />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(to_bottom,transparent,black)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64">
                    <div className="absolute inset-0 bg-[#d70480]/30 rounded-full animate-pulse blur-3xl" />
                    <div className="absolute inset-0 bg-purple-500/30 rounded-full animate-pulse blur-3xl delay-700 translate-x-10" />
                    <div className="relative z-10 w-full h-full border border-white/10 bg-black/40 backdrop-blur-xl rounded-full flex items-center justify-center">
                      <Cpu size={64} className="text-white/80" />
                    </div>

                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="absolute top-1/2 left-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_20px_white]"
                        style={{
                          transform: `rotate(${i * 90}deg) translateX(140px)`,
                          animation: 'homeOrbit 10s linear infinite',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes homeOrbit {
          from {
            transform: rotate(0deg) translateX(140px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(140px) rotate(-360deg);
          }
        }
      `}</style>

      <NewsletterSection />

    </div>
  );
}
