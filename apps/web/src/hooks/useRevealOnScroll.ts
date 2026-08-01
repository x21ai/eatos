// @ts-nocheck
import { useEffect, useState } from "react";

export function useRevealOnScroll() {
  // Start as null so SSR/first paint doesn't hide the whole page.
  const [visibleIds, setVisibleIds] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const elements = Array.from(document.querySelectorAll("[data-reveal-id]"));

    if (!elements.length) {
      setVisibleIds(new Set());
      return;
    }

    // If IntersectionObserver isn't available (or fails), just reveal everything.
    if (typeof window.IntersectionObserver === "undefined") {
      const all = new Set();
      for (const el of elements) {
        const id = el.getAttribute("data-reveal-id");
        if (id) all.add(id);
      }
      setVisibleIds(all);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleIds((prev) => {
          const next = new Set(prev || []);
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const id = entry.target.getAttribute("data-reveal-id");
            if (id) next.add(id);
          }
          return next;
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.15,
      },
    );

    for (const el of elements) observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return visibleIds;
}
