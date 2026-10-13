import Image from "next/image";

const modules = ["Recipes", "Inventory", "Procurement", "Transfers", "Menus · QR", "Sales · CRM", "Meal plans", "Reports"];
const track = ["PENDING", "APPROVED", "DISPATCHED", "RECEIVED"];

/** Illustrative panel built from Klyro's real module list and transfer states. */
export function KlyroPreview() {
  return (
    <div className="flex h-full flex-col justify-between gap-8 p-5 sm:p-7">
      <div className="flex items-center gap-3">
        {/* The brand symbol is navy + blue, so it always sits on a light tile. */}
        <span className="grid size-10 place-items-center rounded-lg border border-line bg-white">
          <Image src="/projects/klyro/symbol.svg" alt="" width={28} height={28} unoptimized className="size-7" />
        </span>
        <div>
          <p className="text-sm font-semibold text-fg">Klyro</p>
          <p className="font-mono text-[11px] text-subtle">formerly Forkify ERP</p>
        </div>
      </div>

      <ul className="grid grid-cols-2 gap-1.5 sm:grid-cols-4" aria-label="Klyro modules">
        {modules.map((m) => (
          <li
            key={m}
            className="rounded-md border border-line bg-bg px-2 py-2 text-center font-mono text-[11px] text-muted transition-colors duration-300 group-hover:border-line-strong"
          >
            {m}
          </li>
        ))}
      </ul>

      <div aria-hidden="true">
        <p className="mb-2 font-mono text-[10px] tracking-wide text-subtle uppercase">Transfer lifecycle</p>
        <div className="flex items-center">
          {track.map((s, i) => (
            <div key={s} className="flex flex-1 items-center last:flex-none">
              <span className={`size-2.5 shrink-0 rounded-full ${i < 3 ? "bg-accent" : "border-2 border-accent bg-surface"}`} />
              {i < track.length - 1 && (
                <span className={`h-px flex-1 ${i < 2 ? "bg-accent" : "bg-line-strong"}`} />
              )}
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between font-mono text-[10px] text-subtle">
          {track.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
