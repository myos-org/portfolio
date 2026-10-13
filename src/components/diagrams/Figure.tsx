import type { ReactNode } from "react";

export function Figure({ caption, children, label }: { caption: string; children: ReactNode; label: string }) {
  return (
    <figure className="my-8 overflow-hidden rounded-xl border border-line bg-surface">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="font-mono text-[11px] tracking-wide text-subtle uppercase">{label}</span>
        <span className="font-mono text-[11px] text-subtle">Diagram</span>
      </div>
      <div className="p-4 sm:p-6">{children}</div>
      <figcaption className="border-t border-line px-4 py-3 text-sm leading-relaxed text-muted sm:px-6">{caption}</figcaption>
    </figure>
  );
}

export function Node({ title, detail, emphasis = false, dashed = false }: { title: string; detail?: string; emphasis?: boolean; dashed?: boolean }) {
  return (
    <div
      className={`rounded-lg border px-3 py-2.5 ${dashed ? "border-dashed" : ""} ${
        emphasis ? "border-accent bg-accent-soft" : "border-line bg-bg"
      }`}
    >
      <p className="text-sm font-medium text-fg">{title}</p>
      {detail && <p className="mt-0.5 font-mono text-[11px] leading-relaxed text-muted">{detail}</p>}
    </div>
  );
}

/** Arrow that points right on wide screens and down on narrow ones. */
export function Flow({ label }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-1 text-subtle md:flex-col md:py-0" aria-hidden="true">
      <span className="text-base md:hidden">↓</span>
      <span className="hidden text-base md:inline">→</span>
      {label && <span className="font-mono text-[10px] tracking-wide uppercase">{label}</span>}
    </div>
  );
}
