// @ts-nocheck
import { Truck, Smartphone, MapPin, Check } from "lucide-react";

export default function FoodTruckPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-green-50 to-white">
        <div className="site-container ">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6">
              <Truck size={16} />
              <span>Food Truck</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-black mb-6">
              Built to serve anywhere you park
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built for food trucks on the move. Accept payments anywhere, track
              inventory, and manage orders from your phone.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-28">
        <div className="site-container ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Smartphone,
                title: "Mobile POS",
                desc: "Run your entire operation from a tablet or phone.",
              },
              {
                icon: MapPin,
                title: "Location Tracking",
                desc: "Let customers find you with real-time location updates.",
              },
              {
                icon: Truck,
                title: "Offline Mode",
                desc: "Keep taking orders even without internet connection.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-8 border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow"
              >
                <feature.icon size={32} className="text-green-600 mb-4" />
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
        <div className="mx-auto w-full px-5 md:px-8 lg:px-10 max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Take your truck to the next level
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            See how eatOS powers food trucks across the country.
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
