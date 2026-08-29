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
import { useEffect, useState } from 'react';

const MEETINGS_SCRIPT_SRC =
  'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';

export default function ContactSalesPage() {
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    document
      .querySelectorAll(`script[src="${MEETINGS_SCRIPT_SRC}"]`)
      .forEach((el) => el.remove());
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = MEETINGS_SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

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
    <div className="bg-black text-white font-montserrat min-h-screen pt-[128px] md:pt-[176px] pb-0">
      <div className="site-container">
        <div>
          {/* Intro */}
          <div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 text-white">
              Talk to our <br /> sales team.
            </h1>
            <p className="text-xl text-white/70 mb-12 leading-relaxed">
              We'll help you find the right solution for your business. Whether you're a small cafe
              or a global chain.
            </p>

            {/* Trust bar */}
            <div className="flex items-center gap-3 mb-12 pb-12 border-b border-white/10">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-xs font-bold text-indigo-300 border-2 border-black">
                  JM
                </div>
                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-xs font-bold text-orange-300 border-2 border-black">
                  SK
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs font-bold text-emerald-300 border-2 border-black">
                  AT
                </div>
              </div>
              <p className="text-sm text-white/60">
                Trusted by restaurants <span className="font-semibold text-white">nationwide</span>
              </p>
            </div>

            {/* Contact details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 border border-white/10 rounded-full flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-white">Call Us</h3>
                  <p className="text-white/70">+1 (888) 555-0123</p>
                  <p className="text-white/50 text-sm mt-1">Mon-Fri, 9am - 6pm EST</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 border border-white/10 rounded-full flex items-center justify-center shrink-0">
                  <Mail size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-white">Email</h3>
                  <p className="text-white/70">sales@eatos.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 border border-white/10 rounded-full flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-white">Headquarters</h3>
                  <p className="text-white/70">
                    20289 Stevens Creek Blvd PH 1019
                    <br />
                    Cupertino, California - 95014.
                  </p>
                </div>
              </div>
            </div>

            {/* What to Expect */}
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 mb-12">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-white">
                <Clock size={20} /> What to Expect
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-white">Discovery Call (15 min)</h4>
                    <p className="text-sm text-white/70">
                      We'll learn about your restaurant, service style, and goals.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-white">Custom Demo (30 min)</h4>
                    <p className="text-sm text-white/70">
                      See <strong className="text-white">eatOS</strong> configured for your exact
                      setup: menu, floor plan, and all.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-white">Proposal & Pricing</h4>
                    <p className="text-sm text-white/70">
                      Get a tailored plan with transparent pricing. No surprises.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="border-l-4 border-indigo-400/70 pl-6 mb-12">
              <p className="text-white/80 italic leading-relaxed mb-3">
                "The onboarding was incredibly smooth. The <strong className="text-white">eatOS</strong> team had us
                running in 2 days, and our staff actually loved the new system from day one."
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-xs font-bold text-indigo-300">
                  RM
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Rachel Martinez</div>
                  <div className="text-xs text-white/50">GM, Coastal Grill, Miami, FL</div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking: full width */}
          <div className="pt-4">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h2 className="text-3xl font-bold mb-2 text-white tracking-tighter">Get in touch</h2>
              <p className="text-white/60 text-sm">
                We typically respond within 2 hours during business hours.
              </p>
            </div>
            <div
              className="meetings-iframe-container bg-transparent overflow-hidden w-full"
              data-src="https://meetings.hubspot.com/booka/initial-meeting?embed=true"
            />
          </div>
        </div>


        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto py-20 mt-10 border-t border-white/10">
          <h2 className="text-3xl font-bold tracking-tighter mb-10 text-center text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="border border-white/10 bg-white/5 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/10 transition-colors"
                  >
                    <span className="font-semibold text-lg text-white">{faq.q}</span>
                    <ChevronDown
                      size={20}
                      className={`text-white/50 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isOpen && <div className="px-6 pb-5 text-white/70 leading-relaxed">{faq.a}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
