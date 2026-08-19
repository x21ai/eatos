// @ts-nocheck
'use client';

import { Smartphone, CreditCard, Printer, ArrowRight, Zap, Battery, Wifi } from 'lucide-react';

export default function HardwarePage() {
  return (
    <div className="bg-zinc-950 min-h-screen text-white font-sans selection:bg-white/20">
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-950 to-zinc-950 z-0"></div>

        <div className="site-container relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 leading-tight animate-in fade-in zoom-in-50 duration-1000">
              Industrial <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600">
                Art.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              Hardware that commands attention. Milled from solid aluminum, designed for heavy daily
              use, and beautiful from every angle.
            </p>
          </div>
        </div>

        {/* Hero Product Shot (CSS Composition) */}
        <div className="relative mt-20 h-[600px] w-full flex items-center justify-center perspective-[2000px]">
          <div className="relative w-[300px] h-[500px] bg-zinc-900 rounded-[3rem] shadow-[0_0_100px_rgba(255,255,255,0.05)] border border-zinc-800 transform rotate-y-12 rotate-x-6 animate-float-slow transition-transform hover:scale-105 duration-700 group">
            {/* Screen */}
            <div className="absolute top-3 left-3 right-3 bottom-3 bg-black rounded-[2.5rem] overflow-hidden flex flex-col relative z-20">
              <div className="flex-1 flex flex-col items-center justify-center p-8">
                <div className="w-20 h-20 rounded-full border-2 border-white/10 flex items-center justify-center mb-6">
                  <CreditCard size={32} className="text-white" />
                </div>
                <div className="text-3xl font-bold text-white">$42.50</div>
                <div className="text-zinc-500 mt-2">Tap to Pay</div>
              </div>
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>
            </div>

            {/* Side Reflection */}
            <div className="absolute inset-0 rounded-[3rem] shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] pointer-events-none z-30"></div>
          </div>
        </div>
      </section>

      {/* Product Showcase - Zavo Pro */}
      <section className="py-20 md:py-20 md:py-28 bg-black border-t border-white/5">
        <div className="site-container">
          <div className="flex flex-col md:flex-row items-center gap-20">
            <div className="flex-1">
              <div className="w-full aspect-square bg-gradient-to-br from-zinc-800 to-black rounded-3xl p-12 flex items-center justify-center relative overflow-hidden group">
                {/* Spotlight effect */}
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(255,255,255,0.1),_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                {/* Terminal Mockup */}
                <div className="w-64 h-52 bg-zinc-900 rounded-lg shadow-2xl relative border-t border-white/10 transform group-hover:-translate-y-2 transition-transform duration-500">
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-32 h-10 bg-zinc-900 rounded-b-lg"></div>
                  <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-40 h-4 bg-zinc-800 rounded-full blur-xl opacity-50"></div>
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
                <strong>eatOS</strong> Pro
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                The all-in-one powerhouse. A customer facing display, built-in high speed printer,
                and a 15-inch operator screen. All connected via a single cable.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-2 text-white font-bold mb-1">
                    <Printer size={18} /> Instant Print
                  </div>
                  <p className="text-sm text-gray-500">250mm/sec thermal printing</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-white font-bold mb-1">
                    <Wifi size={18} /> 5G & WiFi 6E
                  </div>
                  <p className="text-sm text-gray-500">Always online connectivity</p>
                </div>
              </div>
              <button className="text-white border-b border-white pb-1 hover:text-gray-300 hover:border-gray-300 transition-colors">
                View Specs
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase - Zavo Mini */}
      <section className="py-20 md:py-20 md:py-28 bg-black">
        <div className="site-container">
          <div className="flex flex-col md:flex-row-reverse items-center gap-20">
            <div className="flex-1">
              <div className="w-full aspect-square bg-gradient-to-bl from-zinc-800 to-black rounded-3xl p-12 flex items-center justify-center relative overflow-hidden group">
                {/* Spotlight effect */}
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(255,255,255,0.1),_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                {/* Handheld Mockup */}
                <div className="w-32 h-64 bg-zinc-900 rounded-[2rem] shadow-2xl border border-white/5 relative transform group-hover:rotate-6 transition-transform duration-500">
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-1 bg-zinc-800 rounded-full"></div>
                  <div className="absolute inset-4 bg-black rounded-2xl"></div>
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
                <strong>eatOS</strong> Mini
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                Power in your pocket. Take orders tableside, line bust during rush hour, or accept
                payments at the curb.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-2 text-white font-bold mb-1">
                    <Battery size={18} /> All Day Battery
                  </div>
                  <p className="text-sm text-gray-500">24 hours of continuous use</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-white font-bold mb-1">
                    <Zap size={18} /> MagSafe
                  </div>
                  <p className="text-sm text-gray-500">Snap to charge</p>
                </div>
              </div>
              <button className="text-white border-b border-white pb-1 hover:text-gray-300 hover:border-gray-300 transition-colors">
                View Specs
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tap to Pay */}
      <section className="py-20 md:py-20 md:py-28 bg-white text-black relative overflow-hidden">
        <div className="site-container relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-8">
            <Smartphone size={16} />
            <span>Tap to Pay on iPhone</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8">
            No hardware <br /> required.
          </h2>
          <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto">
            Turn your personal iPhone into a payment terminal instantly. Secure, fast, and no
            dongles needed.
          </p>
          <button className="bg-black text-white px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition-transform">
            Download the App
          </button>
        </div>
      </section>

      <style jsx global>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0) rotateY(12deg) rotateX(6deg);
          }
          50% {
            transform: translateY(-20px) rotateY(12deg) rotateX(6deg);
          }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
