// @ts-nocheck
import { effectiveDate, sections } from "./content";

export default function TermsOfServicePage() {
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
            <aside className="hidden lg:block lg:sticky lg:top-28 h-fit lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
              <div className="rounded-3xl border border-gray-200 bg-white p-6">
                <div className="text-[13px] font-semibold tracking-wide text-zinc-900 mb-4">
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
              {sections.map((section) => (
                <div key={section.id} id={section.id} className={cardClass}>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-4">
                    {section.title}
                  </h2>
                  <div className="space-y-4">
                    {section.blocks.map((block, i) =>
                      block.type === "h3" ? (
                        <h3
                          key={i}
                          className="text-base md:text-lg font-semibold text-black pt-2"
                        >
                          {block.text}
                        </h3>
                      ) : block.type === "ul" ? (
                        <ul
                          key={i}
                          className="list-disc pl-5 space-y-2 text-gray-600 leading-relaxed"
                        >
                          {block.items.map((item, j) => (
                            <li key={j}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p key={i} className="text-gray-600 leading-relaxed">
                          {block.text}
                        </p>
                      ),
                    )}
                  </div>
                </div>
              ))}

              <div className={cardClass}>
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
