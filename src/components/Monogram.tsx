/**
 * Personal mark: a geometric "A" and "T". The T's crossbar carries the accent.
 * Shared by the header, footer, favicon and social image (see lib/mark.ts).
 */
export function Monogram({ className = "size-7", title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      fill="none"
      strokeWidth="3.2"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <path d="M4 27 11 5l7 22M6.8 19.5h8.4M23 8.5V27" stroke="currentColor" />
      <path d="M17 5h12" stroke="var(--accent)" />
    </svg>
  );
}
