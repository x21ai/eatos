// @ts-nocheck
import {
  Monitor,
  Cpu,
  Wifi,
  CreditCard,
  ArrowRight,
  Layers,
} from "lucide-react";

export const metadata = {
  title: 'Point of Sale Pro Terminal | eatOS',
  description:
    'The eatOS Pro terminal: a commercial grade countertop Point of Sale with a bright touch display, built in payments and offline reliability.',
  openGraph: {
    type: 'website',
    title: 'Point of Sale Pro Terminal | eatOS',
    description:
      'The eatOS Pro terminal: a commercial grade countertop Point of Sale with a bright touch display, built in payments and offline reliability.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Point of Sale Pro Terminal | eatOS',
    description:
      'The eatOS Pro terminal: a commercial grade countertop Point of Sale with a bright touch display, built in payments and offline reliability.',
  },
};


export default function ProPage() {
  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-white/20">
      {/* Sticky Sub-nav */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-black/80 backdrop-blur-md z-40 flex items-center border-b border-white/10 mt-[60px] md:mt-[80px]">
        <div className="site-container flex justify-between items-center">
          <div className="font-bold text-lg">
            <strong>eatOS</strong> Pro
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#overview"
              className="text-sm text-white/90 hover:text-white transition-colors hidden md:block"
            >
              Overview
            </a>
            <a
              href="#specs"
              className="text-sm text-white/90 hover:text-white transition-colors hidden md:block"
            >
              Specs
            </a>
            <button className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors">
              Buy
            </button>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="pt-48 pb-32 relative overflow-hidden">
        <div className="site-container text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 text-xs font-medium mb-8 text-white/90">
            New Generation
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6">
            The ultimate <br /> countertop.
          </h1>
          <p className="text-2xl text-white/70 mb-12">
            Fast. Powerful. And stunningly beautiful.
          </p>
        </div>

        {/* Product Hero Viz */}
        <div className="relative w-full h-[600px] flex items-center justify-center">
          <div className="w-[600px] h-[400px] bg-zinc-900 rounded-[2rem] border border-white/10 shadow-[0_0_100px_rgba(255,255,255,0.1)] relative z-10 transform rotate-x-12 hover:rotate-x-0 transition-transform duration-1000">
            {/* Screen */}
            <div className="absolute top-4 left-4 right-4 bottom-12 bg-black rounded-xl overflow-hidden border border-zinc-800">
              <div className="w-full h-full flex items-center justify-center text-zinc-800 font-bold text-6xl select-none">
                <strong>eatOS</strong>
              </div>
            </div>
            {/* Stand */}
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-zinc-800 transform perspective-[500px] rotate-x-45 rounded-b-3xl"></div>
          </div>
        </div>
      </section>

      {/* Features - Dark Bento */}
      <section className="py-20 md:py-20 md:py-28 bg-zinc-950">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Performance */}
            <div className="col-span-1 lg:col-span-2 bg-zinc-900 rounded-3xl p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors"></div>
              <div className="relative z-10">
                <Cpu size={32} className="text-blue-500 mb-6" />
                <h3 className="text-3xl font-bold mb-4">M1 Speed.</h3>
                <p className="text-white/90 text-lg max-w-md">
                  Powered by our custom silicon for instant menu loads and
                  zero-latency order processing.
                </p>
              </div>
            </div>

            {/* Connectivity */}
            <div className="bg-zinc-900 rounded-3xl p-10 relative overflow-hidden group">
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent"></div>
              <Wifi size={32} className="text-green-500 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Always On.</h3>
              <p className="text-white/90">
                Dual-band WiFi 6E + 5G LTE backup keeps you running even when
                the internet goes down.
              </p>
            </div>

            {/* Durability */}
            <div className="bg-zinc-900 rounded-3xl p-10 relative overflow-hidden group">
              <Layers size={32} className="text-orange-500 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Kitchen Proof.</h3>
              <p className="text-white/90">
                IP54 rated against spills, dust, and grease. Built to survive
                the dinner rush.
              </p>
            </div>

            {/* Display */}
            <div className="col-span-1 lg:col-span-2 bg-zinc-900 rounded-3xl p-10 relative overflow-hidden group flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1 relative z-10">
                <Monitor size={32} className="text-purple-500 mb-6" />
                <h3 className="text-3xl font-bold mb-4">Retina Clarity.</h3>
                <p className="text-white/90 text-lg">
                  15-inch 4K display with anti-glare coating. Crisp text and
                  vibrant food photos in any lighting.
                </p>
              </div>
              <div className="flex-1 w-full aspect-video bg-black rounded-xl border border-zinc-800 shadow-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Specs Section */}
      <section id="specs" className="py-20 md:py-28 border-t border-white/10">
        <div className="site-container">
          <h2 className="text-4xl font-bold mb-16">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12 text-lg">
            <div className="border-b border-white/10 pb-8">
              <div className="font-bold text-white/70 mb-2">Display</div>
              <div>15.6" Full HD Touchscreen</div>
              <div className="text-white/90">400 nits brightness</div>
            </div>
            <div className="border-b border-white/10 pb-8">
              <div className="font-bold text-white/70 mb-2">Processor</div>
              <div>Octa-core 2.4GHz</div>
              <div className="text-white/90">4GB RAM / 64GB Storage</div>
            </div>
            <div className="border-b border-white/10 pb-8">
              <div className="font-bold text-white/70 mb-2">Connectivity</div>
              <div>WiFi 6, Bluetooth 5.0</div>
              <div className="text-white/90">Ethernet, USB-C x 4</div>
            </div>
            <div className="border-b border-white/10 pb-8">
              <div className="font-bold text-white/70 mb-2">Printer</div>
              <div>Built-in Thermal Printer</div>
              <div className="text-white/90">80mm paper width, auto-cutter</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
