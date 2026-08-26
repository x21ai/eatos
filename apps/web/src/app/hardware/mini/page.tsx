// @ts-nocheck
import {
  Battery,
  Smartphone,
  Wifi,
  CreditCard,
  Scan,
} from "lucide-react";

export const metadata = {
  title: 'Mini Handheld Terminal | eatOS',
  description:
    'The eatOS Mini puts a full Point of Sale in your hand for tableside ordering, payments and inventory checks.',
  openGraph: {
    type: 'website',
    title: 'Mini Handheld Terminal | eatOS',
    description:
      'The eatOS Mini puts a full Point of Sale in your hand for tableside ordering, payments and inventory checks.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mini Handheld Terminal | eatOS',
    description:
      'The eatOS Mini puts a full Point of Sale in your hand for tableside ordering, payments and inventory checks.',
  },
};


export default function MiniPage() {
  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-purple-500/30">
      {/* Sticky Sub-nav */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-black/80 backdrop-blur-md z-40 flex items-center border-b border-white/10 mt-[60px] md:mt-[80px]">
        <div className="site-container flex justify-between items-center">
          <div className="font-bold text-lg">
            <strong>eatOS</strong> Mini
          </div>
          <div className="flex items-center gap-6">
            <button className="bg-purple-600 text-white px-4 py-1.5 rounded-full text-sm font-bold hover:bg-purple-500 transition-colors">
              Buy Now $299
            </button>
          </div>
        </div>
      </div>

      <section className="pt-48 pb-32 relative overflow-hidden">
        <div className="site-container grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8">
              Power in <br /> your{" "}
              <span className="text-purple-500">pocket.</span>
            </h1>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              The full power of a Point of Sale terminal, shrunk down to the size of a
              phone. Tableside ordering, payments, and inventory management in
              the palm of your hand.
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-sm text-white/90">
                <Battery size={16} className="text-green-500" /> 24h Battery
              </div>
              <div className="flex items-center gap-2 text-sm text-white/90">
                <Wifi size={16} className="text-blue-500" /> 5G Connected
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Device Graphic */}
            <div className="w-[300px] h-[600px] bg-zinc-900 rounded-[3rem] border-4 border-zinc-800 shadow-[0_0_80px_rgba(168,85,247,0.2)] relative z-10 mx-auto transform rotate-6 hover:rotate-0 transition-transform duration-700">
              <div className="absolute inset-0 bg-gradient-to-br from-black to-zinc-900 rounded-[2.8rem] overflow-hidden flex flex-col">
                {/* Screen */}
                <div className="flex-1 p-6 relative">
                  <div className="w-full h-8 bg-black rounded-full mb-8 mx-auto w-1/3"></div>
                  <div className="space-y-4">
                    <div className="h-20 bg-zinc-800 rounded-2xl animate-pulse"></div>
                    <div className="h-20 bg-zinc-800 rounded-2xl animate-pulse delay-75"></div>
                    <div className="h-20 bg-zinc-800 rounded-2xl animate-pulse delay-150"></div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                    <div className="w-full h-14 bg-purple-600 rounded-xl flex items-center justify-center font-bold">
                      Charge $45.00
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24 bg-zinc-950">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-900/50 p-8 rounded-3xl border border-white/5 hover:bg-zinc-900 transition-colors">
              <Scan size={32} className="text-purple-400 mb-6" />
              <h3 className="text-xl font-bold mb-3">Built-in Scanner</h3>
              <p className="text-white/70">
                Scan barcodes for inventory or QR codes for loyalty instantly.
              </p>
            </div>
            <div className="bg-zinc-900/50 p-8 rounded-3xl border border-white/5 hover:bg-zinc-900 transition-colors">
              <CreditCard size={32} className="text-purple-400 mb-6" />
              <h3 className="text-xl font-bold mb-3">Accepts Everything</h3>
              <p className="text-white/70">
                Dip, tap, or swipe. Built-in card reader handles all payment
                types.
              </p>
            </div>
            <div className="bg-zinc-900/50 p-8 rounded-3xl border border-white/5 hover:bg-zinc-900 transition-colors">
              <Smartphone size={32} className="text-purple-400 mb-6" />
              <h3 className="text-xl font-bold mb-3">Pocket Ready</h3>
              <p className="text-white/70">
                Slim profile fits in an apron or back pocket comfortably.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
