// @ts-nocheck
'use client';

import {
  CreditCard,
  Smartphone,
  Zap,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  Wallet,
  ChevronLeft,
} from 'lucide-react';
import { motion } from 'motion/react';

export default function AcceptPaymentsPage() {
  return (
    <div className="bg-white min-h-screen font-sans text-slate-900 selection:bg-blue-100">
      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        {/* Background Image - Light Refraction */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://raw.createusercontent.com/2abe6721-038c-4bab-8bdb-5667b4aeccbe/"
            alt="Payments Background"
            className="w-full h-full object-cover opacity-60"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/50 to-white" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 pt-20">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <span className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full font-bold text-sm tracking-wide uppercase">
                Next Gen Processing
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-7xl md:text-9xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-500"
            >
              Liquid <br /> Liquidity.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl text-slate-500 mb-12 max-w-2xl leading-relaxed"
            >
              The fastest way to get paid. Instant settlements, zero hidden fees, and hardware that
              turns heads.
            </motion.p>

            {/* 3D Card Animation Simulation */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: 20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="relative w-full max-w-[400px] aspect-[2/3] perspective-[1000px]"
            >
              <div className="absolute inset-0 bg-black rounded-[3rem] shadow-2xl flex flex-col items-center justify-between p-8 text-white animate-float-slow border border-gray-800">
                <div className="w-full flex justify-between items-center opacity-50">
                  <CreditCard />
                  <span>
                    <strong>eatOS</strong>
                  </span>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">$124.50</div>
                  <div className="text-sm text-gray-400">Processing...</div>
                </div>
                <div className="w-full">
                  <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="h-full bg-blue-500"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bento Features */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-50 rounded-[3rem] p-12 flex flex-col justify-center min-h-[400px]">
              <h3 className="text-4xl font-bold mb-6 tracking-tight">Tap to Pay on iPhone</h3>
              <p className="text-xl text-slate-500 mb-8">
                No terminal? No problem. Use the device you already have to accept contactless
                payments anywhere.
              </p>
              <a
                href="/tap-to-pay"
                className="inline-flex items-center gap-2 font-bold text-blue-600 hover:gap-4 transition-all"
              >
                Learn more <ArrowRight />
              </a>
            </div>
            <div className="bg-black text-white rounded-[3rem] p-12 flex flex-col justify-center min-h-[400px] relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-4xl font-bold mb-6 tracking-tight">Instant Payouts</h3>
                <p className="text-xl text-gray-400 mb-8">
                  Cash out your sales immediately. Money hits your bank account in minutes,
                  24/7/365.
                </p>
              </div>
              {/* Abstract Grid Background */}
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
