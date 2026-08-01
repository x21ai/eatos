// @ts-nocheck
import { createContext, useContext } from "react";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

const RevealContext = createContext(null);

export function RevealProvider({ children }) {
  const visibleIds = useRevealOnScroll();
  return (
    <RevealContext.Provider value={visibleIds}>
      {children}
    </RevealContext.Provider>
  );
}

export function Reveal({ id, children }) {
  const visibleIds = useContext(RevealContext);

  // If we don't have a set yet (SSR / before hydration), show content.
  const isVisible = !visibleIds ? true : visibleIds.has(id);

  const className = isVisible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-6";

  return (
    <div
      data-reveal-id={id}
      className={`transition-all duration-700 ease-out ${className}`}
    >
      {children}
    </div>
  );
}
