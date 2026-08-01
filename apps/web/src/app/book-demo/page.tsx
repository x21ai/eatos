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
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 text-sm font-medium mb-6">
            <Calendar size={16} />
            <span>Schedule Your Demo</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-black mb-6">
            See <strong>eatOS</strong> in action
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Book a personalized demo with our team and discover how{" "}
            <strong>eatOS</strong> can transform your restaurant operations.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div>
              <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-2">
                <User size={24} />
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-2">
                <Mail size={24} />
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    placeholder="john@restaurant.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </div>

            {/* Business Information */}
            <div>
              <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-2">
                <Building2 size={24} />
                Business Information
              </h2>
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Restaurant Name *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    placeholder="The Corner Kitchen"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="restaurantType"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Restaurant Type *
                    </label>
                    <select
                      id="restaurantType"
                      name="restaurantType"
                      required
                      value={formData.restaurantType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white"
                    >
                      <option value="">Select type</option>
                      <option value="quick-service">Quick Service</option>
                      <option value="fast-casual">Fast Casual</option>
                      <option value="full-service">Full Service</option>
                      <option value="fine-dining">Fine Dining</option>
                      <option value="cafe">Café / Coffee Shop</option>
                      <option value="bar">Bar / Nightclub</option>
                      <option value="food-truck">Food Truck</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="locations"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Number of Locations *
                    </label>
                    <select
                      id="locations"
                      name="locations"
                      required
                      value={formData.locations}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white"
                    >
                      <option value="">Select</option>
                      <option value="1">1</option>
                      <option value="2-5">2-5</option>
                      <option value="6-10">6-10</option>
                      <option value="11-25">11-25</option>
                      <option value="26+">26+</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Scheduling */}
            <div>
              <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-2">
                <Clock size={24} />
                Preferred Demo Time
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="preferredDate"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="preferredTime"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Preferred Time
                  </label>
                  <select
                    id="preferredTime"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white"
                  >
                    <option value="">Select time</option>
                    <option value="9am">9:00 AM</option>
                    <option value="10am">10:00 AM</option>
                    <option value="11am">11:00 AM</option>
                    <option value="12pm">12:00 PM</option>
                    <option value="1pm">1:00 PM</option>
                    <option value="2pm">2:00 PM</option>
                    <option value="3pm">3:00 PM</option>
                    <option value="4pm">4:00 PM</option>
                    <option value="5pm">5:00 PM</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Additional Information
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
                placeholder="Tell us about your specific needs or questions..."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 bg-black text-white rounded-full text-lg font-semibold hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Booking Demo..." : "Book My Demo"}
              </button>
              <p className="text-sm text-gray-500 text-center mt-4">
                By submitting this form, you agree to our{" "}
                <a href="/privacy" className="underline hover:text-black">
                  Privacy Policy
                </a>
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
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
