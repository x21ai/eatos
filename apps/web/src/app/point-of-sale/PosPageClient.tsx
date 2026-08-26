// @ts-nocheck
'use client';

import {
  LayoutGrid,
  Users,
  Clock,
  Check,
  RefreshCw,
  Wallet,
  CreditCard,
  Layers,
  WifiOff,
} from 'lucide-react';
import { motion } from 'motion/react';
import BrochureButton from '@/components/BrochureButton';
import { Placeholder } from '@/components/marketing/Placeholder';
import { features, hero } from './content';

const featureIcons = [
  { Icon: RefreshCw, tint: 'bg-emerald-500/10 text-emerald-400' },
  { Icon: LayoutGrid, tint: 'bg-sky-500/10 text-sky-400' },
  { Icon: Wallet, tint: 'bg-amber-500/10 text-amber-400' },
  { Icon: CreditCard, tint: 'bg-violet-500/10 text-violet-400' },
  { Icon: Layers, tint: 'bg-indigo-500/10 text-indigo-400' },
  { Icon: WifiOff, tint: 'bg-rose-500/10 text-rose-400' },
];

const rise = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
};

const menuItems = [
  { name: 'Wagyu Burger', price: '$24', color: 'from-orange-500/20 to-red-500/20' },
  { name: 'Truffle Fries', price: '$12', color: 'from-yellow-500/20 to-orange-500/20' },
  { name: 'Caesar Salad', price: '$16', color: 'from-green-500/20 to-emerald-500/20' },
  { name: 'Spicy Tuna', price: '$22', color: 'from-red-500/20 to-pink-500/20' },
  { name: 'Ribeye Steak', price: '$45', color: 'from-red-900/20 to-red-600/20' },
  { name: 'Lobster Roll', price: '$32', color: 'from-orange-400/20 to-red-400/20' },
  { name: 'Old Fashioned', price: '$18', color: 'from-amber-700/20 to-amber-500/20' },
  { name: 'Martini', price: '$16', color: 'from-blue-200/10 to-white/10' },
];

