const steps = [
  { title: "Indent", detail: "Branch requests materials" },
  { title: "Approval", detail: "Manager approves or rejects" },
  { title: "Purchase order", detail: "Converted from the indent" },
  { title: "Goods receipt", detail: "Received qty per line" },
  { title: "Stock-in", detail: "Stock + STOCK_IN entry" },
];

export function KlyroProcurement() {
  return (
    <div>
      <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((step, i) => (
          <li key={step.title} className="flex gap-3 rounded-lg border border-line bg-bg px-3 py-2.5 lg:flex-col lg:gap-0">
            <span className="font-mono text-[11px] leading-5 text-accent-text">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <p className="text-sm font-medium text-fg">{step.title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted">{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-3 flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted">
        <span className="text-subtle">PO status:</span>
        <span className="rounded border border-line px-1.5 py-0.5">DRAFT</span>
        <span aria-hidden="true">→</span>
        <span className="rounded border border-line px-1.5 py-0.5">SENT</span>
        <span aria-hidden="true">→</span>
        <span className="rounded border border-line px-1.5 py-0.5">PARTIAL</span>
        <span aria-hidden="true">→</span>
        <span className="rounded border border-accent px-1.5 py-0.5 text-fg">RECEIVED</span>
        <span className="text-subtle">when every line is fully received</span>
      </div>
    </div>
  );
}
