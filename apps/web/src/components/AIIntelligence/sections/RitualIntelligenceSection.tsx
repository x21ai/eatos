// @ts-nocheck
import { SectionLabel } from "../SectionLabel";
import { Card } from "../Card";
import { Reveal } from "../Reveal";

export function RitualIntelligenceSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="site-container">
        <Reveal id="ritual">
          <div className="max-w-4xl">
            <SectionLabel>COMING SOON</SectionLabel>
            <h2 className="mt-5 text-4xl md:text-6xl font-bold tracking-tighter leading-[1.05]">
              Watches your rituals.
              <br />
              Warns when they break.
            </h2>
            <p className="mt-6 text-lg md:text-xl text-[#9CA3AF] leading-relaxed max-w-3xl">
              Opening checks. Shift handovers. Rush protocols. Closing audits.
              eatOS learns your patterns and alerts you the moment something's
              off, before it hits the floor.
            </p>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Opening", body: "Checklist drift detection" },
                { title: "Handover", body: "Missing notes, missed tasks" },
                { title: "Close", body: "Audit breaks before they spread" },
              ].map((c) => (
                <Card key={c.title} className="h-full p-6">
                  <div className="text-sm font-semibold">{c.title}</div>
                  <div className="mt-2 text-[13px] text-[#9CA3AF]">
                    {c.body}
                  </div>
                  <div className="mt-5 h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-[55%] bg-gradient-to-r from-[#8B5CF6] to-[#A855F7]" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
