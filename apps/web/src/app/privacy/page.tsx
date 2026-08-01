// @ts-nocheck
"use client";

export default function PrivacyPolicyPage() {
  const effectiveDate = "December 29, 2025";

  const sections = [
    { id: "overview", title: "Overview" },
    { id: "data", title: "Information we collect" },
    { id: "use", title: "How we use information" },
    { id: "share", title: "How we share information" },
    { id: "cookies", title: "Cookies & analytics" },
    { id: "security", title: "Security" },
    { id: "retention", title: "Data retention" },
    { id: "choices", title: "Your choices" },
    { id: "contact", title: "Contact" },
  ];

  const cardClass =
    "rounded-3xl border border-gray-200 bg-white p-7 md:p-9 shadow-sm";

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Hero */}
      <section className="pt-32 md:pt-44 pb-12 md:pb-16 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 bg-white text-xs font-bold uppercase tracking-widest text-gray-700 mb-6">
              <span className="text-purple-600">✦</span> Legal
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-[1.05] mb-5">
              Privacy Policy
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              This policy explains what we collect, why we collect it, and how
              you can control your information when you use{" "}
              <strong>eatOS</strong>.
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
            <aside className="hidden lg:block lg:sticky lg:top-28 h-fit">
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
              <div id="overview" className={cardClass}>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-3">
                  Overview
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  <strong>eatOS</strong> provides software, payments, and
                  hardware tools for restaurants and other hospitality
                  operators. When you use our website or services, we may
                  collect information to run the product, keep it secure, and
                  improve it.
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                  We try to keep this policy clear and honest. If you have a
                  question, you can always reach us (see Contact below).
                </p>
              </div>

              <div id="data" className={cardClass}>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-3">
                  Information we collect
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    <span className="font-semibold text-black">
                      Information you provide.
                    </span>{" "}
                    For example: your name, work email, phone number, company
                    details, and anything you submit through forms (like Contact
                    Sales or demo requests).
                  </p>
                  <p>
                    <span className="font-semibold text-black">
                      Usage and device data.
                    </span>{" "}
                    For example: IP address, browser type, pages viewed, and
                    basic device signals used for security and performance.
                  </p>
                  <p>
                    <span className="font-semibold text-black">
                      Customer content and operational data.
                    </span>{" "}
                    If you use <strong>eatOS</strong> products, your business
                    may input operational information (like menu items, orders,
                    payments, refunds, and staff actions). The exact data
                    depends on which <strong>eatOS</strong> products you use.
                  </p>
                </div>
              </div>

              <div id="use" className={cardClass}>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-3">
                  How we use information
                </h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 leading-relaxed">
                  <li>Provide and operate our website and services.</li>
                  <li>Process requests (sales inquiries, support messages).</li>
                  <li>Keep systems secure and prevent abuse.</li>
                  <li>
                    Improve performance, reliability, and product quality.
                  </li>
                  <li>
                    Communicate important updates (like outages, security
                    notices, or policy changes).
                  </li>
                </ul>
              </div>

              <div id="share" className={cardClass}>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-3">
                  How we share information
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  We do not sell personal information. We may share information
                  in limited cases:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 leading-relaxed mt-4">
                  <li>
                    <span className="font-semibold text-black">
                      Service providers
                    </span>{" "}
                    (hosting, analytics, customer support tools) who help us run
                    the service.
                  </li>
                  <li>
                    <span className="font-semibold text-black">
                      Legal and safety
                    </span>{" "}
                    when required to comply with law or protect users and our
                    platform.
                  </li>
                  <li>
                    <span className="font-semibold text-black">
                      Business transfers
                    </span>{" "}
                    if we’re involved in a merger, acquisition, or sale of
                    assets.
                  </li>
                </ul>
              </div>

              <div id="cookies" className={cardClass}>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-3">
                  Cookies & analytics
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  We may use cookies and similar tech to keep the site working,
                  remember preferences, and understand what pages are helpful.
                  You can control cookies in your browser settings.
                </p>
              </div>

              <div id="security" className={cardClass}>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-3">
                  Security
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  We use reasonable safeguards designed to protect information.
                  No internet system is perfect, but we work hard to keep{" "}
                  <strong>eatOS</strong> stable and secure.
                </p>
              </div>

              <div id="retention" className={cardClass}>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-3">
                  Data retention
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  We keep information only as long as needed for the purposes
                  described in this policy, unless a longer period is required
                  by law.
                </p>
              </div>

              <div id="choices" className={cardClass}>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-3">
                  Your choices
                </h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 leading-relaxed">
                  <li>You can request access, correction, or deletion.</li>
                  <li>You can opt out of non-essential marketing emails.</li>
                  <li>
                    You can control cookies via your browser (some site features
                    may not work without them).
                  </li>
                </ul>
              </div>

              <div id="contact" className={cardClass}>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-3">
                  Contact
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Questions about privacy? Contact us at:{" "}
                  <a
                    href="mailto:privacy@eatos.com"
                    className="underline text-black hover:no-underline"
                  >
                    privacy@eatos.com
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
