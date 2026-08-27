// @ts-nocheck
"use client";

import { useState, useEffect } from "react";

const CONSENT_KEY = "eatos_cookie_consent";
const PREFS_KEY = "eatos_cookie_prefs";

const CATEGORIES = [
  {
    id: "necessary",
    title: "Strictly Necessary",
    description:
      "Required for core site functionality like security, navigation and saving your privacy choices. These cannot be turned off.",
    required: true,
  },
  {
    id: "performance",
    title: "Performance & Analytics",
    description:
      "Help us understand how visitors use the site so we can improve pages, speed and content.",
    required: false,
  },
  {
    id: "functional",
    title: "Functional",
    description:
      "Enable enhanced features such as chat, embedded media and remembering your preferences.",
    required: false,
  },
  {
    id: "marketing",
    title: "Marketing",
    description:
      "Used to deliver relevant eatOS ads and measure the performance of our campaigns.",
    required: false,
  },
];

const DEFAULT_PREFS = {
  necessary: true,
  performance: false,
  functional: false,
  marketing: false,
};

const ALL_ON = {
  necessary: true,
  performance: true,
  functional: true,
  marketing: true,
};

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [prefs, setPrefs] = useState(DEFAULT_PREFS);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    const stored = localStorage.getItem(PREFS_KEY);
    if (stored) {
      try {
        setPrefs({ ...DEFAULT_PREFS, ...JSON.parse(stored), necessary: true });
      } catch {
        /* ignore malformed value */
      }
    }
    if (!consent) {
      setIsVisible(true);
    }

    const handleOpenBanner = () => {
      setIsVisible(true);
      setShowPreferences(false);
    };
    const handleOpenPreferences = () => {
      setIsVisible(true);
      setShowPreferences(true);
    };
    window.addEventListener("openCookieBanner", handleOpenBanner);
    window.addEventListener("openCookiePreferences", handleOpenPreferences);

    return () => {
      window.removeEventListener("openCookieBanner", handleOpenBanner);
      window.removeEventListener(
        "openCookiePreferences",
        handleOpenPreferences,
      );
    };
  }, []);

  const persist = (value, nextPrefs) => {
    localStorage.setItem(CONSENT_KEY, value);
    localStorage.setItem(PREFS_KEY, JSON.stringify(nextPrefs));
    window.dispatchEvent(
      new CustomEvent("cookieConsentUpdated", { detail: nextPrefs }),
    );
    setPrefs(nextPrefs);
    setShowPreferences(false);
    setIsVisible(false);
  };

  const handleAcceptAll = () => persist("accepted", ALL_ON);
  const handleRejectAll = () => persist("rejected", DEFAULT_PREFS);
  const handleSavePreferences = () => persist("custom", { ...prefs, necessary: true });

  const toggle = (id) =>
    setPrefs((current) => ({ ...current, [id]: !current[id] }));

  if (!isVisible) return null;

  if (showPreferences) {
    return (
      <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-6 font-montserrat">
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Cookie preferences"
          className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl border border-white/15 bg-black shadow-2xl sm:rounded-2xl"
        >
          <div className="flex items-start justify-between gap-4 border-b border-white/15 px-6 py-5">
            <div>
              <h2 className="text-[19px] font-semibold text-white">
                Cookie preferences
              </h2>
              <p className="mt-1 text-[14px] leading-5 text-gray-300">
                Choose which cookies eatOS can use. You can change this at any
                time from Cookie Settings in the footer.
              </p>
            </div>
            <button
              onClick={() => setShowPreferences(false)}
              className="p-1 text-gray-400 transition-colors hover:text-white"
              aria-label="Close cookie preferences"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 divide-y divide-white/10 overflow-y-auto px-6">
            {CATEGORIES.map((category) => (
              <div
                key={category.id}
                className="flex items-start justify-between gap-5 py-5"
              >
                <div className="flex-1">
                  <p className="text-[16px] font-semibold text-white">
                    {category.title}
                  </p>
                  <p className="mt-1.5 text-[15px] leading-6 text-gray-300">
                    {category.description}
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={category.required ? true : prefs[category.id]}
                  aria-label={`${category.title} cookies`}
                  disabled={category.required}
                  onClick={() => !category.required && toggle(category.id)}
                  className={`relative mt-1 h-6 w-11 shrink-0 rounded-full transition-colors ${
                    category.required || prefs[category.id]
                      ? "bg-brand"
                      : "bg-white/25"
                  } ${category.required ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${
                      category.required || prefs[category.id]
                        ? "left-[22px]"
                        : "left-0.5"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 border-t border-white/15 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <a
              href="/privacy#cookies"
              className="text-[14px] text-gray-300 underline transition-colors hover:text-white"
            >
              Read our Cookie Policy
            </a>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleRejectAll}
                className="px-5 py-2.5 text-[15px] font-medium text-gray-300 transition-colors hover:text-white"
              >
                Reject All
              </button>
              <button
                onClick={handleSavePreferences}
                className="rounded-lg border border-white/30 px-5 py-2.5 text-[15px] font-medium text-white transition-colors hover:border-white/60"
              >
                Save Preferences
              </button>
              <button
                onClick={handleAcceptAll}
                className="rounded-lg bg-white px-6 py-2.5 text-[15px] font-medium text-black transition-colors hover:bg-gray-200"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>

        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white shadow-2xl">
      <div className="site-container py-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex-1 text-[15px] leading-6 text-gray-700">
            <p>
              We use cookies to improve your experience. By continuing, you
              agree to our{" "}
              <a
                href="/privacy"
                className="underline transition-colors hover:text-black"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="/privacy#cookies"
                className="underline transition-colors hover:text-black"
              >
                Cookie Policy
              </a>
              .
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowPreferences(true)}
              className="px-5 py-2.5 text-[15px] font-medium text-gray-700 transition-colors hover:text-black"
            >
              Manage Preferences
            </button>
            <button
              onClick={handleAcceptAll}
              className="rounded-lg bg-black px-6 py-2.5 text-[15px] font-medium text-white transition-colors hover:bg-gray-800"
            >
              Accept All
            </button>
            <button
              onClick={handleRejectAll}
              className="p-2 text-gray-400 transition-colors hover:text-black"
              aria-label="Reject all cookies"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
