// @ts-nocheck
import { ArrowRight, Users } from "lucide-react";

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
    color: "bg-indigo-500/20 text-indigo-200",
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
    color: "bg-orange-500/20 text-orange-200",
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
    color: "bg-green-500/20 text-green-200",
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
    color: "bg-rose-500/20 text-rose-200",
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
    color: "bg-emerald-500/20 text-emerald-200",
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
    color: "bg-sky-500/20 text-sky-200",
    stats: [
      { label: "Labor optimization", value: "+30%" },
      { label: "Peak hour revenue", value: "+18%" },
      { label: "Staffing accuracy", value: "94%" },
    ],
  },
];

export default function CustomersPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero */}
      <section className="pt-36 pb-20">
        <div className="site-container text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 text-sm font-medium mb-8 text-white/70">
            <Users size={14} />
            <span>Customer Stories</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-white">
            Real restaurants. <br />
            <span className="text-white/40">Real results.</span>
          </h1>
          <p className="text-xl text-white/65 max-w-2xl mx-auto leading-relaxed mb-12">
            See how restaurants across the country use <strong>eatOS</strong> to
            streamline operations, increase revenue, and delight their guests.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 max-w-5xl mx-auto">
            {[
              { value: 'Any format', label: 'QSR, full service & more' },
              { value: 'One platform', label: 'Point of Sale, payments & AI' },
              { value: 'Nationwide', label: 'Available across the US' },
              { value: '99.9%', label: 'Uptime target' },
            ].map((stat) => (
              <div
                key={stat.value}
                className="flex h-full flex-col items-center justify-center text-center bg-white/5 border border-white/10 rounded-2xl px-5 py-7"
              >
                <div className="text-lg md:text-xl font-bold tracking-tight leading-snug mb-1.5 text-white">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-white/55 leading-snug">
                  {stat.label}
                </div>
              </div>
            ))}
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
                  className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center border border-white/10 bg-white/5 rounded-[2rem] overflow-hidden`}
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
                      <span className="bg-black/70 text-white border border-white/15 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
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
                      <p className="text-sm text-white/55">{study.location}</p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {study.stats.map((stat, si) => (
                        <div
                          key={si}
                          className="bg-white/10 border border-white/10 rounded-xl p-3 text-center"
                        >
                          <div className="text-lg font-bold tracking-tighter">
                            {stat.value}
                          </div>
                          <div className="text-[11px] text-white/55">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-white/70 italic leading-relaxed mb-4">
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
                        <div className="text-xs text-white/50">
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
      <section className="py-20 md:py-28 border-t border-white/10">
        <div className="site-container text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
            Ready to join them?
          </h2>
          <p className="text-white/65 text-xl mb-10 max-w-xl mx-auto">
            See what <strong>eatOS</strong> can do for your restaurant. Get a
            personalized demo in under 30 minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/bookademo"
              className="px-8 py-4 bg-white text-black rounded-full font-semibold text-lg hover:scale-105 transition-all flex items-center gap-2"
            >
              Book a Demo <ArrowRight size={18} />
            </a>
            <a
              href="/contact"
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
