// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { Calendar, Users, CheckCircle2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const MEETINGS_URL =
  "https://meetings.hubspot.com/booka/initial-meeting?embed=true";

function BookingFormSkeleton() {
  return (
    <div
      className="absolute inset-0 z-10 overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 p-5 sm:p-8"
      aria-hidden="true"
    >
      <div className="mx-auto h-4 w-40 animate-pulse rounded-full bg-white/10" />
      <div className="mt-8 grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div className="h-4 w-28 animate-pulse rounded-full bg-white/10" />
            <div className="flex gap-2">
              <div className="h-8 w-8 animate-pulse rounded-full bg-white/10" />
              <div className="h-8 w-8 animate-pulse rounded-full bg-white/10" />
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square animate-pulse rounded-lg bg-white/[0.06]"
                style={{ animationDelay: `${(i % 7) * 40}ms` }}
              />
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <div className="mb-4 h-4 w-32 animate-pulse rounded-full bg-white/10" />
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-11 animate-pulse rounded-xl border border-white/10 bg-white/[0.04]"
              style={{ animationDelay: `${i * 60}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BookDemoPage() {
  const [formReady, setFormReady] = useState(false);

  useEffect(() => {
    const reveal = window.setTimeout(() => setFormReady(true), 10000);

    function onMessage(event) {
      if (event.origin !== "https://meetings.hubspot.com") return;
      let data = event.data;
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          return;
        }
      }
      const iframe = document.getElementById("bookademo-meetings");
      if (!iframe || !data || typeof data !== "object" || !data.height) return;
      iframe.style.height = `${data.height}px`;
      setFormReady(true);
    }

    window.addEventListener("message", onMessage);
    return () => {
      window.clearTimeout(reveal);
      window.removeEventListener("message", onMessage);
    };
  }, []);

  // Conversion tracking: page view plus completed booking.
  useEffect(() => {
    trackEvent("book_demo_view", { path: "/bookademo" });

    function onMessage(event) {
      const data = event?.data;
      if (!data || typeof data !== "object") return;
      const type = data.meetingsPayload?.event || data.event || data.eventName;
      if (typeof type !== "string") return;
      if (
        type === "meetingBookSucceeded" ||
        type.toLowerCase().includes("bookings")
      ) {
        trackEvent("book_demo_submit", { path: "/bookademo", source: "hubspot" });
      }
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);



  return (
    <div className="min-h-screen bg-black text-white font-montserrat">
      {/* Hero Section */}
      <section className="pt-[128px] md:pt-[176px] pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/[0.03] to-transparent pointer-events-none" />
        <div className="site-container relative z-10 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-sm font-medium mb-6 text-white/90">
            <Calendar size={16} />
            <span>Schedule Your Demo</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-white mb-6">
            See <strong>eatOS</strong> in action
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Book a personalized demo with our team and discover how{" "}
            <strong className="text-white">eatOS</strong> can transform your
            restaurant operations.
          </p>
        </div>
      </section>

      {/* HubSpot Meetings Embed */}
      <section className="py-16 border-t border-white/10">
        <div className="site-container max-w-4xl">
          <div
            className="relative min-h-[640px] overflow-hidden rounded-[2rem] bg-black md:min-h-[756px]"
            aria-busy={formReady ? "false" : "true"}
          >
            {formReady ? null : (
              <>
                <p className="sr-only">Loading the booking form</p>
                <BookingFormSkeleton />
              </>
            )}
            <iframe
              id="bookademo-meetings"
              title="Schedule a demo with eatOS"
              src={MEETINGS_URL}
              className="h-[756px] min-h-[615px] w-full border-0"
            />
          </div>

          <p className="text-sm text-white/60 text-center mt-6">
            By booking a meeting, you agree to our{" "}
            <a href="/privacy-policy" className="underline hover:text-white">
              Privacy Policy
            </a>
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 border-t border-white/10">
        <div className="site-container max-w-5xl">
          <h2 className="text-3xl font-bold text-white text-center mb-12 tracking-tighter">
            What to expect from your demo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                Icon: Users,
                title: "Personalized Walkthrough",
                body: "A tailored demo focused on your restaurant's specific needs and challenges.",
                iconClass: "bg-sky-500/15 text-sky-400",
              },
              {
                Icon: Calendar,
                title: "30-Minute Session",
                body: "Quick, focused demo that respects your time while covering all key features.",
                iconClass: "bg-violet-500/15 text-violet-400",
              },
              {
                Icon: CheckCircle2,
                title: "No Commitment",
                body: "Learn about eatOS with zero pressure. We are here to help, not to push.",
                iconClass: "bg-emerald-500/15 text-emerald-400",
              },
            ].map(({ Icon, title, body, iconClass }) => (
              <div
                key={title}
                className="text-center rounded-[2rem] border border-white/10 bg-white/5 p-8"
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${iconClass}`}
                >
                  <Icon size={30} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 tracking-tighter">
                  {title}
                </h3>
                <p className="text-white/80 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

