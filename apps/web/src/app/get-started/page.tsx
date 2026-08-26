// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Check,
  UtensilsCrossed,
  ShoppingBag,
  Stethoscope,
  Briefcase,
  Store,
  ChevronLeft,
  Shield,
  Zap,
  HeadphonesIcon,
} from 'lucide-react';

const MEETINGS_SCRIPT_SRC =
  'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';

export default function GetStartedPage() {
  const [step, setStep] = useState(1);
  const [selectedIndustry, setSelectedIndustry] = useState('');

  useEffect(() => {
    if (step !== 2) return;
    // Re-inject so the HubSpot embed script re-scans the newly mounted container.
    document
      .querySelectorAll(`script[src="${MEETINGS_SCRIPT_SRC}"]`)
      .forEach((el) => el.remove());
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = MEETINGS_SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, [step]);



  const industries = [
    {
      id: 'food',
      label: 'Food & Beverage',
      icon: UtensilsCrossed,
      description: 'Restaurants, cafes, bars, etc.',
    },
    {
      id: 'retail',
      label: 'Retail',
      icon: ShoppingBag,
      description: 'Clothing, electronics, home goods, etc.',
    },
    {
      id: 'services',
      label: 'Professional Services',
      icon: Briefcase,
      description: 'Consulting, legal, agencies, etc.',
    },
    {
      id: 'health',
      label: 'Health & Medical',
      icon: Stethoscope,
      description: 'Clinics, spas, gyms, etc.',
    },
    {
      id: 'other',
      label: 'Other Business',
      icon: Store,
      description: 'Anything else',
    },
  ];

  const handleIndustrySelect = (id) => {
    setSelectedIndustry(id);
  };

  const handleNext = () => {
    if (step === 1 && selectedIndustry) {
      setStep(2);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black text-white overflow-y-auto">
      <div className="min-h-screen flex flex-col">
        {/* Minimal Header */}
        <header className="py-6 border-b border-white/25 bg-black sticky top-0 z-10">
          <div className="site-container flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <img
                src="https://ucarecdn.com/4352d127-4bf5-42cf-a022-3110926687de/-/format/auto/"
                alt="eatOS"
                className="h-10 w-auto"
              />
            </a>
            <div className="text-sm text-gray-300 font-medium">Step {step} of 2</div>
          </div>
        </header>


        {/* Progress Bar */}
        <div className="h-1 bg-white/15 w-full">
          <div
            className="h-full bg-white transition-all duration-500 ease-out"
            style={{ width: `${step === 1 ? '50%' : '100%'}` }}
          ></div>
        </div>


        {/* Main Content */}
        <main className="site-container flex-grow flex flex-col items-center justify-center py-10 md:py-16">
          {step === 1 && (
            <div className="w-full max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tighter">
                  What industry is your business in?
                </h1>
                <p className="text-gray-300 text-lg">
                  We'll tailor your setup experience based on your industry needs.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                {industries.map((industry) => {
                  const Icon = industry.icon;
                  const isSelected = selectedIndustry === industry.id;

                  return (
                    <button
                      key={industry.id}
                      onClick={() => handleIndustrySelect(industry.id)}
                      className={`
                        relative p-6 rounded-2xl text-left transition-all duration-200 border-2
                        ${
                          isSelected
                            ? 'border-white bg-white/10 shadow-lg scale-[1.02]'
                            : 'border-white/15 hover:border-white/40 hover:bg-white/5'
                        }
                      `}
                    >
                      <div
                        className={`
                        w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors
                        ${isSelected ? 'bg-white text-black' : 'bg-white/10 text-gray-200'}
                      `}
                      >
                        <Icon size={24} />
                      </div>
                      <h3 className="font-bold text-lg mb-1 text-white">{industry.label}</h3>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {industry.description}
                      </p>

                      {isSelected && (
                        <div className="absolute top-4 right-4">
                          <div className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center">
                            <Check size={14} strokeWidth={3} />
                          </div>
                        </div>
                      )}

                    </button>
                  );
                })}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  disabled={!selectedIndustry}
                  className={`
                    flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg transition-all
                    ${
                      selectedIndustry
                        ? 'bg-white text-black hover:bg-gray-200 shadow-lg hover:shadow-xl hover:-translate-y-1'
                        : 'bg-white/10 text-gray-500 cursor-not-allowed'
                    }

                  `}
                >
                  Continue
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="w-full max-w-5xl animate-in fade-in slide-in-from-right-8 duration-500">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-500 hover:text-black mb-8 transition-colors text-sm font-medium"
              >
                <ChevronLeft size={16} />
                Back to Industry
              </button>

              {/* Intro */}
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-3">
                  Book your meeting
                </h1>
                <p className="text-gray-500 leading-relaxed">
                  Setting up {selectedIndustry === 'food' ? 'your restaurant' : 'your business'} for
                  success. Join restaurants across the US already using <strong>eatOS</strong> to
                  streamline operations and grow revenue.
                </p>
              </div>

              {/* Trust points */}
              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
                {[
                  {
                    Icon: Zap,
                    tile: 'bg-green-50',
                    color: 'text-green-600',
                    title: 'Up and running in 48 hours',
                    body: 'We handle setup, training, and data migration.',
                  },
                  {
                    Icon: Shield,
                    tile: 'bg-blue-50',
                    color: 'text-blue-600',
                    title: 'No contracts, cancel anytime',
                    body: 'Flexible month-to-month plans that grow with you.',
                  },
                  {
                    Icon: HeadphonesIcon,
                    tile: 'bg-purple-50',
                    color: 'text-purple-600',
                    title: '24/7 live support',
                    body: "Real humans, not bots. We're here when you need us.",
                  },
                ].map(({ Icon, tile, color, title, body }) => (
                  <div key={title} className="flex items-start gap-3 sm:flex-col sm:items-center sm:text-center">
                    <div
                      className={`w-10 h-10 ${tile} rounded-xl flex items-center justify-center shrink-0`}
                    >
                      <Icon size={20} className={color} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-sm mb-0.5 sm:mt-2">{title}</h4>
                      <p className="text-xs text-gray-400 leading-relaxed">{body}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Form */}
              <div className="mt-12">
                <div
                  className="meetings-iframe-container w-full"
                  data-src="https://meetings.hubspot.com/booka/initial-meeting?embed=true"
                />

                <p className="text-center text-sm text-gray-500 mt-6">
                  By booking a meeting, you agree to our{' '}
                  <a href="/terms" className="underline text-black hover:no-underline">
                    Terms
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" className="underline text-black hover:no-underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>

              {/* Testimonial */}
              <div className="mx-auto mt-12 max-w-2xl bg-gray-50 rounded-2xl p-6 text-center">
                <p className="text-sm text-gray-600 italic leading-relaxed mb-4">
                  "Switching to <strong>eatOS</strong> was the best decision we made last year.
                  Revenue up 22% and our team loves it."
                </p>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center text-xs font-bold text-orange-700">
                    DK
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-semibold">David Kim</div>
                    <div className="text-[10px] text-gray-400">Owner, Seoul Kitchen, LA</div>
                  </div>
                </div>
              </div>
            </div>

          )}
        </main>

        {/* Simple Footer */}
        <footer className="py-6 border-t border-gray-100 text-center text-sm text-gray-400">
          &copy; 2026 <strong>eatOS POS Inc.</strong>
        </footer>
      </div>
    </div>
  );
}
