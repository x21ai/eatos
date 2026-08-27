// @ts-nocheck
"use client";

import { effectiveDate, sections } from "./content";

export default function PrivacyPolicyPage() {
  const cardClass =
    "rounded-3xl border border-white/15 bg-white/5 p-7 md:p-9";

  return (
    <div className="min-h-screen bg-black text-white font-montserrat">
      {/* Hero */}
      <section className="pt-32 md:pt-44 pb-12 md:pb-16 bg-black border-b border-white/15">
        <div className="site-container">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 text-xs font-bold uppercase tracking-widest text-gray-300 mb-6">
              <span className="text-brand-on-dark">✦</span> Legal
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-[1.05] mb-5 text-white">
              Privacy Policy
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              This policy explains what we collect, why we collect it, and how
              you can control your information when you use{" "}
              <strong className="text-white">eatOS</strong>.
            </p>
            <div className="mt-6 text-sm text-gray-400">
              Effective date:{" "}
              <span className="font-medium text-white">{effectiveDate}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
            {/* TOC */}
            <aside className="hidden lg:block lg:sticky lg:top-28 h-fit">
              <div className="rounded-3xl border border-white/15 bg-white/5 p-6">
                <div className="text-[13px] font-semibold tracking-wide text-white mb-4">
                  On this page
                </div>
                <ul className="space-y-2">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="text-[15px] leading-6 text-gray-300 hover:text-white transition-colors"
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
              {sections.map((section) => (
                <div key={section.id} id={section.id} className={cardClass}>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-4 text-white">
                    {section.title}
                  </h2>
                  <div className="space-y-4">
                    {section.blocks.map((block, i) =>
                      block.type === "h3" ? (
                        <h3
                          key={i}
                          className="text-base md:text-lg font-semibold text-white pt-2"
                        >
                          {block.text}
                        </h3>
                      ) : block.type === "ul" ? (
                        <ul
                          key={i}
                          className="list-disc pl-5 space-y-2 text-gray-300 leading-relaxed"
                        >
                          {block.items.map((item, j) => (
                            <li key={j}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p key={i} className="text-gray-300 leading-relaxed">
                          {block.text}
                        </p>
                      ),
                    )}
                  </div>
                </div>
              ))}

              <div className="text-xs text-gray-400 leading-relaxed">
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