export default function PosPageClient() {
  return (
    <div className="relative overflow-hidden bg-black min-h-screen font-montserrat selection:bg-orange-500/30 text-white">
      {/* Background Ambience */}
      <div className="absolute inset-x-0 top-0 h-screen z-0 opacity-40 pointer-events-none">

        <img
          src="https://raw.createusercontent.com/0f9f7bed-312b-405c-a290-ec7efd519ed4/"
          className="w-full h-full object-cover blur-sm"
          alt=""
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10">
        {/* Hero */}
        <section className="pt-32 pb-10 md:pt-44 md:pb-14">
          <div className="site-container text-center">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[2.75rem] leading-[1.05] sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6"
            >
              {hero.title} <br />
              <span className="text-orange-500">{hero.titleAccent}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-400 mb-5"
            >
              {hero.eyebrow}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10"
            >
              {hero.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href={hero.primaryCta.href}
                className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform text-center"
              >
                {hero.primaryCta.label}
              </a>
              <BrochureButton brochureId="point-of-sale" />
            </motion.div>
          </div>
        </section>

        {/* Interactive canvas */}
        <section className="pb-20 md:pb-28">
          <div className="site-container">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="min-w-0"
            >
              <div className="bg-zinc-900 rounded-[1.5rem] md:rounded-[2rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden relative flex flex-col lg:flex-row lg:h-[70vh]">
                {/* Sidebar */}
                <div className="flex lg:w-20 bg-black border-b lg:border-b-0 lg:border-r border-white/5 flex-row lg:flex-col items-center justify-center lg:justify-start gap-6 lg:gap-8 px-4 py-4 lg:py-8 z-20">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-orange-500 flex items-center justify-center text-white font-bold">
                    e
                  </div>
                  <div className="flex flex-row lg:flex-col gap-4 lg:gap-6 lg:flex-1 lg:w-full items-center">
                    <div className="p-3 bg-white/10 text-white rounded-xl">
                      <LayoutGrid size={22} />
                    </div>
                    <div className="p-3 text-gray-500">
                      <Users size={22} />
                    </div>
                    <div className="p-3 text-gray-500">
                      <Clock size={22} />
                    </div>
                  </div>
                </div>

                {/* Main */}
                <div className="flex-1 min-w-0 bg-zinc-900 p-5 md:p-6 flex flex-col relative overflow-hidden">
                  <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl md:text-2xl font-bold text-white">Dinner Service</h2>
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full font-mono">
                        ONLINE
                      </span>
                    </div>
                    <div className="text-gray-400 text-sm" suppressHydrationWarning>
                      --:--
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 lg:overflow-y-auto lg:pb-8">
                    {menuItems.map((item) => (
                      <motion.button
                        key={item.name}
                        whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-black/40 border border-white/5 rounded-2xl p-5 text-left relative overflow-hidden group h-32 md:h-36 flex flex-col justify-between min-w-0"
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                        />
                        <span className="font-bold text-base md:text-lg relative z-10">
                          {item.name}
                        </span>
                        <span className="text-gray-400 relative z-10">{item.price}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Order rail */}
                <div className="w-full lg:w-80 xl:w-96 bg-black border-t lg:border-t-0 lg:border-l border-white/5 flex flex-col z-20">
                  <div className="p-5 md:p-6 border-b border-white/5">
                    <h3 className="text-lg md:text-xl font-bold mb-1">Table 4</h3>
                    <p className="text-sm text-gray-500">Server: Sarah M.</p>
                  </div>
                  <div className="flex-1 p-5 md:p-6 space-y-4 lg:overflow-y-auto">
                    <div className="flex justify-between items-start gap-4">
                      <div className="min-w-0">
                        <div className="font-medium">1x Wagyu Burger</div>
                        <div className="text-xs text-gray-500">Medium Rare</div>
                      </div>
                      <div>$24.00</div>
                    </div>
                    <div className="flex justify-between items-start gap-4">
                      <div className="min-w-0 font-medium">2x Old Fashioned</div>
                      <div>$36.00</div>
                    </div>
                    <div className="flex justify-between items-start gap-4 text-green-400">
                      <div className="min-w-0">
                        <div className="font-medium">1x Truffle Fries</div>
                        <div className="text-xs text-green-500/70">Happy Hour Promo</div>
                      </div>
                      <div>$0.00</div>
                    </div>
                  </div>
                  <div className="p-5 md:p-6 bg-zinc-900 border-t border-white/5">
                    <div className="flex justify-between text-xl md:text-2xl font-bold mb-5">
                      <span>Total</span>
                      <span>$60.00</span>
                    </div>
                    <button className="w-full py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors">
                      Charge $60.00
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Feature rows */}
        <section className="py-20 md:py-28 border-t border-white/5 bg-black">
          <div className="site-container space-y-16 md:space-y-24">
            {features.map((feature, index) => {
              const { Icon, tint } = featureIcons[index % featureIcons.length];
              return (
                <motion.div
                  key={feature.id}
                  id={feature.id}
                  {...rise}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
                >
                  <div className={`min-w-0 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${tint}`}
                    >
                      <Icon size={28} />
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter mb-5">
                      {feature.title}
                    </h2>
                    <p className="text-base md:text-lg text-white/90 leading-relaxed mb-5">
                      {feature.body}
                    </p>
                    <p className="text-sm md:text-base text-white/70 leading-relaxed mb-8">
                      {feature.more}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {feature.metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 min-w-0"
                        >
                          <div className="text-2xl font-bold tracking-tighter text-orange-400">
                            {metric.value}
                          </div>
                          <div className="mt-1 text-xs text-white/70">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`min-w-0 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <Placeholder
                      label={feature.imageLabel}
                      src={feature.image || undefined}
                      ratio="aspect-[16/10]"
                    />

                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="pb-20 md:pb-28">
          <div className="site-container">
            <motion.div {...rise} className="relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-orange-600/10 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

              <div className="relative z-10 p-10 md:p-20 text-center">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
                  Ready to get started?
                </h2>
                <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10">
                  See the Point of Sale in action. Book a demo and we will show you exactly how it fits your operation from day one.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/book-demo"
                    className="px-10 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform"
                  >
                    Book a Demo
                  </a>
                  <a
                    href="/contact-sales"
                    className="px-10 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors"
                  >
                    Contact Sales
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
