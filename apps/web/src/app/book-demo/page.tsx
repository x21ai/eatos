// @ts-nocheck
"use client";

import { useEffect } from "react";
import { Calendar, Users, CheckCircle2 } from "lucide-react";

const MEETINGS_SCRIPT_SRC =
  "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js";

export default function BookDemoPage() {
  useEffect(() => {
    if (document.querySelector(`script[src="${MEETINGS_SCRIPT_SRC}"]`)) return;
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = MEETINGS_SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);


  return (
    <div className="min-h-screen bg-black text-white font-montserrat">
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
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
          <div className="rounded-[2rem] bg-black overflow-hidden">
            <div
              className="meetings-iframe-container bg-black"
              data-src="https://meetings.hubspot.com/booka/initial-meeting?embed=true"
            />
          </div>

          <p className="text-sm text-white/60 text-center mt-6">
            By booking a meeting, you agree to our{" "}
            <a href="/privacy" className="underline hover:text-white">
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

