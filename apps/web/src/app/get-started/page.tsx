// @ts-nocheck
'use client';

import { useState } from 'react';
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

export default function GetStartedPage() {
  const [step, setStep] = useState(1);
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    companyName: '',
  });

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
    <div className="fixed inset-0 z-[100] bg-white overflow-y-auto">
      <div className="min-h-screen flex flex-col">
        {/* Minimal Header */}
        <header className="px-6 py-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <a href="/" className="flex items-center gap-2">
            <img
              src="https://ucarecdn.com/4352d127-4bf5-42cf-a022-3110926687de/-/format/auto/"
              alt="eatOS"
              className="h-10 w-auto"
            />
          </a>
          <div className="text-sm text-gray-500 font-medium">Step {step} of 2</div>
        </header>

        {/* Progress Bar */}
        <div className="h-1 bg-gray-100 w-full">
          <div
            className="h-full bg-black transition-all duration-500 ease-out"
            style={{ width: `${step === 1 ? '50%' : '100%'}` }}
          ></div>
        </div>

        {/* Main Content */}
        <main className="flex-grow flex flex-col items-center justify-center p-6 md:p-12">
          {step === 1 && (
            <div className="w-full max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tighter">
                  What industry is your business in?
                </h1>
                <p className="text-gray-500 text-lg">
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
                            ? 'border-black bg-gray-50 shadow-md scale-[1.02]'
                            : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50/50'
                        }
                      `}
                    >
                      <div
                        className={`
                        w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors
                        ${isSelected ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}
                      `}
                      >
                        <Icon size={24} />
                      </div>
                      <h3 className="font-bold text-lg mb-1">{industry.label}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {industry.description}
                      </p>

                      {isSelected && (
                        <div className="absolute top-4 right-4 text-black">
                          <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center">
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
                        ? 'bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl hover:-translate-y-1'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
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
            <div className="w-full max-w-4xl animate-in fade-in slide-in-from-right-8 duration-500">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-500 hover:text-black mb-8 transition-colors text-sm font-medium"
              >
                <ChevronLeft size={16} />
                Back to Industry
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                {/* Left: Trust & Benefits */}
                <div className="hidden md:flex flex-col justify-center">
                  <h2 className="text-3xl font-bold tracking-tighter mb-4">
                    You're in good company.
                  </h2>
                  <p className="text-gray-500 mb-8 leading-relaxed">
                    Join restaurants across the US already using <strong>eatOS</strong> to
                    streamline operations and grow revenue.
                  </p>

                  <div className="space-y-5 mb-10">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                        <Zap size={20} className="text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-0.5">Up and running in 48 hours</h4>
                        <p className="text-xs text-gray-400">
                          We handle setup, training, and data migration.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                        <Shield size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-0.5">
                          No contracts, cancel anytime
                        </h4>
                        <p className="text-xs text-gray-400">
                          Flexible month-to-month plans that grow with you.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center shrink-0">
                        <HeadphonesIcon size={20} className="text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-0.5">24/7 live support</h4>
                        <p className="text-xs text-gray-400">
                          Real humans, not bots. We're here when you need us.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Mini testimonial */}
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <p className="text-sm text-gray-600 italic leading-relaxed mb-3">
                      "Switching to <strong>eatOS</strong> was the best decision we made last year.
                      Revenue up 22% and our team loves it."
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center text-xs font-bold text-orange-700">
                        DK
                      </div>
                      <div>
                        <div className="text-xs font-semibold">David Kim</div>
                        <div className="text-[10px] text-gray-400">Owner, Seoul Kitchen, LA</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Form */}
                <div>
                  <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-3 tracking-tighter">Create your account</h1>
                    <p className="text-gray-500">
                      Setting up {selectedIndustry === 'food' ? 'your restaurant' : 'your business'}{' '}
                      for success.
                    </p>
                  </div>

                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                          placeholder="Jane"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                        placeholder="Acme Inc."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Work Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                        placeholder="name@company.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                        placeholder="••••••••"
                      />
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2"
                      >
                        Create Account
                        <ArrowRight size={20} />
                      </button>
                    </div>

                    <p className="text-center text-sm text-gray-500 mt-6">
                      By clicking "Create Account", you agree to our{' '}
                      <a href="/terms" className="underline text-black hover:no-underline">
                        Terms
                      </a>{' '}
                      and{' '}
                      <a href="/privacy" className="underline text-black hover:no-underline">
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </form>
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
