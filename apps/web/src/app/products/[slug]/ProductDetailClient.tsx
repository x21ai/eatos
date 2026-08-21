// @ts-nocheck
'use client';

import {
  ChevronRight,
  Check,
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
  Zap,
  Shield,
  Clock,
} from 'lucide-react';
import { motion } from 'motion/react';
import { getProductBySlug, products } from '../products';
import BrochureButton from '@/components/BrochureButton';

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
  orange: {
    gradient: 'from-orange-500/20 via-orange-600/10 to-transparent',
    accent: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
  },
  green: {
    gradient: 'from-green-500/20 via-green-600/10 to-transparent',
    accent: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
  },
  indigo: {
    gradient: 'from-indigo-500/20 via-indigo-600/10 to-transparent',
    accent: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
  },
  purple: {
    gradient: 'from-purple-500/20 via-purple-600/10 to-transparent',
    accent: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
  },
  blue: {
    gradient: 'from-blue-500/20 via-blue-600/10 to-transparent',
    accent: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  cyan: {
    gradient: 'from-cyan-500/20 via-cyan-600/10 to-transparent',
    accent: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
  },
  teal: {
    gradient: 'from-teal-500/20 via-teal-600/10 to-transparent',
    accent: 'text-teal-400',
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/20',
  },
  violet: {
    gradient: 'from-violet-500/20 via-violet-600/10 to-transparent',
    accent: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
  },
  rose: {
    gradient: 'from-rose-500/20 via-rose-600/10 to-transparent',
    accent: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
  },
  pink: {
    gradient: 'from-pink-500/20 via-pink-600/10 to-transparent',
    accent: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
  },
  amber: {
    gradient: 'from-amber-500/20 via-amber-600/10 to-transparent',
    accent: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
  emerald: {
    gradient: 'from-emerald-500/20 via-emerald-600/10 to-transparent',
    accent: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  zinc: {
    gradient: 'from-zinc-400/20 via-zinc-500/10 to-transparent',
    accent: 'text-white/90',
    bg: 'bg-zinc-500/10',
    border: 'border-zinc-500/20',
  },
  red: {
    gradient: 'from-red-500/20 via-red-600/10 to-transparent',
    accent: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
  },
  slate: {
    gradient: 'from-slate-400/20 via-slate-500/10 to-transparent',
    accent: 'text-slate-300',
    bg: 'bg-slate-500/10',
    border: 'border-slate-500/20',
  },
};

export default function ProductDetailClient({ slug }) {
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white font-sans flex items-center justify-center px-6">
        <div className="max-w-xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-8"
          >
            <Package size={32} className="text-white/70" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-4"
          >
            Product not found
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-white/90 text-lg mb-10"
          >
            That product page doesn't exist yet. Want to see what we offer?
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform"
            >
              View All Products
            </a>
            <a
              href="/contact-sales"
              className="px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    );
  }

  const colors = colorMap[product.color] || colorMap.indigo;
  const IconComponent = iconMap[product.icon] || Package;

  // Get related products (same category feel, excluding current)
  const relatedProducts = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-indigo-500/30">
      {/* Hero Section */}
      <section className="relative pt-32 md:pt-44 pb-20 overflow-hidden">
        {/* Background gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-b ${colors.gradient} pointer-events-none`}
        />
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] ${colors.bg} rounded-full blur-[150px] pointer-events-none opacity-50`}
        />

        <div className="site-container relative z-10">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-white/70 mb-8"
          >
            <a href="/products" className="hover:text-white transition-colors">
              Products
            </a>
            <ChevronRight size={14} />
            <span className="text-white">{product.title}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              {/* Coming Soon Badge */}
              {product.comingSoon && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium mb-6 text-white/90"
                >
                  <Clock size={14} />
                  <span>Coming Soon</span>
                </motion.div>
              )}

              {/* Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className={`w-20 h-20 rounded-3xl ${colors.bg} border ${colors.border} flex items-center justify-center mb-8 ${colors.accent}`}
              >
                <IconComponent size={40} />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-7xl font-bold tracking-tighter mb-4"
              >
                {product.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`text-2xl md:text-3xl font-medium mb-6 ${colors.accent}`}
              >
                {product.tagline}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-white/90 leading-relaxed mb-10 max-w-xl"
              >
                {product.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a
                  href="/contact-sales"
                  className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform text-center"
                >
                  Book a Demo
                </a>
                <a
                  href="/get-started"
                  className="px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors text-center"
                >
                  Get Started
                </a>
                <BrochureButton brochureId={product.slug} />
              </motion.div>
            </div>

            {/* Feature List Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`rounded-[2.5rem] border ${colors.border} bg-white/5 backdrop-blur-xl p-10`}
            >
              <h3 className="text-xl font-bold mb-8">Key Features</h3>
              <div className="space-y-6">
                {product.features.map((feature, index) => (
                  <motion.div
                    key={index}
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
                    <div>
                      <div className="text-lg font-medium">{feature}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-28 border-t border-white/5">
        <div className="site-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              Why {product.title}?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Built for real restaurant operations. Designed to disappear into workflow.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-10"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 text-white">
                <Zap size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Built for Speed</h3>
              <p className="text-white/90 leading-relaxed">
                Every interaction is designed to be fast. No lag, no waiting, no frustration during
                the rush.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-10"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 text-white">
                <Shield size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Reliable at Scale</h3>
              <p className="text-white/90 leading-relaxed">
                From one location to hundreds. Our infrastructure handles millions of transactions
                daily.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-10"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 text-white">
                <Clock size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3">24/7 Support</h3>
              <p className="text-white/90 leading-relaxed">
                Real humans, real help, any time. We're here when you need us, especially during the
                dinner rush.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-20 md:py-28 border-t border-white/5">
        <div className="site-container">
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
                  <p className="text-white/70 mb-6">{related.tagline}</p>
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

      {/* CTA Section */}
      <section className="pb-32">
        <div className="site-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[3rem] overflow-hidden"
          >
            {/* Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

            <div className="relative z-10 p-12 md:p-20 text-center">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
                Ready to get started?
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
                See {product.title} in action. Book a quick demo and we will show you exactly how it seamlessly fits your
                service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact-sales"
                  className="px-10 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform"
                >
                  Book a Demo
                </a>
                <a
                  href="/get-started"
                  className="px-10 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors"
                >
                  Get Started Now
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
