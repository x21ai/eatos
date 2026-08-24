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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto w-full px-5 md:px-8 lg:px-10 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 text-sm font-medium mb-6">
            <Calendar size={16} />
            <span>Schedule Your Demo</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-black mb-6">
            See <strong>eatOS</strong> in action
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Book a personalized demo with our team and discover how{" "}
            <strong>eatOS</strong> can transform your restaurant operations.
          </p>
        </div>
      </section>

      {/* HubSpot Meetings Embed */}
      <section className="py-16">
        <div className="mx-auto w-full px-5 md:px-8 lg:px-10 max-w-4xl">
          <div
            className="meetings-iframe-container"
            data-src="https://meetings.hubspot.com/booka/initial-meeting?embed=true"
          />
          <p className="text-sm text-gray-500 text-center mt-6">
            By booking a meeting, you agree to our{" "}
            <a href="/privacy" className="underline hover:text-black">
              Privacy Policy
            </a>
          </p>
        </div>
      </section>


      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto w-full px-5 md:px-8 lg:px-10 max-w-5xl">
          <h2 className="text-3xl font-bold text-black text-center mb-12">
            What to expect from your demo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">
                Personalized Walkthrough
              </h3>
              <p className="text-gray-600">
                A tailored demo focused on your restaurant's specific needs and
                challenges.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">
                30-Minute Session
              </h3>
              <p className="text-gray-600">
                Quick, focused demo that respects your time while covering all
                key features.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">
                No Commitment
              </h3>
              <p className="text-gray-600">
                Learn about <strong>eatOS</strong> with zero pressure. We're
                here to help, not to push.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
