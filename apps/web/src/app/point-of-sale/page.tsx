// @ts-nocheck
'use client';

import {
  Monitor,
  Zap,
  ChefHat,
  Truck,
  Users,
  LayoutGrid,
  Coffee,
  Search,
  Bell,
  UtensilsCrossed,
  Clock,
  ChevronLeft,
} from 'lucide-react';
import { motion } from 'motion/react';

export default function PointOfSalePage() {
  return (
    <div className="bg-black min-h-screen font-sans selection:bg-orange-500/30 text-white">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <img
          src="https://raw.createusercontent.com/0f9f7bed-312b-405c-a290-ec7efd519ed4/"
          className="w-full h-full object-cover blur-sm"
          alt="Restaurant Ambience"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-12 md:pt-48 md:pb-20">
          <div className="site-container text-center">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-bold tracking-tighter mb-6"
            >
              Focus on <br />
              <span className="text-orange-500">the food.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-gray-300 max-w-2xl mx-auto mb-12"
            >
              The interface that disappears. Designed for speed, clarity, and the service under
              pressure.
            </motion.p>
          </div>
        </section>

        {/* The Interactive Canvas */}
        <section className="pb-32 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="max-w-7xl mx-auto perspective-[2000px]"
          >
            <div className="bg-zinc-900 rounded-[2rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden relative h-[80vh] flex flex-col md:flex-row">
              {/* Sidebar */}
              <div className="w-20 bg-black border-r border-white/5 flex flex-col items-center py-8 gap-8 z-20">
                <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white font-bold">
                  e
                </div>
                <div className="flex-1 flex flex-col gap-6 w-full items-center">
                  <div className="p-3 bg-white/10 text-white rounded-xl">
                    <LayoutGrid size={24} />
                  </div>
                  <div className="p-3 text-gray-500 hover:text-white transition-colors">
                    <Users size={24} />
                  </div>
                  <div className="p-3 text-gray-500 hover:text-white transition-colors">
                    <Clock size={24} />
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 bg-zinc-900 p-6 flex flex-col relative overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold text-white">Dinner Service</h2>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full font-mono">
                      ONLINE
                    </span>
                  </div>
                  <div className="text-gray-400 text-sm" suppressHydrationWarning>
                    --:--
                  </div>
                </div>

                {/* Menu Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 overflow-y-auto pb-20">
                  {[
                    {
                      name: 'Wagyu Burger',
                      price: '$24',
                      color: 'from-orange-500/20 to-red-500/20',
                    },
                    {
                      name: 'Truffle Fries',
                      price: '$12',
                      color: 'from-yellow-500/20 to-orange-500/20',
                    },
                    {
                      name: 'Caesar Salad',
                      price: '$16',
                      color: 'from-green-500/20 to-emerald-500/20',
                    },
                    {
                      name: 'Spicy Tuna',
                      price: '$22',
                      color: 'from-red-500/20 to-pink-500/20',
                    },
                    {
                      name: 'Ribeye Steak',
                      price: '$45',
                      color: 'from-red-900/20 to-red-600/20',
                    },
                    {
                      name: 'Lobster Roll',
                      price: '$32',
                      color: 'from-orange-400/20 to-red-400/20',
                    },
                    {
                      name: 'Old Fashioned',
                      price: '$18',
                      color: 'from-amber-700/20 to-amber-500/20',
                    },
                    {
                      name: 'Martini',
                      price: '$16',
                      color: 'from-blue-200/10 to-white/10',
                    },
                  ].map((item, i) => (
                    <motion.button
                      key={i}
                      whileHover={{
                        scale: 1.02,
                        backgroundColor: 'rgba(255,255,255,0.05)',
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-black/40 border border-white/5 rounded-2xl p-6 text-left relative overflow-hidden group h-40 flex flex-col justify-between"
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                      />
                      <span className="font-bold text-lg relative z-10">{item.name}</span>
                      <span className="text-gray-400 relative z-10">{item.price}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Order Rail */}
              <div className="w-96 bg-black border-l border-white/5 flex flex-col z-20 shadow-2xl">
                <div className="p-6 border-b border-white/5">
                  <h3 className="text-xl font-bold mb-1">Table 4</h3>
                  <p className="text-sm text-gray-500">Server: Sarah M.</p>
                </div>
                <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">1x Wagyu Burger</div>
                      <div className="text-xs text-gray-500">Medium Rare</div>
                    </div>
                    <div>$24.00</div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">2x Old Fashioned</div>
                    </div>
                    <div>$36.00</div>
                  </div>
                  <div className="flex justify-between items-start text-green-400">
                    <div>
                      <div className="font-medium">1x Truffle Fries</div>
                      <div className="text-xs text-green-500/70">Happy Hour Promo</div>
                    </div>
                    <div>$0.00</div>
                  </div>
                </div>
                <div className="p-6 bg-zinc-900 border-t border-white/5">
                  <div className="flex justify-between text-2xl font-bold mb-6">
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
        </section>

        {/* Details Section */}
        <section className="py-24 bg-black">
          <div className="site-container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
              <div>
                <h3 className="text-2xl font-bold mb-4">Dark Mode Native</h3>
                <p className="text-gray-400 leading-relaxed">
                  Built for the dining room, not the office. Our true black dark mode saves battery
                  and eyes during late night shifts.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Offline First</h3>
                <p className="text-gray-400 leading-relaxed">
                  Internet down? No problem. Keep taking orders and printing tickets. We sync
                  everything when you're back online.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Multi-Course Fire</h3>
                <p className="text-gray-400 leading-relaxed">
                  Precision timing for the kitchen. Hold appetizers, fire entrees, and pace the meal
                  perfectly with a tap.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
