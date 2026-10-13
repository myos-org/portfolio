type Layer = { name: string; detail: string };

/**
 * A vertical stack of system layers with an optional travelling "request" dot.
 * Used for the hero and for the Alpide ERP cross-layer diagram.
 */
export function LayerStack({
  layers,
  label,
  trace = false,
}: {
  layers: Layer[];
  label: string;
  trace?: boolean;
}) {
  return (
    <div className="relative">
      <p className="mb-3 font-mono text-[11px] tracking-wide text-subtle uppercase">{label}</p>
      <div className="relative pl-7">
        {/* spine */}
        <div className="absolute top-3 bottom-3 left-[9px] w-px bg-line-strong" aria-hidden="true">
          {trace && (
            <span className="trace-dot absolute left-1/2 size-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_0_4px_var(--accent-soft)]" />
          )}
        </div>
        <ol className="space-y-2">
          {layers.map((layer, i) => (
            <li
              key={layer.name}
              className="group relative rounded-lg border border-line bg-surface px-4 py-3 transition-colors duration-200 hover:border-accent"
            >
              <span
                className="absolute top-1/2 -left-[23px] size-[9px] -translate-y-1/2 rounded-full border-2 border-line-strong bg-bg transition-colors duration-200 group-hover:border-accent"
                aria-hidden="true"
              />
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm font-medium text-fg">{layer.name}</span>
                <span className="font-mono text-[11px] text-subtle" aria-hidden="true">
                  L{i + 1}
                </span>
              </div>
              <p className="mt-0.5 font-mono text-xs text-muted">{layer.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
