// @ts-nocheck
"use client";

import { useState } from "react";
import {
  Shield,
  AlertTriangle,
  Mail,
  Phone,
  FileText,
  CheckCircle2,
} from "lucide-react";

export default function ReportFraudPage() {
  const [formData, setFormData] = useState({
    reporterName: "",
    reporterEmail: "",
    reporterPhone: "",
    incidentType: "",
    merchantName: "",
    incidentDate: "",
    description: "",
    evidence: "",
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
          <h1 className="text-3xl font-bold text-black mb-4">
            Report Submitted
          </h1>
          <p className="text-gray-600 mb-8">
            Thank you for reporting this incident. Our fraud prevention team
            will review your submission and contact you if additional
            information is needed.
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
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-red-50 to-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-medium mb-6">
            <Shield size={16} />
            <span>Fraud Prevention</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-black mb-6">
            Report Fraud or Suspicious Activity
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Help us maintain a secure platform. Report any fraudulent
            transactions, suspicious merchant behavior, or security concerns.
          </p>
        </div>
      </section>

      {/* Alert Box */}
      <section className="py-8">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 flex items-start gap-4">
            <AlertTriangle
              size={24}
              className="text-amber-600 flex-shrink-0 mt-1"
            />
            <div>
              <h3 className="font-bold text-black mb-2">
                Important Information
              </h3>
              <p className="text-sm text-gray-700">
                All fraud reports are taken seriously and investigated
                thoroughly. Please provide as much detail as possible. For
                immediate assistance with unauthorized transactions, contact our
                support team at{" "}
                <a
                  href="tel:1-800-EATOS-HELP"
                  className="underline font-semibold"
                >
                  1-800-EATOS-HELP
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Reporter Information */}
            <div>
              <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-2">
                <Mail size={24} />
                Your Information
              </h2>
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="reporterName"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="reporterName"
                    name="reporterName"
                    required
                    value={formData.reporterName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="reporterEmail"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="reporterEmail"
                      name="reporterEmail"
                      required
                      value={formData.reporterEmail}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="reporterPhone"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="reporterPhone"
                      name="reporterPhone"
                      value={formData.reporterPhone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Incident Details */}
            <div>
              <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-2">
                <FileText size={24} />
                Incident Details
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="incidentType"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Type of Fraud *
                    </label>
                    <select
                      id="incidentType"
                      name="incidentType"
                      required
                      value={formData.incidentType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white"
                    >
                      <option value="">Select type</option>
                      <option value="unauthorized-transaction">
                        Unauthorized Transaction
                      </option>
                      <option value="merchant-fraud">Merchant Fraud</option>
                      <option value="identity-theft">Identity Theft</option>
                      <option value="phishing">Phishing / Scam</option>
                      <option value="data-breach">Data Breach</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="incidentDate"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Date of Incident *
                    </label>
                    <input
                      type="date"
                      id="incidentDate"
                      name="incidentDate"
                      required
                      value={formData.incidentDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="merchantName"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Merchant/Business Name (if applicable)
                  </label>
                  <input
                    type="text"
                    id="merchantName"
                    name="merchantName"
                    value={formData.merchantName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    placeholder="Restaurant or business name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Description of Incident *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={6}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
                    placeholder="Please provide as much detail as possible about the fraudulent activity, including transaction amounts, dates, and any suspicious behavior..."
                  />
                </div>

                <div>
                  <label
                    htmlFor="evidence"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Supporting Evidence
                  </label>
                  <textarea
                    id="evidence"
                    name="evidence"
                    rows={3}
                    value={formData.evidence}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
                    placeholder="List any evidence you have (screenshots, transaction IDs, emails, etc.). You may be contacted to provide files."
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 bg-black text-white rounded-full text-lg font-semibold hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting Report..." : "Submit Fraud Report"}
              </button>
              <p className="text-sm text-gray-500 text-center mt-4">
                By submitting this report, you confirm that the information
                provided is accurate to the best of your knowledge.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-black text-center mb-12">
            Need Immediate Assistance?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-200">
              <Phone size={32} className="text-black mb-4" />
              <h3 className="text-xl font-bold text-black mb-2">
                Call Our Fraud Hotline
              </h3>
              <p className="text-gray-600 mb-4">
                Available 24/7 for urgent fraud reports
              </p>
              <a
                href="tel:1-800-328-6773"
                className="text-lg font-semibold text-black hover:underline"
              >
                1-800-EATOS-HELP
              </a>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-200">
              <Mail size={32} className="text-black mb-4" />
              <h3 className="text-xl font-bold text-black mb-2">
                Email Security Team
              </h3>
              <p className="text-gray-600 mb-4">For non-urgent fraud reports</p>
              <a
                href="mailto:fraud@eatos.com"
                className="text-lg font-semibold text-black hover:underline"
              >
                fraud@eatos.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
