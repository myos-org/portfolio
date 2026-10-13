const states = [
  { name: "PENDING", note: "Requested by a branch" },
  { name: "APPROVED", note: "Ready to send" },
  { name: "DISPATCHED", note: "All lines validated, then source stock deducted" },
  { name: "RECEIVED", note: "Destination stock credited" },
];

export function KlyroTransferStates() {
  return (
    <div className="space-y-4">
      <ol className="flex flex-col gap-2 md:flex-row md:items-stretch">
        {states.map((state, i) => (
          <li key={state.name} className="flex flex-col gap-2 md:flex-1 md:flex-row md:items-center">
            <div className={`flex-1 rounded-lg border px-3 py-2.5 ${i === 2 ? "border-accent bg-accent-soft" : "border-line bg-bg"}`}>
              <p className="font-mono text-xs font-medium text-fg">{state.name}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted">{state.note}</p>
            </div>
            {i < states.length - 1 && (
              <span className="self-center text-subtle" aria-hidden="true">
                <span className="md:hidden">↓</span>
                <span className="hidden md:inline">→</span>
              </span>
            )}
          </li>
        ))}
      </ol>
      <div className="rounded-lg border border-dashed border-line-strong px-3 py-2.5">
        <p className="font-mono text-xs font-medium text-fg">CANCELLED</p>
        <p className="mt-0.5 text-xs leading-relaxed text-muted">
          Allowed from any state before RECEIVED. Cancelling a DISPATCHED transfer returns the stock to the source
          branch and records a TRANSFER_IN entry.
        </p>
      </div>
    </div>
  );
}
