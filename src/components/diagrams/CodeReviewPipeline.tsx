const steps = [
  { title: "PR URL", detail: "plus an optional GitHub token for private repos" },
  { title: "fetch", detail: "GitHub API → diff, minus lock and generated files" },
  { title: "analyze", detail: "structured findings, grounded in the diff" },
  { title: "summarize", detail: "a review comment from the findings" },
  { title: "Result", detail: "summary + findings ordered by severity" },
];

export function CodeReviewPipeline() {
  return (
    <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
      {steps.map((step, i) => {
        const node = i > 0 && i < steps.length - 1;
        return (
          <li
            key={step.title}
            className={`flex gap-3 rounded-lg border px-3 py-2.5 lg:flex-col lg:gap-0 ${node ? "border-accent bg-accent-soft" : "border-line bg-bg"}`}
          >
            <span className="font-mono text-[11px] leading-5 text-accent-text">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <p className={`text-sm font-medium text-fg ${node ? "font-mono" : ""}`}>{step.title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted">{step.detail}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
