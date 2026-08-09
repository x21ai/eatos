// @ts-nocheck
import { ArrowRight, Building2, CheckCircle2, Store } from "lucide-react";
import { motion } from "motion/react";

export function EnterpriseSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black text-white text-sm font-semibold mb-6">
              <Building2 size={14} />
              <span>Enterprise & Multi-location</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
              Centralized control
              <br />
              across all locations.
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Manage every brand, franchise, and location from a single
              dashboard. Push menu updates, track performance, and enforce
              standards everywhere, instantly.
            </p>

            <div className="space-y-4">
              {[
                {
                  title: "Multi-brand support",
                  desc: "Run different concepts from one account",
                },
                {
                  title: "Role-based access",
                  desc: "Granular permissions for owners, managers, staff",
                },
                {
                  title: "Consolidated reporting",
                  desc: "See all locations in one real-time dashboard",
                },
                {
                  title: "Remote menu management",
                  desc: "Update menus and pricing across all stores at once",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="text-indigo-500 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <div className="font-semibold text-sm">{item.title}</div>
                    <div className="text-sm text-gray-500">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <a
                href="/enterprise"
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-semibold text-sm hover:bg-gray-800 transition-colors"
              >
                Learn about Enterprise <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Mock multi-location dashboard UI */}
            <div className="bg-gray-50 rounded-3xl border border-gray-200 p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-3 text-xs text-gray-400 font-mono">
                  dashboard.eatos.com
                </span>
              </div>
              <div className="space-y-4">
                {[
                  {
                    name: "Sweet Kitchen - Downtown",
                    revenue: "$12,450",
                    status: "Online",
                    statusColor: "text-green-500",
                  },
                  {
                    name: "Sweet Kitchen - Midtown",
                    revenue: "$9,870",
                    status: "Online",
                    statusColor: "text-green-500",
                  },
                  {
                    name: "The Bistro - Brooklyn",
                    revenue: "$15,220",
                    status: "Online",
                    statusColor: "text-green-500",
                  },
                  {
                    name: "Taco Lab - Jersey City",
                    revenue: "$7,340",
                    status: "Setup",
                    statusColor: "text-amber-500",
                  },
                ].map((loc) => (
                  <div
                    key={loc.name}
                    className="flex items-center justify-between bg-white rounded-xl p-4 border border-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                        <Store size={16} className="text-indigo-600" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{loc.name}</div>
                        <div className={`text-xs ${loc.statusColor}`}>
                          {loc.status}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-bold text-right">
                      {loc.revenue}
                      <span className="text-gray-400 font-normal text-xs">
                        {" "}
                        /today
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-400">4 locations</span>
                <span className="text-sm font-bold">
                  $44,880{" "}
                  <span className="text-gray-400 font-normal text-xs">
                    total today
                  </span>
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
