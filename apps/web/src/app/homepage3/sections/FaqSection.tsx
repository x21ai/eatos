// @ts-nocheck
'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

const faqs = [
  {
    q: 'How long does it take to get up and running?',
    a: 'Most single locations go live within a week. Menus are built with you, hardware ships configured, and your team is trained before the first live shift.',
  },
  {
    q: 'What happens if the internet goes down mid service?',
    a: 'edgeOS keeps taking orders and card payments locally, then syncs everything to the cloud once the connection returns, so no checks and no sales are lost.',
  },
  {
    q: 'What does card processing cost?',
    a: 'Card payments run on a flat 2.99% + 20¢ per transaction rate. Interchange plus pricing is available for higher volume operators on request.',
  },
  {
    q: 'Can I keep the hardware I already own?',
    a: 'In many cases yes. Send us the model list and we will confirm what carries over, what needs a firmware change and what is better replaced.',
  },
  {
    q: 'Does eatOS work across multiple locations?',
    a: 'Yes. Menus, pricing and staff roles are managed centrally and pushed to every site, with reporting that rolls up by location, region and brand.',
  },
  {
    q: 'What support do I get after launch?',
    a: 'Real people, any time you need it, especially through the rush, plus Maya inside the platform for the questions that do not need a human.',
  },
];

export function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-white py-20 text-zinc-900 md:py-28">
      <div className="site-container">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">FAQ</p>
        <h2 className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight md:text-5xl">
          Answers before you ask.
        </h2>

        <div className="mt-10 divide-y divide-zinc-200 border-y border-zinc-200 md:mt-14">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="text-base font-semibold tracking-tight md:text-lg">{faq.q}</span>
                  <span style={{ color: 'var(--brand, #d70480)' }}>
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>
                {isOpen ? (
                  <p className="max-w-3xl pb-6 text-[15px] leading-relaxed text-zinc-600">
                    {faq.a}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
