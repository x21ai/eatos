// @ts-nocheck
'use client';

import { motion } from 'motion/react';
import { BadgeDollarSign, Package } from 'lucide-react';

const QUOTE_BULLETS_LEFT = [
  'Low Monthly Software or SaaS Fees',
  'Lowest Payment Processing Rates in the Industry',
  'NO Setup and Maintenance Costs',
  'Live Training and Setup',
];

const QUOTE_BULLETS_RIGHT = [
  'World-Class Hardware, Lowest Prices',
  '24x7, 365 Days Live Customer Support',
  'Get Started in 24 hours.',
];

const rise = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
};

export default function PricingPageClient() {
  return (
    <div className="min-h-screen bg-black text-white font-montserrat selection:bg-orange-500/30">
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-44 md:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-orange-500/20 via-orange-600/10 to-transparent" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-orange-500/10 opacity-50 blur-[150px]" />

        <div className="site-container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-orange-400"
            >
              Pricing
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 text-[2.5rem] font-bold leading-[1.05] tracking-tighter sm:text-5xl md:text-6xl"
            >
              Simple <span className="text-orange-500">Pricing</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-10 text-lg leading-relaxed text-white/90 md:text-xl"
            >
              Don&apos;t Pay More, Eliminate Complex Pricing and Simplify for the Future.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col justify-center gap-4 sm:flex-row"
            >
              <a
                href="/bookademo"
                className="rounded-full bg-white px-8 py-4 text-center font-semibold text-black transition-transform hover:scale-105"
              >
                Book a Demo
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Rate cards */}
      <section className="pb-16 md:pb-24">
        <div className="site-container">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <RateCard
              icon={BadgeDollarSign}
              title="$0 Upfront Hardware Cost"
              rate="2.99%+15¢"
              subline="No Hardware to Purchase, No Monthly SaaS Fees*"
              finePrint="*Restaurant qualification criteria applies. Pricing is per location per Point of Sale, excluding accessories."
            />
            <RateCard
              icon={Package}
              title="Build your Own Bundle"
              rate="2.59%+15¢"
              subline="Customize Your Hardware*"
              finePrint="*Pricing is per location cost. Terms apply."
            />
          </div>
        </div>
      </section>

      {/* Your Price */}
      <section className="border-t border-white/10 py-16 md:py-24">
        <div className="site-container">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div {...rise} className="min-w-0">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-orange-400">
                Your Price
              </p>
              <h2 className="mb-6 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Any Point of Sale or <span className="text-orange-500">Payment Processing</span>{' '}
                Quote
              </h2>
              <p className="text-lg leading-relaxed text-white/70 md:text-xl">
                Discuss your requirements with our team, upload your quote, statement and bill,
                it&apos;s that simple, <span className="font-bold text-white">we will beat it</span>.
              </p>
            </motion.div>

            <motion.div
              {...rise}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10"
            >
              <p className="text-center text-base text-white/90 md:text-lg">
                Upload last three months statements or a quote.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
                <ul className="space-y-3">
                  {QUOTE_BULLETS_LEFT.map((item) => (
                    <Bullet key={item} text={item} />
                  ))}
                </ul>
                <ul className="space-y-3">
                  {QUOTE_BULLETS_RIGHT.map((item) => (
                    <Bullet key={item} text={item} />
                  ))}
                </ul>
              </div>

              <div className="mt-10 text-center">
                <a
                  href="/bookademo"
                  className="inline-block rounded-full bg-orange-500 px-8 py-4 font-semibold text-white transition-colors hover:bg-orange-600"
                >
                  Learn More
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/10 py-16 md:py-24">
        <div className="site-container max-w-3xl">
          <motion.h2
            {...rise}
            className="mb-12 text-center text-3xl font-bold tracking-tighter md:text-4xl"
          >
            Questions<span className="text-orange-500">?</span>
          </motion.h2>
          <div className="space-y-8">
            <FaqItem
              q="Do I need to sign a long-term contract?"
              a="No. All our plans are month-to-month. You can cancel at any time with no penalties."
            />
            <FaqItem
              q="Does it work with my existing hardware?"
              a="Likely yes. eatOS runs on iPads and most Android tablets. Contact us to check specific compatibility."
            />
            <FaqItem
              q="What are the processing rates?"
              a="We offer several pricing models: flat rate, interchange plus, and custom rates for high volume merchants. We will look at your current statements and recommend the option that best fits your need and costs you less."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function RateCard({ icon: Icon, title, rate, subline, finePrint }) {
  return (
    <motion.div
      {...rise}
      className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-orange-500/30 md:p-10"
    >
      <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10 text-orange-400">
        <Icon size={26} />
      </div>
      <h2 className="mb-6 text-xl font-bold tracking-tight md:text-2xl">{title}</h2>
      <p className="text-3xl font-bold tracking-tight text-orange-500 md:text-4xl">{rate}</p>
      <p className="mt-1 text-lg font-medium text-white/90 md:text-xl">per tap, dip or swipe</p>
      <p className="mt-4 text-sm font-medium text-white/60">{subline}</p>
      <div className="mt-8">
        <a
          href="/bookademo"
          className="inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-105"
        >
          Book a Demo
        </a>
      </div>
      <p className="mt-auto pt-8 text-[11px] leading-relaxed text-white/40">{finePrint}</p>
    </motion.div>
  );
}

function Bullet({ text }) {
  return (
    <li className="flex gap-3 text-base leading-snug md:text-lg">
      <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
      <span className="text-white/80">{text}</span>
    </li>
  );
}

function FaqItem({ q, a }) {
  return (
    <motion.div {...rise} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
      <h3 className="mb-2 text-lg font-bold">{q}</h3>
      <p className="leading-relaxed text-white/60">{a}</p>
    </motion.div>
  );
}
