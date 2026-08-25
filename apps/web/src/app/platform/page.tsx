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
  Zap,
  ArrowRight,
  Sparkles,
  Store,
  TrendingUp,
  Megaphone,
} from 'lucide-react';
import { motion } from 'motion/react';
import { products } from '@/app/products/products';

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

// Group products by category
const categories = [
  {
    id: 'operations',
    title: 'Operations',
    subtitle: 'Run service flawlessly',
    description:
      'The tools that keep your front and back of house in perfect sync, from order entry to kitchen flow to workforce scheduling.',
    icon: Store,
    color: 'orange',
    products: [
      'point-of-sale',
      'kitchen-display-system',
      'point-of-purchase',
      'workforce-management',
      'simplified-inventory-management',
    ],
  },
  {
    id: 'guest-experience',
    title: 'Guest Experience',
    subtitle: 'Delight every guest',
    description:
      'Let guests order their way: at the table, at the counter, or from home. Frictionless, fast, and memorable.',
    icon: Sparkles,
    color: 'indigo',
    products: [
      'self-service-kiosk',
      'customer-facing-display',
      'tableside-order-and-pay',
      'apponlineorderingdelivery',
    ],
  },
  {
    id: 'growth',
    title: 'Growth',
    subtitle: 'Bring them back',
    description:
      'Turn first-time visitors into regulars. Smart marketing, loyalty rewards, and gift cards that drive repeat visits.',
    icon: TrendingUp,
    color: 'emerald',
    products: ['automated-marketing', 'loyalty', 'giftcards'],
  },
  {
    id: 'intelligence',
    title: 'Intelligence',
    subtitle: 'See everything clearly',
    description:
      'Real-time analytics, AI-powered ordering, and insights that help you make smarter decisions every day.',
    icon: Megaphone,
    color: 'purple',
    products: ['reporting-analytics', 'ai-enabled-ordering-automation'],
  },
];

const colorClasses = {
  orange: {
    gradient: 'from-orange-500/20 to-orange-900/5',
    border: 'border-orange-500/30',
    icon: 'text-orange-400 bg-orange-500/10',
    badge: 'bg-orange-500/20 text-orange-300',
    glow: 'bg-orange-500/20',
  },
  indigo: {
    gradient: 'from-indigo-500/20 to-indigo-900/5',
    border: 'border-indigo-500/30',
    icon: 'text-indigo-400 bg-indigo-500/10',
    badge: 'bg-indigo-500/20 text-indigo-300',
    glow: 'bg-indigo-500/20',
  },
  emerald: {
    gradient: 'from-emerald-500/20 to-emerald-900/5',
    border: 'border-emerald-500/30',
    icon: 'text-emerald-400 bg-emerald-500/10',
    badge: 'bg-emerald-500/20 text-emerald-300',
    glow: 'bg-emerald-500/20',
  },
  purple: {
    gradient: 'from-purple-500/20 to-purple-900/5',
    border: 'border-purple-500/30',
    icon: 'text-purple-400 bg-purple-500/10',
    badge: 'bg-purple-500/20 text-purple-300',
    glow: 'bg-purple-500/20',
  },
};

