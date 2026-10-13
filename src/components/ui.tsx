import Link from "next/link";
import type { ReactNode } from "react";
import { splitCode } from "@/lib/format";
import type { StatusTone } from "@/lib/types";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function SectionHeading({
  index,
  label,
  title,
  accent,
  id,
}: {
  index: string;
  label: string;
  title: string;
  /** Trailing words set in the serif accent face. */
  accent?: string;
  id: string;
}) {
  return (
    <div className="mb-12 grid gap-4 md:mb-16 md:grid-cols-[10rem_1fr] md:gap-8" data-reveal>
      <p className="font-mono text-xs tracking-wide text-subtle uppercase md:pt-4">
        <span className="text-accent-text">{index}</span> / {label}
      </p>
      <h2 id={id} className="max-w-3xl text-4xl leading-[1.05] font-semibold tracking-[-0.035em] text-fg sm:text-5xl">
        {title}
        {accent && (
          <>
            {" "}
            <span className="serif-accent text-muted">{accent}</span>
          </>
        )}
      </h2>
    </div>
  );
}

const toneDot: Record<StatusTone, string> = {
  live: "bg-ok",
  active: "bg-accent",
  confidential: "bg-subtle",
};

/** Status is always written out; the dot is decoration, never the only signal. */
export function StatusBadge({ label, tone }: { label: string; tone: StatusTone }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-2.5 py-1 font-mono text-[11px] text-muted">
      <span className={`size-1.5 rounded-full ${toneDot[tone]}`} aria-hidden="true" />
      {label}
    </span>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-md border border-line px-2 py-0.5 font-mono text-[11px] leading-5 text-muted">{children}</li>
  );
}

/** Plain text with `inline code`. Never interprets HTML. */
export function RichText({ text }: { text: string }) {
  return (
    <>
      {splitCode(text).map((part, i) =>
        part.code ? (
          <code key={i} className="rounded bg-surface-2 px-1 py-px font-mono text-[0.88em] text-fg">
            {part.value}
          </code>
        ) : (
          <span key={i}>{part.value}</span>
        ),
      )}
    </>
  );
}

export function ArrowLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={`group inline-flex items-center gap-2 font-medium text-accent-text ${className}`}>
      <span className="underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-current">{children}</span>
      <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
    </Link>
  );
}

export function ExternalLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`group inline-flex items-center gap-1.5 ${className}`}>
      <span className="underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-current">{children}</span>
      <span aria-hidden="true" className="transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px">↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
