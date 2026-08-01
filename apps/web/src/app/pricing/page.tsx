// @ts-nocheck
import { Check, X } from 'lucide-react';

export const metadata = {
  title: 'Pricing',
  description:
    'Transparent restaurant POS pricing with no hidden fees. Plans for food trucks, independent restaurants, and enterprise chains. Cancel anytime.',
  openGraph: {
    title: 'eatOS Pricing - Simple, Transparent Plans',
    description: 'No hidden fees. Restaurant POS software starting free. Cancel anytime.',
  },
};

export default function PricingPage() {
  return (
    <div className="bg-white min-h-screen text-black font-sans">
      <section className="pt-48 pb-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
            Choose your power.
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-16">
            Transparent pricing designed for restaurants of all sizes. No hidden fees. Cancel
            anytime.
          </p>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
            {/* Solo */}
            <div className="p-8 rounded-[2rem] bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
              <h3 className="text-2xl font-bold mb-2">Solo</h3>
              <div className="text-4xl font-bold mb-6">
                $0 <span className="text-lg text-gray-400 font-normal">/mo</span>
              </div>
              <p className="text-gray-500 mb-8 min-h-[50px]">
                For pop-ups, food trucks, and getting started.
              </p>
              <button className="w-full py-4 rounded-xl border border-gray-200 font-bold hover:bg-white transition-colors mb-8">
                Start Free
              </button>
              <div className="space-y-4">
                <Feature text="1 POS License" />
                <Feature text="Basic Reporting" />
                <Feature text="Menu Management" />
                <Feature text="Email Support" />
              </div>
            </div>

            {/* Pro - Highlighted */}
            <div className="p-8 rounded-[2rem] bg-black text-white transform md:-translate-y-4 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-colors" />

              <h3 className="text-2xl font-bold mb-2 relative z-10">Pro</h3>
              <div className="text-4xl font-bold mb-6 relative z-10">
                $69 <span className="text-lg text-gray-400 font-normal">/mo</span>
              </div>
              <p className="text-gray-400 mb-8 min-h-[50px] relative z-10">
                The complete operating system for modern restaurants.
              </p>
              <button className="w-full py-4 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-colors mb-8 relative z-10">
                Get Started
              </button>
              <div className="space-y-4 relative z-10">
                <Feature text="Unlimited POS Licenses" dark />
                <Feature text="Advanced Inventory" dark />
                <Feature text="Table Management" dark />
                <Feature text="Staff Scheduling" dark />
                <Feature text="KDS Integration" dark />
                <Feature text="24/7 Priority Support" dark />
              </div>
            </div>

            {/* Enterprise */}
            <div className="p-8 rounded-[2rem] bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
              <h3 className="text-2xl font-bold mb-2">Scale</h3>
              <div className="text-4xl font-bold mb-6">Custom</div>
              <p className="text-gray-500 mb-8 min-h-[50px]">
                For multi-location brands and franchises.
              </p>
              <button className="w-full py-4 rounded-xl border border-gray-200 font-bold hover:bg-white transition-colors mb-8">
                Contact Sales
              </button>
              <div className="space-y-4">
                <Feature text="Multi-location Management" />
                <Feature text="Global Menu Sync" />
                <Feature text="API Access" />
                <Feature text="Custom Integrations" />
                <Feature text="Dedicated Success Manager" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Questions?</h2>
          <div className="space-y-8">
            <FaqItem
              q="Do I need to sign a long-term contract?"
              a="No. All our plans are month-to-month. You can cancel at any time with no penalties."
            />
            <FaqItem
              q="Does it work with my existing hardware?"
              a="Likely yes. eatOS runs on iPads and most Android tablets. Contact us to check specific compatibility."
            />
            <FaqItem
              q="What are the processing rates?"
              a="We offer flat rate processing starting at 2.4% + 10¢. Custom rates available for high volume."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function Feature({ text, dark }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-5 h-5 rounded-full flex items-center justify-center ${dark ? 'bg-blue-600' : 'bg-gray-200'}`}
      >
        <Check size={12} className={dark ? 'text-white' : 'text-gray-600'} />
      </div>
      <span className={`font-medium ${dark ? 'text-gray-200' : 'text-gray-600'}`}>{text}</span>
    </div>
  );
}

function FaqItem({ q, a }) {
  return (
    <div>
      <h4 className="font-bold text-lg mb-2">{q}</h4>
      <p className="text-gray-500 leading-relaxed">{a}</p>
    </div>
  );
}
