// @ts-nocheck
export default function TermsOfServicePage() {
  const effectiveDate = "December 29, 2025";

  const sections = [
    { id: "acceptance", title: "Acceptance" },
    { id: "services", title: "Services" },
    { id: "accounts", title: "Accounts" },
    { id: "acceptable", title: "Acceptable use" },
    { id: "ip", title: "Intellectual property" },
    { id: "payments", title: "Fees & payments" },
    { id: "disclaimers", title: "Disclaimers" },
    { id: "liability", title: "Limitation of liability" },
    { id: "termination", title: "Termination" },
    { id: "changes", title: "Changes" },
    { id: "contact", title: "Contact" },
  ];

  const cardClass =
    "rounded-3xl border border-gray-200 bg-white p-7 md:p-9 shadow-sm";

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero */}
      <section className="pt-32 md:pt-44 pb-12 md:pb-16 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 bg-white text-xs font-bold uppercase tracking-widest text-gray-700 mb-6">
              <span className="text-purple-600">✦</span> Legal
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-[1.05] mb-5">
              Terms of Service
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              These terms govern your use of the <strong>eatOS</strong> website
              and services.
            </p>
            <div className="mt-6 text-sm text-gray-500">
              Effective date:{" "}
              <span className="font-medium">{effectiveDate}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
            {/* TOC */}
            <aside className="lg:sticky lg:top-28 h-fit">
              <div className="rounded-3xl border border-gray-200 bg-white p-6">
                <div className="text-[13px] font-semibold tracking-wide text-[#1d1d1f] mb-4">
                  On this page
                </div>
                <ul className="space-y-2">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="text-[15px] leading-6 text-gray-600 hover:text-black transition-colors"
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Body */}
            <div className="space-y-6">
              <div id="acceptance" className={cardClass}>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-3">
                  Acceptance
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  By accessing or using the <strong>eatOS</strong> website or
                  services, you agree to these Terms. If you do not agree, do
                  not use the services.
                </p>
              </div>

              <div id="services" className={cardClass}>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-3">
                  Services
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  <strong>eatOS</strong> provides software and related tools for
                  hospitality businesses. Features may change over time, and
                  some features may be offered as betas.
                </p>
              </div>

              <div id="accounts" className={cardClass}>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-3">
                  Accounts
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Some parts of the service may require an account. You are
                  responsible for keeping your credentials secure and for all
                  activity under your account.
                </p>
              </div>

              <div id="acceptable" className={cardClass}>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-3">
                  Acceptable use
                </h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 leading-relaxed">
                  <li>Don’t misuse the service or attempt to break it.</li>
                  <li>
                    Don’t access or scrape the site in a way that harms
                    availability.
                  </li>
                  <li>
                    Don’t upload malware or try to gain unauthorized access to
                    systems.
                  </li>
                  <li>Comply with applicable laws and payment rules.</li>
                </ul>
              </div>

              <div id="ip" className={cardClass}>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-3">
                  Intellectual property
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  <strong>eatOS</strong> and its logos, software, and design are
                  owned by <strong>eatOS POS Inc.</strong> You may not copy, modify,
                  or distribute them except as allowed by law or with our
                  written permission.
                </p>
              </div>

              <div id="payments" className={cardClass}>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-3">
                  Fees & payments
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  If you purchase paid services, you agree to pay applicable
                  fees. Specific pricing, billing terms, and refunds (if any)
                  will be shown to you at the time of purchase or in your
                  agreement with <strong>eatOS</strong>.
                </p>
              </div>

              <div id="disclaimers" className={cardClass}>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-3">
                  Disclaimers
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  The services are provided “as is” and “as available.” We do
                  not guarantee that the services will be uninterrupted or
                  error-free.
                </p>
              </div>

              <div id="liability" className={cardClass}>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-3">
                  Limitation of liability
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  To the maximum extent permitted by law, <strong>eatOS</strong>{" "}
                  will not be liable for indirect, incidental, special,
                  consequential, or punitive damages, or any loss of profits or
                  revenues.
                </p>
              </div>

              <div id="termination" className={cardClass}>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-3">
                  Termination
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  We may suspend or terminate access to the services if we
                  believe there is misuse, risk, or a violation of these Terms.
                </p>
              </div>

              <div id="changes" className={cardClass}>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-3">
                  Changes
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  We may update these Terms from time to time. If changes are
                  material, we’ll take reasonable steps to notify you.
                </p>
              </div>

              <div id="contact" className={cardClass}>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-3">
                  Contact
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Questions about these Terms? Email{" "}
                  <a
                    href="mailto:legal@eatos.com"
                    className="underline text-black hover:no-underline"
                  >
                    legal@eatos.com
                  </a>
                  .
                </p>
              </div>

              <div className="text-xs text-gray-500 leading-relaxed">
                This page is provided for general information and does not
                constitute legal advice.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
