// @ts-nocheck
'use client';

import {
  Check,
  ChevronRight,
  Star,
  Command,
  CreditCard,
  Box,
  ChefHat,
  Utensils,
  Zap,
  BarChart2,
  Plug,
  Wine,
  Coffee,
  Truck,
  Package,
  Building2,
} from 'lucide-react';
import { motion } from 'motion/react';
import { NewsletterSection } from '@/components/NewsletterSection';
import { DemoTabsSection } from '../components/DemoTabsSection';
import { DemoCarouselSection } from '../components/DemoCarouselSection';
import { DemoRailSection } from '../components/DemoRailSection';
import { DemoJourneySection } from '../components/DemoJourneySection';
import { DemoAccordionSection } from '../components/DemoAccordionSection';
import svcQuickService from '../../assets/svc-quick-service.jpg.asset.json';
import svcFullService from '../../assets/svc-full-service.jpg.asset.json';
import svcFineDining from '../../assets/svc-fine-dining.jpg.asset.json';
import svcCafe from '../../assets/svc-cafe.jpg.asset.json';
import svcBar from '../../assets/svc-bar.jpg.asset.json';
import svcFoodTruck from '../../assets/svc-food-truck.jpg.asset.json';
import svcGhostKitchen from '../../assets/svc-ghost-kitchen.jpg.asset.json';
import svcFranchise from '../../assets/svc-franchise.jpg.asset.json';

