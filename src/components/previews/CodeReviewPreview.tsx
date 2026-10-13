const findings = [
  { severity: "high", file: "auth/session.py", line: 42, text: "Token compared with == — use a constant-time check" },
  { severity: "medium", file: "api/orders.py", line: 118, text: "N+1 query inside the loop over line items" },
  { severity: "low", file: "utils/dates.py", line: null, text: "Naive datetime; prefer timezone-aware" },
];

const tone: Record<string, string> = {
  high: "text-danger border-danger/40",
  medium: "text-warn border-warn/40",
  low: "text-muted border-line-strong",
};

/** Illustrative review output in the shape the agent returns — not a real PR. */
export function CodeReviewPreview() {
  return (
    <div className="flex h-full flex-col gap-5 p-5 sm:p-7">
      <div className="flex items-center gap-2 rounded-lg border border-line bg-bg px-3 py-2 font-mono text-[11px] text-muted">
        <span className="text-subtle">PR</span>
        <span className="truncate">github.com/acme/shop/pull/214</span>
      </div>

      <ol className="flex items-center gap-2 font-mono text-[10px] tracking-wide text-subtle uppercase" aria-label="Review pipeline">
        {["fetch", "analyze", "summarize"].map((step, i) => (
          <li key={step} className="flex items-center gap-2">
            <span className="rounded border border-accent/50 bg-accent-soft px-1.5 py-0.5 text-accent-text">{step}</span>
            {i < 2 && <span aria-hidden="true">→</span>}
          </li>
        ))}
      </ol>

      <ul className="space-y-2" aria-label="Example findings">
        {findings.map((f) => (
          <li key={f.file} className="rounded-lg border border-line bg-bg px-3 py-2.5">
            <div className="flex flex-wrap items-center gap-2 font-mono text-[10px]">
              <span className={`rounded border px-1.5 uppercase ${tone[f.severity]}`}>{f.severity}</span>
              <span className="text-muted">
                {f.file}
                {f.line !== null && `:${f.line}`}
              </span>
            </div>
            <p className="mt-1.5 text-[13px] text-fg">{f.text}</p>
          </li>
        ))}
      </ul>
      <p className="font-mono text-[10px] text-subtle">Illustrative output</p>
    </div>
  );
}
