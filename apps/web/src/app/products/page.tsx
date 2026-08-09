// @ts-nocheck
'use client';

import {
  ChevronRight,
  Monitor,
  ChefHat,
  Smartphone,
  Users,
  BarChart3,
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
} from 'lucide-react';
import { motion } from 'motion/react';
import { products } from './products';

const iconMap = {
  Monitor: Monitor,
  ChefHat: ChefHat,
  Smartphone: Smartphone,
  Users: Users,
  BarChart: BarChart3,
  CreditCard: CreditCard,
  Package: Package,
  Gift: Gift,
  Heart: Heart,
  Truck: Truck,
  Mail: Mail,
  Mic: Mic,
  Globe: Globe,
  QrCode: QrCode,
  Box: Box,
};

const colorMap = {
  orange: 'from-orange-500/20 to-orange-600/5 border-orange-500/20',
  green: 'from-green-500/20 to-green-600/5 border-green-500/20',
  indigo: 'from-indigo-500/20 to-indigo-600/5 border-indigo-500/20',
  purple: 'from-purple-500/20 to-purple-600/5 border-purple-500/20',
  blue: 'from-blue-500/20 to-blue-600/5 border-blue-500/20',
  cyan: 'from-cyan-500/20 to-cyan-600/5 border-cyan-500/20',
  teal: 'from-teal-500/20 to-teal-600/5 border-teal-500/20',
  violet: 'from-violet-500/20 to-violet-600/5 border-violet-500/20',
  rose: 'from-rose-500/20 to-rose-600/5 border-rose-500/20',
  pink: 'from-pink-500/20 to-pink-600/5 border-pink-500/20',
  amber: 'from-amber-500/20 to-amber-600/5 border-amber-500/20',
  emerald: 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/20',
  zinc: 'from-zinc-400/20 to-zinc-500/5 border-zinc-400/20',
  red: 'from-red-500/20 to-red-600/5 border-red-500/20',
  slate: 'from-slate-400/20 to-slate-500/5 border-slate-400/20',
};

const iconColorMap = {
  orange: 'text-orange-400',
  green: 'text-green-400',
  indigo: 'text-indigo-400',
  purple: 'text-purple-400',
  blue: 'text-blue-400',
  cyan: 'text-cyan-400',
  teal: 'text-teal-400',
  violet: 'text-violet-400',
  rose: 'text-rose-400',
  pink: 'text-pink-400',
  amber: 'text-amber-400',
  emerald: 'text-emerald-400',
  zinc: 'text-zinc-300',
  red: 'text-red-400',
  slate: 'text-slate-300',
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-indigo-500/30">
      {/* Hero Section */}
      <section className="relative pt-32 md:pt-44 pb-20 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/30 via-black to-black pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium mb-8 text-indigo-300"
          >
            <Package size={14} />
            <span>The Complete Suite</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl font-bold tracking-tighter mb-6"
          >
            Everything you need <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              to run service.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            From order entry to kitchen flow, payments to insights, and guest growth. One ecosystem.
            One partner.
          </motion.p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => {
              const IconComponent = iconMap[product.icon] || Package;
              const gradientClass = colorMap[product.color] || colorMap.indigo;
              const iconClass = iconColorMap[product.color] || iconColorMap.indigo;

              return (
                <motion.a
                  key={product.slug}
                  href={product.href}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  className={`group relative rounded-[2rem] border bg-gradient-to-b ${gradientClass} p-8 overflow-hidden transition-all duration-300 hover:border-white/20`}
                >
                  {/* Coming Soon Badge */}
                  {product.comingSoon && (
                    <div className="absolute top-6 right-6 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium text-white/70">
                      Coming Soon
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 ${iconClass}`}
                  >
                    <IconComponent size={28} />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold tracking-tighter mb-2">{product.title}</h3>
                  <p className="text-gray-400 leading-relaxed mb-6">{product.tagline}</p>

                  {/* Features */}
                  <div className="space-y-2 mb-8">
                    {product.features.slice(0, 3).map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-500">
                        <div className="w-1 h-1 rounded-full bg-gray-600" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Link */}
                  <div className="flex items-center gap-1 text-sm font-semibold text-white group-hover:gap-2 transition-all">
                    Learn more
                    <ChevronRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </div>

                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[3rem] overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-purple-900/30 to-black" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 p-12 md:p-20">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
                <div className="max-w-2xl">
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
                    Ready to see it in action?
                  </h2>
                  <p className="text-xl text-gray-300">
                    Tell us about your service type and locations, and we'll show you the perfect
                    setup.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="/contact-sales"
                    className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform text-center"
                  >
                    Contact Sales
                  </a>
                  <a
                    href="/get-started"
                    className="px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors text-center"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
