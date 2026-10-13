import type { DiagramId } from "@/lib/types";
import { Figure } from "./Figure";
import { KlyroArchitecture } from "./KlyroArchitecture";
import { KlyroProcurement } from "./KlyroProcurement";
import { KlyroTransferStates } from "./KlyroTransferStates";
import { LayerStack } from "./LayerStack";

const diagrams: Record<DiagramId, { label: string; render: () => React.ReactNode }> = {
  "klyro-architecture": { label: "System architecture", render: () => <KlyroArchitecture /> },
  "klyro-procurement": { label: "Procurement → inventory", render: () => <KlyroProcurement /> },
  "klyro-transfer-states": { label: "Transfer lifecycle", render: () => <KlyroTransferStates /> },
  "alpide-layers": {
    label: "One feature, every layer",
    render: () => (
      <div className="max-w-md">
        <LayerStack
          label="Feature path"
          layers={[
            { name: "Screen", detail: "web · React Native" },
            { name: "REST endpoint", detail: "Java · request validation" },
            { name: "Service", detail: "ERP business rules" },
            { name: "SQL", detail: "queries · views · stored procedures" },
          ]}
        />
      </div>
    ),
  },
};

export function Diagram({ id, caption }: { id: DiagramId; caption: string }) {
  const diagram = diagrams[id];
  return (
    <Figure label={diagram.label} caption={caption}>
      {diagram.render()}
    </Figure>
  );
}
