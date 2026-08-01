// @ts-nocheck
import { Zap, Clock, Users, TrendingUp, Check } from "lucide-react";

export default function QuickServicePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-6">
              <Zap size={16} />
              <span>Quick Service</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-black mb-6">
              Speed is everything
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built for high-volume, fast-paced environments. Take orders,
              process payments, and keep lines moving with eatOS.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "Lightning-Fast Orders",
                desc: "Process orders in seconds with an intuitive interface designed for speed.",
              },
              {
                icon: Users,
                title: "Kiosk Mode",
                desc: "Let customers order themselves and reduce wait times.",
              },
              {
                icon: TrendingUp,
                title: "Real-Time Analytics",
                desc: "Track peak hours, popular items, and optimize staffing on the fly.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-8 border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow"
              >
                <feature.icon size={32} className="text-orange-600 mb-4" />
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
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to speed up service?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            See how eatOS powers the fastest quick-service restaurants.
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
