// @ts-nocheck
import { Network, Shield, TrendingUp, Check } from "lucide-react";

export default function FranchisePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-violet-50 to-white">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-medium mb-6">
              <Network size={16} />
              <span>Franchise</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-black mb-6">
              Built for franchise success
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Empower franchisees with the tools they need while maintaining
              brand consistency and corporate oversight.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Brand Consistency",
                desc: "Enforce menu standards, pricing, and promotions across all franchises.",
              },
              {
                icon: Network,
                title: "Franchisee Portal",
                desc: "Give owners access to their data while protecting corporate insights.",
              },
              {
                icon: TrendingUp,
                title: "Royalty Tracking",
                desc: "Automated royalty calculations and reporting for every location.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-8 border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow"
              >
                <feature.icon size={32} className="text-violet-600 mb-4" />
                <h3 className="text-xl font-bold text-black mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-black text-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Grow your franchise network
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            See how eatOS supports franchisors and franchisees alike.
          </p>
          <a
            href="/book-demo"
            className="inline-block px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Book a Demo
          </a>
        </div>
      </section>
    </div>
  );
}
