// @ts-nocheck
import {
  Smartphone,
  ShieldCheck,
  Wifi,
  CreditCard,
  Check,
  ArrowRight,
} from "lucide-react";

export default function TapToPayPage() {
  return (
    <div className="bg-white min-h-screen font-sans selection:bg-orange-500/20">
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-white text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Smartphone size={16} />
            <span>Tap to Pay on iPhone</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 text-slate-900 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            No terminal? <br />
            <span className="text-gray-400">No problem.</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            Accept contactless payments right on your iPhone. No extra hardware.
            No dongles. Just the eatOS app.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-400">
            <button className="bg-black text-white px-8 py-4 rounded-full text-lg font-medium hover:scale-105 transition-transform w-full sm:w-auto shadow-xl">
              Download the App
            </button>
            <button className="text-black border border-gray-200 px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-50 transition-colors w-full sm:w-auto">
              How it Works
            </button>
          </div>
        </div>

        {/* iPhone Demo Visual */}
        <div className="relative mt-20 mx-auto max-w-[320px] h-[650px] animate-in fade-in slide-in-from-bottom-20 duration-1000 delay-500">
          {/* iPhone Frame */}
          <div className="absolute inset-0 bg-black rounded-[50px] shadow-2xl border-[8px] border-gray-800 z-20 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-7 w-32 bg-black rounded-b-2xl z-30"></div>

            {/* Screen Content */}
            <div className="w-full h-full bg-white flex flex-col items-center pt-24 pb-8 px-6 relative">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4 shadow-lg animate-pulse">
                <CreditCard size={24} className="text-white" />
              </div>
              <div className="text-center mb-12">
                <div className="text-sm text-gray-500 font-medium uppercase tracking-wide mb-1">
                  Total
                </div>
                <div className="text-6xl font-bold tracking-tighter">
                  $24.50
                </div>
              </div>

              <div className="flex-1 w-full flex flex-col justify-end items-center">
                <div className="w-full aspect-[1.58/1] bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-xl relative overflow-hidden transform rotate-6 hover:rotate-0 transition-transform duration-500 cursor-pointer">
                  {/* Card Visual */}
                  <div className="absolute top-6 left-6 text-white/80 font-mono text-lg">
                    •••• 4242
                  </div>
                  <div className="absolute bottom-6 left-6 text-white font-bold text-lg">
                    VISA
                  </div>
                  <div className="absolute top-6 right-6">
                    <Wifi size={24} className="text-white/50 rotate-90" />
                  </div>
                </div>
                <div className="mt-8 text-gray-400 text-sm font-medium animate-bounce">
                  Hold near reader
                </div>
              </div>
            </div>
          </div>

          {/* Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-100 to-purple-100 rounded-full blur-3xl -z-10 opacity-60"></div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Secure & Private.</h3>
              <p className="text-gray-500 leading-relaxed">
                Uses the built-in security features of iPhone to keep your
                business and your customer's data private and secure.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center mb-6">
                <Wifi size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Accept Anything.</h3>
              <p className="text-gray-500 leading-relaxed">
                Accept Apple Pay, other digital wallets, and contactless credit
                or debit cards.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center mb-6">
                <Check size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Easy Setup.</h3>
              <p className="text-gray-500 leading-relaxed">
                Just download the eatOS app on your iPhone XS or later. No extra
                terminals to buy or charge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-black text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
            Ready to start?
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Turn your iPhone into a payment terminal today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-white text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-colors flex items-center gap-2">
              <Smartphone size={20} />
              Get the App
            </button>
            <a
              href="/pricing"
              className="text-white border-b border-white pb-1 hover:text-gray-300 hover:border-gray-300 transition-colors flex items-center gap-2"
            >
              View Pricing <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
