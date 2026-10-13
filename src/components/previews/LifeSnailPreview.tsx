import Image from "next/image";

const areas = [
  { name: "Money", detail: "expenses · groups · budgets" },
  { name: "Health", detail: "workouts · food" },
  { name: "Life", detail: "diary · todos · reminders" },
  { name: "Assist", detail: "command bar · voice" },
];

/** LifeSnail's product areas and command bar — deliberately not a fake screenshot. */
export function LifeSnailPreview() {
  return (
    <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden p-5 sm:p-7">
      <div className="flex items-center gap-3">
        <Image src="/projects/lifesnail/icon.svg" alt="" width={40} height={40} unoptimized className="size-10 rounded-lg" />
        <div>
          <p className="text-sm font-semibold text-fg">LifeSnail</p>
          <p className="font-mono text-[11px] text-subtle">Small steps. Better life.</p>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-lg border border-line bg-bg px-3 py-2.5 font-mono text-[12px] text-fg" aria-hidden="true">
        <span className="text-subtle">›</span>
        spent 500 on dinner
        <span className="ml-auto rounded border border-line px-1.5 text-[10px] text-subtle">no AI call</span>
      </div>

      <ul className="grid grid-cols-2 gap-1.5" aria-label="LifeSnail product areas">
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
