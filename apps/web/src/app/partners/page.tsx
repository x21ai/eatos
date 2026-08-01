// @ts-nocheck
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6">
            Become an eatOS Partner
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
            Join our ecosystem of resellers, integrators, and referral partners.
            Let's grow together.
          </p>
        </div>
      </section>

      {/* Content + Form */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Left Content */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Why partner with us?</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="mt-1 bg-black/5 p-2 rounded-lg h-fit">
                    <CheckCircle2 size={24} className="text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Generous Revenue Share
                    </h3>
                    <p className="text-gray-500">
                      Earn ongoing residuals on payments and software
                      subscriptions. We believe in sharing the success.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1 bg-black/5 p-2 rounded-lg h-fit">
                    <CheckCircle2 size={24} className="text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Dedicated Support
                    </h3>
                    <p className="text-gray-500">
                      Get a dedicated partner manager and priority support for
                      your merchants.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1 bg-black/5 p-2 rounded-lg h-fit">
                    <CheckCircle2 size={24} className="text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Co-Marketing</h3>
                    <p className="text-gray-500">
                      Access marketing resources, leads, and co-branded
                      collateral to help you sell more.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-8 bg-gray-50 rounded-3xl">
                <blockquote className="text-lg font-medium mb-4">
                  "Partnering with eatOS has been the best decision for our
                  agency. The product sells itself and the support is
                  unmatched."
                </blockquote>
                <div className="font-bold">
                  - Sarah J., Digital Dining Solutions
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-200 shadow-xl shadow-gray-100/50">
              <h3 className="text-2xl font-bold mb-6">
                Apply to become a partner
              </h3>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
                      placeholder="Jane"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Work Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
                    placeholder="jane@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
                    placeholder="Acme Inc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Partner Type
                  </label>
                  <select className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5">
                    <option>Reseller / VAR</option>
                    <option>Integration Partner</option>
                    <option>Referral Partner</option>
                    <option>Consultant</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 h-32 resize-none"
                    placeholder="Tell us about your business..."
                  ></textarea>
                </div>

                <button
                  type="button"
                  className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 group"
                >
                  Submit Application{" "}
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
