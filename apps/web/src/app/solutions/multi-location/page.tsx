// @ts-nocheck
import { Building2, BarChart3, Users, Check } from "lucide-react";

export default function MultiLocationPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
              <Building2 size={16} />
              <span>Multi-Location</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-black mb-6">
              One platform, every location
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Centralized management for restaurant groups. Monitor performance,
              standardize operations, and scale with confidence.
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
                icon: BarChart3,
                title: "Unified Dashboard",
                desc: "See sales, labor, and inventory across all locations in real time.",
              },
              {
                icon: Users,
                title: "Centralized Menu Management",
                desc: "Update menus, pricing, and promotions across all stores instantly.",
              },
              {
                icon: Building2,
                title: "Location-Specific Insights",
                desc: "Compare performance and identify top-performing locations.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-8 border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow"
              >
                <feature.icon size={32} className="text-blue-600 mb-4" />
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
            Scale with confidence
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Discover how eatOS helps restaurant groups grow smarter.
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
