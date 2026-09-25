import type { ReactNode } from 'react';

/**
 * Centered section copy that wraps on the container width.
 * Do not set whitespace-pre-line here: source line breaks and explicit
 * newlines were forcing short, one-word lines on narrow screens.
 */
export function CenteredLead({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-lg md:text-xl text-white/90 max-w-2xl mx-auto text-pretty ${className}`.trim()}>
      {children}
    </p>
  );
}
