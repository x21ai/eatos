// @ts-nocheck
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { platformProducts } from "../data/platformProducts";

export function FullPlatformSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
            Everything you need.{" "}
            <span className="text-indigo-500">Fully integrated.</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Explore the <strong>eatOS</strong> platform with 15+ products that
            work together seamlessly, so you never need another vendor.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {platformProducts.map((product, i) => {
            const Icon = product.icon;
            return (
              <motion.a
                key={product.title}
                href="/products"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="group flex items-start gap-4 p-5 rounded-2xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all"
              >
                <div
                  className={`bg-gradient-to-br ${product.color} text-white p-2.5 rounded-xl flex-shrink-0`}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <div className="font-bold text-sm mb-0.5 group-hover:text-indigo-700 transition-colors">
                    {product.title}
                  </div>
                  <p className="text-xs text-gray-500">{product.desc}</p>
                </div>
                <ArrowUpRight
                  size={14}
                  className="ml-auto mt-1 text-gray-300 group-hover:text-indigo-500 transition-colors flex-shrink-0"
                />
              </motion.a>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-10"
        >
          <a
            href="/platform"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-semibold text-sm hover:bg-gray-800 transition-colors"
          >
            See the full platform <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
