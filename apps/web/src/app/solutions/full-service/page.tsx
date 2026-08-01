// @ts-nocheck
import { Utensils, Table, Users, Check } from "lucide-react";

export default function FullServicePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-indigo-50 to-white">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-6">
              <Utensils size={16} />
              <span>Full Service</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-black mb-6">
              Seamless table-to-kitchen flow
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Manage courses, reservations, and floor plans effortlessly with
              eatOS built for full-service dining.
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
                icon: Table,
                title: "Table Management",
                desc: "Visual floor plans, reservations, and waitlist management in one place.",
              },
              {
                icon: Utensils,
                title: "Smart Coursing",
                desc: "Automatically time courses to perfection for every table.",
              },
              {
                icon: Users,
                title: "Split Checks",
                desc: "Handle complex bills and split payments with ease.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-8 border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow"
              >
                <feature.icon size={32} className="text-indigo-600 mb-4" />
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
            Elevate your dining experience
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Discover how eatOS transforms full-service operations.
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