function ProductCard({ product, index }) {
  const IconComponent = iconMap[product.icon] || Package;

  return (
    <motion.a
      href={product.href}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex items-start gap-5 p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all"
    >
      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 group-hover:text-white transition-colors flex-shrink-0">
        <IconComponent size={22} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-semibold text-white group-hover:text-white transition-colors">
            {product.title}
          </h4>
          {product.comingSoon && (
            <span className="px-2 py-0.5 bg-white/10 rounded-full text-[10px] font-medium text-white/50">
              Soon
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500 leading-relaxed">{product.tagline}</p>
      </div>
      <ChevronRight
        size={18}
        className="text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1"
      />
    </motion.a>
  );
}

function CategorySection({ category, index }) {
  const colors = colorClasses[category.color];
  const categoryProducts = category.products
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean);

  const isEven = index % 2 === 0;

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div
        className={`absolute ${isEven ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 w-[600px] h-[600px] ${colors.glow} rounded-full blur-[150px] opacity-30 pointer-events-none`}
      />

      <div className="site-container relative z-10">
        <div
          className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-start min-w-0`}
        >
          {/* Category Info */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full min-w-0 lg:w-[400px] lg:sticky lg:top-32 lg:flex-shrink-0"
          >
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${colors.badge} text-sm font-medium mb-6`}
            >
              <category.icon size={14} />
              {category.subtitle}
            </div>

            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              {category.title}
            </h2>

            <p className="text-xl text-gray-400 leading-relaxed mb-8">{category.description}</p>

            <div className="flex items-center gap-1 text-sm font-medium text-white/60">
              <span>{categoryProducts.length} products</span>
            </div>
          </motion.div>

          {/* Products List */}
          <div className="flex-1 space-y-3 w-full">
            {categoryProducts.map((product, i) => (
              <ProductCard key={product.slug} product={product} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PlatformPage() {
  // Get featured products for hero (payments + hardware)
  const payments = products.find((p) => p.slug === 'payments');
  const hardware = products.find((p) => p.slug === 'hardware');

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-indigo-500/30">
      {/* Hero Section */}
      <section className="relative pt-32 md:pt-48 pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 via-black to-black pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-[100px] pointer-events-none" />

        <div className="site-container relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium mb-8 text-gray-300"
            >
              <Zap size={14} className="text-yellow-400" />
              <span>One ecosystem. Infinite possibilities.</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-[1.05]"
            >
              The complete <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                restaurant platform.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
            >
              Every tool you need to run, grow, and transform your restaurant, working together
              seamlessly.
            </motion.p>
          </div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { value: '16+', label: 'Products' },
              { value: '1', label: 'Platform' },
              { value: '24/7', label: 'Support' },
              { value: '0', label: 'Commissions' },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quick Links - Payments & Hardware */}
      <section className="py-16 border-y border-white/5">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Payments */}
            <motion.a
              href="/accept-payments"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.01 }}
              className="group relative rounded-[2rem] bg-gradient-to-br from-emerald-500/10 to-black border border-emerald-500/20 p-8 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] group-hover:bg-emerald-500/20 transition-colors" />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                    <CreditCard size={24} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{payments?.title || 'Payments'}</h3>
                  <p className="text-gray-400">{payments?.tagline || '2.99%+20¢ flat. No surprises.'}</p>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 font-medium">
                  Learn more{' '}
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </motion.a>

            {/* Hardware */}
            <motion.a
              href="/hardware"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.01 }}
              className="group relative rounded-[2rem] bg-gradient-to-br from-zinc-700/30 to-black border border-zinc-600/30 p-8 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-500/10 rounded-full blur-[80px] group-hover:bg-zinc-500/20 transition-colors" />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-zinc-700/50 flex items-center justify-center text-zinc-300 mb-4">
                    <Box size={24} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{hardware?.title || 'Hardware'}</h3>
                  <p className="text-gray-400">
                    {hardware?.tagline || 'Built to last. Designed to impress.'}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-zinc-300 font-medium">
                  Learn more{' '}
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Category Sections */}
      {categories.map((category, index) => (
        <CategorySection key={category.id} category={category} index={index} />
      ))}

      {/* Coming Soon - Autonomous Delivery */}
      <section className="py-24 border-t border-white/5">
        <div className="site-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[2.5rem] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 via-slate-900/50 to-black" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

            <div className="relative z-10 p-12 md:p-20 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-700/50 text-slate-300 text-sm font-medium mb-8">
                <Truck size={16} />
                Coming Soon
              </div>

              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
                Autonomous Delivery
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                Sidewalk robots that bring food to your guests. Zero emissions, real-time tracking,
                and a glimpse of the future.
              </p>

              <a
                href="/contact-sales"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition-colors"
              >
                Get Early Access <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="site-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[3rem] overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/60 via-purple-900/40 to-black" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 p-12 md:p-24 text-center">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
                Ready to see it all <br />
                working together?
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
                Book a demo and we'll show you exactly how eatOS can transform your operations.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/get-started"
                  className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform"
                >
                  Get Started Free
                </a>
                <a
                  href="/contact-sales"
                  className="px-8 py-4 rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
                >
                  Talk to Sales
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
