// @ts-nocheck
'use client';

import {
  ChevronRight,
  Check,
  Gift,
  Zap,
  Shield,
  Clock,
  Monitor,
  ChefHat,
  Users,
  Palette,
  Smartphone,
  CreditCard,
  BarChart3,
  Store,
  RefreshCw,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Placeholder } from '@/components/marketing/Placeholder';
import { features, hardware, hero, keyFeatures, orderPanel } from './content';
import { products } from '../products';
import BrochureButton from '@/components/BrochureButton';

const relatedIcons = [
  { Icon: Monitor, tint: 'bg-sky-500/10 text-sky-400' },
  { Icon: ChefHat, tint: 'bg-amber-500/10 text-amber-400' },
  { Icon: Users, tint: 'bg-violet-500/10 text-violet-400' },
];

const featureIcons = [
  { Icon: Palette, tint: 'bg-rose-500/10 text-rose-400' },
  { Icon: Smartphone, tint: 'bg-pink-500/10 text-pink-400' },
  { Icon: CreditCard, tint: 'bg-rose-500/10 text-rose-400' },
  { Icon: BarChart3, tint: 'bg-pink-500/10 text-pink-400' },
];

const hardwareIcons = [
  { Icon: Palette, tint: 'bg-rose-500/10 text-rose-400' },
  { Icon: Store, tint: 'bg-pink-500/10 text-pink-400' },
  { Icon: RefreshCw, tint: 'bg-rose-500/10 text-rose-400' },
];

const related = products.filter((p) => p.slug !== 'giftcards').slice(0, 3);

const rise = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
};

