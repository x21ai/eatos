// @ts-nocheck
"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem("eatos_cookie_consent");
    if (!consent) {
      setIsVisible(true);
    }

    // Listen for Cookie Settings clicks from footer
    const handleOpenBanner = () => {
      setIsVisible(true);
    };
    window.addEventListener("openCookieBanner", handleOpenBanner);

    return () => {
      window.removeEventListener("openCookieBanner", handleOpenBanner);
    };
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("eatos_cookie_consent", "accepted");
    setIsVisible(false);
  };

  const handleDismiss = () => {
    localStorage.setItem("eatos_cookie_consent", "dismissed");
    setIsVisible(false);
  };

  const handleManagePreferences = () => {
    // For now, just accept - in a real implementation this would open a modal
    // TODO: Implement preferences modal with granular cookie controls
    handleAcceptAll();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl">
      <div className="site-container py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Text content */}
          <div className="flex-1 text-[15px] leading-6 text-gray-700">
            <p>
              We use cookies to improve your experience. By continuing, you
              agree to our{" "}
              <a
                href="/privacy"
                className="underline hover:text-black transition-colors"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="/privacy#cookies"
                className="underline hover:text-black transition-colors"
              >
                Cookie Policy
              </a>
              .
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleManagePreferences}
              className="px-5 py-2.5 text-[15px] font-medium text-gray-700 hover:text-black transition-colors"
            >
              Manage Preferences
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-6 py-2.5 bg-black text-white text-[15px] font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              Accept All
            </button>
            <button
              onClick={handleDismiss}
              className="p-2 text-gray-400 hover:text-black transition-colors"
              aria-label="Dismiss"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
