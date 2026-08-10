'use client';
// @ts-nocheck
import {
  ChevronRight,
  Check,
  ArrowRight,
  Smartphone,
  CreditCard,
  ShieldCheck,
  Percent,
  WifiOff,
  Receipt,
  Layers,
  Monitor,
  ChefHat,
  Users,
  BarChart3,
  Package,
  Gift,
  Heart,
  Truck,
  Mail,
  Mic,
  Globe,
  QrCode,
  Box,
  Zap,
  Shield,
  Clock,
} from 'lucide-react';
import { motion } from 'motion/react';
import { stats, steps, features, requirements, heroVideo } from './content';
import { products } from '../products/products';

const featureIcons = { CreditCard, ShieldCheck, Percent, WifiOff, Receipt, Layers };

const iconMap = {
  Monitor,
  ChefHat,
  Smartphone,
  Users,
  BarChart: BarChart3,
  CreditCard,
  Package,
  Gift,
  Heart,
  Truck,
  Mail,
  Mic,
  Globe,
  QrCode,
  Box,
};

const colorMap = {
  orange: { accent: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  green: { accent: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  indigo: { accent: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
  purple: { accent: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  blue: { accent: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  cyan: { accent: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  teal: { accent: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/20' },
  violet: { accent: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
  rose: { accent: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
  pink: { accent: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
  amber: { accent: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  emerald: { accent: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  zinc: { accent: 'text-zinc-300', bg: 'bg-zinc-500/10', border: 'border-zinc-500/20' },
};

const colors = {
  gradient: 'from-blue-500/20 via-blue-600/10 to-transparent',
  accent: 'text-blue-400',
  bg: 'bg-blue-500/10',
  border: 'border-blue-500/20',
};

export default function TapToPayClient() {
  const relatedProducts = products.slice(0, 3);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30">
      {/* Hero */}
      <section className="relative pt-32 md:pt-44 pb-20 overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-b ${colors.gradient} pointer-events-none`}
        />
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] ${colors.bg} rounded-full blur-[150px] pointer-events-none opacity-50`}
        />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-gray-500 mb-8"
          >
            <a href="/products" className="hover:text-white transition-colors">
              Products
            </a>
            <ChevronRight size={14} />
            <span className="text-white">Tap to Pay</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className={`w-20 h-20 rounded-3xl ${colors.bg} border ${colors.border} flex items-center justify-center mb-8 ${colors.accent}`}
              >
                <Smartphone size={40} />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-7xl font-bold tracking-tighter mb-4"
              >
                Tap to Pay
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`text-2xl md:text-3xl font-medium mb-6 ${colors.accent}`}
              >
                Right at the table.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-400 leading-relaxed mb-10 max-w-xl"
              >
                Take the payment in the same breath as the order. Your phone is the terminal.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a
                  href="/book-demo"
                  className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform text-center inline-flex items-center justify-center gap-2"
                >
                  Book a Demo <ArrowRight size={18} />
                </a>
                <a
                  href="/pricing"
                  className="px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors text-center"
                >
                  See Pricing
                </a>
              </motion.div>
            </div>

            {/* Hero video + Key Features */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div
                className={`relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border ${colors.border} bg-white/5`}
              >
                <video
                  src={heroVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="Server taking a contactless payment at the table"
                  className="h-full w-full object-cover aspect-video"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              <div
                className={`rounded-[2rem] md:rounded-[2.5rem] border ${colors.border} bg-white/5 backdrop-blur-xl p-6 sm:p-8 md:p-10`}
              >
              <h3 className="text-xl font-bold mb-8">Key Features</h3>
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div
                      className={`w-8 h-8 rounded-full ${colors.bg} ${colors.accent} flex items-center justify-center flex-shrink-0 mt-0.5`}
                    >
                      <Check size={16} />
                    </div>
                    <div className="text-lg font-medium">{feature.title}</div>
                  </motion.div>
                ))}
              </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Numbers strip */}
      <section className="py-16 md:py-20 border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="mb-2 text-4xl md:text-5xl font-bold tracking-tighter text-white">
                  {s.value}
                </div>
                <div className="text-sm text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* During the order */}
      <section className="py-20 md:py-28 border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              During the order
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Payment stops being a separate trip.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-10"
              >
                <div className={`mb-6 text-sm font-semibold tracking-widest ${colors.accent}`}>
                  {s.step}
                </div>
                <h3 className="text-2xl font-bold tracking-tighter mb-3">{s.title}</h3>
                <p className="text-gray-400 leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Tap to Pay */}
      <section className="py-20 md:py-28 border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              Why Tap to Pay?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything the terminal did. Nothing you have to carry.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => {
              const Icon = featureIcons[f.icon] ?? CreditCard;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.1 }}
                  className="rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-10 transition-colors hover:border-white/20"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl border ${f.iconBg} ${f.iconBorder} ${f.iconColor} flex items-center justify-center mb-6`}
                  >
                    <Icon size={26} />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tighter mb-3">{f.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{f.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 md:py-20 border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter">
              What you need to start
            </h2>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:flex md:flex-wrap md:justify-end md:gap-8">
              {requirements.map((r) => (
                <li key={r} className="flex items-center gap-2 text-sm text-gray-400 md:text-base">
                  <Check size={16} className={`shrink-0 ${colors.accent}`} /> {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Works great with */}
      <section className="py-20 md:py-28 border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Works great with</h2>
            <a
              href="/products"
              className="text-white border-b border-white/30 pb-1 hover:border-white transition-colors flex items-center gap-1"
            >
              View all products <ChevronRight size={16} />
            </a>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((related, index) => {
              const RelatedIcon = iconMap[related.icon] || Package;
              const relatedColors = colorMap[related.color] || colorMap.indigo;

              return (
                <motion.a
                  key={related.slug}
                  href={related.href}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className={`group rounded-[2rem] border ${relatedColors.border} bg-gradient-to-b from-white/5 to-transparent p-8 transition-all hover:border-white/20`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${relatedColors.bg} ${relatedColors.accent} flex items-center justify-center mb-6`}
                  >
                    <RelatedIcon size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{related.title}</h3>
                  <p className="text-gray-500 mb-6">{related.tagline}</p>
                  <div className="flex items-center gap-1 text-sm font-semibold text-white group-hover:gap-2 transition-all">
                    Learn more
                    <ChevronRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[3rem] overflow-hidden"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

            <div className="relative z-10 p-12 md:p-20 text-center">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
                Ready to get started?
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
                Turn the phones already in your team's pockets into payment terminals.
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
