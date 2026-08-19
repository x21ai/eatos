// @ts-nocheck
import { ArrowRight } from "lucide-react";
import { useMemo } from "react";
import { SectionLabel } from "../SectionLabel";
import { Card } from "../Card";
import { Reveal } from "../Reveal";

export function ROISection() {
  const roiStats = useMemo(
    () => [
      // TODO: These figures are illustrative projections for a $2M/year restaurant.
      // Replace with real aggregate ROI data from customer research before publishing.
      { value: "$54,600", label: "Annual cost reduction" },
      { value: "$170,000", label: "Revenue increase" },
      { value: "$147,600", label: "Labor savings" },
      { value: "$372,200", label: "Total annual benefit" },
    ],
    [],
  );

  return (
    <section className="py-28">
      <div className="site-container">
        <Reveal id="roi">
          <div className="text-center max-w-4xl mx-auto">
            <SectionLabel>ROI</SectionLabel>
            <h2 className="mt-5 text-4xl md:text-6xl font-bold tracking-tighter leading-[1.05]">
              The numbers
              <br />
              don't lie.
            </h2>
            <p className="mt-6 text-lg md:text-xl text-[#9CA3AF] leading-relaxed">
              For a $2M/year restaurant:
            </p>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {roiStats.map((s) => (
                <Card key={s.label} className="p-8 text-left">
                  <div className="text-[44px] md:text-[56px] leading-none font-bold tracking-tight">
                    {s.value}
                  </div>
                  <div className="mt-3 text-[13px] text-[#9CA3AF]">
                    {s.label}
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-8">
              <Card className="p-7 border-[#A855F7]/40">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <div className="text-[34px] md:text-[44px] leading-none font-bold tracking-tight">
                      1.3 months
                    </div>
                    <div className="mt-2 text-[13px] text-[#9CA3AF]">
                      Payback period
                    </div>
                  </div>
                  <div>
                    <div className="text-[34px] md:text-[44px] leading-none font-bold tracking-tight">
                      2,840%
                    </div>
                    <div className="mt-2 text-[13px] text-[#9CA3AF]">
                      Year 1 ROI
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="mt-10">
              <a
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-white text-black font-semibold hover:scale-[1.02] transition-transform"
              >
                Calculate your ROI <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
