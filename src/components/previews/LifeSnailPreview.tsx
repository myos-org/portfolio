const areas = [
  { name: "Money", detail: "expenses · budgets" },
  { name: "Health", detail: "fitness · food" },
  { name: "Time", detail: "reminders" },
  { name: "Assist", detail: "AI workflows" },
];

/** Typographic panel of LifeSnail's product areas — deliberately not a fake screenshot. */
export function LifeSnailPreview() {
  return (
    <div className="relative flex h-full flex-col justify-between gap-8 overflow-hidden p-5 sm:p-7">
      <svg
        viewBox="0 0 200 200"
        className="pointer-events-none absolute -top-10 -right-10 size-56 text-line-strong transition-transform duration-700 group-hover:rotate-12 motion-reduce:transition-none"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        aria-hidden="true"
      >
        {/* golden-ish spiral: a nod to the snail shell */}
        <path d="M100 100c0-6 5-10 10-10 9 0 14 8 14 16 0 13-11 22-24 22-17 0-30-14-30-31 0-22 18-38 40-38 27 0 48 22 48 49 0 33-27 58-60 58-39 0-70-32-70-71" />
      </svg>

      <div className="relative">
        <p className="text-sm font-semibold text-fg">LifeSnail</p>
        <p className="font-mono text-[11px] text-subtle">one place for personal admin</p>
      </div>

      <ul className="relative grid grid-cols-2 gap-1.5" aria-label="LifeSnail product areas">
        {areas.map((a) => (
          <li key={a.name} className="rounded-md border border-line bg-bg px-3 py-3">
            <p className="text-sm font-medium text-fg">{a.name}</p>
            <p className="font-mono text-[11px] text-muted">{a.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
