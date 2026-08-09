// @ts-nocheck
'use client';

import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Check,
  Clock,
  MessageSquare,
  Users,
  Star,
  ChevronDown,
} from 'lucide-react';
import { useState } from 'react';

export default function ContactSalesPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: 'How long does setup take?',
      a: 'Most restaurants are fully up and running within 48 hours. Our onboarding team handles everything, from hardware installation to menu setup and staff training.',
    },
    {
      q: 'Do I need to buy new hardware?',
      a: 'Not necessarily. eatOS works with most existing hardware, but we also offer purpose-built terminals (eatOS Pro and Mini) for the best experience.',
    },
    {
      q: 'Is there a contract or commitment?',
      a: 'No long-term contracts. We offer flexible month-to-month plans so you can scale up or down as your business needs change.',
    },
    {
      q: 'What kind of support do you offer?',
      a: "24/7 live support via phone, chat, and email. You'll also get a dedicated account manager for the first 90 days.",
    },
  ];

  return (
    <div className="bg-white min-h-screen pt-32 pb-0">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Left Column: Info */}
          <div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 text-slate-900">
              Talk to our <br /> sales team.
            </h1>
            <p className="text-xl text-gray-500 mb-12 leading-relaxed">
              We'll help you find the right solution for your business. Whether you're a small cafe
              or a global chain.
            </p>

            {/* Trust bar */}
            <div className="flex items-center gap-3 mb-12 pb-12 border-b border-gray-100">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700 border-2 border-white">
                  JM
                </div>
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-xs font-bold text-orange-700 border-2 border-white">
                  SK
                </div>
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-xs font-bold text-green-700 border-2 border-white">
                  AT
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Trusted by restaurants <span className="font-semibold text-black">nationwide</span>
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-gray-900" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Call Us</h3>
                  <p className="text-gray-500">+1 (888) 555-0123</p>
                  <p className="text-gray-400 text-sm mt-1">Mon-Fri, 9am - 6pm EST</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                  <Mail size={20} className="text-gray-900" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email</h3>
                  <p className="text-gray-500">sales@eatos.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-gray-900" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Headquarters</h3>
                  <p className="text-gray-500">
                    123 Innovation Dr
                    <br />
                    San Francisco, CA 94103
                  </p>
                </div>
              </div>
            </div>

            {/* What to Expect */}
            <div className="bg-gray-50 rounded-2xl p-8 mb-12">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <Clock size={20} /> What to Expect
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Discovery Call (15 min)</h4>
                    <p className="text-sm text-gray-500">
                      We'll learn about your restaurant, service style, and goals.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Custom Demo (30 min)</h4>
                    <p className="text-sm text-gray-500">
                      See <strong>eatOS</strong> configured for your exact setup: menu, floor plan,
                      and all.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Proposal & Pricing</h4>
                    <p className="text-sm text-gray-500">
                      Get a tailored plan with transparent pricing. No surprises.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="border-l-4 border-indigo-500 pl-6 mb-12">
              <p className="text-gray-700 italic leading-relaxed mb-3">
                "The onboarding was incredibly smooth. The <strong>eatOS</strong> team had us
                running in 2 days, and our staff actually loved the new system from day one."
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700">
                  RM
                </div>
                <div>
                  <div className="text-sm font-semibold">Rachel Martinez</div>
                  <div className="text-xs text-gray-400">GM, Coastal Grill, Miami, FL</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div>
            <div className="bg-gray-50 rounded-3xl p-8 md:p-12 sticky top-32">
              <h2 className="text-2xl font-bold mb-2">Get in touch</h2>
              <p className="text-gray-500 text-sm mb-8">
                We typically respond within 2 hours during business hours.
              </p>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="Jane"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Work Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="jane@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Joe's Cafe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How can we help?
                  </label>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black h-32"
                    placeholder="Tell us about your needs..."
                  ></textarea>
                </div>
                <button
                  type="button"
                  className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  Send Message <ArrowRight size={20} />
                </button>
                <p className="text-xs text-center text-gray-400 mt-4">
                  By submitting this form, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto py-20 mt-10 border-t border-gray-100">
          <h2 className="text-3xl font-bold tracking-tighter mb-10 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-lg">{faq.q}</span>
                    <ChevronDown
                      size={20}
                      className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isOpen && <div className="px-6 pb-5 text-gray-500 leading-relaxed">{faq.a}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
