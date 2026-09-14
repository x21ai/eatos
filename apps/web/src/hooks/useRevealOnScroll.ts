// @ts-nocheck
import { useEffect, useState } from "react";

export function useRevealOnScroll() {
  // Start as null so SSR/first paint doesn't hide the whole page.
  const [visibleIds, setVisibleIds] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const revealNow = (ids) => {
      if (!ids.length) return;
      setVisibleIds((prev) => {
        const next = new Set(prev || []);
        for (const id of ids) next.add(id);
        return next;
      });
    };

    const query = () =>
      Array.from(document.querySelectorAll("[data-reveal-id]"));

    // If IntersectionObserver isn't available (or fails), just reveal everything.
    if (typeof window.IntersectionObserver === "undefined") {
      const all = new Set();
      for (const el of query()) {
        const id = el.getAttribute("data-reveal-id");
        if (id) all.add(id);
      }
      setVisibleIds(all);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const ids = [];
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.getAttribute("data-reveal-id");
          if (id) ids.push(id);
        }
        revealNow(ids);
      },
      {
        root: null,
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.15,
      },
    );

    const seen = new WeakSet();

    const observeAll = (elements) => {
      const immediate = [];
      for (const el of elements) {
        if (seen.has(el)) continue;
        seen.add(el);
        observer.observe(el);

        // Safety net: already in view when it appeared.
        const rect = el.getBoundingClientRect();
        const inView =
          rect.bottom > 0 &&
          rect.top < (window.innerHeight || document.documentElement.clientHeight);
        if (inView) {
          const id = el.getAttribute("data-reveal-id");
          if (id) immediate.push(id);
        }
      }
      revealNow(immediate);
    };

    const initial = query();
    if (!initial.length) setVisibleIds(new Set());
    observeAll(initial);

    // Watch for reveal elements added after the first paint (tab/drill-down swaps).
    const mutationObserver = new MutationObserver((mutations) => {
      const found = [];
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (!(node instanceof Element)) continue;
          if (node.hasAttribute("data-reveal-id")) found.push(node);
          const nested = node.querySelectorAll?.("[data-reveal-id]");
          if (nested) for (const el of nested) found.push(el);
        }
      }
      if (found.length) observeAll(found);
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return visibleIds;
}