const serviceStyles = [
  {
    name: 'Quick Service',
    href: '/solutions/quick-service',
    image: svcQuickService.url,
    icon: Zap,
    iconClass: 'bg-orange-500/20 text-orange-400',
    checkClass: 'text-orange-500',
    description: 'Speed is everything. Take orders and move queues without friction.',
    bullets: ['Lightning-fast order entry', 'Self-service kiosk mode', 'Next-day deposits'],
  },
  {
    name: 'Full Service',
    href: '/solutions/full-service',
    image: svcFullService.url,
    icon: Utensils,
    iconClass: 'bg-indigo-500/20 text-indigo-400',
    checkClass: 'text-indigo-500',
    description: 'Seamless table-to-kitchen flow across every seat on your floor.',
    bullets: ['Visual floor plan management', 'Course pacing and firing', 'Flexible split checks'],
  },
  {
    name: 'Fine Dining',
    href: '/solutions/fine-dining',
    image: svcFineDining.url,
    icon: Star,
    iconClass: 'bg-amber-500/20 text-amber-400',
    checkClass: 'text-amber-500',
    description: 'Precise service for tasting menus, wine pairings and guest notes.',
    bullets: ['Coursing and seat-level orders', 'Guest preference profiles', 'Reserve and wine list tools'],
  },
  {
    name: 'Cafe',
    href: '/solutions/cafe',
    image: svcCafe.url,
    icon: Coffee,
    iconClass: 'bg-rose-500/20 text-rose-400',
    checkClass: 'text-rose-500',
    description: 'Fast counters, easy modifiers and loyalty that keeps regulars close.',
    bullets: ['One-tap drink modifiers', 'Mobile order ahead', 'Built-in loyalty and rewards'],
  },
  {
    name: 'Bar',
    href: '/solutions/bar',
    image: svcBar.url,
    icon: Wine,
    iconClass: 'bg-purple-500/20 text-purple-400',
    checkClass: 'text-purple-500',
    description: 'Open tabs, fast rounds and pour control through the late rush.',
    bullets: ['Tab and pre-auth handling', 'Quick round reorders', 'Happy hour pricing rules'],
  },
  {
    name: 'Food Truck',
    href: '/solutions/food-truck',
    image: svcFoodTruck.url,
    icon: Truck,
    iconClass: 'bg-emerald-500/20 text-emerald-400',
    checkClass: 'text-emerald-500',
    description: 'A full register in your hand, wherever you park for the day.',
    bullets: ['Offline mode with sync', 'Handheld tap to pay', 'Location-based reporting'],
  },
  {
    name: 'Ghost Kitchen',
    href: '/solutions/ghost-kitchen',
    image: svcGhostKitchen.url,
    icon: Package,
    iconClass: 'bg-sky-500/20 text-sky-400',
    checkClass: 'text-sky-500',
    description: 'Every delivery channel and virtual brand on a single screen.',
    bullets: ['Delivery app aggregation', 'Multi-brand menu control', 'Prep time automation'],
  },
  {
    name: 'Franchise',
    href: '/solutions/franchise',
    image: svcFranchise.url,
    icon: Building2,
    iconClass: 'bg-cyan-500/20 text-cyan-400',
    checkClass: 'text-cyan-500',
    description: 'Standardize menus, pricing and reporting across every location.',
    bullets: ['Central menu publishing', 'Location benchmarking', 'Role-based team access'],
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white selection:bg-indigo-500/30 font-sans">
      {/* Cinematic Hero Section */}
      <section className="relative h-[100dvh] min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video/Image with Zoom Effect */}
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://raw.createusercontent.com/2772a9ef-4ecd-4833-95e5-94b09a81c2a7/"
            alt="Cinematic Background"
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </motion.div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 pt-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium mb-8 text-indigo-300"
          >
            <Star size={14} fill="currentColor" />
            <span>
              The all-new <strong>eatOS</strong> 2.0
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 leading-[1.05]"
          >
            Beyond <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
              Operating.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-[15px] md:text-[22px] text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
          >
            The restaurant operating system that sees, thinks, acts quietly and reliably at scale.
            Beautiful hardware. Invisible software.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <a
              href="/get-started"
              className="group relative px-8 py-4 bg-white text-black rounded-full text-lg font-semibold hover:scale-105 transition-all duration-300 overflow-hidden w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get Started <ChevronRight size={18} />
              </span>
            </a>
            <a
              href="/hardware"
              className="px-8 py-4 rounded-full text-lg font-medium text-white border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all backdrop-blur-sm w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <Box size={18} /> Explore Hardware
            </a>
          </motion.div>
        </div>
      </section>

      {/* Demo view options, for comparison */}
      <div className="bg-black pt-10 text-center">
        <div className="text-xs font-bold tracking-[0.2em] uppercase text-emerald-400">
          Option A, Tabs
        </div>
      </div>
      <DemoTabsSection />
      <DemoCarouselSection />
      <DemoRailSection />
      <DemoJourneySection />
      <DemoAccordionSection />

      {/* Social Proof / Trust Section */}
      <section className="py-20 md:py-28 bg-black border-t border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          {/* Capability strip: honest, aspirational, Apple-style */}
          <motion.div
            initial={{ opacity: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-12">
              Built for restaurants of every size
            </p>
            <div className="flex flex-col sm:flex-row items-stretch justify-center divide-y sm:divide-y-0 sm:divide-x divide-white/10 max-w-3xl mx-auto">
              {[
                { value: '99.9%', label: 'Uptime' },
                { value: '$300M+', label: 'Processed annually' },
                { value: '24/7', label: 'Live support' },
              ].map((stat) => (
                <div
                  key={stat.value}
                  className="flex-1 flex flex-col items-center py-6 sm:py-0 px-6"
                >
                  <div className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Logo Bar */}
          <motion.div
            initial={{ opacity: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col items-center mb-16 opacity-40"
          >
            <div className="flex flex-nowrap items-center justify-center gap-2 sm:gap-4 md:gap-6 w-full max-w-5xl px-2">
              {[
                'Selfie Fusion Kitchen',
                'Local Pho',
                'Bollywood Bites',
                'Figaro Bistro',
                "Becky's Taqueria",
              ].map((name) => (
                <div
                  key={name}
                  className="shrink-0 whitespace-nowrap text-[10px] sm:text-xs md:text-sm lg:text-base font-bold tracking-tighter text-white"
                >
                  {name}
                </div>
              ))}
            </div>
            <p className="mt-3 text-[10px] sm:text-xs md:text-sm text-gray-400 tracking-wide">
              + thousands more
            </p>
          </motion.div>

          {/* Testimonial block removed */}
        </div>
      </section>


      {/* Bento Grid Navigation - The Hub */}
      <section className="py-20 md:py-20 md:py-28 bg-black relative">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6 text-white">
              An ecosystem <br /> <span className="text-gray-500">of power.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-auto">
            {/* Card 1: Point of Sale (Large) */}
            <motion.a
              href="/point-of-sale"
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="md:col-span-2 md:row-span-2 bg-zinc-900 rounded-[2.5rem] p-10 relative overflow-hidden group border border-white/5"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10 flex flex-col gap-6">
                <div>
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-white backdrop-blur-md">
                    <Command size={24} />
                  </div>
                  <h3 className="text-4xl font-bold mb-2">Point of Sale</h3>
                  <p className="text-gray-400 text-lg">The canvas for your service.</p>
                </div>
                {/* Abstract UI representation */}
                <img
                  src="https://ucarecdn.com/c0c7e8e9-324d-4d51-8fa6-8a867032ad32/-/format/auto/"
                  alt="Interactive POS Preview"
                  loading="lazy"
                  className="w-full rounded-xl shadow-2xl transform group-hover:-translate-y-2 transition-transform duration-500"
                />
              </div>
            </motion.a>

            {/* Card 2: Payments */}
            <motion.a
              href="/accept-payments"
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="md:col-span-1 md:row-span-1 bg-white text-black rounded-[2.5rem] p-8 relative overflow-hidden group border border-white/5 flex flex-col"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-bold">Payments</h3>
                  <div className="p-2 bg-black/5 rounded-full">
                    <CreditCard size={20} />
                  </div>
                </div>
                <div className="mt-auto">
                  {/* TODO: Pricing rate should be fetched from pricing API - do not hardcode */}
                  <div className="text-5xl font-bold tracking-tighter mb-1">1.8%</div>
                  <div className="text-gray-500 text-sm">Flat rate processing</div>
                </div>
              </div>
            </motion.a>

            {/* Card 3: AI (Darker) */}
            <motion.a
              href="/ai"
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="md:col-span-1 md:row-span-1 bg-gradient-to-b from-indigo-900 to-black rounded-[2.5rem] p-8 relative overflow-hidden group border border-white/10 flex flex-col"
            >
              <div className="absolute top-0 right-0 p-8 opacity-30">
                <Star size={80} />
              </div>
              <div className="flex flex-col h-full relative z-10">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-bold">Intelligence</h3>
                </div>
                <p className="text-indigo-200 text-sm leading-relaxed mt-auto">
                  Staffing predictions and inventory automation powered by eatOS AI.
                </p>
              </div>
            </motion.a>

            {/* Card 4: Hardware (Wide) */}
            <motion.a
              href="/hardware/pro"
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="md:col-span-2 md:row-span-1 bg-zinc-800 rounded-[2.5rem] p-8 relative overflow-hidden group border border-white/5"
            >
              <div className="flex flex-row items-center justify-between h-full">
                <div className="max-w-[50%]">
                  <h3 className="text-3xl font-bold mb-2">Hardware</h3>
                  <p className="text-gray-400">Milled aluminum. Built to last.</p>
                </div>
                <div className="w-32 h-32 bg-black rounded-full flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500">
                  <Box size={40} className="text-white" />
                </div>
              </div>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Service Modes Section */}
      <section className="py-20 md:py-28 bg-zinc-950 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold tracking-tighter mb-6"
            >
              Built for every <br />
              <span className="text-indigo-400">service style.</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {serviceStyles.map((style, i) => {
              const Icon = style.icon;
              return (
                <motion.a
                  key={style.name}
                  href={style.href}
                  initial={{ opacity: 1 }}
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
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${style.iconClass}`}>
                        <Icon size={16} />
                      </div>
                      <h3 className="text-lg font-bold tracking-tight">{style.name}</h3>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-3 flex-1">
                      {style.description}
                    </p>
                    <ul className="space-y-1.5">
                      {style.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2 text-[11px] text-gray-300">
                          <Check size={12} className={`mt-0.5 shrink-0 ${style.checkClass}`} />
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

      {/* Integrations Section */}
      <section className="py-20 md:py-28 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold tracking-tighter mb-6"
            >
              Plays well <br />
              <span className="text-indigo-400">with others.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            >
              eatOS connects with the tools your restaurant already uses.
              <br className="hidden md:block" />
              No double entry, no workarounds.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {[
              { name: 'Poynt', category: 'Payments' },
              { name: 'Adyen', category: 'Payments' },
              { name: 'MarketMan', category: 'Inventory' },
              { name: 'Xero', category: 'Accounting' },
              { name: 'CardConnect', category: 'Payments' },
              { name: 'QuickBooks', category: 'Accounting' },
              { name: '7shifts', category: 'Workforce' },
              { name: 'Otter', category: 'Delivery' },
              { name: 'Stripe', category: 'Payments' },
              { name: 'eCard Systems', category: 'Payments' },
              { name: 'inventoryOS', category: 'Inventory' },
              { name: 'loyaltyOS', category: 'Loyalty' },
            ].map((partner) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 1 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group rounded-2xl bg-zinc-900 border border-white/10 p-4 hover:border-white/25 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/60 group-hover:text-white transition-colors">
                    <Plug size={20} />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">
                    {partner.category}
                  </span>
                </div>
                <h3 className="text-base font-bold tracking-tight">{partner.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI / Business Impact Section */}
      <section className="py-20 md:py-28 bg-zinc-950 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
                Built for <br />
                <span className="text-indigo-400">real returns.</span>
              </h2>
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10">
                Restaurants on eatOS reduce labor overhead, cut order errors and recover revenue with smarter operations.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { value: '30%', label: 'Faster table turns' },
                  { value: '50%', label: 'Fewer order errors' },
                  { value: '2x', label: 'Faster training' },
                  { value: '15%', label: 'Higher average ticket' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-5 rounded-2xl bg-black border border-white/10"
                  >
                    <div className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-black">
                <img
                  src="https://ucarecdn.com/c0c7e8e9-324d-4d51-8fa6-8a867032ad32/-/format/auto/"
                  alt=" eatOS Dashboard"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <BarChart2 className="text-indigo-400" size={20} />
                    <span className="text-sm font-semibold text-white">Performance Dashboard</span>
                  </div>
                  <p className="text-sm text-gray-400">
                    Real-time sales, labor costs and menu insights in one place.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Final CTA Section */}
      <section className="py-20 md:py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 to-black pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-7xl font-bold tracking-tighter mb-8"
            >
              Ready to run <br />
              <span className="text-indigo-400">your restaurant smarter?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Join thousands of restaurants using eatOS to simplify operations, delight guests and grow revenue.
            </motion.p>
            <motion.div
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href="/get-started"
                className="px-8 py-4 bg-white text-black rounded-full text-lg font-semibold hover:scale-105 transition-transform w-full sm:w-auto"
              >
                Get Started Free
              </a>
              <a
                href="/contact"
                className="px-8 py-4 rounded-full text-lg font-medium text-white border border-white/20 hover:bg-white/10 transition-all w-full sm:w-auto"
              >
                Talk to Sales
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
