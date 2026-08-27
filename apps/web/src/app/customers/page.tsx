// @ts-nocheck
import {
  ArrowRight,
  Quote,
  Star,
  TrendingUp,
  Clock,
  Users,
  Check,
} from "lucide-react";

export const metadata = {
  title: "Customers | eatOS | Restaurant Success Stories",
  description:
    "See how restaurants across the country use eatOS to streamline operations, increase revenue, and delight their guests.",
};

const caseStudies = [
  {
    name: "The Corner Kitchen",
    location: "New York, NY",
    type: "Full Service",
    image:
      "https://framerusercontent.com/images/jmUYZhUVZsYzpWQJh0KHr9yn7oc.png",
    quote:
      "eatOS completely transformed how we run our restaurant. From Point of Sale to kitchen display to payments, everything just works together seamlessly.",
    person: "James Miller",
    role: "Owner",
    initials: "JM",
    color: "bg-indigo-100 text-indigo-700",
    stats: [
      { label: "Revenue increase", value: "+34%" },
      { label: "Table turnover", value: "+20%" },
      { label: "Staff efficiency", value: "+45%" },
    ],
  },
  {
    name: "Coastal Grill",
    location: "Miami, FL",
    type: "Full Service",
    image:
      "https://framerusercontent.com/images/IR05SrNN2KJg1vMOblov7yBD37w.png",
    quote:
      "The onboarding was incredibly smooth. The eatOS team had us running in 2 days, and our staff actually loved the new system from day one.",
    person: "Rachel Martinez",
    role: "General Manager",
    initials: "RM",
    color: "bg-orange-100 text-orange-700",
    stats: [
      { label: "Setup time", value: "2 days" },
      { label: "Order errors", value: "-60%" },
      { label: "Customer satisfaction", value: "+28%" },
    ],
  },
  {
    name: "Seoul Kitchen",
    location: "Los Angeles, CA",
    type: "Quick Service",
    image:
      "https://framerusercontent.com/images/cLG0kROuoRurUKeaXm2SUjBYH9k.png",
    quote:
      "Switching to eatOS was the best decision we made last year.\nRevenue up 22% and our team loves it. The AI features are a game-changer.",
    person: "David Kim",
    role: "Owner",
    initials: "DK",
    color: "bg-green-100 text-green-700",
    stats: [
      { label: "Revenue increase", value: "+22%" },
      { label: "Labor cost savings", value: "18%" },
      { label: "Online orders", value: "+150%" },
    ],
  },
  {
    name: "Bella Vita Trattoria",
    location: "Chicago, IL",
    type: "Full Service",
    image:
      "https://framerusercontent.com/images/PO7lSjwObqoznVjdFK478wgC3PY.png",
    quote:
      "We went from 3 separate systems to just eatOS. The kitchen display alone saved us 2 hours per shift. Our chefs couldn't be happier.",
    person: "Marco Rossi",
    role: "Executive Chef & Co-Owner",
    initials: "MR",
    color: "bg-rose-100 text-rose-700",
    stats: [
      { label: "Time saved per shift", value: "2 hrs" },
      { label: "Ticket accuracy", value: "99.2%" },
      { label: "Food waste reduction", value: "-35%" },
    ],
  },
  {
    name: "Green Bowl Co.",
    location: "Austin, TX",
    type: "Quick Service",
    image:
      "https://framerusercontent.com/images/IR05SrNN2KJg1vMOblov7yBD37w.png",
    quote:
      "The self-service kiosks paid for themselves in the first month. Lines are shorter, orders are bigger, and our team can focus on quality.",
    person: "Sarah Thompson",
    role: "Founder",
    initials: "ST",
    color: "bg-emerald-100 text-emerald-700",
    stats: [
      { label: "Avg ticket size", value: "+27%" },
      { label: "Wait time", value: "-40%" },
      { label: "Repeat customers", value: "+35%" },
    ],
  },
  {
    name: "Harbor Fish & Chips",
    location: "Seattle, WA",
    type: "Quick Service",
    image:
      "https://framerusercontent.com/images/jmUYZhUVZsYzpWQJh0KHr9yn7oc.png",
    quote:
      "eatOS Intelligence predicts our busiest hours and auto-adjusts staffing suggestions. It's like having a data analyst on payroll, except it's free.",
    person: "Tom Bradley",
    role: "Operations Manager",
    initials: "TB",
    color: "bg-sky-100 text-sky-700",
    stats: [
      { label: "Labor optimization", value: "+30%" },
      { label: "Peak hour revenue", value: "+18%" },
      { label: "Staffing accuracy", value: "94%" },
    ],
  },
];

export default function CustomersPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="pt-36 pb-20">
        <div className="site-container text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-gray-50 text-sm font-medium mb-8 text-gray-600">
            <Users size={14} />
            <span>Customer Stories</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-slate-900">
            Real restaurants. <br />
            <span className="text-gray-400">Real results.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-12">
            See how restaurants across the country use <strong>eatOS</strong> to
            streamline operations, increase revenue, and delight their guests.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="text-3xl font-bold tracking-tighter mb-1">
                Any format
              </div>
              <div className="text-sm text-gray-500">
                QSR, full service & more
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="text-3xl font-bold tracking-tighter mb-1">
                One platform
              </div>
              <div className="text-sm text-gray-500">Point of Sale, payments & AI</div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="text-3xl font-bold tracking-tighter mb-1">
                Nationwide
              </div>
              <div className="text-sm text-gray-500">
                Available across the US
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="text-3xl font-bold tracking-tighter mb-1">
                99.9%
              </div>
              <div className="text-sm text-gray-500">Uptime target</div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="pb-20">
        <div className="site-container">
          <div className="space-y-12">
            {caseStudies.map((study, idx) => {
              const isReversed = idx % 2 === 1;
              return (
                <div
                  key={idx}
                  className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-gray-50 rounded-[2rem] overflow-hidden`}
                >
                  {/* Image */}
                  <div
                    className={`relative h-64 md:h-[420px] ${isReversed ? "md:order-2" : ""}`}
                  >
                    <img
                      src={study.image}
                      alt={study.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
                        {study.type}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`p-8 md:p-12 ${isReversed ? "md:order-1" : ""}`}
                  >
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold mb-1">{study.name}</h3>
                      <p className="text-sm text-gray-500">{study.location}</p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {study.stats.map((stat, si) => (
                        <div
                          key={si}
                          className="bg-white rounded-xl p-3 text-center"
                        >
                          <div className="text-lg font-bold tracking-tighter">
                            {stat.value}
                          </div>
                          <div className="text-[11px] text-gray-500">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-gray-600 italic leading-relaxed mb-4">
                      "{study.quote}"
                    </blockquote>

                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full ${study.color} flex items-center justify-center text-xs font-bold`}
                      >
                        {study.initials}
                      </div>
                      <div>
                        <div className="text-sm font-semibold">
                          {study.person}
                        </div>
                        <div className="text-xs text-gray-400">
                          {study.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-black text-white">
        <div className="site-container text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
            Ready to join them?
          </h2>
          <p className="text-gray-400 text-xl mb-10 max-w-xl mx-auto">
            See what <strong>eatOS</strong> can do for your restaurant. Get a
            personalized demo in under 30 minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/book-demo"
              className="px-8 py-4 bg-white text-black rounded-full font-semibold text-lg hover:scale-105 transition-all flex items-center gap-2"
            >
              Book a Demo <ArrowRight size={18} />
            </a>
            <a
              href="/contact-sales"
              className="px-8 py-4 border border-white/20 rounded-full font-medium text-lg hover:bg-white/10 transition-all"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
