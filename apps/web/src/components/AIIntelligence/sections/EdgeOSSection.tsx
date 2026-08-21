// @ts-nocheck
import { WifiOff, Check, X } from "lucide-react";
import { useMemo } from "react";
import { SectionLabel } from "../SectionLabel";
import { StatRow } from "../StatRow";
import { Card } from "../Card";
import { Reveal } from "../Reveal";

export function EdgeOSSection() {
  const edgeRows = useMemo(
    () => [
      {
        scenario: "Internet outage",
        cloud: "Orders stop",
        eatos: "Full operations",
      },
      {
        scenario: "Payment gateway down",
        cloud: "Transactions fail",
        eatos: "Offline mode",
      },
      {
        scenario: "Device disconnect",
        cloud: "System breaks",
        eatos: "Mesh keeps running",
      },
    ],
    [],
  );

  return (
    <section className="py-20 md:py-28 overflow-hidden">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal id="edge-left" className="order-2 lg:order-1">
            <Card className="p-5 sm:p-6 md:p-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center">
                  <WifiOff size={20} className="text-[#A855F7]" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Resilience</div>
                  <div className="text-xs text-[#9CA3AF]">
                    Cloud POS vs. edgeOS
                  </div>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
                <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)] bg-black/40">
                  <div className="px-3 py-3 sm:px-4 text-[10px] sm:text-xs uppercase tracking-wider text-[#9CA3AF] border-r border-white/10">
                    Scenario
                  </div>
                  <div className="px-3 py-3 sm:px-4 text-[10px] sm:text-xs uppercase tracking-wider text-[#9CA3AF] border-r border-white/10">
                    Cloud POS
                  </div>
                  <div className="px-3 py-3 sm:px-4 text-[10px] sm:text-xs uppercase tracking-wider text-[#9CA3AF]">
                    <strong>eatOS</strong>
                  </div>
                </div>

                {edgeRows.map((r) => (
                  <div
                    key={r.scenario}
                    className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)] bg-black/20 border-t border-white/10"
                  >
                    <div className="px-3 py-4 sm:px-4 text-[13px] sm:text-sm text-[#E5E7EB] border-r border-white/10">
                      {r.scenario}
                    </div>
                    <div className="px-3 py-4 sm:px-4 text-[13px] sm:text-sm text-[#E5E7EB] border-r border-white/10 flex items-start gap-2">
                      <X size={15} className="mt-0.5 shrink-0 text-red-400" />
                      <span className="min-w-0">{r.cloud}</span>
                    </div>
                    <div className="px-3 py-4 sm:px-4 text-[13px] sm:text-sm text-[#E5E7EB] flex items-start gap-2">
                      <Check
                        size={15}
                        className="mt-0.5 shrink-0 text-emerald-400"
                      />
                      <span className="min-w-0">{r.eatos}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* TODO: Verify these stats (97%+, $47K, 14hrs) against real operational data
                  before publishing. Do not present as guaranteed averages. */}
              <StatRow
                stats={[
                  { value: "97%+", label: "Uptime" },
                  {
                    value: "$47K",
                    label: "Revenue protected (single outage)",
                  },
                  { value: "14hrs", label: "Longest offline operation" },
                ]}
              />
            </Card>
          </Reveal>

          <Reveal id="edge-right" className="order-1 lg:order-2">
            <div>
              <SectionLabel>EDGEOS</SectionLabel>
              <h2 className="mt-5 text-4xl md:text-6xl font-bold tracking-tighter leading-[1.05]">
                Internet dies.
                <br />
                You don't.
              </h2>
              <p className="mt-6 text-lg md:text-xl text-[#9CA3AF] leading-relaxed max-w-xl">
                Cloud POS becomes a paperweight without WiFi.{" "}
                <strong>eatOS</strong> runs on the edge. Local mesh. Automatic
                sync. Zero excuses.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
