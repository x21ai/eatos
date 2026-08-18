// @ts-nocheck
import CafeClient from "./CafeClient";

export const metadata = {
  title: "Point of Sale System for Cafes | eatOS",
  description:
    "Cafe Point of Sale that is easy to learn, with menu and inventory control, employee management and self-service kiosk ordering.",
  openGraph: {
    title: "Point of Sale System for Cafes | eatOS",
    description:
      "Fast order entry, modifiers, inventory control, loyalty and kiosk ordering for cafes and coffee shops, all on eatOS.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function CafePage() {
  return <CafeClient />;
}
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-6">
              <Coffee size={16} />
              <span>Café & Coffee Shop</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-black mb-6">
              Brew faster, serve better
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Perfect for cafés and coffee shops. Handle morning rushes, loyalty
              programs, and mobile orders with ease.
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
                icon: Clock,
                title: "Quick Order Entry",
                desc: "Customize drinks and add-ons in seconds during peak hours.",
              },
              {
                icon: Users,
                title: "Loyalty Integration",
                desc: "Built-in rewards program to keep customers coming back.",
              },
              {
                icon: Coffee,
                title: "Mobile Ordering",
                desc: "Let customers order ahead and skip the line.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-8 border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow"
              >
                <feature.icon size={32} className="text-amber-600 mb-4" />
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
            Power your café with eatOS
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            See how we help cafés serve more customers, faster.
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
