// @ts-nocheck
"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  Building2,
  Users,
  CheckCircle2,
} from "lucide-react";

export default function BookDemoPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    restaurantType: "",
    locations: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-black mb-4">Demo Booked!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your interest in <strong>eatOS</strong>. We've
            received your demo request and will reach out shortly to confirm
            your preferred time.
          </p>
          <a
            href="/"
            className="inline-block px-8 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors"
          >
            Return Home
          </a>
        </div>
      </div>
    );
  }

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
