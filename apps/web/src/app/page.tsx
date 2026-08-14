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
} from 'lucide-react';
import { motion } from 'motion/react';
import { NewsletterSection } from '@/components/NewsletterSection';
import posImage from '../assets/pos.jpg.asset.json';

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

      {/* Social Proof / Trust Section */}
      <section className="py-20 md:py-28 bg-black border-t border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          {/* Capability strip: honest, aspirational, Apple-style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
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
            initial={{ opacity: 0 }}
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
            initial={{ opacity: 0, y: 40 }}
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
              initial={{ opacity: 0, scale: 0.95 }}
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
              initial={{ opacity: 0, scale: 0.95 }}
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
              initial={{ opacity: 0, scale: 0.95 }}
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
              initial={{ opacity: 0, scale: 0.95 }}
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
      <section className="py-20 md:py-20 md:py-28 bg-zinc-950 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold tracking-tighter mb-6"
            >
              Built for every <br />
              <span className="text-indigo-400">service style.</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Quick Service */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group rounded-[2.5rem] overflow-hidden border border-white/10 bg-zinc-900 flex flex-col"
            >
              <div className="relative w-full overflow-hidden bg-zinc-950">
                <img
                  src={posImage.url}
                  alt="Quick Service"
                  loading="lazy"
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-10 flex flex-col gap-6">
                <div className="bg-orange-500/20 text-orange-400 p-3 rounded-2xl w-fit">
                  <Zap size={24} />
                </div>
                <div>
                  <h3 className="text-4xl font-bold mb-3">Quick Service</h3>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    Speed is everything. Take orders, process payments, and move queues without
                    friction.
                  </p>
                </div>
                <ul className="space-y-3 text-base text-gray-300">
                  <li className="flex items-center gap-3">
                    <Check size={18} className="text-orange-500 shrink-0" /> Lightning-fast order
                    entry
                  </li>
                  <li className="flex items-center gap-3">
                    <Check size={18} className="text-orange-500 shrink-0" /> Self-service kiosk mode
                  </li>
                  <li className="flex items-center gap-3">
                    <Check size={18} className="text-orange-500 shrink-0" /> Next-day deposits
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Full Service */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group rounded-[2.5rem] overflow-hidden border border-white/10 bg-zinc-900 flex flex-col"
            >
              <div className="relative w-full overflow-hidden bg-zinc-950">
                <img
                  src="https://ucarecdn.com/95432288-86ee-4542-a032-acde33a12956/-/format/auto/"
                  alt="Full Service"
                  loading="lazy"
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-10 flex flex-col gap-6">
                <div className="bg-indigo-500/20 text-indigo-400 p-3 rounded-2xl w-fit">
                  <Utensils size={24} />
                </div>
                <div>
                  <h3 className="text-4xl font-bold mb-3">Full Service</h3>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    Seamless table-to-kitchen flow. Manage your floor, pace courses, and close
                    checks with ease.
                  </p>
                </div>
                <ul className="space-y-3 text-base text-gray-300">
                  <li className="flex items-center gap-3">
                    <Check size={18} className="text-indigo-500 shrink-0" /> Visual floor plan
                    management
                  </li>
                  <li className="flex items-center gap-3">
                    <Check size={18} className="text-indigo-500 shrink-0" /> Course pacing and
                    firing
                  </li>
                  <li className="flex items-center gap-3">
                    <Check size={18} className="text-indigo-500 shrink-0" /> Flexible split checks
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hardware Section */}
      <section className="py-20 md:py-20 md:py-28 bg-black relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
                Hardware that <br />
                turns heads.
              </h2>
              <p className="text-gray-400 text-xl max-w-xl">
                Milled aluminum, tempered glass, and all-day battery. Designed to survive the
                kitchen and look good on the counter.
              </p>
            </motion.div>
            <motion.a
              href="/hardware"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-white border-b border-white pb-1 hover:opacity-70 transition-opacity"
            >
              Shop all hardware
            </motion.a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Terminal Pro */}
            <motion.a
              href="/point-of-sale"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-zinc-900 rounded-[2.5rem] flex flex-col text-center border border-white/5 relative overflow-hidden group"
            >
              <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-indigo-500/10 to-transparent z-10" />
              <div className="relative z-10 pt-12 px-12">
                <h3 className="text-3xl font-bold mb-2">
                  <strong>eatOS</strong> Point of Sale
                </h3>
                <p className="text-gray-400 mb-6">The ultimate restaurant terminal.</p>
                {/* TODO: Price should be fetched from pricing API - do not hardcode */}
                <div className="flex items-center justify-center gap-2 text-sm font-medium bg-white/10 px-4 py-2 rounded-full w-fit mx-auto mb-8">
                  <span>From $99</span>
                </div>
              </div>
              <img
                src="https://ucarecdn.com/894a0c84-afe1-429a-9cb7-9b9c3bd6929e/-/format/auto/"
                alt="eatOS Pro"
                loading="lazy"
                className="w-full object-cover mt-auto rounded-b-[2.5rem]"
              />
            </motion.a>

            {/* Terminal Mini */}
            <motion.a
              href="/products/point-of-purchase"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-zinc-900 rounded-[2.5rem] flex flex-col text-center border border-white/5 relative overflow-hidden group"
            >
              <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-orange-500/10 to-transparent z-10" />
              <div className="relative z-10 pt-12 px-12">
                <h3 className="text-3xl font-bold mb-2">
                  <strong>eatOS</strong> Point of Purchase
                </h3>
                <p className="text-gray-400 mb-6">Power in your pocket.</p>
                {/* TODO: Price should be fetched from pricing API - do not hardcode */}
                <div className="flex items-center justify-center gap-2 text-sm font-medium bg-white/10 px-4 py-2 rounded-full w-fit mx-auto mb-8">
                  <span>From $49</span>
                </div>
              </div>
              <img
                src="https://ucarecdn.com/5a63729f-c40f-4f55-b93c-04430c68d784/-/format/auto/"
                alt="eatOS Mini"
                loading="lazy"
                className="w-full object-cover mt-auto rounded-b-[2.5rem]"
              />
            </motion.a>
          </div>
        </div>
      </section>

      {/* Reports & Analytics Section */}
      <section className="py-20 md:py-20 md:py-28 bg-zinc-950 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-sm font-medium mb-6">
                <BarChart2 size={12} />
                <span>Real-time Reporting</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
                Know your numbers.
                <br />
                <span className="text-gray-500">Every shift.</span>
              </h2>
              <p className="text-gray-400 text-xl mb-8 leading-relaxed">
                Live sales dashboards, labor cost tracking, and menu performance reports give you
                the full picture before service ends.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {[
                  { label: 'Sales by hour, day, or location', color: 'text-emerald-400' },
                  { label: 'Labor cost vs. revenue', color: 'text-emerald-400' },
                  { label: 'Top-selling items ranked', color: 'text-emerald-400' },
                  { label: 'Void and discount tracking', color: 'text-emerald-400' },
                  { label: 'End-of-day summary reports', color: 'text-emerald-400' },
                  { label: 'Export to CSV or your accountant', color: 'text-emerald-400' },
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
              <div className="relative z-10 bg-zinc-900 rounded-[2.5rem] border border-white/10 p-8 shadow-2xl">
                {/* Simulated dashboard UI */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm text-gray-400 font-medium">Today so far</span>
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full">
                    Live
                  </span>
                </div>
                <div className="text-5xl font-bold tracking-tighter mb-1">$14,280</div>
                <div className="text-gray-500 text-sm mb-8">Total revenue across all terminals</div>
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
                <div className="mt-8 grid grid-cols-3 gap-4">
                  {[
                    { label: 'Transactions', value: '341' },
                    { label: 'Avg. Check', value: '$41.87' },
                    { label: 'Labor Cost', value: '28%' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white/5 rounded-2xl p-4 text-center">
                      <div className="text-xl font-bold mb-1">{stat.value}</div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-20 md:py-20 md:py-28 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-300 text-sm font-medium mb-6">
              <Plug size={12} />
              <span>Integrations</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
              Plays well with
              <br />
              <span className="text-gray-500">your whole stack.</span>
            </h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              eatOS connects with the tools your restaurant already uses. No double entry, no
              workarounds.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { name: 'QuickBooks', category: 'Accounting' },
              { name: 'DoorDash', category: 'Delivery' },
              { name: 'Uber Eats', category: 'Delivery' },
              { name: 'Grubhub', category: 'Delivery' },
              { name: '7shifts', category: 'Scheduling' },
              { name: 'Mailchimp', category: 'Marketing' },
              { name: 'Xero', category: 'Accounting' },
              { name: 'OpenTable', category: 'Reservations' },
            ].map((integration, i) => (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-zinc-900 border border-white/5 rounded-2xl p-6 text-center hover:border-white/20 transition-all"
              >
                <div className="text-base font-semibold text-white mb-1">{integration.name}</div>
                <div className="text-xs text-gray-500">{integration.category}</div>
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

      {/* Kitchen Display */}
      <section className="py-20 md:py-20 md:py-28 bg-black border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-900 rounded-[3rem] p-8 md:p-20 text-center relative overflow-hidden border border-white/5"
          >
            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="bg-green-500/10 text-green-400 p-4 rounded-2xl w-fit mx-auto mb-8">
                <ChefHat size={32} />
              </div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
                Chaos, controlled.
              </h2>
              <p className="text-gray-400 text-xl mb-12">
                The Kitchen Display System that keeps front and back of house in perfect sync.
                Real-time updates, color-coded alerts, and performance tracking.
              </p>
              <img
                src="https://ucarecdn.com/3532d108-2981-4a5d-bd16-9f6adf89c04d/-/format/auto/"
                alt="Kitchen Display System"
                loading="lazy"
                className="rounded-xl border border-white/10 shadow-2xl mx-auto"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
}
