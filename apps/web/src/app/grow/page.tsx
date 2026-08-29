// @ts-nocheck
'use client';

import { BarChart3, ChevronRight, Gift, Heart, Mail, QrCode, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

const growLinks = [
  {
    title: 'Analytics',
    href: '/products/reporting-analytics',
    Icon: BarChart3,
    tagline: 'Live sales, labor and product mix reporting across every location.',
    points: ['Real-time dashboards', 'Product mix insight', 'Multi-location rollups'],
  },
  {
    title: 'Loyalty',
    href: '/products/loyalty',
    Icon: Heart,
    tagline: 'Reward repeat guests automatically at the point of sale.',
    points: ['Points and visits', 'Automatic enrollment', 'Guest profiles'],
  },
  {
    title: 'Gift Cards',
    href: '/products/giftcards',
    Icon: Gift,
    tagline: 'Sell digital and physical gift cards in store and online.',
    points: ['Digital and plastic', 'Balance tracking', 'Redeem anywhere'],
  },
  {
    title: 'Marketing',
    href: '/products/automated-marketing',
    Icon: Mail,
    tagline: 'Bring guests back with campaigns triggered by real order data.',
    points: ['Segmented lists', 'Automated triggers', 'Campaign reporting'],
  },
  {
    title: 'Order at Table',
    href: '/products/tableside-order-and-pay',
    Icon: QrCode,
    tagline: 'Let guests order and pay from their own phones at the table.',
    points: ['QR ordering', 'Split payments', 'Faster turns'],
  },
];

export default function GrowPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <section className="relative pt-[128px] md:pt-[176px] pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-soft via-black to-black pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-soft rounded-full blur-[120px] pointer-events-none" />

        <div className="site-container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium mb-8 text-brand-on-dark"
          >
            <TrendingUp size={14} />
            <span>Grow</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
          >
            Tools that grow <br />
            <span className="text-brand-on-dark">every check.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/85 max-w-3xl mx-auto leading-relaxed"
          >
            Reporting, loyalty, gift cards, marketing and guest ordering, all reading from the same
            live Point of Sale data.
          </motion.p>
        </div>
      </section>

      <section className="pb-24">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {growLinks.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="group relative rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-white/25"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-brand-on-dark">
                  <item.Icon size={28} />
                </div>
                <h2 className="text-2xl font-bold tracking-tighter mb-2">{item.title}</h2>
                <p className="text-white/80 leading-relaxed mb-6">{item.tagline}</p>
                <div className="space-y-2 mb-8">
                  {item.points.map((point) => (
                    <div key={point} className="flex items-center gap-2 text-sm text-white/65">
                      <span className="w-1 h-1 rounded-full bg-brand-on-dark" />
                      {point}
                    </div>
                  ))}
                </div>
                <span className="flex items-center gap-1 text-sm font-semibold text-white">
                  Learn more
                  <ChevronRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-32">
        <div className="site-container">
          <div className="rounded-[3rem] border border-white/10 bg-white/[0.03] p-12 md:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
                See the growth stack live.
              </h2>
              <p className="text-xl text-white/80">
                Tell us your concept and locations, and we will show the setup that fits.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/bookademo"
                className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform text-center"
              >
                Book a Demo
              </a>
              <a
                href="/pricing"
                className="px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors text-center"
              >
                View Pricing
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
