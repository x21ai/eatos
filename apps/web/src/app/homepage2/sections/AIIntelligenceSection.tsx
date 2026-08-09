// @ts-nocheck
import { ArrowRight, Bot, Phone, BarChart3, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export function AIIntelligenceSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-zinc-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-6">
              <Bot size={14} />
              <span>
                <strong>eatOS</strong> Intelligence
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
              Automate the busy work
              <br />
              <span className="text-indigo-500">with AI.</span>
            </h2>

            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Improve service, save time, and cut costs. <strong>eatOS</strong>{" "}
              Intelligence handles reservations, predicts staffing needs,
              manages inventory, and gives you insights that actually matter,
              all on autopilot.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="bg-indigo-100 text-indigo-600 p-3 rounded-xl flex-shrink-0">
                  <Phone size={22} />
                </div>
                <div>
                  <h4 className="text-base font-bold mb-1">
                    AI Reservation Agent
                  </h4>
                  <p className="text-sm text-gray-500">
                    Answers calls, books tables, and manages changes 24/7 in any
                    language.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="bg-purple-100 text-purple-600 p-3 rounded-xl flex-shrink-0">
                  <BarChart3 size={22} />
                </div>
                <div>
                  <h4 className="text-base font-bold mb-1">
                    Predictive Analytics
                  </h4>
                  <p className="text-sm text-gray-500">
                    Forecast demand, optimize labor, and reduce food waste
                    automatically.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="bg-emerald-100 text-emerald-600 p-3 rounded-xl flex-shrink-0">
                  <Sparkles size={22} />
                </div>
                <div>
                  <h4 className="text-base font-bold mb-1">
                    Smart Suggestions
                  </h4>
                  <p className="text-sm text-gray-500">
                    Menu optimization, upsell prompts, and pricing
                    recommendations powered by data.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="/ai"
                className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:underline"
              >
                Learn more about <strong>eatOS</strong> AI{" "}
                <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-10 bg-gradient-to-tr from-indigo-200/40 to-purple-200/30 rounded-[3rem] blur-3xl" />
            <img
              src="https://ucarecdn.com/fe0512b6-e43a-4dcf-a209-609ad3bd5be8/-/format/auto/"
              alt="eatOS Intelligence Dashboard"
              loading="lazy"
              className="relative z-10 rounded-3xl shadow-2xl border border-gray-200"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