export default function GiftCardsPageClient() {
  return (
    <div className="min-h-screen bg-black text-white font-montserrat selection:bg-rose-500/30">
      {/* Hero */}
      <section className="relative pt-32 md:pt-44 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-500/20 via-rose-600/10 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-rose-500/10 rounded-full blur-[150px] pointer-events-none opacity-50" />

        <div className="site-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-white/70 mb-8"
          >
            <a href="/products" className="hover:text-white transition-colors">
              Products
            </a>
            <ChevronRight size={14} className="shrink-0" />
            <span className="text-white">Gift Cards</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="min-w-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-8 text-rose-400"
              >
                <Gift size={36} />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-semibold uppercase tracking-[0.24em] text-rose-400 mb-4"
              >
                {hero.eyebrow}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter mb-6"
              >
                {hero.title} <span className="text-rose-400">{hero.titleAccent}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-white/90 leading-relaxed mb-10 max-w-xl"
              >
                {hero.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a
                  href={hero.primaryCta.href}
                  className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform text-center"
                >
                  {hero.primaryCta.label}
                </a>
                <BrochureButton brochureId="restaurants-made-simple" />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="min-w-0 rounded-[2rem] md:rounded-[2.5rem] border border-rose-500/20 bg-white/5 backdrop-blur-xl p-8 md:p-10"
            >
              <h2 className="text-xl font-bold tracking-tighter mb-8">Key features</h2>
              <div className="space-y-5 md:space-y-6">
                {keyFeatures.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.08 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-8 h-8 shrink-0 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mt-0.5">
                      <Check size={16} />
                    </div>
                    <div className="min-w-0 text-base md:text-lg font-medium">{feature}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Numbers strip */}
      <section className="border-t border-white/5 py-12 md:py-16">
        <div className="site-container">
          <div className="grid grid-cols-3 gap-6 md:gap-8">
            {hero.stats.map((stat) => (
              <motion.div key={stat.label} {...rise} className="min-w-0 text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter">
                  {stat.value}
                </div>
                <div className="mt-2 text-xs sm:text-sm text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Order panel */}
      <section className="py-20 md:py-28 border-t border-white/5">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div {...rise} className="min-w-0">
              <Placeholder label="eatOS custom gift card" ratio="aspect-[16/10]" bare />
            </motion.div>

            <motion.div {...rise} className="min-w-0">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">
                {orderPanel.title}
              </h2>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-3 h-3 rounded-full bg-rose-500 shrink-0" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                  {orderPanel.price}
                </span>
              </div>
              <p className="text-base md:text-lg text-white/90 leading-relaxed mb-10 max-w-xl">
                {orderPanel.body}
              </p>
              <a
                href={orderPanel.cta.href}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform"
              >
                {orderPanel.cta.label}
                <Gift size={18} className="shrink-0" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature rows */}
      <section className="py-20 md:py-28 border-t border-white/5">
        <div className="site-container space-y-16 md:space-y-24">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              id={feature.id}
              {...rise}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
            >
              <div className={`min-w-0 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                {(() => {
                  const { Icon, tint } = featureIcons[index % featureIcons.length];
                  return (
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${tint}`}
                    >
                      <Icon size={28} />
                    </div>
                  );
                })()}
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
                      <div className="text-2xl font-bold tracking-tighter text-rose-400">
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
                  ratio="aspect-[16/10]"
                  src={feature.image ?? undefined}
                  bare
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why */}
      <section className="py-20 md:py-28 border-t border-white/5">
        <div className="site-container">
          <motion.div {...rise} className="text-center mb-14 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
              Why Gift Cards?
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              New guests, prepaid revenue and a brand that travels in every wallet.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                Icon: Zap,
                tint: 'bg-amber-500/10 text-amber-400',
                title: 'Revenue up front',
                body: 'Cards are paid for the day they are sold, and most guests spend more than the value on them.',
              },
              {
                Icon: Shield,
                tint: 'bg-rose-500/10 text-rose-400',
                title: 'Reliable at scale',
                body: 'One location or hundreds, every card balance stays accurate and auditable.',
              },
              {
                Icon: Clock,
                tint: 'bg-emerald-500/10 text-emerald-400',
                title: '24/7 support',
                body: 'Real people, real help, any time you need it, especially through the holiday rush.',
              },
            ].map((card, index) => (
              <motion.div
                key={card.title}
                {...rise}
                transition={{ delay: index * 0.1 }}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-10"
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${card.tint}`}
                >
                  <card.Icon size={28} />
                </div>
                <h3 className="text-2xl font-bold tracking-tighter mb-3">{card.title}</h3>
                <p className="text-white/90 leading-relaxed">{card.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Spec cards */}
      <section className="py-20 md:py-28 border-t border-white/5">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {hardware.specs.map((spec, index) => (
              <motion.div
                key={spec.title}
                {...rise}
                transition={{ delay: index * 0.08 }}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-8"
              >
                {(() => {
                  const { Icon, tint } = hardwareIcons[index % hardwareIcons.length];
                  return (
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${tint}`}
                    >
                      <Icon size={24} />
                    </div>
                  );
                })()}
                <h3 className="text-xl font-bold tracking-tighter">{spec.title}</h3>
                <p className="mt-3 text-white/90 leading-relaxed">{spec.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-20 md:py-28 border-t border-white/5">
        <div className="site-container">
          <motion.div
            {...rise}
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Works great with</h2>
            <a
              href="/products"
              className="text-white border-b border-white/30 pb-1 hover:border-white transition-colors flex items-center gap-1"
            >
              View all products <ChevronRight size={16} className="shrink-0" />
            </a>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((item, index) => {
              const { Icon, tint } = relatedIcons[index % relatedIcons.length];
              return (
                <motion.a
                  key={item.slug}
                  href={item.href}
                  {...rise}
                  transition={{ delay: index * 0.1 }}
                  className="group rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-8 transition-all hover:border-white/20"
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${tint}`}
                  >
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold tracking-tighter mb-2">{item.title}</h3>
                  <p className="text-white/70 mb-6">{item.tagline}</p>
                  <div className="flex items-center gap-1 text-sm font-semibold text-white group-hover:gap-2 transition-all">
                    Learn more
                    <ChevronRight
                      size={16}
                      className="shrink-0 transition-transform group-hover:translate-x-0.5"
                    />
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 md:pb-28">
        <div className="site-container">
          <motion.div {...rise} className="relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 via-rose-600/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

            <div className="relative z-10 p-10 md:p-20 text-center">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">
                Ready to design your cards?
              </h2>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10">
                Book a demo and we will walk you through artwork, packs and how gift cards run on
                your Point of Sale.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/book-demo"
                  className="px-10 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform"
                >
                  Book a Demo
                </a>
                <a
                  href="/pricing"
                  className="px-10 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors"
                >
                  View Pricing
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
